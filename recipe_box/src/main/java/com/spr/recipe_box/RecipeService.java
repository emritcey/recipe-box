package com.spr.recipe_box;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spr.recipe_box.Constants.Constants;
import com.spr.recipe_box.Constants.Keys;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
public class RecipeService {
    public List<Recipe> findById(String recipe_id){
            List<Recipe> recipeList = new ArrayList<>();

            String url = Constants.BIG_OVEN + Constants.RECIPE + recipe_id + Constants.API_KEY_QUERY + Keys.BIG_OVEN_KEY;
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

                    Recipe myRecipe = new Recipe(
                            map.path("Title").asText(),
                            "",
                            map.path("Description").asText(),
                            map.path("TotalMinutes").asText(),
                            "",
                            map.path("YieldNumber").asText(),
                            map.path("Instructions").asText());

                    JsonNode ingredientsNode = map.path("Ingredients");
                    if (ingredientsNode.isArray()){
                        List<String> recipeIngredientList = new ArrayList<>();
                        for (JsonNode node:ingredientsNode) {
                            String name = node.path("Name").asText();
                            if (name != null && name.length() > 0) {
                                recipeIngredientList.add(name);
                            }
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

    public List<Recipe> get25Random() {
        List<Recipe> recipeList = new ArrayList<>();

        String url  = "https://api2.bigoven.com/recipes/top25random?api_key=glFUKikehWjLW900etpS564VgIzOWSW5";
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
                JsonNode results = map.path("Results");
                if (results.isArray()){
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
        }
        catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return recipeList;
    }
}
