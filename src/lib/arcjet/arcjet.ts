import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

const arcjetKey = process.env.ARCJET_KEY;
if (!arcjetKey) {
  throw new Error("ARCJET_KEY is required to set up Arcjet");
}

export const aj = arcjet({
  key: arcjetKey,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [],
    }),

    // Rule A: Global IP-based rate limit for the sign-in form
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      capacity: 10, // 10 total sign-in attempts per IP
      refillRate: 10,
      interval: "60s",
    }),

    // Rule B: Targeted email-based brute-force limit
    tokenBucket({
      mode: "LIVE",
      characteristics: ["email"], // Tracks specifically by the "email" string you pass
      capacity: 3, // Only 3 attempts allowed for a single email address
      refillRate: 3,
      interval: "60s",
    }),
  ],
});
