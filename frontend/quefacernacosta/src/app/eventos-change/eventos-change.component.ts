import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventosAllService } from '../services/eventos-all.service';
import { ReusablesService } from '../services/reusables.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../models/evento';

@Component({
  selector: 'app-eventos-change',
  templateUrl: './eventos-change.component.html',
  styleUrls: ['./eventos-change.component.css']
})
export class EventosChangeComponent implements OnInit {

  id: number;
  evento: any;

  evento1: any;

  datosConcellos: {};
  datosCategorias: {};

  nombreEvento: string;
  location1: string;
  localizacion2: string;
  fecha_in: Date;
  fecha_fin: Date;
  hora: string;
  artista: string;
  descripcion: string;
  prezo: string;
  imagen: string;
  publicacion: number;
  destacado: number;
  fk_concellos: number;
  fk_clasificacion: number;
  fk_usuario: number;


  createHttpOptions() {
    return {
      headers: new HttpHeaders({
        "user-token": localStorage.getItem("lToken"),
      }),
    };
  }

  constructor(private rutaActiva: ActivatedRoute, protected eventosAllService: EventosAllService, private reusables: ReusablesService, private http: HttpClient) { }



  ngOnInit(): void {

    //Obtenemos id de evento de la dirección
    this.rutaActiva.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(`EFC-Datos recuperados de params ${params}`)
      console.log(`EFC-Pasamos datos de params a variable ${this.id}`)
    })

    //Utilizando la id hacemos una llamada par recuperar los datos del efvento y los almacenamos

    this.eventosAllService.getEventoByID(this.id).subscribe((data) => {
      this.evento = data;
      console.log(`Obtenemos atos de evento de direccon web ${data}`)


    }, (error) => {
      console.error(error);
    })


    //Como queremos que las dos funciones de obtener datos de tablas CONCELLOS y CATEGORÍAS SE INICIEN AL CARGAR LA PÁGINA LAS INVOCAMOS AL INCIO


    //Llamamos a ReusablesService para obtener los datos de los concellos y nos suscribimos a la respuesta

    this.reusables.getConcellosDatos().subscribe(
      (data) => { // Success

        this.datosConcellos = data;
        console.log(data)
        console.log(`Datos Concellos: ${this.datosConcellos}`)

      },
      (error) => {
        console.error(error);
      }
    )

    //Llamamos a ReusablesService para obtener los datos de las categorías y nos suscribimos a la respuesta
    this.reusables.getCategoriasDatos().subscribe(
      (data) => { // Success

        this.datosCategorias = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    )

  }

  obtenerDatosdeEvento(evento1) {
    this.evento1 = evento1;
    this.nombreEvento = evento1.nombreEvento;
    this.location1 = evento1.location1;
    this.localizacion2 = evento1.localizacion2;
    this.fecha_in = evento1.fecha_in;
    this.fecha_fin = evento1.fecha_fin;
    this.hora = evento1.hora;
    this.artista = evento1.artista;
    this.descripcion = evento1.descripcion;
    this.prezo = evento1.prezo;
    this.imagen = evento1.imagen;
    this.publicacion = evento1.publicacion;
    this.destacado = evento1.destacado;
    this.fk_concellos = evento1.fk_concellos;
    this.fk_clasificacion = evento1.fk_clasificacion;
    this.fk_usuario = evento1.fk_usuario;
  }





  putEvento() {
    console.log("EventoPUT RULES")
    console.log(this.id, this.nombreEvento, this.location1, this.fk_concellos, this.localizacion2, this.fecha_in, this.fecha_fin, this.hora, this.artista, this.descripcion, this.prezo, this.imagen, this.publicacion, this.destacado, this.fk_clasificacion, this.fk_usuario)

    this.eventosAllService.putEvento(this.id, this.nombreEvento, this.location1, this.fk_concellos, this.localizacion2, this.fecha_in, this.fecha_fin, this.hora, this.artista, this.descripcion, this.prezo, this.imagen, this.publicacion, this.destacado, this.fk_clasificacion, this.fk_usuario).subscribe(
      (data) => { // Success
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    )
  }

  eventoDelete() {
    this.eventosAllService.deleteEento(this.id).subscribe(
      (data) => { // Success 
        console.log(data)

        //SACAR UN MENSAJE QUE DIGA QUE EL EVENTO FUE ELIMINADO
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
