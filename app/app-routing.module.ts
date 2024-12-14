import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "inicio",
    pathMatch: "full",
  },

  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "inicio",
    loadChildren: () =>
      import("./inicio/inicio.module").then((m) => m.InicioPageModule),
  },
  {
    path: "registro",
    loadChildren: () =>
      import("./registro/registro.module").then((m) => m.RegistroPageModule),
  },
  {
    path: "view-user",
    loadChildren: () =>
      import("./view-user/view-user.module").then((m) => m.ViewUserPageModule),
  },
  {
    path: "configuracion-perfil",
    loadChildren: () =>
      import("./configuracion-perfil/configuracion-perfil.module").then(
        (m) => m.ConfiguracionPerfilPageModule
      ),
  },
  {
    path: "asignaturas",
    loadChildren: () =>
      import("./asignaturas/asignaturas.module").then(
        (m) => m.AsignaturasPageModule
      ),
  },
  {
    path: "camara",
    loadChildren: () =>
      import("./camara/camara.module").then((m) => m.CamaraPageModule),
  },
  {
    path: 'detalle-asignatura',
    loadChildren: () => import('./detalle-asignatura/detalle-asignatura.module').then( m => m.DetalleAsignaturaPageModule)
  },
  {
    path: 'olvidar-contra',
    loadChildren: () => import('./olvidar-contra/olvidar-contra.module').then( m => m.OlvidarContraPageModule)
  },
  {
    path: 'nueva-contra',
    loadChildren: () => import('./nueva-contra/nueva-contra.module').then( m => m.NuevaContraPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
