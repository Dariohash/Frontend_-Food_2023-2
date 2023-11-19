import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component'; //para usar el toolbar
import { ListPlatoComponent } from './components/list-plato/list-plato.component';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { ListRestauranteComponent } from './components/list-restaurante/list-restaurante.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AddRestauranteComponent } from './components/add-restaurante/add-restaurante.component';
import { ListOrdenComponent } from './components/list-orden/list-orden.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';
import { NavbarIndexComponent } from './components/navbar/navbar-index/navbar-index.component';
import { LoginComponent } from './components/login/login.component';
import { IndexaComponent } from './components/indexa/indexa.component';
import { IndexComponent } from './components/indexa/index/index.component';
import { DialogComponent } from './components/dialog/dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarIndexComponent,
    ListPlatoComponent,
    ListClienteComponent,
    AddPlatoComponent,
    AddClienteComponent,
    ListRestauranteComponent,
    AddRestauranteComponent,
    ListOrdenComponent,
    AddOrdenComponent,
    IndexaComponent,
    LoginComponent,
    IndexComponent,
    DialogComponent

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
