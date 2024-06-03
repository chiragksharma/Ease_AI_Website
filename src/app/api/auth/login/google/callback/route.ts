import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "~/lib/db";
import { google, lucia } from "~/lib/lucia";
import { parseJWT } from "oslo/jwt";
import { sendWelcomeEmail } from "~/server/mail";
import { Borel } from "next/font/google";

// https://localhost:3000/login?from=extension&browser=chrome
// Login URL for Web App (always redirect to dashboard):
// https://localhost:3000/login?redirectTo=/dashboard

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  console.log("This is the callback redirect url: ", url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const redirectTo = url.searchParams.get("redirectTo") ?? "/dashboard";
  const fromExtension = url.searchParams.get("from") === "extension";
  const storedState = cookies().get("google_outh_state")?.value ?? null;
  const StoredCodeVerifier = cookies().get("google_code_verifier")?.value;
  const from = cookies().get("oauth_from")?.value ?? null;
  const browser = cookies().get("oauth_browser")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }
  console.log("This is from: ", from);
  console.log("Browser or not? ", browser);

  const testConnection = await db.user.findFirst();
  if (!testConnection) {
    return new Response(
      JSON.stringify({ error: "failed to connect with prisma" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      StoredCodeVerifier as string
    );
    // const googleUser = parseJWT(tokens.idToken)!.payload as GoogleUser;

    const googleUserResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await googleUserResponse.json();

    const userDetails = {
      id: googleUser.id,
      name: googleUser.name,
      email: googleUser.email,
      picture: googleUser.picture,
      verifiedEmail: googleUser.verified_email,
    };

    // Sending data back to the Chrome extension sidebar
    // if (window.opener) {
    //   window.opener.postMessage(
    //     { token: tokens.accessToken, userDetails },
    //     'http://localhost:3000'
    //   );
    //   window.close();
    // }

    const existingUser = await db.user.findUnique({
      where: {
        googleId: googleUser.id,
      },
    });

    if (existingUser) {
      console.log("Creating session for existing user...");
      const session = await lucia.createSession(existingUser.id, {});
      console.log("Session created:", session);

      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      // Call auth-status route

      if (from == "extension") {
        // Handle extension-specific actions
        console.log("CALM DOwn baby this is from extension ");
        console.log("This is from extension");
        const successUrl = new URL(
          "https://www.easeai.site/api/auth/auth-success/"
        );
        successUrl.searchParams.set("accessToken", tokens.accessToken);
        successUrl.searchParams.set("refreshToken", tokens.refreshToken ?? "");
        successUrl.searchParams.set("userId", googleUser.id);
        successUrl.searchParams.set("email", googleUser.email);
        successUrl.searchParams.set("profilePhoto", googleUser.picture);

        return new Response(null, {
          status: 302,
          headers: { Location: successUrl.toString() },
        });
      } else {
        // Redirect to the specified page or dashboard
        console.log("REDIRECTING TO Dashboard");
        return new Response(null, {
          status: 302,
          headers: { Location: redirectTo },
        });
      }
    }

    // const newUser = await db.user.create({
    //   data: {
    //     googleId: googleUser.sub,
    //     name: googleUser.name,
    //     email: googleUser.email,
    //     picture: googleUser.picture,
    //     emailVerified: Boolean(googleUser.verified_email),
    //   },
    // });
    let newUser;
    try {
      newUser = await db.user.create({
        data: {
          googleId: googleUser.id,
          name: googleUser.name,
          email: googleUser.email,
          picture: googleUser.picture,
          emailVerified: Boolean(googleUser.verified_email),
        },
      });
      console.log("New User Created:", newUser);
    } catch (err) {
      console.error("Error creating new user:", err);
      return new Response(
        JSON.stringify({ error: "Error creating new user" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (googleUser.email)
      sendWelcomeEmail({ toMail: newUser.email!, userName: newUser.name! });
    console.log("Creating session for new user...");
    const session = await lucia.createSession(newUser.id, {});
    console.log("Session created:", session);
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    // Call auth-status route

    if (fromExtension) {
      // Handle extension-specific actions
      return new Response(null, {
        status: 302,
        headers: { Location: "https://www.easeai.site/api/extension/success" }, // Replace with your extension's success URL
      });
    } else {
      // Redirect to the specified page or dashboard
      return new Response(null, {
        status: 302,
        headers: { Location: redirectTo },
      });
    }
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};

interface GoogleUser {
  // sub: string; // Corresponds to id
  id: string;
  name: string;
  email: string;
  picture: string;
  verified_email: boolean;
}
