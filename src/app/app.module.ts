import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AxUIModule} from './modules/ax-ui/ax-ui.module';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AxUIModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
