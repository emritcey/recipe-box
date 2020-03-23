package com.spr.recipe_box;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = {"com.spr.recipe_box"})

public class RecipeBoxApplication {
    public static void main(String[] args) {
    	SpringApplication.run(RecipeBoxApplication.class, args);
	}
}
