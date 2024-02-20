import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Account } from '../../model/model';
import { AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  sum$: Observable<number>

  constructor(private http: HttpClient) {
    this.accounts$ = this.http.get<Account[]>('http://localhost:8080/api/accounts')
    this.sum$ = this.accounts$.pipe(
      map(accounts => this.sumAccounts(accounts))
    )
  }

  private sumAccounts(accounts: Account[]): number {
    return accounts
      .map(account => account.balanceAmount)
      .reduce((a, b) => a + b, 0);
  }
}
