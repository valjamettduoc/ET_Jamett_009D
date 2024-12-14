import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DetalleAlumnoPageRoutingModule } from "./detalle-alumno-routing.module";

import { DetalleAlumnoPage } from "./detalle-alumno.page";
import { QRCodeModule } from "angularx-qrcode";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAlumnoPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [DetalleAlumnoPage],
})
export class DetalleAlumnoPageModule {}
