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


  private articulosUrl = 'api/articulos';
  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  getArticulo(id: number): Observable<Articulo> {
    const url = `${this.articulosUrl}/${id}`;
    return this.http.get<Articulo>(url).pipe(tap(_ => this.log(`fetched articulo id=${id}`)),catchError(this.handleError<Articulo>(`getArticulo id=${id}`)));
 }
 getArticulos(): Observable<Articulo[]> {
  return this.http.get<Articulo[]>(this.articulosUrl).pipe(catchError(this.handleError<Articulo[]>('getArticulos', [])));
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

addArticulo(articulo: Articulo): Observable<Articulo> {
  return this.http.post<Articulo>(this.articulosUrl, articulo, this.httpOptions).pipe(
    tap((newArticulo: Articulo) => this.log(`Articulo añadido con id=${newArticulo.id}`)),
    catchError(this.handleError<Articulo>('addArticulo'))
  );
}

updateArticulo(articulo: Articulo) {
  return this.http.put(this.articulosUrl, articulo, this.httpOptions);
}

deleteArticulo(id: number): Observable<Articulo> {
  const url = `${this.articulosUrl}/${id}`;

  return this.http.delete<Articulo>(url, this.httpOptions).pipe(tap
    (_ => this.log(`<id de artículo borrado=${id}`)),
    catchError(this.handleError<Articulo>('deleteArticulo'))
  );
 }

 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
/** Log a HeroService message with the MessageService */
private log(mensaje: string) {
  this.mensajeService.add(`HeroService: ${mensaje}`);
  } 


}
