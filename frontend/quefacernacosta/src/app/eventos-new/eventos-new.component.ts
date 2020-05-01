import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-eventos-new',
  templateUrl: './eventos-new.component.html',
  styleUrls: ['./eventos-new.component.css']
})
export class EventosNewComponent implements OnInit {

  // En el Constructor inyectamos el Servicio que vamos a utilizar. Normalmente se importa solo en la parte superior
  constructor(protected _http: HttpClient) { }

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

  eventoEngadido: any;
  datosEventoEngadido: any;

  getDatosEventoEngadido() {
    return this._http.get(`http://localhost:3000/eventos/${this.eventoEngadido.ID}`).subscribe(
      (data) => { // Success

        this.datosEventoEngadido = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    )
  }

  submitEvento() {
    console.log(this.nombreEvento, this.location1, this.fk_concellos, this.localizacion2, this.fecha_in, this.fecha_fin, this.hora, this.artista, this.descripcion, this.prezo, this.imagen, this.fk_clasificacion, this.fk_usuario)
    return this._http.post('http://localhost:3000/eventos/new',
      {
        "nombreEvento": this.nombreEvento,
        "location1": this.location1,
        "fk_concellos": this.fk_concellos,
        "localizacion2": this.localizacion2,
        "fecha_in": this.fecha_in,
        "fecha_fin": this.fecha_fin,
        "hora": this.hora,
        "artista": this.artista,
        "descripcion": this.descripcion,
        "prezo": this.prezo,
        "imagen": this.imagen,
        "fk_clasificacion": this.fk_clasificacion,
        "fk_usuario": this.fk_usuario
      }

    ).subscribe(
      (data) => { // Success

        this.eventoEngadido = data;
        //Llamamos a función que nosm uestra los datos del evento
        this.getDatosEventoEngadido()
        console.log(data)
        console.log(this.eventoEngadido.ID)
      },
      (error) => {
        console.error(error);
      }
    )

  }


  ngOnInit(): void {
  }

}
