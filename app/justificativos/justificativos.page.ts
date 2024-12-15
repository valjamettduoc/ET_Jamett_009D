import { Component, OnInit } from "@angular/core";
import { Justificacion } from "src/interfaces/justificaciones"; // Asegúrate de tener esta interfaz definida
import { Router } from "@angular/router";
import { ApijustificacionesService } from "../services/apijustificaciones.service"; // Servicio para manejar las justificaciones

@Component({
  selector: "app-justificativos",
  templateUrl: "./justificativos.page.html",
  styleUrls: ["./justificativos.page.scss"],
})
export class JustificativosPage implements OnInit {
  asignaturaSeleccionada: string = ""; // Asignatura seleccionada por el docente
  justificaciones: Justificacion[] = [];
  justificacionesFiltradas: Justificacion[] = [];

  constructor(
    private apicrud: ApijustificacionesService,
    private router: Router
  ) {}

  ngOnInit() {
    // Llama al servicio para obtener las justificaciones y las almacena
    this.apicrud.getJustificaciones().subscribe((data) => {
      this.justificaciones = data;
      this.justificacionesFiltradas = this.justificaciones;
    });
  }

  // Filtra las justificaciones por la asignatura seleccionada
  filtrarJustificaciones() {
    if (this.asignaturaSeleccionada) {
      this.justificacionesFiltradas = this.justificaciones.filter(
        (justificacion) =>
          justificacion.asignatura.toLowerCase() ===
          this.asignaturaSeleccionada.toLowerCase()
      );
    } else {
      this.justificacionesFiltradas = this.justificaciones;
    }
  }

  // Navega a la página de detalles, pasando la justificación seleccionada como parámetro
  buscarJustificacion(justificacion: Justificacion) {
    this.router.navigate(["/detalle-justificacion"], {
      queryParams: { justificacion: JSON.stringify(justificacion) },
    });
  }

  // Función para agregar o editar un comentario
  agregarComentario(justificacion: Justificacion) {
    this.router.navigate(["/editar-comentario"], {
      queryParams: { justificacion: JSON.stringify(justificacion) },
    });
  }
}
