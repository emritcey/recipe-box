package com.spr.recipe_box.Service.Services;

import com.spr.recipe_box.Constant.Constants;
import com.spr.recipe_box.Helper.HeadersHelper;
import com.spr.recipe_box.Helper.StreamBytesHelper;
import com.spr.recipe_box.Service.Interface.ICat;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import java.io.*;
import java.net.URL;

@Component
public class CatService implements ICat {
    StreamBytesHelper streamBytesHelper = new StreamBytesHelper();

    public HttpEntity<byte[]> RandomCatPicture() throws IOException {
        URL url = new URL(Constants.CAT_URL + Constants.CAT);
        return getHttpEntity(url);
    }

    public HttpEntity<byte[]> RandomCatGif() throws IOException {
        URL url = new URL(Constants.CAT_URL + Constants.GIF);
        return getHttpEntity(url);
    }

    private HttpEntity<byte[]> getHttpEntity(URL url) throws IOException {
        byte[] response = streamBytesHelper.getBytes(url);
        HttpHeaders headers = new HeadersHelper().imageStreamHeader(response);
        return new HttpEntity<byte[]>(response, headers);
    }
}
