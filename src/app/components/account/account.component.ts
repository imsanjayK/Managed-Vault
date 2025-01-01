import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Account, AccountType } from '../../models/Account';

@Component({
  selector: 'vault-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  @Input() account: Account = {
    id: '',
    accountName: '',
    accountType: AccountType.Other,
    link: '',
    customDatas: [],
    credentials: []
  };
}

