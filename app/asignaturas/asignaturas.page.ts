import { Component, OnInit } from "@angular/core";
import { Asistencias } from "src/interfaces/asistencia";
import { Router } from "@angular/router";
import { ApiasistenciaService } from "../services/apiasistencia.service";

@Component({
  selector: "app-asignaturas",
  templateUrl: "./asignaturas.page.html",
  styleUrls: ["./asignaturas.page.scss"],
})
export class AsignaturasPage implements OnInit {
  asistencia: Asistencias[] = [];
  asistenciaFiltrada: Asistencias[] = [];
  asignaturaSeleccionada: string = "";

  constructor(private apicrud: ApiasistenciaService, private router: Router) {}

  ngOnInit() {
    this.apicrud.getAsistencias().subscribe((data) => {
      this.asistencia = data;
      this.asistenciaFiltrada = this.asistencia;
    });
  }

  filtrarAsistencias() {
    if (this.asignaturaSeleccionada) {
      this.asistenciaFiltrada = this.asistencia.filter(
        (asistencia) =>
          asistencia.asignatura.toLowerCase() ===
          this.asignaturaSeleccionada.toLowerCase()
      );
    } else {
      this.asistenciaFiltrada = this.asistencia;
    }
  }
}
