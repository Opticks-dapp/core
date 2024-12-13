import "dotenv/config";

if (!process.env.apikey) throw new Error("Apikey is required");

export const apiKey = process.env.apikey;
