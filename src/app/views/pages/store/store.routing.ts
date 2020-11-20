
import { Routes, RouterModule } from "@angular/router";
import {StoreComponent} from "./store.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "store",
        component: StoreComponent,
      },
    ],
  },
];

export const StoreRoutes = RouterModule.forChild(routes);
