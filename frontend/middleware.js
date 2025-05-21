import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/form/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};        
