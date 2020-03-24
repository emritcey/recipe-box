package com.spr.recipe_box;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
public class RecipeService {
    private static List<Recipe> recipeList = new ArrayList<>();

    public List<Recipe> findById(String recipe_id){
            String url  = "https://api.bigoven.com/recipe/"+recipe_id+"?api_key=glFUKikehWjLW900etpS564VgIzOWSW5";

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            HttpEntity request = new HttpEntity(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    request,
                    String.class,
                    1
            );

            // check response
            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("Request Successful");
            } else {
                System.out.println("Request Failed");
                System.out.println(response.getStatusCode());
            }

            ObjectMapper mapper = new ObjectMapper();

            try {
                if (!response.hasBody()) {
                    System.out.println("Nothing exists in response body");
                } else {
                    JsonNode map = mapper.readTree(response.getBody());

                    Recipe myRecipe = new Recipe(map.path("Title").asText(),
                            map.path("Cuisine").asText(),
                            map.path("Description").asText(),
                            map.path("Instructions").asText());

                    JsonNode ingredientsNode = map.path("Ingredients");
                    if (ingredientsNode.isArray()){
                        List<Ingredient> recipeIngredientList = new ArrayList<>();
                        for (JsonNode node:ingredientsNode) {
                            Ingredient nextIngredient = new Ingredient();
                            nextIngredient.setName(node.path("Name").asText());
                            nextIngredient.setQuantity(node.path("Quantity").asText() + " " + node.path("Unit").asText());
                            recipeIngredientList.add(nextIngredient);
                        }
                        myRecipe.setIngredientList(recipeIngredientList);
                    }
                    recipeList.add(myRecipe);
                }
            }
            catch (IOException ioe) {
                ioe.printStackTrace();
            }
        return recipeList;
    }
}
