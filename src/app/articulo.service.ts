import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from './articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {


  private articulosUrl = 'api/articulos';
  constructor(private http: HttpClient) { }

  getArticulo(id: number): Observable<Articulo> {
    const url = `${this.articulosUrl}/${id}`;
    return this.http.get<Articulo>(url);
    // .pipe(tap(_ => this.log(`fetched hero id=${id}`)),catchError(this.handleError<Hero>(`getHero id=${id}`)));
 }
 getArticulos(): Observable<Articulo[]> {
  return this.http.get<Articulo[]>(this.articulosUrl);
  // .pipe(catchError(this.handleError<Articulo[]>('getHeroes', [])));
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

addArticulo(articulo: Articulo): Observable<Articulo> {
  return this.http.post<Articulo>(this.articulosUrl, articulo, this.httpOptions);
  // .pipe(
  //   tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
  //   catchError(this.handleError<Hero>('addHero'))
  // );
}

updateArticulo(articulo: Articulo) {
  return this.http.put(this.articulosUrl, articulo, this.httpOptions);
}

}
