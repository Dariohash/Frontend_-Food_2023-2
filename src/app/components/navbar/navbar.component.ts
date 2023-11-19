import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoginPage: boolean = false;
  isIndexPage: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    // Suscribirse a los cambios de ruta para determinar si estás en la página de inicio de sesión
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login'; // Ajusta esto según la ruta de tu página de inicio de sesión
        this.isIndexPage = event.url === '/index';

      }
    });
  }
}
