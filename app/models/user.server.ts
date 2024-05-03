import { prisma } from "~/services/db.server";
import invariant from "tiny-invariant";

import type { User } from "@prisma/client";
import { json } from "@remix-run/node";

export type { User } from "@prisma/client";
import argon2 from "argon2";
import { LoginForm, RegisterForm } from "./types.server";
import { getSession } from "~/services/session.server";

export const getUserById = () => {
  return {};
};

export const getUserByEmail = () => {};

export const deleteUserByEmail = () => {};
export const createUser = async (user: RegisterForm) => {
  try {
    // hashes the password provided in the registration
    const passwordHash = await argon2.hash(user.password);
    // store the new User document using Prisma.
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: passwordHash,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
    // return the id and email of the new user.
    console.log("New User successfully created");

    return { id: newUser.id, email: user.email };
  } catch (err) {
    throw err;
  }
};

export const register = async (user: RegisterForm) => {
  const userExists = await prisma.user.count({ where: { email: user.email } });
  if (userExists) {
    return json(
      { error: "User already exists with that email" },
      { status: 400 }
    );
  }

  invariant(typeof user.email === "string", "email must be a string");
  invariant(user.email.length > 0, "username must not be empty");

  invariant(typeof user.password === "string", "password must be a string");
  invariant(user.password.length > 0, "password must not be empty");

  const newUser = await createUser(user);

  if (!newUser) {
    return json(
      {
        err: "Something went wrong trying to create a user",
        fields: { email: user.email, password: user.password },
      },
      { status: 400 }
    );
  }

  return newUser;
};

export const verifyLogin = async (email: string, password: string) => {
  // query for a user with a matching email.
  const user = await prisma.user.findUnique({ where: { email: email } });
  const verifyPassword = await argon2.verify(user!.password, password)

  if (!user || !verifyPassword) {
    throw new Error("Incorrect Login");
    ;
  }
//   invariant(user, 'User not found')
//   invariant((await argon2.verify(user.password, password)), 'Incorrect password')
  
  

  return { user };
};


export const requireUserId = async (request: Request, redirectTo: string = new URL(request.url).pathname) => {
    const session = await getSession(request)
    const userId = session.get('userId')
    return userId
}

