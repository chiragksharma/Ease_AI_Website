import { generateCodeVerifier, generateState } from "arctic";
import { google, lucia } from "~/lib/lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const browser = url.searchParams.get("browser");

  console.log("These are the url,from,browser etc. :", url, from, browser);

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const authUrl = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  // cookies().set("temp_session_id", tempSession.id, {
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  //   httpOnly: true,
  //   maxAge: 60 * 10, // 10 min
  //   sameSite: "lax",
  // });

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
  if (from) {
    cookies().set("oauth_from", from, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });
  }
  if (browser) {
    cookies().set("oauth_browser", browser, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });
  }

  let finalUrl = authUrl.toString();

  if (from && browser) {
    finalUrl += `&from=${encodeURIComponent(from)}&browser=${encodeURIComponent(browser)}`;
  }
  console.log("This is the final url: ", finalUrl);

  return Response.redirect(finalUrl);
};
