import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { NoAccessComponent } from "./shared/components/no-access/no-access.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./views/base/index/index.module").then((m) => m.IndexModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./views/pages/product/product.module").then(
            (m) => m.ProductModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./views/pages/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./views/pages/about/about.module").then(
            (m) => m.AboutModule
          )
      },
      {
        path: "contact",
        loadChildren: () =>
          import("./views/pages/contact/contact.module").then(
            (m) => m.ContactModule
          ),
      },
      {
        path: "size",
        loadChildren: () =>
          import('./views/pages/size/size.module').then(
            (m) => m.SizeBoardModule
          ),
      },
      {
        path: "return-policy",
        loadChildren: () =>
          import('./views/pages/return-policy/return-policy.module').then(
            (m) => m.ReturnPolicyModule
          ),
      },
      {
        path: "guarantee",
        loadChildren: () =>
          import('./views/pages/guarantee/guarantee.module').then(
            (m) => m.GuaranteeModule
          ),
      },
      {
        path: "transport",
        loadChildren: () =>
          import('./views/pages/transport/transport.module').then(
            (m) => m.TransportModule
          ),
      },
      {
        path: "store",
        loadChildren: () =>
          import('./views/pages/store/store.module').then(
            (m) => m.StoreModule
          ),
      },
    ],
  },
  { path: "no-access", component: NoAccessComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
