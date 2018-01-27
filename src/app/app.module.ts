import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';

/*Routers*/
import {APP_ROUTING} from "./app.routers";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

/*Services*/
import {HeroService} from "./services/hero.service";
import { CasaheroPipe } from './pipes/casahero.pipe';
import { ArrayjsonPipe } from './pipes/arrayjson.pipe';

/*PIPES*/


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeComponent,
    CasaheroPipe,
    ArrayjsonPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    APP_ROUTING
  ],
  providers: [
    HeroService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
