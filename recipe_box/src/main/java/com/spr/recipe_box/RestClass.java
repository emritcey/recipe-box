package com.spr.recipe_box;

import org.springframework.beans.factory.annotation.Value;

public abstract class RestClass {
    @Value("${java.env}")
    public String env;
}
