import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import {GuaranteeComponent} from "./guarantee.component";
import {GuaranteeRoutes} from "./guarantee.routing";

@NgModule({
  imports: [CommonModule, SharedModule, GuaranteeRoutes],
  declarations: [GuaranteeComponent],
})
export class GuaranteeModule {}
