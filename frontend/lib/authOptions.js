import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import GoogleProvider from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SIGN_IN_HANDLERS = {
  credentials: async () => true,

  google: async (account) => {
    try {
      const response = await axios.post(`${API_URL}/srv/social-login/`, {
        provider: "google-oauth2",
        access_token: account.access_token,
      });
      account.meta = response.data;
      return true;
    } catch (error) {
      console.error("Google Sign-In Error:", error.response?.data || error.message);
      return false;
    }
  },
};

const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(`${API_URL}/srv/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data; // access and refresh
  } catch (error) {
    console.error("Token Refresh Error:", error.response?.data || error.message);
    return null;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${API_URL}/srv/login/`, {
            username: credentials.username,
            password: credentials.password,
          });
          
          const { access, refresh } = response.data;
          const decoded = jwtDecode(access);

          return {
            accessToken: access,
            refreshToken: refresh,
            user: {
              id: decoded.user_id,
              username: credentials.username,
              exp: decoded.exp,
              iat: decoded.iat,
            },
          };
        } catch (error) {
          throw new Error(error.response?.data?.detail || "Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](account, user, profile, email, credentials);
    },

    async jwt({ token, user, account }) {
      // প্রাথমিক লগইন
      if (user || account) {
        const access = user?.accessToken || account?.meta?.access;
        const refresh = user?.refreshToken || account?.meta?.refresh;
        const decoded = jwtDecode(access);

        return {
          accessToken: access,
          refreshToken: refresh,
          exp: decoded.exp,
          iat: decoded.iat,
          user: user?.user || {
             id: account.meta.id,
             username: account.meta.username,
          }
        };
      }

   
      if (Date.now() < (token.exp * 1000) - 60000) {
        return token;
      }

       return await refreshAccessToken(token.refreshToken);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/form/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};