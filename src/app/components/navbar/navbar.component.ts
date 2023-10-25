import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('titleAnimation', [
      state('inactive', style({ transform: 'scale(1)' })),
      state('active', style({ transform: 'scale(1.2)' })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class NavbarComponent {
  isAnimated = false;

  constructor(private router: Router) {}

  navigateToLanding() {
    this.router.navigate(['/']);
  }

  toggleAnimation() {
    this.isAnimated = !this.isAnimated;
    this.navigateToLanding(); 
  }
}
