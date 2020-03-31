package com.spr.recipe_box.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    //For real world applications, this would have to connect to a DB to check against users
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return new User("foo", "foo", new ArrayList<>());
    }
}
