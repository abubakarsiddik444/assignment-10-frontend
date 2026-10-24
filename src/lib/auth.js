import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
