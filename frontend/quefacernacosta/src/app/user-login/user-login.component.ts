import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private user: UsersService) { }

  //Template-driven form
  nombreUsuario: string;
  password: string;

  sendForm() {
    this.user.login(this.nombreUsuario, this.password)

  }

  ngOnInit(): void {
  }

}
