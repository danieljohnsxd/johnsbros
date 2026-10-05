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

// The site is static, so contact forms open a pre-filled email to the office.
for (const form of document.querySelectorAll("form[data-contact]")) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = `${data.get("first")} ${data.get("last")}`.trim();
    const body = [
      `Name: ${name}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      data.get("message") ? `\n${data.get("message")}` : "",
    ].join("\n");
    location.href = `mailto:info@johnsbros.com?subject=${encodeURIComponent(`Inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  });
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
