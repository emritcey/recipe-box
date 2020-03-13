package com.spr.recipe_box;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Recipe {
    private String title;
    private String recipe_id;
    private String description;
    List <Ingredient> ingredientList = new ArrayList<>();
    private String instructions;

    public Recipe(String title, String recipe_id, String description, String instructions) {
        this.title = title;
        this.recipe_id = recipe_id;
        this.description = description;
        this.instructions = instructions;
    }

    public String getRecipeId() {
        return recipe_id;
    }

    public void setRecipeId(String recipe_id) {
        this.recipe_id = recipe_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
                "Description: " + description + "\n" +
                "Instructions: " + instructions;
        String ingredientThings = ingredientList.toString();
        return recipeInfo + "\n" + ingredientThings;
    }
}
