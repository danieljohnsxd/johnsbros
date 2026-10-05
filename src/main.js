import "./main.css";

// Highlight the current page in the nav.
const here = location.pathname.replace(/\/$/, "") || "/";
for (const link of document.querySelectorAll("[data-nav] a")) {
  const target = new URL(link.href).pathname.replace(/\/$/, "") || "/";
  if (target === here) link.setAttribute("aria-current", "page");
}

// The header sits transparent over photo heroes and turns solid once you scroll (or on pages without a hero).
const header = document.querySelector("[data-header]");
const hasHero = Boolean(document.querySelector("[data-hero]"));
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const updateHeader = () => {
  const menuOpen = toggle?.getAttribute("aria-expanded") === "true";
  header.dataset.solid = String(!hasHero || menuOpen || scrollY > 24);
};
updateHeader();
addEventListener("scroll", updateHeader, { passive: true });

// Mobile menu.
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("hidden", !open);
  updateHeader();
});

// Fade sections up as they come into view.
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Contact form posts to the Worker, which emails the team (see src/worker.js).
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
      status.textContent = err.message || "Sorry, that didn't go through. Please call us on 713 553 9444.";
    } finally {
      button.disabled = false;
    }
  });
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
