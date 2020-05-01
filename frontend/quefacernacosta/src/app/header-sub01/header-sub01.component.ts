import { Component, OnInit } from '@angular/core';
import { EventosAllService } from '../services/eventos-all.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header-sub01',
  templateUrl: './header-sub01.component.html',
  styleUrls: ['./header-sub01.component.css']
})
export class HeaderSub01Component implements OnInit {


  constructor(protected _http: HttpClient) { }
  /* PENDENTE:
  1. Que no formulario se poidan seleccionar os concellos e as categorías pòlo seu nome
  2. Que os nomes dos concellos e das categorías se transformen no seu número equivalente para pasrllo como valor a concellos e a categorias
  3. Que se poida seleccionar só o concello, só a categoria ou os dous e funcione
  4. Ver como podemos exportar os datos da variable EVENTOS para mostralos noutro componente
  5. CONSULTAR PROFE. A maneira de implementar esta chamada en eventos.service
  */




  concellos: number;
  categorias: number;



  //datosBusqueda: any;
  //Estos son los datos que se envían al servidor para realizar la búsqueda.
  //Si va vacio se envía UNDEFINED y el servidor devuelve datos de TODOS LOS EVENTOS


  eventos: any;

  sendData() {
    console.log(`Concello: ${this.concellos} Categoría: ${this.categorias}`)
    // console.log(`Datos búsqueda antes de meterle nada ${this.datosBusqueda}`)

    /* if (this.concellos != undefined && this.categorias != undefined) {
    this.datosBusqueda = `{"fk_concellos":${this.concellos}, "fk_clasificacion":${this.categorias}}`
    console.log(`Datos búsqueda si concellos y categorias tienen valores: ${this.datosBusqueda}`)
  } else if (this.concellos != undefined) {
    this.datosBusqueda = `{"fk_concellos": ${this.concellos}}`
    console.log(`Datos búsqueda si concellos tiene valor: ${this.datosBusqueda}`)
  } else if (this.categorias != undefined) {
    this.datosBusqueda = `{"fk_clasificacion": ${this.categorias}}`
    console.log(`Datos búsqueda si categorias tiene valor: ${this.datosBusqueda}`)
  }

  console.log(`Datos que se envían al servidor para realizar la búsqueda ${this.datosBusqueda}`)*/

    //this.EventosAllService.EventosFiltrados(this.concellos, this.categorias)

    return this._http.put('http://localhost:3000/eventos/filtrar',
      {
        "fk_concellos": this.concellos,
        "fk_categorias": this.categorias
      }
    )
      //.toPromise()
      .subscribe(
        (data) => { // Success

          this.eventos = data;
          console.log(data)
        },
        (error) => {
          console.error(error);
        }
      )
  }

  ngOnInit(): void {



  }

}

