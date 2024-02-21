import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Account, AccountTransaction } from '../../model/model';
import { HttpClient } from '@angular/common/http';

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
export class AccountDetailComponent {
  account$: Observable<Account>
  accountTransactions$: Observable<AccountTransaction[]>

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) {
    const accountId = this.activatedRoute.snapshot.paramMap.get('accountId');
    this.account$ = this.http.get<Account>(`http://localhost:8080/api/accounts/${accountId}`);
    this.accountTransactions$ = this.http.get<AccountTransaction[]>(`http://localhost:8080/api/accounts/${accountId}/transactions`).pipe(
      map(accountTransactions => this.sortByBookingDateTimeDsc(accountTransactions))
    );
  }

  private sortByBookingDateTimeDsc(transactions: AccountTransaction[]): AccountTransaction[] {
    return transactions.sort((a, b) => new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime());
  }
}
