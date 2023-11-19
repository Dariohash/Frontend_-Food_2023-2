import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { JwtRequest } from 'src/app/models/jwt-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginservice: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  usuario: string = "";
  contrasena: string = "";

  login() {
    let request = new JwtRequest();
    request.usuario = this.usuario;
    request.contrasena = this.contrasena;

    this.loginservice.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem("token", data.jwttoken);
        this.router.navigate(['/listCliente']);
        this.snackBar.open("Sesión Iniciada", "Cerrar", { duration: 4000 });
      },
      error => {
        this.snackBar.open("Credenciales Incorrectas", "Cerrar", { duration: 4000 });
      }
    );
  }
}

