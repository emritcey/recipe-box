package com.spr.recipe_box.Helper.RecipeServiceHelpers;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class RecipeServiceHelper {
    public static ResponseEntity<String> getStringResponseEntity(String url, RestTemplate restTemplate, HttpHeaders headers) {
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                String.class,
                1
        );
        // check response
        CheckResponse(response);
        return response;
    }

    private static void CheckResponse(ResponseEntity<String> response) {
        if (response.getStatusCode() == HttpStatus.OK) {
            System.out.println("Request Successful");
        } else {
            System.out.println("Request Failed");
            System.out.println(response.getStatusCode());
        }
    }
}
