import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Articulo } from '../articulo';
import { ArticuloService } from '../articulo.service';
import { MensajeService } from '../mensaje.service';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  selectedArticulo?: Articulo;
  articulos$!: Observable<Articulo[]>;
  private searchTerms = new Subject<string>();

  constructor(private articuloService: ArticuloService, private mensajeService: MensajeService) { }

  ngOnInit(): void {

    this.articulos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      //distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.articuloService.searchArticulo(term)),



    );

    this.getArticulos();
    
  }
  getArticulos(): void {
    setTimeout(() => this.searchTerms.next(''), 0);
  }

  add(name: string, precio: number): void {
    name = name.trim();
    if (!name) { return; }
    this.articuloService.addArticulo({ name, precio } as Articulo)
      .subscribe(articulo => {
        this.articulos.push(articulo);
        this.searchTerms.next("actualizar");
      });
  }
  delete(articulo: Articulo): void {
    this.articuloService.deleteArticulo(articulo.id).subscribe();
    this.articulos = this.articulos.filter(h => h !== articulo);
    this.searchTerms.next("borrar");
    
  }

  onSelect(articulo: Articulo): void {
    this.selectedArticulo = articulo;
    this.mensajeService.add({texto:`Id del articulo seleccionado=${articulo.id}`,nivel:"info"});
  }

  search(term: string): void {
    this.searchTerms.next(term);
    term = "hecho";
  }
}
