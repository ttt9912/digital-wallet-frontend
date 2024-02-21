import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Account } from '../../model/model';
import { AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-accounts-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    CurrencyPipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './accounts-overview.component.html',
  styleUrl: './accounts-overview.component.scss'
})
export class AccountsOverviewComponent {
  accounts$: Observable<Account[]>

  constructor(private http: HttpClient) {
    this.accounts$ = this.http.get<Account[]>(`${environment.apiUrl}/accounts`);
  }

  sumAccountBalanceAmounts(accounts: Account[]): number {
    return accounts
      .map(account => account.balanceAmount)
      .reduce((amountA, amountB) => this.sum(amountA, amountB), 0);
  }

  private sum(amountA: number, amountB: number) {
    return (amountA * 100 + amountB * 100) / 100;
  }
}
