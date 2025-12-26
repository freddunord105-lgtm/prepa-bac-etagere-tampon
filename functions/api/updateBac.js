export async function onRequestPost({ request }) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxhR2IMaSde9lCt3rU3fMHuLM18tNL0X8vN5SGXtm6z0kwSwhf0SG3G6MGUnLmqaovH/exec";

  try {
    const form = await request.formData();
    const bac = String(form.get("bac") || "").trim();
    const qtyAdded = String(form.get("qtyAdded") || "0").trim();

    const body = new URLSearchParams();
    body.set("action", "updateBac");
    body.set("bac", bac);
    body.set("qtyAdded", qtyAdded);

    const resp = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: body.toString(),
    });

    const text = await resp.text();

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
