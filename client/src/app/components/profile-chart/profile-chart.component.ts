import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { Profile, Step } from '../../models/profile';

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
  @Input()
  step: Step | undefined;

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
    }],
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
    yAxis: {
      title: {
        text: 'Pressure'
      },
      labels: {
        format: '{value} bar'
      },
      accessibility: {
        rangeDescription: 'Range: 0s to 20°C.'
      },
      lineWidth: 2
    },
  }
  ngOnInit() {

    this.updateChart();


  }

  private updateChart() {
    this.chartOptions = { ...this.chartOptions! }!;
    if (this.chartOptions.series && this.profile) {

      this.chartOptions.title!.text = this.profile.title;
      const series = this.chartOptions.series[0] as Highcharts.SeriesLineOptions;
      series.data = [];
      series.name = this.profile.type;
      series.data?.push([0, 0]);
      const bands: Highcharts.XAxisPlotBandsOptions[] = (this.chartOptions.xAxis as Highcharts.XAxisOptions).plotBands = [];
      let t = 0;
      let lastT = 0;
      let i = 0;
      this.profile?.steps.forEach(step => {
        t += step.seconds;
        series.data?.push([t, step.pressure]);

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

      console.log("Series:", this.profile, series.data);
    }
  }
}
