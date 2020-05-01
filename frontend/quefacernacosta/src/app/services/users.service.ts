import { Injectable } from '@angular/core';
//Importamos HttpCLient y HttpHeaders
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  //Creamos una variable para marcar si el usuario está o no logueado. Por defecto es FALSE. Cuando se logueé cambiará a TRUE
  isLoggedInn = false;
  //Creamos una variable para marcar la ID del usuario. Por defecto es 0. Cuando se logueé esta variable recogerá la ID del usuario
  userID = 0;

  //1. PERMITE A UN USUARIO LOGEARSE----------------------------------------------------------------------
  //UNA VEZ LOGUEADO SERÁ REDIRIGIDO A DONDE QUERAMOS

  login(nombreUsuario: string, password: string) {
    //Llamada POST A API
    this.http.post('http://localhost:3000/users/login', {
      "nombreUsuario": nombreUsuario,
      "password": password

    })
      .subscribe((responseAPI) => {
        if (environment.production === false) {
          document["cookies"] = `stamp=${responseAPI["token"]}`
        }
        //Si API OK. isLoggedIn será true

        this.isLoggedInn = true;
        this.userID = responseAPI["id"];

        console.log(responseAPI)
        console.log(this.userID)
        //Una vez logueado redirijo al usuario a la página que yo quiera
        this.router.navigateByUrl('eventos/all')


      })

    //Si API OK. isLoggedIn será true
  }

  //2. PERMITE A UN USUARIO REGISTRARSE. UNA VEZ REGISTRADO SE LOGUEARÁ AUTOMATICAMENTE------------------

  register(nombreUsuario: string, email: string, password: string) {
    console.log(nombreUsuario, password, email)

    this.http.post('http://localhost:3000/users/new', {
      "nombreUsuario": nombreUsuario,
      "password": password,
      "email": email
    })
      .subscribe((responseAPI) => {
        console.log(responseAPI)
        this.login(nombreUsuario, password);
      })

  }

  //3. PERMITE A UN USUARIO DESLOGUEARSE------------------------------------------------------------------

  delete_cookie(name) {
    document["cookie"] = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00'
  }

  logout() {
    this.isLoggedInn = false;
    this.delete_cookie("token");
    this.router.navigateByUrl("");
    //FALTA IMPLEMENTAR EN HTML
  }

  //4. PERMITE A UN USUARIO ACCEDER A UNA PÁGINA PERSONALIZADA MEDIANTE SU ID


  /*  redirigirMedianteId(this.userID) {
      this.router.navigateByUrl("/user/:id");
  
  }*/


}
