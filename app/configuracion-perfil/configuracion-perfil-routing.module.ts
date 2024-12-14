import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionPerfilPage } from './configuracion-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionPerfilPageRoutingModule {}
