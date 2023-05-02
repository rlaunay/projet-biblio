import Route from "@ioc:Adonis/Core/Route";

export function routeApi() {
  Route.group(() => {
    Route.post("/login", "AuthController.login");
    Route.post("/register", "AuthController.register");
    Route.delete("/register", "AuthController.logout");
  }).prefix("/auth");
}
