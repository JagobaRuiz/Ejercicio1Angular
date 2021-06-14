import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private articuloService: ArticuloService, private mensajeService: MensajeService) { }

  ngOnInit(): void {
    this.getArticulos();
  }
  getArticulos(): void {
    this.articuloService.getArticulos().subscribe(articulos => this.articulos = articulos);
  }

  add(name: string, precio:number): void {
    name = name.trim();
    if (!name) { return; }
    this.articuloService.addArticulo({ name,precio } as Articulo)
      .subscribe(articulo => {
        this.articulos.push(articulo);
      });
  }
  delete(articulo: Articulo): void {
    this.articuloService.deleteArticulo(articulo.id).subscribe();
    this.articulos = this.articulos.filter(h => h !== articulo);
  }

  onSelect(articulo: Articulo): void {
    this.selectedArticulo = articulo;
    this.mensajeService.add(`Id del articulo seleccionado=${articulo.id}`);
  }
}
