package com.spr.recipe_box;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRestController {

    @RequestMapping(value = {"/dashboard/**", "/recipe/**"})
    public String recipe() {
        return "index.html";
    }
}
