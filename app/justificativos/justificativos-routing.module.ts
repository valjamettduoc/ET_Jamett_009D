import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificativosPage } from './justificativos.page';

const routes: Routes = [
  {
    path: '',
    component: JustificativosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificativosPageRoutingModule {}
