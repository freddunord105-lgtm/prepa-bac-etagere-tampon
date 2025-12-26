import { GAS_URL } from "./config";

export async function onRequestGet() {
  const resp = await fetch(`${GAS_URL}?action=bacsTampon`, { method: "GET" });
  const text = await resp.text();

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
