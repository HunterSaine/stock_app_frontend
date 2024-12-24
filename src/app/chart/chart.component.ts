import {Component, Input, SimpleChanges} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController
} from 'chart.js';

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
    BaseChartDirective
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @Input() chart_data!: any[];
  lineChartDataSet: any[] = [];
  lineChartClosingPrice: any[] = [];
  lineChartOpeningPrice: any[] = [];
  lineChartHighPrice: any[] = [];
  lineChartLowPrice: any[] = [];
  lineChartLabels: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chart_data'] && this.chart_data) {
      const closingPrices: number[] = [];
      const openingPrices: number[] = [];
      const highPrices: number[] = [];
      const lowPrices: number[] = [];
      const dates: string[] = [];

      for (let element of this.chart_data) {
        dates.push(element.Date.slice(0, 10));
        closingPrices.push(element.Close);
        openingPrices.push(element.Open);
        highPrices.push(element.High);
        lowPrices.push(element.Low);
      }

      this.lineChartLabels = dates;
      this.lineChartDataSet = [
        {
          data: closingPrices,
          label: 'Closing Price',
          borderColor: 'rgb(234, 67, 53)',
          backgroundColor: 'rgba(66, 133, 244)',
        },
        // {
        //   data: openingPrices,
        //   label: 'Opening Price',
        //   borderColor: 'rgb(66, 133, 244)',
        //   backgroundColor: 'rgba(234, 67, 53)',
        // }
        // ,
        // {
        //   data: highPrices,
        //   label: 'High Price',
        //   borderColor: 'rgb(66, 133, 244)',
        //   backgroundColor: 'rgba(234, 67, 53)',
        // }
        // ,
        // {
        //   data: lowPrices,
        //   label: 'Low Price',
        //   borderColor: 'rgb(66, 133, 244)',
        //   backgroundColor: 'rgba(234, 67, 53)',
        // }
        ];

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

}
