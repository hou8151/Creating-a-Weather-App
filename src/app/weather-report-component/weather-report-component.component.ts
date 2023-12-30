import { Component, OnInit } from '@angular/core';
import { YService } from '../y.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, delay, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-weather-report-component',
  templateUrl: './weather-report-component.component.html',
  styleUrls: ['./weather-report-component.component.css']
})
export class WeatherReportComponentComponent implements OnInit {
  data$!: Observable<any>; 
  today!: string | number | Date;
  http: any;
  loading: boolean | undefined ;

  constructor(
    private weatherService: YService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data$ = this.route.params.pipe(
      map((params) => params["locationName"]),
      filter((name) => !!name),
      concatMap((name) => this.weatherService.getWeatherForCity(name))
    );
    this.data$ = this.route.params.pipe(
      map((params) => params["locationName"]),
      filter((name) => !!name),
      tap(() => {
        this.loading = true;
      }),
      concatMap((name) => this.weatherService.getWeatherForCity(name)),
      tap(() => {
        this.loading = false;
      })
    );
  }

  getWeatherForCity(city: string): Observable<any> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=695ed9f29c4599b7544d0db5c211d499`;
    return this.http.get(path).pipe(
      map((data: any) => ({  // Provide a type for the 'data' parameter
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })),
      delay(500)
    );
  }
}
