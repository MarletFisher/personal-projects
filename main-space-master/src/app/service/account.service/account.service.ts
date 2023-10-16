import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../types/Account';
import { RegistrationResponse } from '../../types/RegistrationResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {}

  accountPOST(account: Account) {
    const url: string = 'http://localhost:3000/api/register';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    });
  }

  getAccount(account: Account): Observable<Account | RegistrationResponse> {
    const url: string = 'http://localhost:3000/api/register';
    const account$ = this.http.post<Account>(url, account);
    return account$;
  }
}
