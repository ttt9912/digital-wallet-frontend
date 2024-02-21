import { Component, OnDestroy } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Account, AccountTransaction } from '../../model/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    NgForOf,
    NgIf,
    DatePipe,
    NgClass
  ],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent implements OnDestroy {
  account$: Observable<Account>;
  accountTransactionsSubscription: Subscription;
  accountTransactions: AccountTransaction[] = []
  sortDsc = true;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) {
    const accountId = this.activatedRoute.snapshot.paramMap.get('accountId');
    this.account$ = this.http.get<Account>(`${environment.apiUrl}/accounts/${accountId}`);

    this.accountTransactionsSubscription = this.http.get<AccountTransaction[]>(`${environment.apiUrl}/accounts/${accountId}/transactions`).pipe(
      map(accountTransactions => this.sortByBookingDateTimeDsc(accountTransactions))
    ).subscribe(res => this.accountTransactions = this.sortByBookingDateTimeDsc(res));
  }

  ngOnDestroy(): void {
    this.accountTransactionsSubscription.unsubscribe();
  }

  private sortByBookingDateTimeDsc(transactions: AccountTransaction[]): AccountTransaction[] {
    return transactions.sort((a, b) =>
      new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime());
  }

  onSort() {
    this.sortDsc = !this.sortDsc;
    this.accountTransactions.reverse()
  }
}
