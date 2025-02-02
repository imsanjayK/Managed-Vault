import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientService } from '../../services/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateService } from '../../services/data-state.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { SpinnerGrowComponent } from '../spinner-grow/spinner-grow.component';

@Component({
  selector: 'vault-passcode',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerGrowComponent],
  templateUrl: './passcode.component.html',
  styleUrl: './passcode.component.scss'
})
export class PasscodeComponent {
  // otp: string[] = [];
  passcodeForm!: FormGroup;
  unauthUser: boolean = false;
  error= {  message:"", title:"" } 
  verifyProgress = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private accountService: HttpClientService, private dataStateService: DataStateService) {
    // Initialize the form
    this.passcodeForm = this.fb.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required]
    });
  }

  shiftToNextInput(event: Event, index: number): void {
    const currentInput: HTMLInputElement | null = event.target as HTMLInputElement;
    console.log(event)
    if (currentInput && currentInput.value.length === 1) {
      // Move focus to the next input if the current input is filled
      if (index <= 6) {
        const nextInput = document.getElementById(`otp${index + 1}`) as HTMLInputElement;
        // Only allow numeric input, prevent others
        if (/^\d$/.test(currentInput.value)) {
          // this.otp.push(currentInput.value);
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    } else if (currentInput && currentInput.value === "") {
      // Move focus to the previous input if the current input is empty
      if (index > 1) {
        const prevInput = document.getElementById(`otp${index - 1}`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  }

  verifyPasscode() {
    this.verifyProgress = true;
    this.error.title = "";
    this.error.message = "";
    if (this.passcodeForm.valid) {
      // console.log('Form submitted', JSON.stringify(this.passcodeForm.value));
      const passcode = `${this.passcodeForm.value["otp1"]}${this.passcodeForm.value["otp2"]}${this.passcodeForm.value["otp3"]}${this.passcodeForm.value["otp4"]}${this.passcodeForm.value["otp5"]}${this.passcodeForm.value["otp6"]}`;
      const credential = {
        "username": "",
        "password": passcode
      }

      this.accountService.passcodeVerification(credential).subscribe(
        (response) => {
          // Checking the status code
          const statusCode = response?.status;
          // console.log("SC"+statusCode);
          if (statusCode === 200) {
            // console.log('Item Update successfully!');
            this.router.navigate(['/account']);
          }

        },
        (error) => {
          // console.error('Error loading accounts', JSON.stringify(error));
          // console.log('Unauthorized !!!' + error.message);
          this.unauthUser = true;
          if (error.status === 401) {
          this.error.message = "Passcode mismatched";
          }
          else{
            this.error.message = "Something wrong happened,\n please try later";
          }

          this.error.title = error.error.title;
          // this.error.message = error.error.message;
          this.passcodeForm.reset();
          this.verifyProgress = false;
        }
      );
    }
  }
}

