import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlatoComponent } from './components/list-plato/list-plato.component';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { ListClienteComponent } from './components/list-cliente/list-cliente.component';
import { ListRestauranteComponent } from './components/list-restaurante/list-restaurante.component';
import { AddRestauranteComponent } from './components/add-restaurante/add-restaurante.component';
import { AddOrdenComponent } from './components/add-orden/add-orden.component';
import { ListOrdenComponent } from './components/list-orden/list-orden.component';
import { NavbarIndexComponent } from './components/navbar/navbar-index/navbar-index.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/indexa/index/index.component';



const routes: Routes = [
  {path: 'listPlato',component: ListPlatoComponent},
  {path: 'addPlato', component: AddPlatoComponent},
  {path: 'editPlato/:id', component: AddPlatoComponent},
  {path: 'listCliente', component: ListClienteComponent},
  {path: 'addCliente', component: AddClienteComponent},
  {path: 'editCliente/:id', component: AddClienteComponent},
  {path: 'listRestaurante',component: ListRestauranteComponent},
  {path: 'addRestaurante',component: AddRestauranteComponent},
  {path: 'editRestaurante/:id', component: AddRestauranteComponent},
  {path: 'listOrden',component: ListOrdenComponent},
  {path: 'addOrden',component: AddOrdenComponent},
  {path: 'editOrden/:id', component: AddOrdenComponent},

 
  {
    path: 'index', component: IndexComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'navbar', component: NavbarIndexComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
