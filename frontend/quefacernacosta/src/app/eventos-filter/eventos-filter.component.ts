import { Component, OnInit } from '@angular/core';
import { EventosAllService } from '../services/eventos-all.service';

@Component({
  selector: 'app-eventos-filter',
  templateUrl: './eventos-filter.component.html',
  styleUrls: ['./eventos-filter.component.css']
})
export class EventosFilterComponent implements OnInit {

  constructor(private EventosAllService: EventosAllService) { }

  eventos: object;

  ngOnInit(): void {
    /*  this.EventosAllService.EventosFiltrados()
        .then((data) => {
          this.eventos = data;
          console.log(data)
        })*/
  }

}
