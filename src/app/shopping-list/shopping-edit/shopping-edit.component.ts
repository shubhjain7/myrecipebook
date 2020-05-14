import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{

  @ViewChild('f') slForm:NgForm;
  editMode= false;
  index:number;
  subsription:Subscription;
  editItem:Ingredient;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subsription= this.slService.startEditing.subscribe(
      (index:number)=>{
        this.index = index;
        this.editMode = true;
        this.editItem = this.slService.getIngredient(this.index);
        this.slForm.setValue({
          name:  this.editItem.name,
          amount: this.editItem.amount
        })
      }
    );
  }


  ngOnDestroy(){
    this.subsription.unsubscribe();
  }

  onSubmit(form:NgForm){
    
    const v = form.value;
    const newIngredient = new Ingredient(v.name,v.amount);
    if(this.editMode)
    {
      this.slService.updateItem(this.index, newIngredient)
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
      this.slService.deleteIngredient(this.index);
      this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
}
