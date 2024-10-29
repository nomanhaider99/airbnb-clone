import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import { compare } from "bcryptjs";

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) { // Use the defined type here
                // Check if both email and password are provided
                if (!credentials.email || !credentials.password) {
                    throw new Error('Invalid credentials!');
                }

                // Find user by email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                // Check if user exists and has a hashed password
                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials!');
                }

                // Compare the provided password with the hashed password
                const isCorrectPassword = await compare(credentials.password as string, user.hashedPassword);

                // If the password is incorrect, throw an error
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials!");
                }

                // Return the user if credentials are valid
                return user;
            },
        })
    ],
} satisfies NextAuthConfig;
