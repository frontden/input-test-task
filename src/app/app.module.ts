import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AxUIModule} from './modules/ax-ui/ax-ui.module';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {DateValidator} from "./validators/date.validator";

@NgModule({
  declarations: [
    AppComponent,
    DateValidator
  ],
  imports: [
    BrowserModule,
    AxUIModule,
    FormsModule
  ],
  providers: [DateValidator],
  bootstrap: [AppComponent]
})
export class AppModule { }
