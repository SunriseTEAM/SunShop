
import { Routes, RouterModule } from "@angular/router";
import {ContactComponent} from "./contact.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "contact",
        component: ContactComponent,
      },
    ],
  },
];

export const contactRoutes = RouterModule.forChild(routes);
