import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {SizeComponent} from './size.component';
import {sizeRoutes} from './size.routing';

@NgModule({
  imports: [CommonModule, SharedModule, sizeRoutes],
  declarations: [SizeComponent],
})
export class SizeBoardModule {}
