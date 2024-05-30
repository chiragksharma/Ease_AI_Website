import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { GitHub, Google } from "arctic";
import { Lucia } from "lucia";
import db from "./db";

const adapter = new PrismaAdapter(db.session, db.user);
const devMode = process.env.NODE_ENV !== "production";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: !devMode,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      name: attributes.name,
      email: attributes.email,
      picture: attributes.picture,
    };
  },
});

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!
);
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
