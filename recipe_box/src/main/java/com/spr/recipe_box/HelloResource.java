package com.spr.recipe_box;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloResource {
    @RequestMapping({"/helloworld"})
    public String hello(){
        return "Hello Maven";
    }
}
