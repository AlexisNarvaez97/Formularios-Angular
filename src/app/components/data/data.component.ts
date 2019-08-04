import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario:any = {

    nombreCompleto: {
      nombre: "Alexis",
      apellido: "Narvaez"
    },
    correo: "alexis97@hotmail.com"
    // pasatiempos: ["Correr", "Dormir", "Comer"]
  }

  constructor() { 

    console.log(this.usuario);

    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl( '' , [Validators.required, Validators.minLength(3)] ),
        'apellido': new FormControl('' , [ this.noNarvaez, Validators.required] )
      }),
      'correo': new FormControl('' , [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'pasatiempos': new FormArray([
        new FormControl( 'Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario ),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    })

    //Llenar los input con el array de objetos.
    // this.forma.setValue(this.usuario);


    this.forma.controls['password2'].setValidators([ Validators.required, this.noIgual.bind(this.forma)]);

    this.forma.controls['username'].valueChanges.subscribe (data => {
      console.log(data);
    })

    this.forma.controls['username'].statusChanges.subscribe(data =>{
      console.log(data);
    })

  }

  guardarCambios(){
    console.log(this.forma.value);
    console.log(this.forma);


    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: "",
    //     apellido: ""
    //   },
    //   correo: ""
    // });


  }


  //Agregar un pasatiempo nuevo dando push.
  agregarPasatiempo(){

    (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl("Dormir", Validators.required));

  }


  //Validación personalizada.
  noNarvaez(control: FormControl ): {[s:string]: boolean } {
    

    if(control.value === "narvaez"){
      return {
        nonarvaez:true
      }
    }
    return null;
  }


  noIgual(control: FormControl ): {[s:string]: boolean } {

    // console.log(this);
    let forma:any = this;

    if(control.value !== forma.controls['password1'].value ){
      return {
        noiguales:true
      }
    }
    return null;
  }

  existeUsuario( control: FormControl ): Promise<any>|Observable<any>{

    let promesa= new Promise(
      (resolve, reject) =>{
        setTimeout(()=>{
          if(control.value === "aletsnarvaez"){
            resolve ( {existe:true} )
          } else{
            resolve ( null )
          }
        }, 3000)
      }
    )
    return promesa;
  } 


}
