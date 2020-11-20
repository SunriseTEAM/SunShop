
import { Routes, RouterModule } from "@angular/router";
import {ReturnPolicyComponent} from "./return-policy.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "return-policy",
        component: ReturnPolicyComponent,
      },
    ],
  },
];

export const ReturnPolicyRoutes = RouterModule.forChild(routes);
