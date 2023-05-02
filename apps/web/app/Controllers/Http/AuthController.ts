import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegisterUserValidator from "App/Validators/Auth/RegisterUserValidator";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/Auth/LoginUserValidator";
import LogoutValidator from "App/Validators/Auth/LogoutValidator";

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { isMobile, password, email, rememberMe } = await request.validate(
      LoginUserValidator
    );

    try {
      if (isMobile) {
        const token = await auth.use("api").attempt(email, password);
        return response.ok({ user: auth.user, token });
      } else {
        await auth.use("web").attempt(email, password, rememberMe);
        return response.ok({ user: auth.user });
      }
    } catch (e) {
      return response.unauthorized({
        message: "Email ou mot de passe invalid",
      });
    }
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const { isMobile, ...data } = await request.validate(RegisterUserValidator);
    const user = await User.create(data);

    if (isMobile) {
      const token = await auth.use("api").generate(user);
      return response.created({ token, user });
    } else {
      await auth.use("web").login(user);
      return response.created({ user });
    }
  }

  public async logout({ request, auth, response }: HttpContextContract) {
    const { isMobile } = await request.validate(LogoutValidator);

    if (isMobile) {
      await auth.use("api").revoke();
    } else {
      await auth.use("web").logout();
    }

    return response.ok({ message: "Déconnexion réussit" });
  }
}
