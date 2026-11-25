const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const modal = document.querySelector(".project-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");

function openProject(button) {
  if (!modal || !modalImage || !modalTitle || !modalDescription) return;

  modalTitle.textContent = button.dataset.modalTitle || "";
  modalDescription.textContent = button.dataset.modalDescription || "";
  modalImage.src = button.dataset.modalImage || "";
  modalImage.alt = button.dataset.modalTitle || "Project preview";

  modal.showModal();
  document.body.classList.add("modal-open");
}

document.querySelectorAll("[data-modal-title]").forEach((button) => {
  button.addEventListener("click", () => openProject(button));
});

document.querySelector(".modal-close")?.addEventListener("click", () => {
  modal?.close();
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

modal?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});