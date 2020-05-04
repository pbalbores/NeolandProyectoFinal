import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

  constructor(private http: HttpClient, private rutaActiva: ActivatedRoute, private router: Router) { }
  //Esta ID la recuperamos de la url
  id = 0;

  //Esta variable almacena los datos recurados de la base de datos
  usuarios: any;

  //Este es el mensaje que devuelve cuando el usuario ha sido eliminado
  mensDelete: any;

  //Estas son las headers que enviamos al hacer la petición para que funcione
  createHttpOptions() {
    return {
      headers: new HttpHeaders({
        "user-token": localStorage.getItem("lToken"),
      }),
    };
  }

  //Utilizando la ID llamamos a la base de datos para obtener datos del usuario

  obtenerDatosUserById() {
    console.log(`"id pasada para pintar evento. UIC": ${this.id}`);
    return this.http.get(`http://localhost:3000/users/${this.id}`, this.createHttpOptions())

      .subscribe(
        (data) => { // Success

          this.usuarios = data;
          console.log(`Esto es lo que devuelve el servidor: ${data}`)
        },
        (error) => {
          console.error(error);
          //hai que redirixir á páxina 404
        }
      )
  }


  ngOnInit(): void {

    /*this.http.get('http://localhost:3000/users/admin', { withCredentials: true })
      .subscribe((data) => { this.datosUsuario = data })
  */

    //OBTENENMSO ID DE LA URL

    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params.id
      console.log(`EFC-Datos recuperados de params ${params}`)
      console.log(`EFC-Pasamos datos de params a variable ${this.id}`)
    })

    this.obtenerDatosUserById();


  }

  userDelete() {
    console.log(`"id pasada para borrar evento. UIC": ${this.id}`);
    return this.http.delete(`http://localhost:3000/users/delete/${this.id}`, this.createHttpOptions())

      .subscribe(
        (data) => { // Success

          this.mensDelete = data;
          this.router.navigateByUrl('/')
          console.log(`Esto es lo que devuelve el servidor: ${data}`)
        },
        (error) => {
          console.error(error);
          //hai que redirixir á páxina 404
        }
      )
  }



  userUpdate() { }
}
