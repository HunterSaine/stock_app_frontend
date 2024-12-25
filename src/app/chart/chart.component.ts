import {Component, Input, SimpleChanges} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import {FormsModule} from '@angular/forms';

// Register the required components
ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-chart',
  imports: [
    BaseChartDirective,
    FormsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @Input() chart_data!: any[];
  showClose: boolean = true;
  showOpen: boolean = false;
  showHigh: boolean = false;
  showLow: boolean = false;

  lineChartDataSet: any[] = [];
  lineChartLabels: any[] = [];



  ngOnChanges(changes: SimpleChanges) {
    if (changes['chart_data'] && this.chart_data) {
      this.chart_data = [...this.chart_data].reverse();
      this.updateChart();
    }
  }


  lineChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          // Callback to format the tick labels
          callback: function (value: number) {
            return '$' + value.toFixed(2);
          },
        },
      },
    }
  };

  lineChartLegend = false;
  lineChartType: any = 'line';
  lineChartPlugins = [];

  updateChart() {
    const closingPrices: number[] = [];
    const openingPrices: number[] = [];
    const highPrices: number[] = [];
    const lowPrices: number[] = [];
    const dates: string[] = [];

    // Extract data from chart_data
    for (let element of this.chart_data) {
      dates.push(element.Date.slice(0, 10));
      closingPrices.push(element.Close);
      openingPrices.push(element.Open);
      highPrices.push(element.High);
      lowPrices.push(element.Low);
    }
    this.lineChartLabels = dates.reverse();
    closingPrices.reverse();
    openingPrices.reverse();
    highPrices.reverse();
    lowPrices.reverse();

    // Regenerate the dataset based on the checkbox states
    this.lineChartDataSet = [];
    if (this.showClose) {
      this.lineChartDataSet.push({
        data: closingPrices,
        label: 'Closing Price',
        borderColor: 'rgb(234, 67, 53)',
        backgroundColor: 'rgba(66, 133, 244)',
      });
    }
    if (this.showOpen) {
      this.lineChartDataSet.push({
        data: openingPrices,
        label: 'Opening Price',
        borderColor: 'rgb(52, 168, 83)',
        backgroundColor: 'rgba(66, 133, 244)',
      });
    }
    if (this.showHigh) {
      this.lineChartDataSet.push({
        data: highPrices,
        label: 'High Price',
        borderColor: 'rgb(251, 188, 5)',
        backgroundColor: 'rgba(66, 133, 244)',
      });
    }
    if (this.showLow) {
      this.lineChartDataSet.push({
        data: lowPrices,
        label: 'Low Price',
        borderColor: 'rgb(66, 133, 244)',
        backgroundColor: 'rgba(66, 133, 244)',
      });
    }
  }
}
