import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/Auth/LoginUserValidator";
import RegisterUserValidator from "App/Validators/Auth/RegisterUserValidator";

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { password, email } = await request.validate(LoginUserValidator);

    try {
      const token = await auth.use("api").attempt(email, password);
      return response.ok({ user: auth.user, token: token.token });
    } catch (e) {
      return response.unauthorized({
        message: "Email ou mot de passe invalid",
      });
    }
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator);
    const user = await User.create(payload);

    const token = await auth.use("api").generate(user);
    return response.created({ token, user });
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").revoke();
    return response.ok({ message: "Déconnexion réussit" });
  }

  public async me({ auth }: HttpContextContract) {
    return { user: auth.user || null };
  }
}
