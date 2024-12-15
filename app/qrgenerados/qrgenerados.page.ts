import { Component, OnInit } from "@angular/core";
import { ApiasignaturasService } from "../services/apiasignaturas.service";

@Component({
  selector: "app-qrgenerados",
  templateUrl: "./qrgenerados.page.html",
  styleUrls: ["./qrgenerados.page.scss"],
})
export class QrgeneradosPage implements OnInit {
  qrList: any[] = [];
  filteredQrList: any[] = [];
  rutUsuario: string = "";

  constructor(private apicrudAsignatura: ApiasignaturasService) {}

  ngOnInit() {
    this.rutUsuario = sessionStorage.getItem("rut") || ""; // Obtener el RUT desde sessionStorage
    if (this.rutUsuario) {
      this.cargarQrs();
    } else {
      console.error("No se encontró un RUT en sessionStorage.");
    }
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
