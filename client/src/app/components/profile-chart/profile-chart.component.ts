import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { Profile, Step, ProfileType } from '../../models/profile';

import * as Highcharts from 'highcharts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-chart',
  standalone: true,
  imports: [HighchartsChartModule, MatCardModule],
  templateUrl: './profile-chart.component.html',
  styleUrl: './profile-chart.component.css'
})
export class ProfileChartComponent {

  @Input()
  public get profile(): Profile | undefined {
    return this._profile;
  }
  public set profile(value: Profile | undefined) {
    this._profile = value;
    this.updateChart();
  }
  private _profile: Profile | undefined;
  private _step: Step | undefined;
  @Input()
  public set step(value: Step | undefined) {
    this._step = value;
    console.log("Step updated", this.step)
    this.updateChart();
  }

  public get step(): Step | undefined {
    return this._step;
  }

  colors = ["#cae8cc", "#abebaf", "#f7ddba", "#f5cf9d", "#eda8ba", "#eda8ba"];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Atmosphere Temperature by Altitude',
      align: 'center'
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: [{

      data: [],
      type: 'spline'
    },
    {

      data: [],
      type: 'spline'
    },
    {

      data: [],
      type: 'spline',
      yAxis: 1,
    }
    ],
    xAxis: {
      reversed: false,
      title: {

        text: 'Time'
      },
      labels: {
        format: '{value} s'
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
    },
    yAxis: [
      {
        title: {
          text: 'Pressure/Flow'
        },
        labels: {
          format: '{value} bar'
        },
        accessibility: {
          rangeDescription: 'Range: 0s to 20°C.'
        },
        lineWidth: 2
      },
      {
        title: {
          text: 'Temperatur'
        },
        labels: {
          format: '{value} °C'
        },
        min: 50,
        max: 110,
        accessibility: {
          rangeDescription: 'Range: 0s to 20°C.'
        },
        lineWidth: 2,
        opposite: true,
      }

    ],
  }
  ngOnInit() {

    this.updateChart();


  }

  private updateChart() {
    this.chartOptions = { ...this.chartOptions! }!;
    if (this.chartOptions.series && this.profile) {

      this.chartOptions.title!.text = this.profile.title;
      const seriesP = this.chartOptions.series[0] as Highcharts.SeriesLineOptions;
      seriesP.data = [];
      seriesP.name = "Pressure [bar]";
      seriesP.data?.push([0, 0]);
      seriesP.color = 'green';

      const seriesF = this.chartOptions.series[1] as Highcharts.SeriesLineOptions;
      seriesF.data = [];
      seriesF.name = "Flow [ml/s]";
      seriesF.data?.push([0, 0]);
      seriesF.color = 'blue';

      const seriesT = this.chartOptions.series[2] as Highcharts.SeriesLineOptions;
      seriesT.data = [];
      seriesT.name = "Temperature [°C]";
      seriesT.data?.push([0, 0]);
      seriesT.color = 'red';

      const bands: Highcharts.XAxisPlotBandsOptions[] = (this.chartOptions.xAxis as Highcharts.XAxisOptions).plotBands = [];
      let t = 0;
      let lastT = 0;
      let i = 0;
      this.profile?.steps.forEach(step => {
        t += step.seconds;
        seriesP.data?.push([t, step.pressure]);
        seriesF.data?.push([t, step.flow]);
        seriesT.data?.push([t, step.temperature]);

        bands.push({
          from: lastT,
          to: t,
          color: this.colors[i],
          label: {
            text: step.name,
            align: 'left',
            x: 1,
            y: 20 + 40 * (i % 3),
          }
        });

        lastT = t;
        i++;
      });
      if(this.profile.type === ProfileType.pressure) {seriesF.visible = false;}
      if(this.profile.type === ProfileType.flow) {seriesP.visible = false;}
      console.log("Series:", this.profile, seriesP.data);
    }
  }

  updateStep(step: Step) {
    this.updateChart();
  }
}
