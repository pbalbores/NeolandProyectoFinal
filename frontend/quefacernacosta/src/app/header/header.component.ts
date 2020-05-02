import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private user: UsersService, private router: Router) { }

  enviarEvento() {
    this.router.navigateByUrl('eventos/new')
  }

  logout() {
    this.user.logout()
  }

  ngOnInit(): void {
  }

} 
