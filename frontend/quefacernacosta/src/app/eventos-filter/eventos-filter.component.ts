import { Component, OnInit } from '@angular/core';
import { EventosAllService } from '../services/eventos-all.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos-filter',
  templateUrl: './eventos-filter.component.html',
  styleUrls: ['./eventos-filter.component.css']
})
export class EventosFilterComponent implements OnInit {

  constructor(private EventosAllService: EventosAllService, private rutaActiva: ActivatedRoute, private http: HttpClient) { }

  eventos: object;
  id: number;

  //HACEMOS LA LLAMADA A LA API PASÁNDOLE LA ID PARA QUE NOS DEVUELVA EL EVENTO

  sendData() {
    console.log(`"id pasada para pintar evento. EVC": ${this.id}`)

    return this.http.put('http://localhost:3000/eventos/filtrar',
      {
        "id": this.id,
      }
    )

      .subscribe(
        (data) => { // Success

          this.eventos = data;
          //console.log(data)
        },
        (error) => {
          console.error(error);
        }
      )
  }



  ngOnInit(): void {
    /*  this.EventosAllService.EventosFiltrados()
        .then((data) => {
          this.eventos = data;
          console.log(data)
        })*/

    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params.id
      console.log(`EFC-Datos recuperados de params ${params}`)
      console.log(`EFC-Pasamos datos de params a variable ${this.id}`)
    })

    this.sendData();
  }

}
