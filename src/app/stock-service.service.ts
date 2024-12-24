import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {
  // apiUrl = "https://stock-application-445417.uc.r.appspot.com/stock";
  apiUrl = "http://127.0.0.1:8000/stock";
  constructor(private http: HttpClient) {
  }

  getStockData(ticker: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${ticker}`);
  }

}
