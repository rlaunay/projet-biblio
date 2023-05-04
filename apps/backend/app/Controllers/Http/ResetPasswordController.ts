import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Mail from "@ioc:Adonis/Addons/Mail";
import User from "App/Models/User";
import Route from "@ioc:Adonis/Core/Route";
import urlFormatter from "url";
import Encryption from "@ioc:Adonis/Core/Encryption";
import { base64 } from "@ioc:Adonis/Core/Helpers";
import ResetPasswordValidator from "App/Validators/Auth/ResetPasswordValidator";

export default class ResetPasswordController {
  public async sendResetMail({ request, response }: HttpContextContract) {
    const { email } = request.only(["email"]);

    const user = await User.findBy("email", email ?? "");

    if (user === null) {
      return response.ok({ message: "Email de mot de passe oublié envoyer" });
    }

    const encryptId = base64.urlEncode(Encryption.encrypt(user.id));

    const path = Route.makeSignedUrl(
      "resetPassword",
      { key: encryptId },
      { expiresIn: "5m" }
    );
    const urlObj = urlFormatter.parse(path);

    const url = urlFormatter.format({
      protocol: "http:",
      hostname: "localhost",
      port: 5173,
      pathname: `/auth/reset/password/${encryptId}`,
      search: urlObj.search,
    });

    await Mail.send((message) => {
      message
        .from("relaunay@gmail.com")
        .to(user.email)
        .subject("Réinitialisez votre mot de passe!")
        .htmlView("emails/reset_password", { email: user.email, url });
    });

    user.resetPassword = true;
    await user.save();

    return response.ok({
      message: "Email de mot de passe oublié envoyer",
    });
  }

  public async index({ request, response, params }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await this.verifyKey(params.key);
      if (user === null) return response.forbidden({ valid: false });

      return response.ok({ valid: true });
    }

    return response.forbidden({ valid: false });
  }

  public async store({ request, response, params }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      return response.forbidden({ valid: false });
    }

    const user = await this.verifyKey(params.key);
    if (user === null) return response.forbidden({ valid: false });

    const { password } = await request.validate(ResetPasswordValidator);

    user.password = password;
    await user.save();

    return response.ok({ valid: true });
  }

  private async verifyKey(key: string) {
    const userId = Encryption.decrypt<number>(base64.urlDecode(key));
    if (userId === null) return null;
    const user = await User.find(userId);
    if (user === null) return null;
    if (!user.resetPassword) return null;

    return user;
  }
}
