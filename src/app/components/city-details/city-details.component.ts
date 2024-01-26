import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { City } from '../../interface/city';
import { CitiesServiceService } from '../../services/cities-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { convertCityCodeToName } from '../../utils';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';
import moment, { min, tz } from 'moment-timezone';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DialogData } from '../../interface/common-values';

interface ChartData {
  x: Date;
  y: number;
}

@Component({
  selector: 'app-city-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CanvasJSAngularChartsModule,
  ],
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.css',
})
export class CityDetailsComponent {
  router: Router = new Router();
  route: ActivatedRoute = inject(ActivatedRoute);
  timezoneSelect = 'Europe/London';
  language = 'EN';

  optionsRainingDays: ChartData[] = [];
  optionsNormalDays: ChartData[] = [];

  city: City = {
    cityName: '',
    values: [],
  };
  citiesService: CitiesServiceService = inject(CitiesServiceService);

  constructor(public dialog: MatDialog) {
    const cityId = this.route.snapshot.params['id'];
    if (cityId) {
      this.citiesService
        .getCityDetails(cityId)
        .then((response) => (this.city = response))
        .catch((e) => console.error(e));
      this.renderCharts();
    }
  }

  convertToName = (code: string) => {
    return convertCityCodeToName(code);
  };

  openDialog() {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      restoreFocus: false,
      data: { timezone: this.timezoneSelect, language: this.language },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.timezoneSelect = result.timezone;
      this.language = result.language;
      this.updateChart();
    });
  }

  averageTemp = () => {
    const sum = this.city.values.reduce(
      (accumulator, currentValue) => accumulator + currentValue.temperature,
      0
    );
    const average = sum / this.city.values.length;
    return average.toFixed(2);
  };

  averageNP = () => {
    const sum = this.city.values.reduce(
      (accumulator, currentValue) => accumulator + currentValue.networkPower,
      0
    );
    const average = sum / this.city.values.length;
    return Math.trunc(average);
  };

  checkTheData = () => {
    const lowestNP = this.city.values.reduce((minObject, currentObject) => {
      return currentObject.networkPower < minObject.networkPower
        ? currentObject
        : minObject;
    });
    const timeToConvert = moment(lowestNP.date)
      .tz(this.timezoneSelect)
      .format('HH:mm DD-MMM-YYYY');

    return timeToConvert;
  };

  //chart options

  chart: any;
  chartOptionsRainingDays = {
    title: {
      text: 'Communication Status on Rainy Days',
    },
    data: [
      {
        type: 'line',
        dataPoints: this.optionsRainingDays,
      },
    ],
  };

  chartOptionsDays = {
    title: {
      text: 'Communication Status on normal days',
    },
    data: [
      {
        type: 'line',
        dataPoints: this.optionsNormalDays,
      },
    ],
  };
  renderCharts = () => {
    this.city.values.map((value) => {
      if (value.rainingStatus) {
        this.optionsRainingDays.push({
          x: new Date(
            moment(value.date)
              .tz(this.timezoneSelect)
              .format('HH:mm DD-MMM-YYYY')
          ),
          y: value.networkPower,
        });
      } else {
        this.optionsNormalDays.push({
          x: new Date(
            moment(value.date)
              .tz(this.timezoneSelect)
              .format('HH:mm DD-MMM-YYYY')
          ),
          y: value.networkPower,
        });
      }
    });
  };
  getChartInstance = (chart: object) => {
    this.chart = chart;
    setTimeout(this.updateChart, 1000);
  };

  updateChart = () => {
    const rain: { x: Date; y: number }[] = [];
    const normal: { x: Date; y: number }[] = [];
    this.city.values.map((value) => {
      if (value.rainingStatus) {
        rain.push({
          x: new Date(
            moment(value.date)
              .tz(this.timezoneSelect)
              .format('HH:mm DD-MMM-YYYY')
          ),
          y: value.networkPower,
        });
      } else {
        normal.push({
          x: new Date(
            moment(value.date)
              .tz(this.timezoneSelect)
              .format('HH:mm DD-MMM-YYYY')
          ),
          y: value.networkPower,
        });
        console.log(this.timezoneSelect);
      }
    });
    this.chartOptionsDays = {
      title: {
        text:
          this.language === 'EN'
            ? 'Communication Status on normal days'
            : 'Estado das Comunicações em dias normais',
      },
      data: [
        {
          type: 'line',
          dataPoints: normal,
        },
      ],
    };
    this.chartOptionsRainingDays = {
      title: {
        text:
          this.language === 'EN'
            ? 'Communication Status on Rainy Days'
            : 'Estado das Comunicações em dias de chuva',
      },
      data: [
        {
          type: 'line',
          dataPoints: rain,
        },
      ],
    };
    this.chart.render();
  };
}
