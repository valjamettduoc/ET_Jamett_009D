import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OlvidarContraPageRoutingModule } from "./olvidar-contra-routing.module";

import { OlvidarContraPage } from "./olvidar-contra.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OlvidarContraPageRoutingModule,
  ],
  declarations: [OlvidarContraPage],
})
export class OlvidarContraPageModule {}
