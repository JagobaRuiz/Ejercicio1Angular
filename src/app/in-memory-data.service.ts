// import { Injectable } from '@angular/core';
// import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { Articulo } from './articulo';

// @Injectable({
//   providedIn: 'root'
// })
// export class InMemoryDataService implements InMemoryDbService{
//   createDb() {
//     const articulos = [
//       { id: 1, name: 'PowerBank 30000mAh', precio: 27.50},
//       { id: 2, name: 'GTX 2050 4GB', precio: 270},
//       { id: 3, name: 'USB 2TB', precio: 500},
//       { id: 4, name: 'SSD 1TB', precio: 90 },
//       { id: 5, name: 'Tinta HP 301', precio: 11},
//       { id: 6, name: 'Portátil Gaming HP Pavilion 11062021', precio: 999 },
//       { id: 7, name: 'Ratón', precio: 5 },
//       { id: 8, name: 'Teclado', precio: 8 },
//       { id: 9, name: 'Monitor', precio: 70},
//       { id: 10, name: 'Impresora', precio: 89 }
//     ];
//     return {articulos};
//   }

//   genId(articulos: Articulo[]): number {
//     return articulos.length > 0 ? Math.max(...articulos.map(articulo => articulo.id)) + 1 : 11;
//   }
// }

