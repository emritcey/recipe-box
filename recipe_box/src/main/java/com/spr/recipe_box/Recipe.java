package com.spr.recipe_box;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Recipe {
    private String title;
    private String cuisine;
    private String description;
    List <Ingredient> ingredientList = new ArrayList<>();
    private String instructions;

    public Recipe(String title, String cuisine, String description, String instructions) {
        this.title = title;
        this.cuisine = cuisine;
        this.description = description;
        this.instructions = instructions;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCuisine() {
        return cuisine;
    }

    public String getDescription() {
        return description;
    }

    public List<Ingredient> getIngredientList() {
        return ingredientList;
    }

    public void setIngredientList(List<Ingredient> ingredientList) {
        this.ingredientList = ingredientList;
    }

    public String getInstructions() {
        return instructions;
    }

    @Override
    public String toString(){
        String recipeInfo = "Recipe: " + title + "\n" +
                "Cuisine: "+ cuisine + "\n" +
                "Description: " + description + "\n" +
                "Instructions: " + instructions;
        String ingredientThings = ingredientList.toString();
        return recipeInfo + "\n" + ingredientThings;
    }
}
