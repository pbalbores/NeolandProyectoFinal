import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReusablesService } from '../services/reusables.service';
import { Evento } from '../models/evento';


@Component({
  selector: 'app-eventos-new',
  templateUrl: './eventos-new.component.html',
  styleUrls: ['./eventos-new.component.css']
})
export class EventosNewComponent implements OnInit {

  // En el Constructor inyectamos el Servicio que vamos a utilizar. Normalmente se importa solo en la parte superior
  constructor(protected _http: HttpClient, private reusables: ReusablesService) { }

  //Pasamos los datos de los nombres de los Concellos y de los nombres de las categorías


  //evento: Array<Evento>;



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

  datosConcellos: any;
  datosCategorias: any;

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

  //LLAMADAS A API PARA OBTENER DATOS DE LAS TABLAS CONCELLOS Y CATEGORIAS

  getConcellosDatos() {
    return this._http.get(`http://localhost:3000/concellos/all`).subscribe(
      (data) => { // Success

        this.datosConcellos = data;
        console.log(data)
        console.log(`Datos Concellos: ${this.datosConcellos}`)


      },
      (error) => {
        console.error(error);
      }
    )

  }

  getCategoriasDatos() {
    return this._http.get(`http://localhost:3000/categorias/all`).subscribe(
      (data) => { // Success

        this.datosCategorias = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    )
  }

  ngOnInit(): void {


    //Al inciar el componente llamamos a las funciónes del servicio REUSABLES que nos sacan los datos de los Concellos y de las Categorías
    //Como no acaba de funcionar del todo bien, hacemos la llamada directamente

    /*
        this.reusables.getConcellosDatos();
        this.reusables.getCategoriasDatos();
    
        this.datosConcellos = this.reusables.datosConcellos;
        this.datosCategorias = this.reusables.datosCategorias;*/


    //Como queremos que las dos funciones de obtener datos de tablas CONCELLOS y CATEGORÍAS SE INICIEN AL CARGAR LA PÁGINA LAS INVOCAMOS AL INCIO

    this.getConcellosDatos();
    this.getCategoriasDatos();


  }
}
