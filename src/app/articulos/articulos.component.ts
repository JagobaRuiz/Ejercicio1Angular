import { Component, OnInit } from '@angular/core';
import { Articulo } from '../articulo';
import { ArticuloService } from '../articulo.service';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  selectedArticulo?: Articulo;

  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.getArticulos();
  }
  getArticulos(): void {
    this.articuloService.getArticulos().subscribe(articulos => this.articulos = articulos);
  }
}
