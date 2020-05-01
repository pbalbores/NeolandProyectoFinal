import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EventosAllComponent } from './eventos-all/eventos-all.component';
import { EventosAllService } from './services/eventos-all.service';
import { HttpClientModule } from '@angular/common/http';
import { EventosNewComponent } from './eventos-new/eventos-new.component';
import { EventosAddService } from './services/eventos-add.service';
import { FormsModule } from '@angular/forms';
import { EventosIndexComponent } from './eventos-index/eventos-index.component';
import { EventosFilterComponent } from './eventos-filter/eventos-filter.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HeaderSub01Component } from './header-sub01/header-sub01.component';
import { EventosTodayComponent } from './eventos-today/eventos-today.component';
import { EventosThisweekComponent } from './eventos-thisweek/eventos-thisweek.component';
import { EventosChildrenComponent } from './eventos-children/eventos-children.component';
import { UsersService } from './services/users.service';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { UserIdComponent } from './user-id/user-id.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventosAllComponent,
    EventosNewComponent,
    EventosIndexComponent,
    EventosFilterComponent,
    UserRegisterComponent,
    UserLoginComponent,
    HeaderSub01Component,
    EventosTodayComponent,
    EventosThisweekComponent,
    EventosChildrenComponent,
    CarrouselComponent,
    UserIdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EventosAllService,
    EventosAddService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
