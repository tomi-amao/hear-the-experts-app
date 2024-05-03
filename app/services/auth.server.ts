import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";

import { FormStrategy } from "remix-auth-form";
import { verifyLogin } from "~/models/user.server";
import { prisma } from "./db.server";
import argon2 from "argon2";
import type { User } from "@prisma/client";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";



export let authenticator = new Authenticator(sessionStorage, { sessionKey: "userId"});

// Tell the Authenticator to use the form strategy
authenticator.use(
    new FormStrategy(async ({ form }) => {
      let email = form.get("email")!.toString();
      let password = form.get("password")!.toString();
      // console.log(password);
      // console.log(email);


      const user = await verifyLogin(email, password)
      // console.log(user);
      

      return user
      
      
    }),
    // each strategy has a name and can be changed to use another one
    // same strategy multiple times, especially useful for the OAuth2 strategy.
    "user-pass"
  );


