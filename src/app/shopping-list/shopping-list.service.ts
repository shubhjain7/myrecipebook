import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
    private ingredients:Ingredient[]=[
        new Ingredient('Apple',10),
        new Ingredient('Grapes',100),
    ];

    getIngredients(){
        return this.ingredients;
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    updateItem(index:number , newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
      this.ingredients.splice(index,1);
      this.ingredientChanged.next(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}