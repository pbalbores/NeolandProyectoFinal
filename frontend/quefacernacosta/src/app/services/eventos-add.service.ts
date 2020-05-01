import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosAddService {

  constructor(private _http: HttpClient) { }

  // Creamos servicio para añadir nuevo Evento--------------------------------------------------------------

  eventoNew(
    nombreEvento: string,
    location1: string,
    fk_concellos: number,
    localizacion2: string,
    fecha_in: Date,
    fecha_fin: Date,
    hora: string,
    artista: string,
    descripcion: string,
    prezo: string,
    imagen: string,
    fk_clasificacion: number,
    fk_usuario: number) {
    this._http.post('localhost:3000/eventos/new', {
      nombreEvento: nombreEvento,
      location1: location1,
      fk_concellos: fk_concellos,
      localizacion2: localizacion2,
      fecha_in: fecha_in,
      fecha_fin: fecha_fin,
      hora: hora,
      artista: artista,
      descripcion: descripcion,
      prezo: prezo,
      imagen: imagen,
      fk_clasificacion: fk_clasificacion,
      fk_usuario: fk_usuario
    }).subscribe((responseAPI) => {
      console.log(responseAPI)
      console.log(nombreEvento)
    })
  }
}
