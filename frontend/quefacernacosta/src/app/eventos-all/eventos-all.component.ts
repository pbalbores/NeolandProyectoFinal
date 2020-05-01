import { Component, OnInit, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { EventosAllService } from '../services/eventos-all.service';

@Component({
  selector: 'app-eventos-all',
  templateUrl: './eventos-all.component.html',
  styleUrls: ['./eventos-all.component.css']
})
export class EventosAllComponent implements OnInit {

  constructor(protected EventosAllService: EventosAllService

  ) { }

  eventos: object;
  action: any;

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
      })

  }


}




