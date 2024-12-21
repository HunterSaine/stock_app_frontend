// stock-list.component.ts
import { Component, OnInit } from '@angular/core';
import { StockServiceService } from '../stock-service.service';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  imports: [
    DatePipe,
    FormsModule,
    NgIf,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  standalone: true
})
export class StockListComponent implements OnInit {
  stockData: any[] = [];
  ticker: string = '';
  stockName: any;
  loading: boolean = false;
  error: string | null = null;
  displayedColumns: string[] = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'Dividends', 'Stock Splits'];

  constructor(private stockService: StockServiceService) { }

  ngOnInit(): void {
  }
  fetchStockData(): void {
    if (this.ticker) {
      this.loading = true;
      this.error = null;
      this.stockData = [];
      this.stockService.getStockData(this.ticker).subscribe(
        (data: any[]) => {
          this.loading = false;
          if (data && data.length > 0) {
            this.stockName = data[data.length-1].stockName;
            this.stockData = data.map((stock: { Open: number; Close: number; High: number; Low: number; }) => ({
              ...stock,
              Open: (Math.round(stock.Open * 100) / 100).toFixed(2),
              Close: (Math.round(stock.Close * 100) / 100).toFixed(2),
              High: (Math.round(stock.High * 100) / 100).toFixed(2),
              Low: (Math.round(stock.Low * 100) / 100).toFixed(2),
            }));
            this.stockData.pop()
            this.stockData = this.stockData.reverse();
          } else {
            this.error = "No data found for this ticker.";
          }
        },
        (error) => {
          this.loading = false;
          this.error = 'Error fetching stock data. Please try again.';
          console.error('Error fetching stock data', error);
        }
      );
    }
  }

}
