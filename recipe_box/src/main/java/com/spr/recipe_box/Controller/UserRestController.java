package com.spr.recipe_box.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spr.recipe_box.Constant.Constants;
import com.spr.recipe_box.Config.RestClass;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserRestController extends RestClass {
    @GetMapping
    public String getUser(@RequestParam(value="user_name") String name) {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.USER_NAME_QUERY + name : Constants.NODE_PROD_ENV + Constants.USER_NAME_QUERY + name;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @PostMapping
    public String addUser(@RequestBody String userName) throws JsonProcessingException {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.USER : Constants.NODE_PROD_ENV + Constants.USER;
        HashMap request = new ObjectMapper().readValue(userName, HashMap.class);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response.getBody();
    }
}
