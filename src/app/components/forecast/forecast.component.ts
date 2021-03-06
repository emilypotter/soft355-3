import { Component, OnInit } from '@angular/core';
import { Forecast } from '../../model/forecastModel';
import { WeatherService } from '../../services/weather.service';
import { SpotService } from '../../services/spot.service';
import { WeatherForecast, List } from '../../model/weatherForecastModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  public surfForecast: Forecast;
  public weatherForecast: List[];

  constructor(
    private weatherService: WeatherService,
    private spotService: SpotService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.spotService.getSpotByIdLambda(params.id).subscribe((spot: any) => {
        this.weatherService.selectedSpot = spot[0];
        this.spotService.selectedSpot = spot[0];
        this.getWeatherForecast();
        this.weatherForecast = [];
        this.getSurfForecast();
      });
    });
  }

  private getWeatherForecast(): void {
    this.weatherService.getWeatherForecast().subscribe((data: WeatherForecast) => {
      this.weatherForecast.push(data.list[8]);
      this.weatherForecast.push(data.list[16]);
      this.weatherForecast.push(data.list[24]);
      this.weatherForecast.push(data.list[32]);
    });
  }

  private getSurfForecast(): void {
    this.spotService.getForecastFromSurfline().subscribe((data: Forecast) => {
      this.surfForecast = data;
    });
  }
}
