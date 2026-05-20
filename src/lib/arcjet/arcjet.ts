import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

const arcjetKey = process.env.ARCJET_KEY;
if (!arcjetKey) {
  throw new Error("ARCJE_KEY is require to set up Arcjet");
}

export const aj = arcjet({
  key: arcjetKey,

  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      allow: [],
    }),

    tokenBucket({
      mode: "LIVE",
      capacity: 1,
      refillRate: 0,
      interval: 60,
    }),
  ],
});
