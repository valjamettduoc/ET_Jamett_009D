import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ApijustificacionesService } from "../services/apijustificaciones.service";
import { Alumno } from "src/interfaces/alumnos";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-justificar-asistencia",
  templateUrl: "./justificar-asistencia.page.html",
  styleUrls: ["./justificar-asistencia.page.scss"],
})
export class JustificarAsistenciaPage implements OnInit {
  usuario: Alumno | null = null;
  justificativoForm!: FormGroup;
  imagenEscogida: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private justificacionService: ApijustificacionesService,
    private Fbuild: FormBuilder,
    private alert: AlertController
  ) {}

  ngOnInit(): void {
    this.justificativoForm = this.Fbuild.group({
      asignatura: ["", Validators.required],
      seccion: ["", Validators.required],
      imagen: ["", Validators.required],
      descripcion: ["", Validators.required],
      profesor: ["", Validators.required],
      alumno: ["", Validators.required],
    });
  }

  seleccionarImagen(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenEscogida = reader.result;
        this.justificativoForm.patchValue({ imagen: this.imagenEscogida });
      };
      reader.readAsDataURL(file);
    }
  }

  guardarJustificativo() {
    if (this.justificativoForm.valid) {
      const nuevaJustificacion = this.justificativoForm.value;

      this.justificacionService
        .PostJustificacion(nuevaJustificacion)
        .subscribe(() => {
          this.justificativoForm.reset();
          this.imagenEscogida = null;
          this.enviarJustificacion();
          this.router.navigate(["/tabs/landing"]);
        });
    }
  }

  async enviarJustificacion() {
    const alert = await this.alert.create({
      header: "Justificativo enviado",
      message: "Su justificativo se ha enviado correctamente.",
      buttons: ["OK"],
    });
    await alert.present();
  }

  volver() {
    this.router.navigate(["/tabs/landing"]);
  }
}
