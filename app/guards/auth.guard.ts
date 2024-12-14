import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service"; // Asegúrate de tener un servicio para manejar la autenticación

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si el usuario ya está logueado, redirige al home o página principal
      this.router.navigate(["/tabs/landing"]);
      return false; // Bloquea el acceso a rutas de login o registro
    }
    return true; // Permite el acceso si no está logueado
  }
}
