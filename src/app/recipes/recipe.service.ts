import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService{
        constructor(private slService : ShoppingListService){}
     recipeSelected = new Subject<Recipe>();
     recipeChanged = new Subject<Recipe[]>();
    private recipes : Recipe[]=[
        new Recipe(
            'A Test Recipe',
            'Very tasty',
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg',
            [new Ingredient('Corns',20) ,
            new Ingredient('Chilly',10) 
        ]),

            new Recipe(
                'A New Tasty Recipe',
                'Super Awesome Tatsy',
                'https://i.ndtvimg.com/i/2016-03/pasta-salad_625x350_71459427282.jpg' ,
                [new Ingredient('Flakes',100) ,
                new Ingredient('Mushroom',5) 
            ])
    ];

    getRecipes(){
        return this.recipes;
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientToSl(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
        
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());

    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());

    }
}