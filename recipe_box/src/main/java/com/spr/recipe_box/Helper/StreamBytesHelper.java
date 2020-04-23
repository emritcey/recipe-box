package com.spr.recipe_box.Helper;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class StreamBytesHelper {
    public byte[] getBytes(URL url) throws IOException {
        InputStream in = new BufferedInputStream(url.openStream());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buf = new byte[1024];
        int n = 0;
        while (-1!=(n=in.read(buf)))
        {
            out.write(buf, 0, n);
        }
        closeStream(in, out);
        return out.toByteArray();
    }

    private void closeStream(InputStream in, ByteArrayOutputStream out) throws IOException {
        out.close();
        in.close();
    }
}
