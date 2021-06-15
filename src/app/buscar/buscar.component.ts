import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Articulo } from '../articulo';
import { ArticuloService } from '../articulo.service';
import { ArticulosComponent } from '../articulos/articulos.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  articulos$!: Observable<Articulo[]>;
  private searchTerms = new Subject<string>();
  constructor(private articuloService: ArticuloService) { }
  

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.articulos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.articuloService.searchArticulo(term)),
    );

  }

}
