
import { Routes, RouterModule } from "@angular/router";
import {TransportComponent} from "./transport.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "transport",
        component: TransportComponent,
      },
    ],
  },
];

export const TransportRoutes = RouterModule.forChild(routes);
