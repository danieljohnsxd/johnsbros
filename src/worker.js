// Serves the static site and handles the contact form.
// Static files are served before this script runs; only /api/* reaches it (see run_worker_first).

const INBOX = "info@johnsbros.com";
const SENDER = { email: "website@johnsbros.com", name: "JohnsBros Website" };
const LIMITS = { first: 100, last: 100, email: 254, phone: 40, message: 5000 };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form data" }, 400);
  }

  // Bots fill the hidden "company" field; pretend it worked so they move on.
  if (form.get("company")) return json({ ok: true });

  const field = (name) => String(form.get(name) ?? "").trim().slice(0, LIMITS[name]);
  const data = Object.fromEntries(Object.keys(LIMITS).map((name) => [name, field(name)]));

  if (!data.first || !data.last || !data.phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ error: "Please fill in your name, a valid email and your phone number." }, 400);
  }

  const name = `${data.first} ${data.last}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    data.message || "(no message)",
  ];

  try {
    await env.EMAIL.send({
      to: INBOX,
      from: SENDER,
      replyTo: { email: data.email, name },
      subject: `Website inquiry from ${name}`,
      text: lines.join("\n"),
    });
  } catch (err) {
    console.error("contact email failed", err?.code ?? "", err?.message ?? err);
    return json({ error: `Sorry, that didn't go through. Please email ${INBOX} or call 713 553 9444.` }, 502);
  }

  return json({ ok: true });
}

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}
