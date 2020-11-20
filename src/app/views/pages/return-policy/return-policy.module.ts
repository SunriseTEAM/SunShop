import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import {ReturnPolicyComponent} from "./return-policy.component";
import {ReturnPolicyRoutes} from "./return-policy.routing";

@NgModule({
  imports: [CommonModule, SharedModule, ReturnPolicyRoutes],
  declarations: [ReturnPolicyComponent],
})
export class ReturnPolicyModule {}
