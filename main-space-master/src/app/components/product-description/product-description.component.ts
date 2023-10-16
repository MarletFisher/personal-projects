import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProduct } from 'src/app/ngrx-store/actions';
import { displayProduct } from 'src/app/ngrx-store/selector';
import { productDetail } from 'src/app/product-detail';
import DataService from 'src/app/service/data.service';
import { Product } from 'src/app/types/Product';

@Component({
  selector: 'ms-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  // @Input() details?: productDetail;
  details: productDetail;
  displayItem: Product;
  selectedItem$ = this.store.select(displayProduct);

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location,
    private http: HttpClient,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.initObservable();
  }

  initObservable() {
    this.selectedItem$.subscribe(product => {
      console.log('In initObservable, product :', product);
      if (product) {
        this.displayItem = product;
      } else {
        this.getProduct();
      }
    });
  }

  getProduct() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.dataService.getProductById(id).subscribe((product: productDetail) => {
      console.log('In subscribe, data: ', product);

      this.store.dispatch(selectProduct({ data: { ...product } }));
    });
  }
}
