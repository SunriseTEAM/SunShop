import { AboutComponent } from "./about.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "about",
        component: AboutComponent,
      },
    ],
  },
];

export const AboutRoutes = RouterModule.forChild(routes);
