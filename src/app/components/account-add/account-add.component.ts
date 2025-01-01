import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Account, AccountType } from '../../models/Account';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientService } from '../../services/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateService } from '../../services/data-state.service';

@Component({
  selector: 'vault-account-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-add.component.html',
  styleUrl: './account-add.component.scss'
})
export class AccountAddComponent implements OnInit {
  accountForm!: FormGroup;
  AccountType = AccountType;
  formData: any = {};

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private accountService: HttpClientService, private dataStateService: DataStateService) {
    // Initialize the form
    this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      accountType: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      //credentials: this.fb.array([this.createCredential()]),
      // customDatas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.formData = this.dataStateService.getFormData();
    // Initialize the form
    if (this.formData == null) {
      this.accountForm.setControl("credentials", this.fb.array([this.createCredential()]));
      this.accountForm.setControl("customDatas", this.fb.array([]));
    }
    else {
      let credentialsFormGroup: Array<FormGroup> = [];
      if (this.formData.credentials.length > 0) {
        this.formData.credentials.forEach(() => {
          credentialsFormGroup.push(this.createCredential())
        });
      }

      let customDatasFormGroup: Array<FormGroup> = [];
      if (this.formData.customDatas.length > 0) {
        this.formData.customDatas.forEach(() => {
          customDatasFormGroup.push(this.createCustomData())
        });
      }

      this.accountForm.setControl("credentials", this.fb.array(credentialsFormGroup));
      this.accountForm.setControl("customDatas", this.fb.array(customDatasFormGroup));

      this.accountForm.setValue(this.formData);
      this.dataStateService.setFormData(null);
    }
  }

  // Create form controls for CustomData
  createCustomData(): FormGroup {
    return this.fb.group({
      key: [''],
      value: ['']
    }
    );
  }

  // Create form controls for Credentials
  createCredential(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Get the FormArray for custom data
  get customDatas(): FormArray {
    return this.accountForm.get('customDatas') as FormArray;
  }

  // Get the FormArray for credentials
  get credentials(): FormArray {
    return this.accountForm.get('credentials') as FormArray;
  }

  // Add a new custom data field
  addCustomData() {
    this.customDatas.push(this.createCustomData());
  }

  // Add a new credential
  addCredential() {
    this.credentials.push(this.createCredential());
  }

  error: any
  id: string | undefined;

  // Submit form
  onSubmit() {
    if (this.accountForm.valid) {
      console.log('Form submitted', JSON.stringify(this.accountForm.value));

      const account: Account = {
        accountName: this.accountForm.value["accountName"],
        accountType: this.accountForm.value["accountType"],
        link: this.accountForm.value["link"],
        customDatas: this.accountForm.value["customDatas"],
        credentials: this.accountForm.value["credentials"],
      }
      this.route.paramMap.subscribe(params => {
        params.get('action')?.toString();
      });
      
      this.route.paramMap.subscribe(params => {
         this.id = params.get('id')?.toString();
      });

      const action = this.getAction();
      switch (action) {
        case 'add': this.createAccount(account);
          break;
        case 'copy': this.createAccount(account);
          break;
        case 'edit': this.updateAccount(this.id, account);
        console.log('update');
          break;
        default: console.log("Switch case suprise")
      }
    } else {
      console.log('Form is invalid');
    }
  }

  private getAction(): string | null {
    let action;
    this.route.paramMap.subscribe(params => {
      action = params.get('action')?.toString();
    });
    return action != null ? action : 'add';
  }

  private createAccount(account: Account) {
    this.accountService.createAccount(account).subscribe(
      (data) => {
        console.log('Res' + JSON.stringify(data));
        this.router.navigate(['/account/details', data.id]);
      },
      (error) => {
        console.error('Error loading accounts', error);
      }
    );
  }

  private updateAccount(id: string | undefined, account: Account) {
    if(id)
    this.accountService.updateAccount(id, account).subscribe(
      (response) => {
        // Checking the status code
        const statusCode = response?.status;
        console.log(statusCode);
        if (statusCode === 204) {
          console.log('Item Update successfully!');
        this.router.navigate(['/account/details', id]);
      }},
      (error) => {
        console.error('Error loading accounts', error);
      }
    );
  }
}
