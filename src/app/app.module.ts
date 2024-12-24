import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { appRoutes } from './app.routes';
import {HttpClientModule} from '@angular/common/http';  // Import routes
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    // Declare StockListComponent here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    StockListComponent,
    HttpClientModule,  // Import HttpClientModule for making HTTP requests
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ChartComponent

    // Use appRoutes for routing
  ],
  providers: [],
})
export class AppModule { }

