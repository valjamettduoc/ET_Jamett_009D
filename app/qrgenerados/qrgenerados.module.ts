import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrgeneradosPageRoutingModule } from './qrgenerados-routing.module';

import { QrgeneradosPage } from './qrgenerados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrgeneradosPageRoutingModule
  ],
  declarations: [QrgeneradosPage]
})
export class QrgeneradosPageModule {}
