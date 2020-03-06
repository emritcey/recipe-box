package com.spr.recipe_box;

public class Message {
    private String name;
    public Message(String name) {
        this.name = name + ", thanks so much for clicking the button!";
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
