import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountsOverviewComponent } from './accounts-overview/accounts-overview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccountsOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digital-wallet-frontend';

}
