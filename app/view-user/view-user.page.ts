import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.page.html",
  styleUrls: ["./view-user.page.scss"],
})
export class ViewUserPage implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;
  rut: string = "";
  nombre: string = "";
  apellido: string = "";
  password: string = "";
  email: string = "";
  mostrarPassword: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.imageSrc = localStorage.getItem("photo");
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.imageSrc = navigation.extras.state["imageSrc"] || null;
    }

    this.rut = sessionStorage.getItem("rut") || "Sin RUT";
    this.nombre = sessionStorage.getItem("nombre") || "Sin nombre";
    this.apellido = sessionStorage.getItem("apellido") || "Sin apellido";
    this.password = sessionStorage.getItem("password") || "******";
    this.email = sessionStorage.getItem("email") || "Sin correo";
  }

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  actualizarUsuario() {
    this.router.navigate(["/configuracion-perfil"]);
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(["/inicio"]);
  }
}
