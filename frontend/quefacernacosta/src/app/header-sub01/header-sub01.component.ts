import { Component, OnInit } from '@angular/core';
import { EventosAllService } from '../services/eventos-all.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-header-sub01',
  templateUrl: './header-sub01.component.html',
  styleUrls: ['./header-sub01.component.css']
})
export class HeaderSub01Component implements OnInit {


  constructor(protected _http: HttpClient, private router: Router) { }
  /* PENDENTE:

  4. Ver como podemos exportar os datos da variable EVENTOS para mostralos noutro componente
  5. CONSULTAR PROFE. A maneira de implementar esta chamada en eventos.service
  */




  concellos: number;
  categorias: number;



  //datosBusqueda: any;
  //Estos son los datos que se envían al servidor para realizar la búsqueda.
  //Si va vacio se envía UNDEFINED y el servidor devuelve datos de TODOS LOS EVENTOS


  eventos: any;

  datosConcellos: any;
  datosCategorias: any;

  sendData() {
    console.log(`Concello: ${this.concellos} Categoría: ${this.categorias}`)

    return this._http.put('http://localhost:3000/eventos/filtrar',
      {
        "fk_concellos": this.concellos,
        "fk_clasificacion": this.categorias
      }
    )

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
  abrirPaginaEvento(register) {
    console.log("abrir pagina evento activado")

    this.router.navigateByUrl(register)
  }

  ngOnInit(): void {
    //Como queremos que las dos funciones de obtener datos de tablas CONCELLOS y CATEGORÍAS SE INICIEN AL CARGAR LA PÁGINA LAS INVOCAMOS AL INCIO

    this.getConcellosDatos();
    this.getCategoriasDatos();


  }

}

