package com.spr.recipe_box.Config;

import org.springframework.beans.factory.annotation.Value;

public abstract class RestClass {
    @Value("${java.env}")
    public String env;
}
