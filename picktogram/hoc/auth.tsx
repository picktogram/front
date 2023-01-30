import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function withAuth (WrappedComponent : React.FunctionComponent, option : boolean )  {

  function AuthenticationCheck (props: JSX.IntrinsicAttributes) {
      const router = useRouter();

      useEffect( () => {
        const accessToken = localStorage.getItem("token");

        if(!accessToken) {
          if(option) {
            router.push("/login")
          }
        } else {
          if(!option) {
            router.push('/')
          }
        }
      } , [])


      return <WrappedComponent {...props} />
  };
  return AuthenticationCheck;
};


