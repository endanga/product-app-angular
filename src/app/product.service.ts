import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './interface/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private mainURL = 'http://localhost:9090/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) {}

  getProducts(Limit: string, Offset: string): Observable<Product[]> {
    const params = new HttpParams()
    .set('limit', Limit)
    .set('offset', Offset);
    const url = `${this.mainURL}?${params}`;
    return this.http.get<Product[]>(url);
  }

  getMaxRow(): Observable<Product> {
    const url = `${this.mainURL}/max`;
    return this.http.get<Product>(url);
  }



}
