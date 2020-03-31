package com.spr.recipe_box;

import com.spr.recipe_box.models.AuthenticationRequest;
import com.spr.recipe_box.models.AuthenticationResponse;
import com.spr.recipe_box.services.MyUserDetailsService;
import com.spr.recipe_box.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HelloResource {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @RequestMapping({"/helloworld"})
    public String hello(){
        return "Hello Maven";
    }

    /*authenticate endpoint maps to createAuthenticationToken*/
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    /*Takes in authenticationRequest which is the payload in the POST body (username/password) */
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try{
            //Uses authenticationManager to authenticate with the username/password that was passed in
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }
        //If it does not authenticate, throw an exception
        catch (BadCredentialsException e){
            throw new Exception("Incorrect username or password", e);
        }

        //If it does authenticate, create a JWT token...

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        //In order to create a Jwt, jwtTokenUtil needs userDetails
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }
}
