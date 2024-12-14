import { Component, OnInit } from "@angular/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { NewAsistencia } from "src/interfaces/asistencia";
import { ApiasistenciaService } from "../services/apiasistencia.service";

@Component({
  selector: "app-camara",
  templateUrl: "./camara.page.html",
  styleUrls: ["./camara.page.scss"],
})
export class CamaraPage implements OnInit {
  newAsistencia: NewAsistencia = {
    rut: "",
    email: "",
    asignatura: "",
    profesor: "",
    fecha: "",
  };

  constructor(private asistenciaService: ApiasistenciaService) {}

  ngOnInit() {
    Camera.requestPermissions();
  }

  async leerQr() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // Devuelve la imagen como un DataURL
      source: CameraSource.Camera,
    });
  }

  procesarQr(data: string) {
    // Aquí asumimos que el contenido del QR está en formato JSON.
    try {
      const qrData = JSON.parse(data);

      // Actualiza las propiedades de `newAsistencia` con los datos del QR.
      this.newAsistencia.rut = qrData.rut || "";
      this.newAsistencia.email = qrData.email || "";
      this.newAsistencia.asignatura = qrData.asignatura || "";
      this.newAsistencia.profesor = qrData.profesor || "";
      this.newAsistencia.fecha = qrData.fecha || "";

      this.asistenciaService.PostAsistencia(this.newAsistencia).subscribe();
      console.log("Datos de asistencia actualizados:", this.newAsistencia);
    } catch (error) {
      console.error("Error al procesar el QR:", error);
    }
  }
}
