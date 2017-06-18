import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatchComponent} from './components/matches/match.component';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, MatchComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
