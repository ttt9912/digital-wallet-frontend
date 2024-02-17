import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Account } from '../../model/model';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-accounts-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './accounts-overview.component.html',
  styleUrl: './accounts-overview.component.scss'
})
export class AccountsOverviewComponent {
  accounts$: Observable<Account[]>
  sum$: Observable<number>

  constructor() {
    this.accounts$ = of(
      [
        { accountId: '9348579', bank: 'UBS', accountType: 'Savings', currency: 'CHF', amount: 1231.25 },
        { accountId: '3920432', bank: 'BEKB', accountType: 'Savings', currency: 'CHF', amount: 1231.25 },
        { accountId: '2342343', bank: 'BEKB', accountType: 'Savings', currency: 'CHF', amount: 1231.25 }
      ]
    );
    this.sum$ = this.accounts$.pipe(
      map(accounts => this.sumAccounts(accounts))
    )
  }

  private sumAccounts(accounts: Account[]): number {
    return accounts
      .map(account => account.amount)
      .reduce((a, b) => a + b, 0);
  }
}
