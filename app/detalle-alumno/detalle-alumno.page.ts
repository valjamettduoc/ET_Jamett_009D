import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuController, AlertController } from "@ionic/angular";
import { ApiasignaturasService } from "../services/apiasignaturas.service";
import { Asignatura } from "src/interfaces/asignaturas";

@Component({
  selector: "app-detalle-alumno",
  templateUrl: "./detalle-alumno.page.html",
  styleUrls: ["./detalle-alumno.page.scss"],
})
export class DetalleAlumnoPage implements OnInit {
  unAsignatura: any;
  qrdata: string;

  usuarios = {
    nombre: "",
    rut: "",
    email: "",
  };

  id: any;

  asignatura = {
    id: "",
    nombre: "",
    profesor: "",
  };

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private apicrudAsignatura: ApiasignaturasService,
    private alertcontroller: AlertController,
    private menucontroller: MenuController
  ) {
    this.activated.queryParams.subscribe((params) => {
      this.unAsignatura = JSON.parse(params["asignatura"]);
    });
    this.qrdata = "";
    this.usuarios.nombre =
      sessionStorage.getItem("nombre") || "Nombre no disponible";
    this.usuarios.rut = sessionStorage.getItem("rut") || "RUT no disponible";
    this.usuarios.email =
      sessionStorage.getItem("email") || "Email no disponible";
  }

  ngOnInit() {
    this.id = this.unAsignatura.id;
    this.asignatura = this.unAsignatura;
  }

  regresar() {
    this.router.navigate(["/tabs/asignaturas"]);
  }

  actualizarAsignatura(Observable: Asignatura) {
    this.router.navigate(["/actualizar", this.asignatura.id], {
      queryParams: { asignatura: JSON.stringify(Observable) },
    });
  }

  generarQr() {
    const fechaActual = new Date().toLocaleDateString();
    this.qrdata = `${this.usuarios.rut},${this.usuarios.email},${this.asignatura.nombre},${this.asignatura.profesor},${fechaActual}`;
    // Crear el objeto JSON con la información del QR
    const qrgenerado = {
      rut: this.usuarios.rut,
      email: this.usuarios.email,
      asignatura: this.asignatura.nombre,
      profesor: this.asignatura.profesor,
      fecha: fechaActual,
    };

    // Enviar el objeto al backend utilizando el servicio
    this.apicrudAsignatura.saveQrData(qrgenerado).subscribe({
      next: () => {
        console.log("QR generado y guardado con éxito:", qrgenerado);
        this.mostrarMensaje();
      },
      error: (err) => {
        console.error("Error al guardar el QR:", err);
      },
    });
  }

  eliminar() {
    this.apicrudAsignatura.deleteAsignatura(this.asignatura).subscribe();
    this.mensaje();
  }
  async mensaje() {
    const alert = await this.alertcontroller.create({
      header: "Alumno Eliminado!",
      message: "Sus Datos han sido Eliminado",
      buttons: [
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            this.router.navigate(["/tabs/tab1"]);
          },
        },
      ],
    });

    await alert.present();
  }

  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: "Éxito",
      message: "Su QR ha sido Almacenado",
      buttons: ["Ok"],
    });
    alerta.present();
  }

  mostrarMenu() {
    this.menucontroller.enable(true);
    this.menucontroller.open("first");
  }

  irAJustificarAsistencia() {
    this.router.navigate(["/justificar-asistencia"]);
  }
}