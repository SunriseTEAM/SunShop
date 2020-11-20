
import { Routes, RouterModule } from "@angular/router";
import {GuaranteeComponent} from "./guarantee.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "guarantee",
        component: GuaranteeComponent,
      },
    ],
  },
];

export const GuaranteeRoutes = RouterModule.forChild(routes);
