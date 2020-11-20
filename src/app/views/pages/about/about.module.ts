import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutComponent } from "./about.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AboutRoutes } from "./about.routing";

@NgModule({
  imports: [CommonModule, SharedModule, AboutRoutes],
  declarations: [AboutComponent],
})
export class AboutModule {}
