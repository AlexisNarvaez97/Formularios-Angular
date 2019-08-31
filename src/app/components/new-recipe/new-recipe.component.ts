import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { NgForm } from '@angular/forms';
import { HealthierService } from '../../services/healthier.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {


  ingredients: any[] = [];

  steps: any[] = [];

  box: string;

  boxSteps: string;

  boxi: string;

  constructor(private service: HealthierService, private storage: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    
  }

  onUpload (e){
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `imagenes/receta_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL())).subscribe();
  }

  guardarIngrediente() {
    this.box = (<HTMLInputElement>document.getElementById('ingrediente')).value;
    this.ingredients.push(this.box);
    this.box = (<HTMLInputElement>document.getElementById('ingrediente')).value = '';
    console.log(this.ingredients);
    // (<HTMLInputElement>document.getElementById('resultado')).innerHTML = this.recipes;
  }

  guardarPasos() {
    this.boxSteps = (<HTMLInputElement>document.getElementById('pasos')).value;
    this.steps.push(this.boxSteps);
    this.boxSteps = (<HTMLInputElement>document.getElementById('pasos')).value = '';
    console.log(this.steps);
    // (<HTMLInputElement>document.getElementById('resultado')).innerHTML = this.recipes;
  }

  subir(){
    this.before();
  }
  before(){
    this.boxi = (<HTMLInputElement>document.getElementById('soap')).value;
    console.log(this.boxi);
  }


  guardar( form ){
    let recipes: RecipeModel = form.value;
    recipes.ingredientes = this.ingredients;
    recipes.pasos = this.steps;
    recipes.url = this.boxi;
    console.log(form);
    console.log('puta',recipes)
    // console.log(t);
    this.service.postRecipe(recipes).then((data) => {
      console.log("NICE");
      console.log(data);
      console.log(data.id);
      // console.log(this.urlImage);
      // this.before();
    }).catch( (e) => {
      console.log("Todo mal", e);
    });
  }


  

}
