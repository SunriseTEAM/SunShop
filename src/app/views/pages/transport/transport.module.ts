import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import {TransportComponent} from "./transport.component";
import {TransportRoutes} from "./transport.routing";

@NgModule({
  imports: [CommonModule, SharedModule, TransportRoutes],
  declarations: [TransportComponent],
})
export class TransportModule {}
