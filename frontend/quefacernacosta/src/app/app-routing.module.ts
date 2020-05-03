import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

///PAGINAS 

//Eventos----------------------------------------------------------------------------
import { EventosAllComponent } from './eventos-all/eventos-all.component';
import { EventosNewComponent } from './eventos-new/eventos-new.component';
import { EventosFilterComponent } from './eventos-filter/eventos-filter.component';
import { EventosIndexComponent } from './eventos-index/eventos-index.component';
import { EventosTodayComponent } from './eventos-today/eventos-today.component';
//Users----------------------------------------------------------------------------------
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { UserIdComponent } from './user-id/user-id.component';
import { HeaderSub01Component } from './header-sub01/header-sub01.component';


const routes: Routes = [
  //Página que se muestra por defecto
  { path: '', component: EventosIndexComponent },

  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'datosuser', component: UserIdComponent },
  { path: 'eventos/all', component: EventosAllComponent },
  { path: 'eventos/new', component: EventosNewComponent },
  // { path: 'eventos/filter', component: EventosFilterComponent },
  { path: 'eventos/:id', component: EventosFilterComponent },
  { path: 'eventos/today', component: EventosTodayComponent },
  { path: 'carrousel', component: CarrouselComponent },
  { path: 'sub01', component: HeaderSub01Component },

  //En caso de que alguien meta mal la URL =Que la página que se muestra por defecto
  { path: '**', component: EventosIndexComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
