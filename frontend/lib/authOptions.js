
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

import GoogleProvider from "next-auth/providers/google";



const SIGN_IN_HANDLERS = {
  credentials: async () => {
    return true;
  },

  google: async (account) => {
    try {
      console.log(account.access_token, 'google-access-token')
      const response = await axios.post(
        "https://full-stack-jwt-authentication.onrender.com/api/social-login/",
        {
          provider: "google-oauth2",
          access_token: account.access_token,
        }
      );
   
      account.meta = response.data;
      return true;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return false;
    }
  },
};

const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(`https://full-stack-jwt-authentication.onrender.com/api/refresh/`, {
      refresh: refreshToken,
    });
    const { access, refresh } = response.data;
    return {
      access,
      refresh,
    };
  } catch (error) {
    console.error(
      "refresh token input invalid",
      error.response.data || error.message
    );
    return null;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
        scope: "openid email profile", // Explicitly define scope
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "https://full-stack-jwt-authentication.onrender.com/api/login/",
            {
              username: credentials.username,
              password: credentials.password,
            }
          );
          const { access, refresh } = response.data;
          const tokenDecoded = jwtDecode(access);
          if (!tokenDecoded) throw new Error("field to decode token");

          return {
            accessToken: access,
            refreshToken: refresh,
            user: {
              exp: tokenDecoded.exp,
              id: tokenDecoded.user_id,
              iat: tokenDecoded.iat,
            },
          };
        } catch (error) {
          console.error("login field:", error.response.data || error.message);
          throw new Error("Invalid credentials input");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
 
      return SIGN_IN_HANDLERS[account.provider](
        account,
        user,
        profile,
        email,
        credentials
      );
    },

    async redirect({ url, baseUrl }) {
      if( url.startsWith(baseUrl)){
        return url
      }
      if (url.includes('/api/auth')){
         return `${baseUrl}/dashboard`;
      }
      return `${baseUrl}/dashboard`;
    },
    

    async jwt({ token, user, account }) {

      if (user || account) {
        token.accessToken = user.accessToken || account.meta.access;
        token.refreshToken = user.refreshToken || account.meta.refresh;
        token.exp = jwtDecode(
          user.accessToken ? user.accessToken : account?.meta.access
        ).exp;
        token.iat = jwtDecode(
          user.accessToken ? user.accessToken : account?.meta.access
        ).iat;
        token.user = user.user || {
          id: account.meta.id,
          username: account.meta.username,
          exp: jwtDecode(account.meta.access).exp,
          iat: jwtDecode(account.meta.access).iat,
          client_user: user,
        };
      }

      if (token.exp && new Date.now() >= token.exp * 1000) {
        const newToken = await refreshAccessToken(token.refreshToken);
        if (newToken) {
          token.accessToken = newToken.access;
          token.exp = jwtDecode(newToken.access).exp;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      console.log(session, 'session')
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/form/login",
  },
};




