package com.spr.recipe_box.Helper.RecipeServiceHelpers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spr.recipe_box.Model.Recipe;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public class RecipeGet25RandomHelper {
    public static void buildGet25RandomList(List<Recipe> recipeList, ResponseEntity<String> response, ObjectMapper mapper) {
        try {
            if (!response.hasBody()) {
                System.out.println("Nothing exists in response body");
            } else {

                JsonNode map = mapper.readTree(response.getBody());
                JsonNode results = map.path("Results");
                if (results.isArray()){
                    buildRecipeListWith25RandomItems(recipeList, results);
                }
            }
        }
        catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    private static void buildRecipeListWith25RandomItems(List<Recipe> recipeList, JsonNode results) {
        for (JsonNode recipe:results) {
            Recipe myRecipe = new Recipe(
                    recipe.path("Title").asText(),
                    recipe.path("RecipeID").asText(),
                    "",
                    "",
                    "",
                    "",
                    "");
            recipeList.add(myRecipe);
        }
    }
}
