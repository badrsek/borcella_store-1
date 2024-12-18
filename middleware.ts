import { withClerkMiddleware } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs";

export default withClerkMiddleware({
  publicRoutes: ["/:path*"],
});
console.log(authMiddleware);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};