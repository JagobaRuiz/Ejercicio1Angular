import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { Articulo } from './articulo';
import { catchError, map, tap } from 'rxjs/operators';
import { MensajeService } from './mensaje.service';



@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  

  private articulosUrl = 'http://localhost:3000/articulos/';
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  getArticulo(id: number): Observable<Articulo> {
    const url = `${this.articulosUrl}/${id}`;
    return this.http.get<Articulo>(url).pipe(
      tap(_ => this.mensajeService.add({texto: `Obtenido el articulo con la id ${id}`, nivel:"success"})),
    catchError(()=>{this.mensajeService.add({texto:`Error al obtener algún producto con la id ${id}`, nivel:"danger"})
  return [];
 }));

 }
 getArticulos(): Observable<Articulo[]> {
  return this.http.get<Articulo[]>(this.articulosUrl).pipe(
    tap(_ =>this.mensajeService.add({texto:`Todos los artículos`, nivel:"success"})),
    catchError(()=>{this.mensajeService.add({texto:`Error al obtener los productos`, nivel:"danger"})
  return [];
 }));
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

addArticulo(articulo: Articulo): Observable<Articulo> {
  return this.http.post<Articulo>(this.articulosUrl, articulo, this.httpOptions).pipe(
    tap(_ => this.mensajeService.add({ texto: 'Artículo ' + articulo.name +' añadido con éxito', nivel: 'success' })),
    catchError(() => {
      this.mensajeService.add({ texto: 'Error al insertar el artículo ' + articulo.name, nivel: 'danger' })
      return [];
    })
  );
}

updateArticulo(articulo: Articulo) {
  return this.http.put(this.articulosUrl + articulo.id, articulo, this.httpOptions)
  .pipe(tap(_ => this.mensajeService.add({ texto: 'Artículo ' + articulo.id +' modificado con éxito', nivel: 'success' })),
  catchError(() => {
    this.mensajeService.add({ texto: 'Error al actualizar el artículo ' + articulo.id, nivel: 'danger' })
    return [];
  })
);
}

deleteArticulo(id: number): Observable<Articulo> {
  const url = `${this.articulosUrl}/${id}`;
  return this.http.delete<Articulo>(url, this.httpOptions).pipe(
    tap(_ => this.mensajeService.add({ texto: 'Artículo ' + id +' borrado con éxito', nivel: 'success' })),
  catchError(() => {
    this.mensajeService.add({ texto: 'Error al borrar el artículo ' + id, nivel: 'danger' })
    return [];
  })
);
}

  searchArticulo(term: string): Observable<Articulo[]> {
    if (!term.trim()||term ==null || term==""|| term==" "||!term || term == "borrar" || term == "actualizar") {
      // if not search term, return empty array.
      term = "hecho";
      return this.getArticulos();
    }
    return this.http.get<Articulo[]>(`${this.articulosUrl}/?name_like=${term}`).pipe(
      tap(x => x.length ?
        this.mensajeService.add({ texto: 'Se han encontrado '+x.length+' artículos que incluyen el término '+term, nivel: 'success' }) :
        this.mensajeService.add({ texto: 'Se han encontrado '+x.length+' artículos que incluyen el término '+term, nivel: 'warning' })
    ));
  }
}
