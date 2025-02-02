import { Component, Input, OnInit } from '@angular/core';
import { Account, AccountType } from '../../models/Account';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientService } from '../../services/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateService } from '../../services/data-state.service';

@Component({
  selector: 'vault-account-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss'
})
export class AccountEditComponent implements OnInit {
  account: Account | undefined;
  id: string | undefined = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private accountService: HttpClientService, private dataStateService: DataStateService
  ) { }

  ngOnInit() {
    this.loadAccount();
  }

  loadAccount() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')?.toString();
    });

    if (this.id)
      this.accountService.getAccountById(this.id).subscribe(
        (data: Account) => {
          // this.account = data.filter(x => x.id == this.id)[0];
          this.account = data;
        },
        (error) => {
          console.error('Error loading accounts', error);
        }
      );
  }

  // Method that gets called on click
  deleteAccount() {
    if (this.id) {
      this.accountService.deleteAccount(this.id).subscribe(
        (response) => {
          // Checking the status code
          const statusCode = response?.status;

          if (statusCode === 204) {
            // Success: Item deleted successfully
            console.log('Item deleted successfully!');
            this.router.navigate(['']);

          } else if (statusCode === 404) {
            // Not Found: Item was not found
            console.error('Item not found');
          } else if (statusCode === 500) {
            // Internal Server Error: Something went wrong on the server
            console.error('Server error occurred');
          } else {
            // Handle other status codes
            console.log('Response status:', statusCode);
          }
        },
        (error) => {
          // Handle error response
          console.error('Error deleting item:', error);
        }
      );
    }
  }

  copyAccount(account: Account) {
    // return this.http.delete<any>(`${this.apiUrl}/${id}`, { observe: 'response' });
    delete account.id

    this.dataStateService.setFormData(account);
    this.router.navigate(['/account', 'copy', '']);
  }

  editAccount(account: Account) {
    // return this.http.delete<any>(`${this.apiUrl}/${id}`, { observe: 'response' });
    delete account.id

    this.dataStateService.setFormData(account);
    // this.router.navigate(['/account/add']);
    this.router.navigate(['/account', 'edit', this.id]);
  }
  cancel(){
    this.router.navigate(['/account']);
  }
}
