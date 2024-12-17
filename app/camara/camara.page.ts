import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { NewAsistencia } from "src/interfaces/asistencia";
import { ApiasistenciaService } from "../services/apiasistencia.service";
import { AlertController } from "@ionic/angular";

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

  constructor(
    private alertController: AlertController,
    private apiasistenciaService: ApiasistenciaService
  ) {}

  ngOnInit() {}

  async leerQr() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    if (barcodes.length > 0) {
      const qrData = barcodes[0].displayValue;
      try {
        // Divide la cadena del QR en partes
        const dataParts = qrData.split(",");
        if (dataParts.length === 5) {
          this.newAsistencia = {
            rut: dataParts[0],
            email: dataParts[1],
            asignatura: dataParts[2],
            profesor: dataParts[3],
            fecha: dataParts[4],
          };
          this.saveQrData();
        } else {
          console.error(
            "Error parsing QR data: Incorrect number of data parts"
          );
        }
      } catch (error) {
        console.error("Error parsing QR data:", error);
      }
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === "granted" || camera === "limited";
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Permission denied",
      message: "Please grant camera permission to use the barcode scanner.",
      buttons: ["OK"],
    });
    await alert.present();
  }

  saveQrData() {
    this.apiasistenciaService.saveQrData(this.newAsistencia).subscribe({
      next: () => {
        console.log("QR data saved successfully:", this.newAsistencia);
      },
      error: (err) => {
        console.error("Error saving QR data:", err);
      },
    });
  }
}
