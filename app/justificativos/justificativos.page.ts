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
  constructor(
    private apicrud: ApijustificacionesService,
    private router: Router
  ) {}

  justificaciones: Justificacion[] = [];

  ngOnInit() {
    // Llama al servicio para obtener las justificaciones y las almacena
    this.apicrud.getJustificaciones().subscribe((data) => {
      this.justificaciones = data;
      console.log(this.justificaciones);
    });
  }

  buscarJustificacion(justificacion: Justificacion) {
    // Navega a la página de detalles, pasando la justificación seleccionada como parámetro
    this.router.navigate(["/detalle-justificacion"], {
      queryParams: { justificacion: JSON.stringify(justificacion) },
    });
  }
}
