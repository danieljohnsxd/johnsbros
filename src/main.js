import "./main.css";

// Highlight the current page in the nav.
const here = location.pathname.replace(/\/$/, "") || "/";
for (const link of document.querySelectorAll("[data-nav] a")) {
  const target = new URL(link.href).pathname.replace(/\/$/, "") || "/";
  if (target === here) link.setAttribute("aria-current", "page");
}

// Mobile menu.
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("hidden", !open);
});

// Contact forms post to the Worker, which emails the team (see src/worker.js).
for (const form of document.querySelectorAll("form[data-contact]")) {
  const button = form.querySelector("button");
  const status = form.querySelector("[data-status]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    status.textContent = "Sending…";
    try {
      const res = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error);
      form.reset();
      status.textContent = "Thanks, we got your message and will be in touch soon.";
    } catch (err) {
      status.textContent = err.message || "Sorry, that didn't go through. Please email info@johnsbros.com or call 713 553 9444.";
    } finally {
      button.disabled = false;
    }
  });
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
