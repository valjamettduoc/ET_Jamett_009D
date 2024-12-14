import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionPerfilPageRoutingModule } from './configuracion-perfil-routing.module';

import { ConfiguracionPerfilPage } from './configuracion-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPerfilPageRoutingModule
  ],
  declarations: [ConfiguracionPerfilPage]
})
export class ConfiguracionPerfilPageModule {}
