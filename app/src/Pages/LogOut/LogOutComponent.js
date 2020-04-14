import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default function LogoutHandler() {
    useEffect(
      () => {
        Cookies.remove("session");
      },
      []
    );
  
    return <Redirect to='/' />;
  };
  