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
    path: 'view-user',
    loadChildren: () => import('./view-user/view-user.module').then( m => m.ViewUserPageModule)
  },
  {
    path: 'modify-user',
    loadChildren: () => import('./modify-user/modify-user.module').then( m => m.ModifyUserPageModule)
  },
  {
    path: 'configuracion-perfil',
    loadChildren: () => import('./configuracion-perfil/configuracion-perfil.module').then( m => m.ConfiguracionPerfilPageModule)
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
  },
  {
    path: 'detalle-alumno',
    loadChildren: () => import('./detalle-alumno/detalle-alumno.module').then( m => m.DetalleAlumnoPageModule)
  },
  {
    path: 'justificar-asistencia',
    loadChildren: () => import('./justificar-asistencia/justificar-asistencia.module').then( m => m.JustificarAsistenciaPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
