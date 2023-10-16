import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { productDetail } from '../../product-detail';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    console.log('In api service call getAllProducts api');
    const getData$ = this.http.get('http://localhost:3000/api/products');

    return getData$;
    // const details = of(mockProductList);
    // return details;
  }

  getAllProductsPromis(): Promise<any> {
    const data = fetch('http://localhost:3000/api/products');
    return data;
  }

  getProductById(id: string): Observable<productDetail> {
    const url: string = 'http://localhost:3000/api/product/' + id;
    const product$ = this.http.get(url).pipe(
      tap(data => console.log('In tap 1, data :', data)),
      map((data: any) => {
        const product = data;
        return product;
      })
    );
    return product$;
  }
}
