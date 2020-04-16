package com.spr.recipe_box;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/bigoven/recipes", produces = "application/json")
public class RecipeAPIRestController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{recipe_id}")
    public List<Recipe> getRecipeById(@PathVariable String recipe_id) {
        return recipeService.findById(recipe_id);
    }

    @GetMapping("/random")
    public List<Recipe> getSuggestedRecipes() {
        return recipeService.get25Random();
    }
}