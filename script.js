const tabletop = document.querySelector(".tabletop");
const home = document.querySelector(".home");
const stamps = [...document.querySelectorAll(".stamp")];
const collectionView = document.querySelector("#collection-view");
const openCollectionButton = document.querySelector("[data-open-collection]");
const closeCollectionButton = document.querySelector("[data-close-collection]");
const galleryPhotos = [...document.querySelectorAll(".gallery-photo")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector(".lightbox__image");
const lightboxClose = lightbox.querySelector(".lightbox__close");
let topLayer = 30;
let dragState = null;
let photoDragState = null;
let lastFocusedPhoto = null;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const finishDrag = () => {
  if (!dragState) return;

  const { stamp, pointerId, tiltTimer, active } = dragState;
  window.clearTimeout(tiltTimer);
  dragState = null;
  stamp.classList.remove("is-dragging");
  stamp.style.setProperty("--drag-tilt", "0deg");
  if (active) {
    stamp.classList.add("is-settling");
    window.setTimeout(() => stamp.classList.remove("is-settling"), 650);
  }

  if (stamp.hasPointerCapture(pointerId)) {
    stamp.releasePointerCapture(pointerId);
  }
};

stamps.forEach((stamp) => {
  stamp.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || dragState) return;
    event.preventDefault();
    stamp.classList.remove("is-settling");

    const surface = tabletop.getBoundingClientRect();
    const item = stamp.getBoundingClientRect();

    stamp.style.left = `${item.left - surface.left}px`;
    stamp.style.top = `${item.top - surface.top}px`;
    stamp.setPointerCapture(event.pointerId);

    dragState = {
      stamp,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - item.left,
      offsetY: event.clientY - item.top,
      grabBias: clamp(((event.clientX - item.left) / item.width - 0.5) * 1.6, -0.8, 0.8),
      lastX: event.clientX,
      lastTime: performance.now(),
      velocityX: 0,
      tiltTimer: 0,
      active: false,
    };
  });

  stamp.addEventListener("lostpointercapture", () => {
    if (dragState?.stamp === stamp) finishDrag();
  });

  stamp.addEventListener("keydown", (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const step = event.shiftKey ? 20 : 6;
    const surface = home.getBoundingClientRect();
    const container = tabletop.getBoundingClientRect();
    const item = stamp.getBoundingClientRect();
    let x = item.left - surface.left;
    let y = item.top - surface.top;

    if (event.key === "ArrowLeft") x -= step;
    if (event.key === "ArrowRight") x += step;
    if (event.key === "ArrowUp") y -= step;
    if (event.key === "ArrowDown") y += step;

    const boundedX = clamp(x, 0, surface.width - stamp.offsetWidth);
    const boundedY = clamp(y, 0, surface.height - stamp.offsetHeight);
    stamp.style.left = `${surface.left + boundedX - container.left}px`;
    stamp.style.top = `${surface.top + boundedY - container.top}px`;
    stamp.style.zIndex = `${++topLayer}`;
  });
});

document.addEventListener("pointermove", (event) => {
  if (!dragState || dragState.pointerId !== event.pointerId) return;

  if (dragState.pointerType === "mouse" && (event.buttons & 1) === 0) {
    finishDrag();
    return;
  }

  const distance = Math.hypot(
    event.clientX - dragState.startX,
    event.clientY - dragState.startY,
  );

  if (!dragState.active) {
    if (distance < 4) return;
    dragState.active = true;
    dragState.stamp.style.zIndex = `${++topLayer}`;
    dragState.stamp.classList.add("is-dragging");
  }

  event.preventDefault();
  const { stamp } = dragState;
  const now = performance.now();
  const elapsed = Math.max(8, now - dragState.lastTime);
  const instantVelocity = (event.clientX - dragState.lastX) / elapsed;
  dragState.velocityX = dragState.velocityX * 0.62 + instantVelocity * 0.38;
  dragState.lastX = event.clientX;
  dragState.lastTime = now;

  const tilt = clamp(dragState.grabBias + dragState.velocityX * 3.2, -4.2, 4.2);
  stamp.style.setProperty("--drag-tilt", `${tilt.toFixed(2)}deg`);
  window.clearTimeout(dragState.tiltTimer);
  dragState.tiltTimer = window.setTimeout(() => {
    if (!dragState || dragState.stamp !== stamp) return;
    dragState.velocityX = 0;
    stamp.style.setProperty("--drag-tilt", `${dragState.grabBias.toFixed(2)}deg`);
  }, 75);

  const surface = home.getBoundingClientRect();
  const container = tabletop.getBoundingClientRect();
  const maxX = Math.max(0, surface.width - stamp.offsetWidth);
  const maxY = Math.max(0, surface.height - stamp.offsetHeight);
  const x = clamp(event.clientX - surface.left - dragState.offsetX, 0, maxX);
  const y = clamp(event.clientY - surface.top - dragState.offsetY, 0, maxY);

  stamp.style.left = `${surface.left + x - container.left}px`;
  stamp.style.top = `${surface.top + y - container.top}px`;
}, { passive: false });

