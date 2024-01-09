import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, concatMap, delay, filter, map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { YService } from './y.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'weather-app';
  cities = ["London", "Paris", "Moscow", "New York", "Karachi", "Sydney"];

  countries = [
    {
      name: "United Kingdom",
      cities: ["London", "Warwick", "Birmingham"],
    },
    {
      name: "United States",
      cities: ["New York", "Chicago", "Washington"],
    },
    {
      name: "Australia",
      cities: ["Sydney", "Adelaide", "Melbourne"],
    },
    {
      name: "Pakistan",
      cities: ["Lahore", "Karachi", "Islamabad"],
    },
  ];
  countryControl!: FormControl;
  cityControl!: FormControl;
  today!: string | number | Date;
  http: any;
  loading!: boolean;
  currentCity: string = '';
  data: any;
  allCities:any;
  citiesforSelectedCountry:any[]= [];
  constructor(
    private weatherService: YService,
   
  ) {}
  ngOnInit() {
   
    this.countryControl = new FormControl("");
    this.countryControl.valueChanges.subscribe((value) => {
      this.citiesforSelectedCountry = value;
      console.log('value', value)
    });
  
   
    this.cityControl = new FormControl("");
    this.cityControl.valueChanges.pipe(
      tap(data=> console.log('data', data)),
      tap((currentCity) => this.currentCity = currentCity),
      tap(()=> {
        this.weatherService.getWeatherForCity(this.currentCity).pipe(
          tap(data => { 
            console.log('data', data)
            this.data = data ;
           })
        ).subscribe()
      })
    ).subscribe();
  }

  ngOnDestroy() {}
  
 
  // arcjhitecture : 
  // model MVC  model / vue / controller 
  //  lasy loading  -- base 
  //  rxjs pipe rxjs  and subscribe 
  // filter / reduce / map / find / slice / split / shift / pop  on array 
  // directive /  ngIf / (ngFor with first and last element ) / ngswitch / ng-template
  // pipe html {{date : | date : 'yyyy-mm-dd'}}
  // module / componenent 

  
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

