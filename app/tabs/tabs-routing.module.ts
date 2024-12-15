import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "landing",
        loadChildren: () =>
          import("../landing/landing.module").then((m) => m.LandingPageModule),
      },
      {
        path: "view-user",
        loadChildren: () =>
          import("../view-user/view-user.module").then(
            (m) => m.ViewUserPageModule
          ),
      },
      {
        path: "asignaturas",
        loadChildren: () =>
          import("../asignaturas/asignaturas.module").then(
            (m) => m.AsignaturasPageModule
          ),
      },
      {
        path: "camara",
        loadChildren: () =>
          import("../camara/camara.module").then((m) => m.CamaraPageModule),
      },
      {
        path: "justificativos",
        loadChildren: () =>
          import("../justificativos/justificativos.module").then(
            (m) => m.JustificativosPageModule
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/landing",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/landing",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
