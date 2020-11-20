import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import {StoreComponent} from "./store.component";
import {StoreRoutes} from "./store.routing";

@NgModule({
  imports: [CommonModule, SharedModule, StoreRoutes],
  declarations: [StoreComponent],
})
export class StoreModule {}
