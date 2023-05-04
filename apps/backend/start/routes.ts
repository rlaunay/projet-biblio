/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.get("/me", "AuthController.me");
    Route.post("/login", "AuthController.login");
    Route.post("/register", "AuthController.register");
    Route.delete("/logout", "AuthController.logout");

    Route.post("/forgot-password", "ResetPasswordController.sendResetMail");
    Route.get("/reset/password/:key", "ResetPasswordController.index").as(
      "resetPassword"
    );

    Route.post("/reset/password/:key", "ResetPasswordController.store");
  }).prefix("/auth");
}).prefix("/api");
