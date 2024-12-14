import { Component, OnInit } from "@angular/core";
import { Asignaturas } from "src/interfaces/asignaturas";
import { Router } from "@angular/router";
import { ApiasistenciaService } from "../services/apiasistencia.service";
import { Asistencias } from "src/interfaces/asistencia";

@Component({
  selector: "app-asignaturas",
  templateUrl: "./asignaturas.page.html",
  styleUrls: ["./asignaturas.page.scss"],
})
export class AsignaturasPage implements OnInit {
  constructor(private apicrud: ApiasistenciaService, private router: Router) {}

  asistencia: Asistencias[] = [];

  ngOnInit() {
    this.apicrud.getAsistencias().subscribe((data) => {
      this.asistencia = data;
      console.log(this.asistencia);
    });
  }
  buscarAsistencia(Observable: Asistencias) {
    this.router.navigate(["/detalle-asignatura"], {
      queryParams: { asignatura: JSON.stringify(Observable) },
    });
  }
}
