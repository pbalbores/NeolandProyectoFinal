import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private usersService: UsersService, private rutaActiva: ActivatedRoute, private http: HttpClient) { }


  id: number;
  usuarios: any;
  usuarios2: {};


  nombreUsuario: any;
  password: any;
  email: any;
  admin = 0;

  message: any;

  createHttpOptions() {
    return {
      headers: new HttpHeaders({
        "user-token": localStorage.getItem("lToken"),
      }),
    };
  }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params.id
      console.log(`EFC-Datos recuperados de params ${params}`)
      console.log(`EFC-Pasamos datos de params a variable ${this.id}`)
    })

    this.usersService.getUserDataById(this.id, this.createHttpOptions())
      .subscribe(
        (data) => { // Success

          this.usuarios = data;
          this.usuarios2 = JSON.stringify(data);



        },
        (error) => {
          console.error(error);
          //hai que redirixir á páxina 404
        }
      )



  }
  sendForm() {
    this.usersService.getUserUpdate(this.id, this.nombreUsuario, this.password, this.email, this.admin, this.createHttpOptions()).subscribe(
      (data) => { // Success

        this.message = JSON.stringify(data)
        //console.log(t.message)
      },
      (error) => {
        if (error) { this.message = "Algo non foi como debería. Volve a intentalo." }
        console.error(error);
      }
    )
  }

}
