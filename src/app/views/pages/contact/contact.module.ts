import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import {ContactComponent} from "./contact.component";
import {contactRoutes} from "./contact.routing";

@NgModule({
  imports: [CommonModule, SharedModule, contactRoutes],
  declarations: [ContactComponent],
})
export class ContactModule{}
