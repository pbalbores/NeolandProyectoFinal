import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export
  class UserRegisterComponent implements OnInit {

  constructor(private user: UsersService) { }

  nombreUsuario: string;
  password: string;
  email: string;


  submitForm() {
    this.user.register(this.nombreUsuario, this.password, this.email)

  }

  ngOnInit(): void {
  }
}