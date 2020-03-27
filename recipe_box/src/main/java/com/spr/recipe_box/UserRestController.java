package com.spr.recipe_box;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserRestController extends RestClass {

    @GetMapping
    public String getUser(@RequestParam(value="user_name") String name) {
        String url = env.equals("DEV") ? "http://127.0.0.1/user?user_name=" + name : "http://13.56.134.63/user?user_name=" + name;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @PostMapping
    public String addUser(@RequestBody String userName) throws JsonProcessingException {
        String url = env.equals("DEV") ? "http://127.0.0.1/user" : "http://13.56.134.63/user";
        HashMap request = new ObjectMapper().readValue(userName, HashMap.class);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response.getBody();
    }
}
