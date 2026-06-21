import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";


export const { handlers, auth, signIn, signOut } = NextAuth({

    adapter: PrismaAdapter(prisma),

    providers:[

        Credentials({

            credentials:{
                email:{},
                password:{}
            },


            async authorize(credentials){

                if(
                    !credentials?.email || !credentials?.password
                ){
                    return null;
                }


                const user =
                await prisma.user.findUnique({

                    where:{
                        email:
                        credentials.email as string
                    }

                });


                if(!user){
                    return null;
                }


                const validPassword =
                await bcrypt.compare(
                    credentials.password as string,
                    user.password

                );


                if(!validPassword){
                    return null;
                }


                return {
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                };


            }

        }),


        Google({

            clientId:
            process.env.GOOGLE_CLIENT_ID!,

            clientSecret:
            process.env.GOOGLE_CLIENT_SECRET!

        }),


        Facebook({

            clientId:
            process.env.FACEBOOK_CLIENT_ID!,

            clientSecret:
            process.env.FACEBOOK_CLIENT_SECRET!

        })
    ],


    session:{
        strategy:"jwt"
    },


    pages:{
        signIn:"/login"
    },

    callbacks:{

        async jwt({ token, user }) {

            if (user) {
                token.role = user.role;
            }
            return token;
        },


        async session({ session, token }) {

            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        }

    }


});