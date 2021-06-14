import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from '../articulo';
import { ArticuloService } from '../articulo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  
  @Input() articulo?: Articulo;
  constructor(private route: ActivatedRoute, private articuloService: ArticuloService, private location: Location) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.articuloService.getArticulo(id).subscribe(articulo => this.articulo = articulo);
  }
  save(): void {
    if (this.articulo) {
      this.articuloService.updateArticulo(this.articulo).subscribe(() => this.goBack());
    }
  }
  
  goBack(): void {
    this.location.back();
  }
}
