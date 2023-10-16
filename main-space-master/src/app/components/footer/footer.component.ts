import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  curUser$ = this.store;
  curUserName = 'blank';
  curUserCity = 'blank';

  constructor(private store: Store<any>) {}
  ngOnInit() {
    this.store.subscribe(value => {
      // console.log('In footer subscribe, appState: ', value.appState);
      // console.log('In footer subscribe, appState.user: ', value.appState.user);
      this.curUserName = value.appState.user;
      this.curUserCity = value.appState.city;
    });
  }
}
