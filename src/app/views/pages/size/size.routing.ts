
import { Routes, RouterModule } from '@angular/router';
import {SizeComponent} from './size.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'size',
        component: SizeComponent,
      },
    ],
  },
];


export const sizeRoutes = RouterModule.forChild(routes);
