import { Injectable } from '@angular/core';
import { Mensaje } from './mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  mensajes: Mensaje[] = [];

  add(mensaje: Mensaje) {
    this.mensajes.push(mensaje);
  }

  limpiar() {
    this.mensajes = [];
  }
}
