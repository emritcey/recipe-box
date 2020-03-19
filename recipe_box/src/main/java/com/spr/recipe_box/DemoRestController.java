package com.spr.recipe_box;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class DemoRestController {
    @RequestMapping("/greeting")
    public Message greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Message(name);
    }

    @Autowired
    private RecipeService recipeManagementService;
    @GetMapping("/recipes/{recipe_id}")
    public List<Recipe> getRecipe(@PathVariable String recipe_id)
    {
        return recipeManagementService.findAll(recipe_id);
    }
}