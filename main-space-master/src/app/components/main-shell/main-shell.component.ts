import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addProducts } from 'src/app/ngrx-store/actions';
import { selectAllProducts } from 'src/app/ngrx-store/selector';
import { productDetail } from 'src/app/product-detail';
import DataService from 'src/app/service/data.service';

@Component({
  selector: 'ms-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss']
})
export class MainShellComponent implements OnInit {
  productList: productDetail[] = [];

  productList$ = this.store.select(selectAllProducts);

  constructor(
    private detailService: DataService,
    private http: HttpClient,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.getData(); suspect of 2nd api call
    this.initObservable();
  }

  initObservable() {
    this.productList$.subscribe(prodList => {
      console.log('prodList is: ', prodList);
      if (!!prodList && prodList.length > 0) {
        this.productList = prodList;
      } else {
        this.getData();
      }
    });
  }

  getData(): void {
    this.detailService.getAllProducts().subscribe(apiResponse => {
      this.store.dispatch(addProducts({ data: [...apiResponse.payload] }));
    });
  }
}
