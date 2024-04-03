import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { MissionListComponent } from './missionlist/missionlist.component';
import { MissionDetailsComponent } from './missiondetails/missiondetails.component';
import { MissionfilterComponent } from './missionfilter/missionfilter.component';
import { SpacexDataService } from './spacex-data.service';

@NgModule({
  declarations: [
    AppComponent,
    MissionListComponent,
    MissionDetailsComponent,
    MissionfilterComponent,
  ],
  imports: [
    BrowserModule,  
    RouterModule.forRoot(routes), 
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    SpacexDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }