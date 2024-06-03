// File: api/extension/success.ts

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  // This script will be executed in the context of the extension's popup
  const accessToken = url.searchParams.get("accessToken");
  const refreshToken = url.searchParams.get("refreshToken");
  const userId = url.searchParams.get("userId");
  const email = url.searchParams.get("email");
  const profilePhoto = url.searchParams.get("profilePhoto");

  const html = `
  <script>
    const data = {
      success: true,
      accessToken: "${accessToken}",
      refreshToken: "${refreshToken}",
      userId: "${userId}",
      email: "${email}",
      profilePhoto: "${profilePhoto}"
    };
    window.opener.postMessage(data, '*');
    window.close();
  </script>
    `;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
};
