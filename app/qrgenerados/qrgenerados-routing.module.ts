import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrgeneradosPage } from './qrgenerados.page';

const routes: Routes = [
  {
    path: '',
    component: QrgeneradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrgeneradosPageRoutingModule {}
