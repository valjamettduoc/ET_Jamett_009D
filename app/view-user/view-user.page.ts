import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiasignaturasService } from "../services/apiasignaturas.service";

@Component({
  selector: "app-view-user",
  templateUrl: "./view-user.page.html",
  styleUrls: ["./view-user.page.scss"],
})
export class ViewUserPage implements OnInit {
  qrList: any[] = [];
  filteredQrList: any[] = [];
  rutUsuario: string = "";
  imageSrc: string | ArrayBuffer | null = null;
  rut: string = "";
  nombre: string = "";
  apellido: string = "";
  password: string = "";
  email: string = "";
  mostrarPassword: boolean = false;

  constructor(
    private router: Router,
    private apicrudAsignatura: ApiasignaturasService
  ) {}

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

    this.rutUsuario = sessionStorage.getItem("rut") || ""; // Obtener el RUT desde sessionStorage
    if (this.rutUsuario) {
      this.cargarQrs();
    } else {
      console.error("No se encontró un RUT en sessionStorage.");
    }
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

  cargarQrs() {
    this.apicrudAsignatura.getAllQrs().subscribe({
      next: (data) => {
        this.qrList = data; // Guardar todos los QRs
        this.filteredQrList = this.qrList.filter(
          (qr) => qr.rut === this.rutUsuario
        ); // Filtrar por RUT del usuario logueado
        console.log("QRs filtrados:", this.filteredQrList);
      },
      error: (err) => {
        console.error("Error al cargar los QRs:", err);
      },
    });
  }
}