document.addEventListener("pointerup", (event) => {
  if (dragState?.pointerId === event.pointerId) finishDrag();
});

document.addEventListener("pointercancel", (event) => {
  if (dragState?.pointerId === event.pointerId) finishDrag();
});

window.addEventListener("blur", finishDrag);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) finishDrag();
});

const openCollection = () => {
  finishDrag();
  home.classList.add("is-leaving");

  window.setTimeout(() => {
    home.hidden = true;
    home.setAttribute("aria-hidden", "true");
    document.body.classList.add("is-collection");
    collectionView.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, left: 0 });
    collectionView.scrollTo({ top: 0, left: 0 });
    requestAnimationFrame(() => collectionView.classList.add("is-visible"));
  }, 280);
};

const closeCollection = () => {
  collectionView.classList.remove("is-visible");

  window.setTimeout(() => {
    collectionView.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-collection");
    home.hidden = false;
    home.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, left: 0 });
    requestAnimationFrame(() => home.classList.remove("is-leaving"));
  }, 380);
};

openCollectionButton.addEventListener("click", openCollection);
closeCollectionButton.addEventListener("click", closeCollection);

const finishPhotoDrag = (event) => {
  if (!photoDragState || (event && photoDragState.pointerId !== event.pointerId)) return;

  const { photo, pointerId, moved } = photoDragState;
  photoDragState = null;
  photo.classList.remove("is-photo-dragging");

  if (photo.hasPointerCapture(pointerId)) photo.releasePointerCapture(pointerId);

  if (moved) {
    photo.dataset.suppressClick = "true";
    window.setTimeout(() => delete photo.dataset.suppressClick, 0);
  }
};

galleryPhotos.forEach((photo) => {
  photo.dataset.x = "0";
  photo.dataset.y = "0";

  photo.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || event.pointerType === "touch" || photoDragState) return;

    photo.setPointerCapture(event.pointerId);
    photoDragState = {
      photo,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: Number(photo.dataset.x),
      originY: Number(photo.dataset.y),
      moved: false,
    };
  });

  photo.addEventListener("lostpointercapture", (event) => finishPhotoDrag(event));

  photo.addEventListener("click", () => {
    if (photo.dataset.suppressClick) return;
    lastFocusedPhoto = photo;
    const image = photo.querySelector("img");
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    lightboxClose.focus({ preventScroll: true });
  });
});

document.addEventListener("pointermove", (event) => {
  if (!photoDragState || photoDragState.pointerId !== event.pointerId) return;

  if (event.pointerType === "mouse" && (event.buttons & 1) === 0) {
    finishPhotoDrag(event);
    return;
  }

  const deltaX = event.clientX - photoDragState.startX;
  const deltaY = event.clientY - photoDragState.startY;

  if (!photoDragState.moved && Math.hypot(deltaX, deltaY) < 5) return;
  if (!photoDragState.moved) {
    photoDragState.moved = true;
    photoDragState.photo.classList.add("is-photo-dragging");
  }

  event.preventDefault();
  const x = photoDragState.originX + deltaX;
  const y = photoDragState.originY + deltaY;
  photoDragState.photo.dataset.x = `${x}`;
  photoDragState.photo.dataset.y = `${y}`;
  photoDragState.photo.style.setProperty("--photo-x", `${x}px`);
  photoDragState.photo.style.setProperty("--photo-y", `${y}px`);
}, { passive: false });

document.addEventListener("pointerup", finishPhotoDrag);
document.addEventListener("pointercancel", finishPhotoDrag);

const closeLightbox = () => {
  if (!lightbox.classList.contains("is-open")) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    lightboxImage.src = "";
    lastFocusedPhoto?.focus({ preventScroll: true });
  }, 300);
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
