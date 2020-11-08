import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { TableComponent } from './table/table.component';
import { DiceComponent } from './dice/dice.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { DieComponent } from './die/die.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    TableComponent,
    DiceComponent,
    ScoreboardComponent,
    DieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
