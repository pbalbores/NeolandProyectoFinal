import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosAllService {

  constructor(private _http: HttpClient) { }

  //Creo la variable que va a mostrar los eventos
  eventos: string;

  obtenerEventos(nombreEvento: string, fk_concellos: number) {
    this._http.put("localhost:3000/eventos/filtrar",
      {
        "nombreEvento": "Macbeth. O ruído e a furia",
        "fk_concellos": 3
      })

      .subscribe((responseAPI) => {
        console.log(responseAPI)
      })


    //hacer llamanda a API mandando datos
    //si API manda datos
    //cambiamos variable con datos
  }


}
