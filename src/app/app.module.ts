import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TambolaTicketsComponent } from './tambola-tickets/tambola-tickets.component';
import { TambolaLogicComponent } from './tambola-logic/tambola-logic.component';

@NgModule({
  declarations: [
    AppComponent,
    TambolaTicketsComponent,
    TambolaLogicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
