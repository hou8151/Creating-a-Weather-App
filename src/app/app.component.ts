import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  cities$: any;


  constructor(private router: Router) {}


  ngOnInit() {
    this.cityControl = new FormControl("");
    this.cityControl.valueChanges.subscribe((value) => {
      this.router.navigate([value]);  
    });

    this.countryControl = new FormControl("");
    this.cities$ = this.countryControl.valueChanges.pipe(
      map((country) => country.cities)
    );
    
  }


  ngOnDestroy() {}
}
