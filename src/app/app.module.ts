import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component'; //para usar el toolbar
import { ListPlatoComponent } from './components/list-plato/list-plato.component';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
//import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav'; //estamso provando
import { MatDividerModule } from '@angular/material/divider';  //estamso provando
import { IndexaComponent } from './components/indexa/indexa.component';
import { IndexMostrarComponent } from './components/indexa/index-mostrar/index-mostrar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListPlatoComponent,
    AddPlatoComponent,
    IndexaComponent,
    IndexMostrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
   // FormsModule,
    MatSidenavModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
