import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DxiSeriesComponent} from 'devextreme-angular/ui/nested';
import {DxChartComponent} from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild(DxChartComponent, {static: false}) chart: DxChartComponent;

  title = 'dx-chart-lines';
  chartData: IChartData[] = [];
  sliderValue = 0;
  sliderMin = 0;
  sliderMax = 0;
  lastSliderValue = 0;

  constructor(protected cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    const pointsPerLine = 2000;
    const cycles = 5;
    const increment = cycles / pointsPerLine;
    for (let i = 0; i < 5; i = i + increment) {
      const point: IChartData = {
        argument: i,
        value0: Math.sin(i * 2 * Math.PI),
        value1: Math.sin((i + 0.1) * 2 * Math.PI) * 0.8,
        value2: Math.sin((i + 0.2) * 2 * Math.PI) * 0.7,
        value3: Math.sin((i + 0.3) * 2 * Math.PI) * 0.6,
        value4: Math.sin((i + 0.4) * 2 * Math.PI) * 0.8,
        value5: Math.sin((i + 0.5) * 2 * Math.PI) * 0.7,
        value6: Math.sin((i + 0.6) * 2 * Math.PI) * 0.6,
        value7: Math.sin((i + 0.7) * 2 * Math.PI) * 0.8,
        value8: Math.sin((i + 0.8) * 2 * Math.PI) * 0.7,
        value9: Math.sin((i + 0.9) * 2 * Math.PI) * 0.6,
      };
      this.chartData.push(point);
    }

    this.sliderValue = 0;
    this.sliderMax = 2500;
    this.sliderMin = -2500;
  }

  onSliderValueChanged($event: any) {
    const delta = this.sliderValue - this.lastSliderValue;
    if (delta !== 0) {
      this.lastSliderValue = this.sliderValue;
      this.moveLine0(delta);
    }
  }

  moveLine0(delta: number): void {
    if (delta < 0) {
      for (let i = 0; i < (this.chartData.length + delta); i++) {
        this.chartData[i].value0 = this.chartData[i - delta].value0;
      }
      for (let i = this.chartData.length + delta; i < this.chartData.length; i++) {
        this.chartData[i].value0 = 0;
      }
    } else {
      for (let i = this.chartData.length - 1; i >= delta; i--) {
        this.chartData[i].value0 = this.chartData[i - delta].value0;
      }
      for (let i = delta - 1; i >= 0; i--) {
        this.chartData[i].value0 = 0;
      }
    }

    // need to update chartData reference to make dx-chart redraw
    this.chartData = [...this.chartData];
    this.cdRef.markForCheck();
  }

  onButtonClick($event: any) {
    console.log('onButtonClick');

    if (!this.chart) {
      console.log('no chart');
      return;
    }
    console.log(this.chart);

    const chartSeries = this.chart.instance.getAllSeries();

    if (chartSeries.length === 0) {
      console.log('no first series');
      return;
    }

    const moveSeries = chartSeries[0];

    console.log(moveSeries);
    const pointsCollection: any[] = moveSeries.getAllPoints();
    console.log('pointsCollection ', pointsCollection);

    pointsCollection.forEach(point => {
      point.x = point.x - 100;
    });
  }
}

export interface IChartData {
  argument: number;
  value0: number;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  value7: number;
  value8: number;
  value9: number;
}
