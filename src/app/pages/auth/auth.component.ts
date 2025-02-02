import { Component } from '@angular/core';
import { PasscodeComponent } from '../../components/passcode/passcode.component';

@Component({
  selector: 'vault-auth',
  standalone: true,
  imports: [PasscodeComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
