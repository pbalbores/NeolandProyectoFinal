import { Component, OnInit } from '@angular/core';
import { EventosAllService } from '../services/eventos-all.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-destacados',
  templateUrl: './eventos-destacados.component.html',
  styleUrls: ['./eventos-destacados.component.css']
})
export class EventosDestacadosComponent implements OnInit {

  destacado = 1;
  publicacion = 1;
  eventos: any;

  constructor(private eventosAllService: EventosAllService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    //Obtenemos eventos que tengan como valor en destacado 1
    this.eventosAllService.getEventosDestacados(this.destacado, this.publicacion).subscribe(
      (data) => { // Success
        this.eventos = data;
        //  console.log(this.destacado)
        //  console.log(this.eventos)
      },
      (error) => {
        //  console.error(error);
      }
    )

  }


  abrirPaginaEvento(evento) {
    let eventoId = evento.id;

    //   console.log(eventoId)
    this.router.navigate(['/eventos/', eventoId])
  }

}
