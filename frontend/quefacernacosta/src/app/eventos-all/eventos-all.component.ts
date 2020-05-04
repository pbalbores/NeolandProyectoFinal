import { Component, OnInit, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { EventosAllService } from '../services/eventos-all.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-all',
  templateUrl: './eventos-all.component.html',
  styleUrls: ['./eventos-all.component.css']
})
export class EventosAllComponent implements OnInit {

  constructor(protected EventosAllService: EventosAllService, private router: Router

  ) { }

  eventos: object;
  action: any;

  //OBTENEMOS DATOS DEL EVENTO DEL HTML, SACAMOS EL ID Y REDIRIGIMOS A LA PÁGINA DE EVENTO

  abrirPaginaEvento(evento) {
    let eventoId = evento.id;

    console.log(eventoId)
    this.router.navigate(['/evento/', eventoId])
  }

  ngOnInit() {
    /* this.EventosAllService.getEventos()
       .subscribe(
         (data) => { // Success
 
           this.eventos = data;
           console.log(data)
         },
         (error) => {
           console.error(error);
         }
       );*/

    this.EventosAllService.getEventosAll()
      .then((data) => {
        this.eventos = data;
        console.log(`Eventos ${this.eventos}`)
      })

  }


}




