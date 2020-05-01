import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

  constructor(private http: HttpClient) { }

  datosUsuario: object;

  ngOnInit(): void {

    this.http.get('http://localhost:3000/users/admin', { withCredentials: true })
      .subscribe((data) => { this.datosUsuario = data })
  }

}
