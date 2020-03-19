package com.spr.recipe_box;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class UserRestController {
    @Value("${java.env}")
    private String env;

    @RequestMapping("/retrieve-user")
    public String getUser(@RequestParam(value="user_name") String name) {
        String url = env.equals("DEV") ? "http://127.0.0.1/retrieve-user?user_name=" + name : "http://13.56.134.63/retrieve-user?user_name=" + name;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}
