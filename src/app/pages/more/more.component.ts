import { Component } from '@angular/core';

@Component({
  selector: 'vault-more',
  standalone: true,
  imports: [],
  templateUrl: './more.component.html',
  styleUrl: './more.component.scss'
})
export class MoreComponent {
  currentYear: number = new Date().getFullYear();
}
