import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherReportComponentComponent } from './weather-report-component/weather-report-component.component';
import { AppComponent } from './app.component';


const routes: Routes = [ {
  path: "",
  
  component: WeatherReportComponentComponent,
},
{
  path: ":locationName",
  component: WeatherReportComponentComponent,
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
