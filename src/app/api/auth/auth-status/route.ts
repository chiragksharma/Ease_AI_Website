// File: api/auth-status/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "~/lib/db"; // Import your database configuration

export const GET = async (request: NextRequest) => {
  const sessionCookie = cookies().get("session_cookie_name"); // Replace with your session cookie name

  if (!sessionCookie) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = await db.session.findUnique({
    where: { id: sessionCookie.value },
    include: { user: true }, // Include user details
  });

  if (!session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userDetails = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    picture: session.user.picture,
  };

  return new Response(JSON.stringify({ authenticated: true, userDetails }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
