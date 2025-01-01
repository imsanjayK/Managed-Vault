import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vault-footer-bar',
  standalone: true,
  imports: [],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss'
})
export class FooterBarComponent {

  constructor(private router: Router) { }

  navigation(route: string) {
    switch (route) {
      case 'home': this.router.navigate(['']);
        break;
      case 'add': this.router.navigate(['/account', 'add', '']);
        break;
      case 'filter': this.router.navigate(['filter']);
        break;
      case 'more': this.router.navigate(['/more']);
        break;
      default: this.router.navigate(['']);
    }
  }
}
