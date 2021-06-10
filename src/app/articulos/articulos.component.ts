import { Component, OnInit } from '@angular/core';
import { Articulo } from '../articulo';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
articulos: Articulo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
