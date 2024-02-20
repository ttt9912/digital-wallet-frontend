import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountTransaction } from '../../model/model';
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
  bank: string = '';
  currency: string = '';
  balanceAmount: number = 0;
  accountTransactions$: Observable<AccountTransaction[]>

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.bank = params['bank'];
      this.currency = params['currency'];
      this.balanceAmount = params['balanceAmount'];
    });
    const accountId = this.activatedRoute.snapshot.paramMap.get('accountId');
    this.accountTransactions$ = this.http.get<AccountTransaction[]>(`http://localhost:8080/api/accounts/${accountId}/transactions`).pipe(
      map(accountTransactions => this.sortByBookingDateTime(accountTransactions))
    )
  }

  private sortByBookingDateTime(transactions: AccountTransaction[]): AccountTransaction[] {
    return transactions.sort((a, b) => new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime());
  }
}
