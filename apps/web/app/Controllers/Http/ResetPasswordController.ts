import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ResetPasswordController {
  public async index({ view }: HttpContextContract) {
    return view.render("pages/reset_password");
  }

  public async store({ view }: HttpContextContract) {
    return view.render("pages/reset_password");
  }
}
