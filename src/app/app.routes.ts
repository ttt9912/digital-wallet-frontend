import { Routes } from '@angular/router';
import { AccountsOverviewComponent } from './accounts-overview/accounts-overview.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

export const routes: Routes = [
  { path: '', component: AccountsOverviewComponent },
  { path: 'account/:accountId', component: AccountDetailComponent },
];
