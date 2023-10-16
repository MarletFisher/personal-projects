import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { setCity } from 'src/app/ngrx-store/actions';
import { selectUser } from 'src/app/ngrx-store/selector';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count = 0;

  user$ = this.store.select(selectUser);

  selectedCity: string;

  constructor(private store: Store<any>, private translate: TranslateService) {}

  ngOnInit() {
    this.store.subscribe(value => {
      this.count = value.appState.count;
    });
    this.selectedCity = 'toronto';
    console.log('Upon init, the default city is', this.selectedCity);
    this.setCity();
  }

  changeLanguageEN(): void {
    console.log('changeLanguageEN pressed');
    this.translate.use('en');
  }

  changeLanguageFR(): void {
    console.log('changeLanguageFR pressed');
    this.translate.use('fr');
  }

  onCityChange(city: string): void {
    this.selectedCity = city;
    console.log('The selected city is: ', this.selectedCity);
    this.setCity();
  }

  setCity(): void {
    if (this.selectedCity) {
      this.store.dispatch(setCity({ data: this.selectedCity }));
    }
  }
}
