import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificarAsistenciaPage } from './justificar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: JustificarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificarAsistenciaPageRoutingModule {}
