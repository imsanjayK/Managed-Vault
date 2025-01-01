import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/Account';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountComponent } from '../../components/account/account.component';
import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'vault-accounts',
  standalone: true,
  imports: [AccountComponent, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  providers: [HttpClientService]
})


export class AccountsComponent implements OnInit {

  constructor(private router: Router, private accountService: HttpClientService) { }

  accounts: Array<Account> = [];
  errorMessage: string = '';

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe(
      (data: Account[]) => {
        this.accounts = data;
      },
      (error) => {
        this.errorMessage = 'Error loading accounts: ' + error;
        // console.error('Error loading accounts', error);
      });
  }

  navigateToAccountDetail(id?: string) {
    // Navigate to the account detail page with the specific 'id' parameter
    this.router.navigate(['/account/details', id]);
  }
}
