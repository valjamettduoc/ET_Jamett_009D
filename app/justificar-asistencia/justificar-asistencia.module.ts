import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { JustificarAsistenciaPageRoutingModule } from "./justificar-asistencia-routing.module";

import { JustificarAsistenciaPage } from "./justificar-asistencia.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JustificarAsistenciaPageRoutingModule,
  ],
  declarations: [JustificarAsistenciaPage],
})
export class JustificarAsistenciaPageModule {}