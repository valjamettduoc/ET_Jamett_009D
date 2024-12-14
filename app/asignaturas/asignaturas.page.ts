import { Component, OnInit } from "@angular/core";
import { Asignaturas } from "src/interfaces/asignaturas";
import { Router } from "@angular/router";
import { ApiasignaturasService } from "../services/apiasignaturas.service";

@Component({
  selector: "app-asignaturas",
  templateUrl: "./asignaturas.page.html",
  styleUrls: ["./asignaturas.page.scss"],
})
export class AsignaturasPage implements OnInit {
  constructor(private apicrud: ApiasignaturasService, private router: Router) {}

  asignatura: Asignaturas[] = [];

  ngOnInit() {
    this.apicrud.getAsignatura().subscribe((data) => {
      this.asignatura = data;
      console.log(this.asignatura);
    });
  }
  buscarAsignatura(Observable: Asignaturas) {
    this.router.navigate(["/detalle-alumno"], {
      queryParams: { asignatura: JSON.stringify(Observable) },
    });
  }

  crearAsignatura() {
    this.router.navigate(["/registro"]);
  }
}
