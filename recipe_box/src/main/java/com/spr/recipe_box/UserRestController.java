package com.spr.recipe_box;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserRestController {
    @Value("${java.env}")
    private String env;

    @GetMapping
    public String getUser(@RequestParam(value="user_name") String name) {
        String url = env.equals("DEV") ? "http://127.0.0.1/user/fetch?user_name=" + name : "http://13.56.134.63/user/fetch?user_name=" + name;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @PostMapping
    public String addUser(@RequestParam(value="user_name") String name) {
        String url = env.equals("DEV") ? "http://127.0.0.1/user/add?user_name=" + name : "http://13.56.134.63/user/add?user_name=" + name;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}
