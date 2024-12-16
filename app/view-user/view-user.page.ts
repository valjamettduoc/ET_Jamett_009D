import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular"; // Importa AlertController
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
    private apicrudAsignatura: ApiasignaturasService,
    private alertController: AlertController // Inyecta AlertController
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

  ionViewWillEnter() {
    // Refrescar los QRs cada vez que se entra en la pestaña
    if (this.rutUsuario) {
      this.cargarQrs();
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
        console.log("QRs cargados:", this.qrList);
      },
      error: (err) => {
        console.error("Error al cargar los QRs:", err);
      },
    });
  }

  verificarAsistencia(qr: any) {
    this.apicrudAsignatura.getAsistencias().subscribe({
      next: (asistencias) => {
        const asistenciaEncontrada = asistencias.some(
          (asistencia) =>
            asistencia.rut === qr.rut &&
            asistencia.asignatura === qr.asignatura &&
            asistencia.fecha === qr.fecha
        );

        if (asistenciaEncontrada) {
          this.mostrarAlerta(
            "Asistencia encontrada",
            "La asistencia para este QR ha sido registrada."
          );
        } else {
          this.mostrarAlerta(
            "Asistencia no encontrada",
            "La asistencia para este QR no ha sido registrada."
          );
        }
      },
      error: (err) => {
        console.error("Error al verificar la asistencia:", err);
      },
    });
  }

  async mostrarAlerta(header: string, message: string) {
    const alerta = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });
    alerta.present();
  }
}
