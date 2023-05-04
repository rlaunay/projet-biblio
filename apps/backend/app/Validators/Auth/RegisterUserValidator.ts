import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string([
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string([
      rules.trim(),
      rules.confirmed(),
      rules.minLength(4),
      rules.maxLength(255),
    ]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "email.maxLength": "Email trop long (pas dépasser 255 caractères)",
    "email.email": "Email invalid",
    "email.unique": "Email déjà utilisé",
    "password.minLength": "Mot de passe trop court (min 4 caractères)",
    "password.maxLength":
      "Mot de passe trop long (pas dépasser 255 caractères)",
    "password.confirmed": "Confirmation invalid",
  };
}
