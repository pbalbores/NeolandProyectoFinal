import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EventosAllService {

  constructor(protected http: HttpClient) { }



  //1. LLAMADA A LA API QUE NOS DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL O POSTERIOR A HOY--------------

  /* getEventos() {
     return this.http.get(
       'http://localhost:3000/eventos/all'
     )
   }*/

  getEventosAll() {
    return this.http.get(`http://localhost:3000/eventos/all/active`).toPromise();
  }

  //2. LLAMADA A LA API QUE DEVUELVE TODOS LOS EVENTOS FILTRADOS POR FECHA--HOY --------------------------

  getEventosToday() {
    return this.http.get('localhost:3000/eventos/all/today').toPromise();
  }

  /*
 getEventosToday() {
   return this.http.get(
     'localhost:3000/eventos/all/today'
 
   )
 }*/


  //3. OBTENEMOS EVENTOS FILTRADOS POR CATEGORIAS O CONCELLOS


  /* EventosFiltrados(concellos: number, categorias: number) {
 
     return this.http.put('http://localhost:3000/eventos/filtrar',
       {
         "fk_concellos": concellos,
         "fk_categorias": categorias
       }).toPromise()
   }*/



}



