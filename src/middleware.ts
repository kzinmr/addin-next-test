export { default } from "next-auth/middleware"
// If there is a token, the user is authenticated to access any page.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}