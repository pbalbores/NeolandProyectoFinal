import { Component, OnInit } from '@angular/core';
import { EventosAddService } from '../services/eventos-add.service';

@Component({
  selector: 'app-eventos-new',
  templateUrl: './eventos-new.component.html',
  styleUrls: ['./eventos-new.component.css']
})
export class EventosNewComponent implements OnInit {

  // En el Constructor inyectamos el Servicio que vamos a utilizar. Normalmente se importa solo en la parte superior
  constructor(private _eventosAdd: EventosAddService) { }

  nombreEvento: string;
  location1: string;
  fk_concellos: number;
  localizacion2: string;
  fecha_in: Date;
  fecha_fin: Date;
  hora: string;
  artista: string;
  descripcion: string;
  prezo: string;
  imagen: string;
  fk_clasificacion: number;
  fk_usuario: number;


  submitEvento() {
    this._eventosAdd.eventoNew(this.nombreEvento, this.location1, this.fk_concellos, this.localizacion2, this.fecha_in, this.fecha_fin, this.hora, this.artista, this.descripcion, this.prezo, this.imagen, this.fk_clasificacion, this.fk_usuario)
  }

  ngOnInit(): void {
  }

}
