import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './interface/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private mainURL = 'http://localhost:8080/api/v1/employees';
  private mainURL = 'http://localhost:9090/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) {}

  getEmployees(Limit: string, Offset: string): Observable<Product[]> {
    const params = new HttpParams()
    .set('limit', Limit)
    .set('offset', Offset);
    const url = `${this.mainURL}?${params}`;
    // this.http.get(url).pipe(map(result => {
    //   const items = <any[]>result.json();
    // }))
    return this.http.get<Product[]>(url);
  }

  getMaxRow(): Observable<Product> {
    const url = `${this.mainURL}/max`;
    return this.http.get<Product>(url);
  }

  getEmployee(id: number): Observable<Product> {
    const url = `${this.mainURL}/${id}`;
    return this.http.get<Product>(url);
  }

  addEmployee(employee: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.mainURL, employee, this.httpOptions);
  }

  updateEmployee(employee: Partial<Product>): Observable<any> {
    const url = `${this.mainURL}/${employee.id}`;
    return this.http.put(url, employee, this.httpOptions);
  }

  deleteEmployee(id: number): Observable<Product> {
    const url = `${this.mainURL}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions);
  }


}
