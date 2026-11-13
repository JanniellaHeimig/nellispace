const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const progressBar = $(".progress span");
function updateProgress() {
  const available = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${available > 0 ? (scrollY / available) * 100 : 0}%`;
}
addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -4%" });

$$('[data-reveal]').forEach((element, index) => {
  element.style.transitionDelay = `${(index % 3) * 55}ms`;
  revealObserver.observe(element);
});

const viewToggle = $("#view-toggle");
viewToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("darkroom");
  viewToggle.setAttribute("aria-pressed", String(isDark));
  viewToggle.textContent = isDark ? "Daylight" : "Darkroom";
});

const photoCards = $$('[data-photo]');
const lightbox = $("#lightbox");
const lightboxImage = $("#lightbox-image");
const captionTitle = $("#lightbox-caption span:first-child");
const captionIndex = $("#lightbox-caption span:last-child");
let activePhoto = 0;

function renderPhoto(index) {
  activePhoto = (index + photoCards.length) % photoCards.length;
  const card = photoCards[activePhoto];
  const image = $("img", card);
  const [title, number] = $$(".photo-caption span", card).map((item) => item.textContent);
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  captionTitle.textContent = title;
  captionIndex.textContent = `${number} / ${String(photoCards.length).padStart(2, "0")}`;
}

function openLightbox(index) {
  renderPhoto(index);
  lightbox.showModal();
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.close();
  document.body.classList.remove("lightbox-open");
}

photoCards.forEach((card, index) => card.addEventListener("click", () => openLightbox(index)));
$(".lightbox-close").addEventListener("click", closeLightbox);
$(".lightbox-prev").addEventListener("click", () => renderPhoto(activePhoto - 1));
$(".lightbox-next").addEventListener("click", () => renderPhoto(activePhoto + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") renderPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") renderPhoto(activePhoto + 1);
});

const contactButton = $("#contact-button");
if (contactButton) {
  contactButton.addEventListener("click", async () => {
    const status = $("span:last-child", contactButton);
    try {
      await navigator.clipboard.writeText(contactButton.dataset.email);
      status.textContent = "Copied ✓";
    } catch {
      status.textContent = "Select address";
    }
    setTimeout(() => { status.textContent = "Copy address"; }, 2200);
  });
}
