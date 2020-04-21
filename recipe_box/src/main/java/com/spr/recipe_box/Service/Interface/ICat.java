package com.spr.recipe_box.Service.Interface;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface ICat {
    HttpEntity<byte[]> RandomCatPicture() throws IOException;
    HttpEntity<byte[]> RandomCatGif() throws IOException;
}
