package com.spr.recipe_box;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/recipes", produces = "application/json")

public class RecipeDBController {
    public RestTemplate restTemplate = new RestTemplate();
    @Value("${java.env}")
    private String env;

    @GetMapping(value = "/{id}")
    public String findById(@PathVariable("id") String recipe_id) {
        String url = env.equals("DEV") ? "http://127.0.0.1/recipes/" + recipe_id : "http://13.56.134.63/recipes/" + recipe_id;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @GetMapping
    public String findAll() {
        String url = env.equals("DEV") ? "http://127.0.0.1/recipes" : "http://13.56.134.63/recipes";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @PostMapping
    public String create(@RequestBody HashMap<String, String> recipe) {
        String url = env.equals("DEV") ? "http://127.0.0.1/recipes" : "http://13.56.134.63/recipes";
        ResponseEntity<String> response = restTemplate.postForEntity(url, recipe, String.class);
        return response.getBody();
    }

    @PutMapping(value = "/{id}")
    public boolean update(@PathVariable("id") String recipe_id, @RequestBody HashMap<String, String> updatedRecipe) {
        String url = env.equals("DEV") ? "http://127.0.0.1/recipes/" + recipe_id : "http://13.56.134.63/recipes/" + recipe_id;
        restTemplate.put(url, updatedRecipe, String.class);
        return true;
    }

    @DeleteMapping(value = "/{id}")
    public boolean delete(@PathVariable("id") String recipe_id) {
        String url = env.equals("DEV") ? "http://127.0.0.1/recipes/" + recipe_id : "http://13.56.134.63/recipes/" + recipe_id;
        restTemplate.delete(url);
        return true;
    }
}
