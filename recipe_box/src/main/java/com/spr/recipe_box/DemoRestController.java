package com.spr.recipe_box;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class DemoRestController {
    @RequestMapping("/greeting")
    public Message greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Message(name);
    }

    @RequestMapping("/retrieve-user")
    public String getUser(@RequestParam(value="user_name") String name) {
        System.out.println(name);
        String url = "http://13.56.134.63/retrieve-user?user_name=" + name;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    @Autowired
    private RecipeService recipeManagementService;
    @GetMapping("/recipes/{recipe_id}")
    public List<Recipe> getRecipe(@PathVariable String recipe_id)
    {
        return recipeManagementService.findAll(recipe_id);
    }
}