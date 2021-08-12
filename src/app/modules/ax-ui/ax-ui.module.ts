import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AxControlComponent } from './components/ax-control/ax-control.component';
import { ValidationComponent } from './components/validation/validation.component';



@NgModule({
  declarations: [
    AxControlComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AxControlComponent,
    ValidationComponent
  ]
})
export class AxUIModule { }
