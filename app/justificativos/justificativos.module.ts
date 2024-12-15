import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificativosPageRoutingModule } from './justificativos-routing.module';

import { JustificativosPage } from './justificativos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustificativosPageRoutingModule
  ],
  declarations: [JustificativosPage]
})
export class JustificativosPageModule {}
