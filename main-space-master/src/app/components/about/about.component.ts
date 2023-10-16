import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { map, tap } from 'rxjs';
import { Product } from 'src/app/types/Product';

@Component({
  selector: 'ms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('errorMessage') errMsgDiv: ElementRef;

  constructor(private http: HttpClient) {}

  status = 'blank';

  displayData = (data: any) => {
    console.log('In myResolver, data', data);
    console.log('Status: ', data.status);
    this.status = data.status;
  };

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.errMsgDiv.nativeElement.style.color = 'red';
    this.errMsgDiv.nativeElement.innerHTML = 'some error message';
  }

  getData() {
    // const myPromise = fetch('http://localhost:3000/api/products');

    // const myObservable$ = this.http.get('http://localhost:3000/api/products');

    this.http
      .get('http://localhost:3000/api/products')
      .pipe(
        tap(data => console.log('In tap1, data :', data)),
        map((data: any) => {
          const prodList = data.payload;
          return prodList;
        })
      )
      .subscribe((data: Product[]) => {
        console.log('In subscribe, data: ', data);
        const newList = data.filter(p => p.id === '2' || p.id === '3');
        console.log('In subscribe, newList ', newList);
      });

    // myPromise.then(this.displayData);
  }
}
