import { generateCodeVerifier, generateState } from "arctic";
import { google } from "~/lib/lucia";
import { cookies } from "next/headers";

export const GET = async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });
  console.log("YES THIS FUNCTION IS CALLED ONLY");
  cookies().set("google_outh_state", state, {
    secure: process.env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookies().set("google_code_verifier", codeVerifier, {
    secure: process.env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
  });

  return Response.redirect(url);
};
