import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReusablesService {

  constructor(private http: HttpClient) { }

  //1. RECUPERAMOS LOS DATOS RELATIVOS A LA TABLA CONCELLOS PARA REUTILIZARLOS EN DISTINTOS COMPONENTES-----

  //Creamos la variable que exportaremos con los datos obtenidos
  datosConcellos: any;

  //Llamada a la base de datos

  getConcellosDatos() {
    return this.http.get(`http://localhost:3000/concellos/all`).subscribe(
      (data) => { // Success

        this.datosConcellos = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    )
  }


  //2. RECUPERAMOS LOS DATOS RELATIVOS A LA TABLA CATEGORÍAS PARA REUTILIZARLOS EN DISTINTOS COMPONENTES---------------------------------------------------------------------------------------------

  //Creamos la variable con los datos obtenidos

  datosCategorias: any;


  //Llamada a la base de datos

  getCategoriasDatos() {
    return this.http.get(`http://localhost:3000/categorias/all`).subscribe(
      (data) => { // Success

        this.datosCategorias = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    )
  }


}
