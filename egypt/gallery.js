const photos = [...document.querySelectorAll(".gallery-photo")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector(".lightbox__close");
let drag = null;
let lastPhoto = null;

const finishDrag = (event) => {
  if (!drag || (event && event.pointerId !== drag.pointerId)) return;
  const { photo, pointerId, moved } = drag;
  drag = null;
  photo.classList.remove("is-dragging");
  if (photo.hasPointerCapture(pointerId)) photo.releasePointerCapture(pointerId);
  if (moved) {
    photo.dataset.justDragged = "true";
    setTimeout(() => delete photo.dataset.justDragged, 0);
  }
};

photos.forEach((photo) => {
  photo.dataset.x = "0";
  photo.dataset.y = "0";

  photo.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || event.pointerType === "touch" || drag) return;
    photo.setPointerCapture(event.pointerId);
    drag = {
      photo,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: Number(photo.dataset.x),
      originY: Number(photo.dataset.y),
      moved: false,
    };
  });

  photo.addEventListener("lostpointercapture", finishDrag);
  photo.addEventListener("click", () => {
    if (photo.dataset.justDragged) return;
    const image = photo.querySelector("img");
    lastPhoto = photo;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    closeButton.focus({ preventScroll: true });
  });
});

document.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  if (event.pointerType === "mouse" && (event.buttons & 1) === 0) return finishDrag(event);

  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;
  if (!drag.moved && Math.hypot(dx, dy) < 5) return;
  if (!drag.moved) {
    drag.moved = true;
    drag.photo.classList.add("is-dragging");
  }

  event.preventDefault();
  const x = drag.originX + dx;
  const y = drag.originY + dy;
  drag.photo.dataset.x = `${x}`;
  drag.photo.dataset.y = `${y}`;
  drag.photo.style.setProperty("--x", `${x}px`);
  drag.photo.style.setProperty("--y", `${y}px`);
}, { passive: false });

document.addEventListener("pointerup", finishDrag);
document.addEventListener("pointercancel", finishDrag);

const closeLightbox = () => {
  if (!lightbox.classList.contains("is-open")) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    lightboxImage.src = "";
    lastPhoto?.focus({ preventScroll: true });
  }, 280);
};

closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
