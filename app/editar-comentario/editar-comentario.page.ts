import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApijustificacionesService } from "../services/apijustificaciones.service"; // Asegúrate de que el servicio está correctamente importado
import { Justificacion } from "src/interfaces/justificaciones"; // Asegúrate de tener esta interfaz definida

@Component({
  selector: "app-editar-comentario",
  templateUrl: "./editar-comentario.page.html",
  styleUrls: ["./editar-comentario.page.scss"],
})
export class EditarComentarioPage implements OnInit {
  justificacion: Justificacion | null = null; // La justificación a editar
  descripcionEditada: string = ""; // Almacena la nueva descripción

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apicrud: ApijustificacionesService // Servicio para actualizar la justificación
  ) {}

  ngOnInit() {
    // Obtener la justificación pasada como parámetro desde la página anterior
    this.route.queryParams.subscribe((params) => {
      const justificacionParam = params["justificacion"];
      if (justificacionParam) {
        this.justificacion = JSON.parse(justificacionParam);
        if (this.justificacion) {
          this.descripcionEditada = this.justificacion.descripcion || ""; // Pre-cargar la descripción en el campo de edición
        }
      }
    });
  }

  // Función para guardar los cambios en la descripción
  guardarCambios() {
    if (this.justificacion) {
      // Actualizar la descripción
      this.justificacion.descripcion = this.descripcionEditada;

      // Enviar la justificación actualizada al servidor
      this.apicrud.actualizarJustificacion(this.justificacion).subscribe(
        (response) => {
          // Navegar de vuelta a la página de justificaciones después de guardar
          this.router.navigate(["/justificativos"]);
        },
        (error) => {
          console.error("Error al guardar la justificación", error);
        }
      );
    }
  }
}
