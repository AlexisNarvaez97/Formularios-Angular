import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {

  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: "",
    sexo: "Hombre",
    acepta: false
  }

  paises = [{
    codigo: 'MXN',
    nombre: 'México'
  },
  {
    codigo: 'USA',
    nombre: 'Estados Unidos'
  }]

  sexos = ["Hombre", "Mujer", "Sin definir"]

  constructor() { }

  guardar(forma: NgForm) {
    console.log('NgForm', forma);
    console.log('Values', forma.value);

    console.log('Usuario', this.usuario);
  }

}
