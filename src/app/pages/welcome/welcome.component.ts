import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerGrowComponent } from '../../components/spinner-grow/spinner-grow.component';

@Component({
  selector: 'vault-welcome',
  standalone: true,
  imports: [CommonModule, SpinnerGrowComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent  implements  OnInit {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/authN']);
    }, 5000); // 5000 milliseconds = 5 seconds

    if (isPlatformBrowser(this.platformId)) {
      // This will only run in the browser
      console.log(window.innerWidth);
    }
  }
  currentYear: number = new Date().getFullYear();
}
