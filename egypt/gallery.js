const galleryGrid = document.querySelector(".gallery-grid");
const galleryMediaRoot = galleryGrid.dataset.mediaRoot;
const galleryPhotoCount = Number(galleryGrid.dataset.photoCount);
const galleryPhotoAlt = galleryGrid.dataset.photoAlt;
const placeholderUrls = Array.from(
  { length: galleryPhotoCount },
  (_, index) => `${galleryMediaRoot}/photos/${String(index + 1).padStart(2, "0")}.jpg`,
);
const photoNodes = [...document.querySelectorAll(".gallery-photo")];
photoNodes.slice(placeholderUrls.length).forEach((photo) => photo.remove());
const photos = photoNodes.slice(0, placeholderUrls.length);
galleryGrid.style.setProperty("--gallery-columns", galleryPhotoCount <= 8 ? 5 : galleryPhotoCount <= 12 ? 6 : galleryPhotoCount <= 15 ? 8 : 9);
photos.forEach((photo, index) => {
  const image = photo.querySelector("img");
  const updateOrientation = () => {
    photo.classList.toggle("is-portrait", image.naturalHeight > image.naturalWidth);
  };
  image.addEventListener("error", () => {
    image.src = `${galleryMediaRoot}/photos/${index + 1}.jpg`;
  }, { once: true });
  image.src = placeholderUrls[index];
  image.alt = `${galleryPhotoAlt} — photographie ${String(index + 1).padStart(2, "0")}`;
  if (image.complete) updateOrientation();
  else image.addEventListener("load", updateOrientation, { once: true });
});
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector(".lightbox__close");
const backLink = document.querySelector(".gallery-back");
const galleryTitle = document.querySelector(".gallery-heading h1");
const gallerySubtitle = document.querySelector(".gallery-heading p");
let drag = null;
let lastPhoto = null;
let focusedPhoto = null;
let focusedOrigin = null;
let focusedAnimation = null;
let isNavigating = false;
let focusedIndex = -1;
let isPhotoChanging = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isMobile = window.matchMedia("(max-width: 760px)").matches;

const lightboxNavigation = document.createElement("div");
lightboxNavigation.className = "lightbox__navigation";
lightboxNavigation.innerHTML = `
  <button class="lightbox__arrow lightbox__arrow--previous" type="button" aria-label="Photographie précédente">←</button>
  <span class="lightbox__counter" aria-live="polite"></span>
  <button class="lightbox__arrow lightbox__arrow--next" type="button" aria-label="Photographie suivante">→</button>
`;
lightbox.append(lightboxNavigation);
const previousButton = lightboxNavigation.querySelector(".lightbox__arrow--previous");
const nextButton = lightboxNavigation.querySelector(".lightbox__arrow--next");
const lightboxCounter = lightboxNavigation.querySelector(".lightbox__counter");

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

const fadeElements = async (elements, to, duration, stagger = 0) => {
  const list = [...elements];
  if (reduceMotion.matches) {
    list.forEach((element) => { element.style.opacity = `${to}`; });
    return;
  }

  const startingOpacities = list.map((element) => Number.parseFloat(getComputedStyle(element).opacity));
  list.forEach((element) => { element.style.opacity = `${to}`; });
  list.map((element, index) => element.animate(
    [{ opacity: startingOpacities[index] }, { opacity: to }],
    { duration, delay: index * stagger, easing: "cubic-bezier(0.37, 0, 0.63, 1)", fill: "backwards" },
  ));
  await wait(duration + Math.max(0, list.length - 1) * stagger);
};

const enterGallery = async () => {
  [galleryTitle, gallerySubtitle, ...photos].forEach((element) => { element.style.opacity = "0"; });
  document.body.classList.remove("is-page-leaving");
  document.body.classList.add("is-page-ready");

  const headingAnimation = fadeElements(
    [galleryTitle, gallerySubtitle],
    1,
    isMobile ? 230 : 280,
    isMobile ? 20 : 35,
  );

  await Promise.all(photos.slice(0, isMobile ? 1 : 2).map(async (photo) => {
    const image = photo.querySelector("img");
    if (!image || image.complete) return;
    await new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
      window.setTimeout(resolve, 900);
    });
  }));
  await headingAnimation;

  await fadeElements(photos, 1, isMobile ? 240 : 320, isMobile ? 28 : 55);
};

const finishDrag = (event) => {
  if (!drag || (event && event.pointerId !== drag.pointerId)) return;
  const { photo, pointerId, moved } = drag;
  drag = null;
  photo.classList.remove("is-dragging");
  if (photo.hasPointerCapture(pointerId)) photo.releasePointerCapture(pointerId);
  if (moved) {
    photo.dataset.justDragged = "true";
    window.setTimeout(() => delete photo.dataset.justDragged, 180);
  }
};

const getPhotoPresentation = (photo) => {
    const rect = photo.getBoundingClientRect();
    const image = photo.querySelector("img");
    const layoutWidth = photo.offsetWidth;
    const layoutHeight = photo.offsetHeight;
    const angle = getComputedStyle(photo).getPropertyValue("--angle").trim() || "0deg";
    const originX = Number(photo.dataset.x) || 0;
    const originY = Number(photo.dataset.y) || 0;
    const ratio = image.naturalWidth && image.naturalHeight
      ? image.naturalWidth / image.naturalHeight
      : rect.width / rect.height;
    const frameStyle = getComputedStyle(photo);
    const horizontalFrame = Number.parseFloat(frameStyle.paddingLeft)
      + Number.parseFloat(frameStyle.paddingRight);
    const verticalFrame = Number.parseFloat(frameStyle.paddingTop)
      + Number.parseFloat(frameStyle.paddingBottom);
    const maxWidth = window.innerWidth * (isMobile ? 0.9 : 0.84);
    const maxHeight = window.innerHeight * (isMobile ? 0.76 : 0.84);
    let contentWidth = maxWidth - horizontalFrame;
    let contentHeight = contentWidth / ratio;
    if (contentHeight + verticalFrame > maxHeight) {
      contentHeight = maxHeight - verticalFrame;
      contentWidth = contentHeight * ratio;
    }
    const targetWidth = contentWidth + horizontalFrame;
    const targetHeight = contentHeight + verticalFrame;
    const originCenterX = rect.left + rect.width / 2;
    const originCenterY = rect.top + rect.height / 2;
    const originScale = layoutWidth / targetWidth;

    return {
      angle,
      contentHeight,
      contentWidth,
      frameStyle,
      image,
      layoutHeight,
      layoutWidth,
      originCenterX,
      originCenterY,
      originScale,
      originX,
      originY,
      targetHeight,
      targetWidth,
    };
};

const createFocusedPhoto = (photo, presentation) => {
    const clone = photo.cloneNode(true);
    clone.classList.add("is-focused");
    clone.disabled = true;
    clone.setAttribute("aria-hidden", "true");
    const focusedImage = clone.querySelector("img");
    Object.assign(focusedImage.style, {
      width: `${presentation.contentWidth}px`,
      height: `${presentation.contentHeight}px`,
      maxWidth: "none",
      maxHeight: "none",
      objectFit: "contain",
    });
    const fullResolutionImage = focusedImage.cloneNode(false);
    const fullResolutionUrl = new URL(presentation.image.currentSrc || presentation.image.src, window.location.href);
    fullResolutionUrl.searchParams.set("full-resolution", "1");
    fullResolutionImage.removeAttribute("srcset");
    fullResolutionImage.className = "gallery-photo__full-resolution";
    fullResolutionImage.alt = "";
    fullResolutionImage.decoding = "async";
    fullResolutionImage.fetchPriority = "high";
    Object.assign(fullResolutionImage.style, {
      position: "absolute",
      top: `${Number.parseFloat(presentation.frameStyle.paddingTop)}px`,
      left: `${Number.parseFloat(presentation.frameStyle.paddingLeft)}px`,
      width: `${presentation.contentWidth}px`,
      height: `${presentation.contentHeight}px`,
      opacity: "0",
      objectFit: "contain",
      transition: "opacity 180ms ease",
    });
    fullResolutionImage.addEventListener("load", async () => {
      try { await fullResolutionImage.decode(); } catch {}
      fullResolutionImage.style.opacity = "1";
    }, { once: true });
    clone.append(fullResolutionImage);
    fullResolutionImage.src = fullResolutionUrl.href;
    return clone;
};

const updateLightboxCounter = () => {
  lightboxCounter.textContent = `${String(focusedIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
};

const wrappedPhotoIndex = (index) => (index + photos.length) % photos.length;

const preloadPhoto = (index) => {
  const sourceImage = photos[wrappedPhotoIndex(index)]?.querySelector("img");
  if (!sourceImage) return;
  const url = new URL(sourceImage.currentSrc || sourceImage.src, window.location.href);
  url.searchParams.set("full-resolution", "1");
  const preload = new Image();
  preload.decoding = "async";
  preload.fetchPriority = "high";
  preload.src = url.href;
};

const preloadNeighbours = () => {
  preloadPhoto(focusedIndex - 1);
  preloadPhoto(focusedIndex + 1);
};

const openPhoto = (photo) => {
    if (photo.dataset.justDragged || focusedPhoto) return;
    const presentation = getPhotoPresentation(photo);
    lastPhoto = photo;
    focusedIndex = photos.indexOf(photo);
    focusedOrigin = presentation;
    focusedPhoto = createFocusedPhoto(photo, presentation);
    document.body.append(focusedPhoto);
    galleryGrid.classList.add("has-zoomed-photo");
    photo.classList.add("is-zoom-source");
    photo.style.visibility = "hidden";
    const originTransform = `translate(-50%, -50%) scale(${presentation.originScale}) rotate(${presentation.angle})`;
    const focusedTransform = `translate(-50%, -50%) translate(${window.innerWidth / 2 - presentation.originCenterX}px, ${window.innerHeight / 2 - presentation.originCenterY}px) scale(1) rotate(0deg)`;
    Object.assign(focusedPhoto.style, {
      position: "fixed",
      left: `${presentation.originCenterX}px`,
      top: `${presentation.originCenterY}px`,
      width: `${presentation.targetWidth}px`,
      height: `${presentation.targetHeight}px`,
      maxHeight: "none",
      margin: "0",
      transform: focusedTransform,
    });
    focusedAnimation = focusedPhoto.animate(
      [{ transform: originTransform }, { transform: focusedTransform }],
      { duration: 760, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
    );
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    updateLightboxCounter();
    preloadNeighbours();
    closeButton.focus({ preventScroll: true });
};

const navigatePhoto = async (direction) => {
  if (!focusedPhoto || isPhotoChanging || photos.length < 2) return;
  isPhotoChanging = true;
  previousButton.disabled = true;
  nextButton.disabled = true;
  const outgoingPhoto = focusedPhoto;
  const outgoingSource = lastPhoto;
  const shift = isMobile ? Math.min(window.innerWidth * 0.18, 72) : Math.min(window.innerWidth * 0.1, 150);
  const outgoingLeft = Number.parseFloat(outgoingPhoto.style.left);
  const outgoingTop = Number.parseFloat(outgoingPhoto.style.top);
  const outgoingCenterX = window.innerWidth / 2 - outgoingLeft;
  const outgoingCenterY = window.innerHeight / 2 - outgoingTop;
  const outgoingTransform = `translate(-50%, -50%) translate(${outgoingCenterX - direction * shift}px, ${outgoingCenterY}px) scale(0.985) rotate(${-direction * 2.4}deg)`;
  focusedAnimation?.cancel();
  const outgoingAnimation = outgoingPhoto.animate(
    [
      { transform: getComputedStyle(outgoingPhoto).transform, opacity: 1 },
      { transform: outgoingTransform, opacity: 0 },
    ],
    { duration: reduceMotion.matches ? 1 : 220, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" },
  );
  await outgoingAnimation.finished.catch(() => {});
  outgoingSource.style.visibility = "visible";
  outgoingSource.classList.remove("is-zoom-source");
  outgoingPhoto.remove();
  await wait(reduceMotion.matches ? 0 : 35);

  focusedIndex = wrappedPhotoIndex(focusedIndex + direction);
  lastPhoto = photos[focusedIndex];
  focusedOrigin = getPhotoPresentation(lastPhoto);
  focusedPhoto = createFocusedPhoto(lastPhoto, focusedOrigin);
  lastPhoto.classList.add("is-zoom-source");
  lastPhoto.style.visibility = "hidden";
  const incomingTransform = `translate(-50%, -50%) translate(${direction * shift}px, 0) scale(0.985) rotate(${direction * 2.4}deg)`;
  const centeredTransform = "translate(-50%, -50%) scale(1) rotate(0deg)";
  Object.assign(focusedPhoto.style, {
    position: "fixed",
    left: `${window.innerWidth / 2}px`,
    top: `${window.innerHeight / 2}px`,
    width: `${focusedOrigin.targetWidth}px`,
    height: `${focusedOrigin.targetHeight}px`,
    maxHeight: "none",
    margin: "0",
    opacity: "1",
    transform: centeredTransform,
  });
  document.body.append(focusedPhoto);
  focusedAnimation = focusedPhoto.animate(
    [
      { transform: incomingTransform, opacity: 0 },
      { transform: centeredTransform, opacity: 1 },
    ],
    { duration: reduceMotion.matches ? 1 : 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" },
  );
  await focusedAnimation.finished.catch(() => {});
  updateLightboxCounter();
  preloadNeighbours();
  previousButton.disabled = false;
  nextButton.disabled = false;
  isPhotoChanging = false;
};

photos.forEach((photo) => {
  photo.dataset.x = "0";
  photo.dataset.y = "0";

  photo.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || drag || focusedPhoto) return;
    drag = {
      photo,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      originX: Number(photo.dataset.x),
      originY: Number(photo.dataset.y),
      moved: false,
    };
  });

  photo.addEventListener("lostpointercapture", finishDrag);

  photo.addEventListener("click", () => {
    openPhoto(photo);
  });

  photo.openFromPointer = () => openPhoto(photo);
});

document.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  if (drag.pointerType === "mouse" && (event.buttons & 1) === 0) return finishDrag(event);

  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;
  if (!drag.moved && Math.hypot(dx, dy) < 5) return;
  if (!drag.moved) {
    drag.moved = true;
    drag.photo.setPointerCapture(event.pointerId);
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

document.addEventListener("pointerup", (event) => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const { photo, moved, pointerType } = drag;
  finishDrag(event);
  if (!moved && pointerType !== "mouse") photo.openFromPointer();
});
document.addEventListener("pointercancel", finishDrag);

const closeLightbox = () => {
  if (!lightbox.classList.contains("is-open") || !focusedPhoto || !lastPhoto || !focusedOrigin || isPhotoChanging) return;
  const destination = lastPhoto.getBoundingClientRect();
  const currentTransform = getComputedStyle(focusedPhoto).transform;
  const destinationCenterX = destination.left + destination.width / 2;
  const destinationCenterY = destination.top + destination.height / 2;
  const deltaX = destinationCenterX - Number.parseFloat(focusedPhoto.style.left);
  const deltaY = destinationCenterY - Number.parseFloat(focusedPhoto.style.top);
  const destinationTransform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) scale(${focusedOrigin.originScale}) rotate(${focusedOrigin.angle})`;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  focusedAnimation?.cancel();
  focusedPhoto.style.transform = destinationTransform;
  focusedAnimation = focusedPhoto.animate(
    [{ transform: currentTransform }, { transform: destinationTransform }],
    { duration: 760, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
  );
  focusedAnimation.finished.catch(() => {}).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      lastPhoto.style.visibility = "visible";
      focusedPhoto.style.visibility = "hidden";
      requestAnimationFrame(() => {
        focusedPhoto.remove();
        lastPhoto.classList.remove("is-zoom-source");
        galleryGrid.classList.remove("has-zoomed-photo");
        focusedPhoto = null;
        focusedOrigin = null;
        focusedAnimation = null;
        focusedIndex = -1;
      });
    }));
  });
};

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => navigatePhoto(-1));
nextButton.addEventListener("click", () => navigatePhoto(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") navigatePhoto(-1);
  if (event.key === "ArrowRight") navigatePhoto(1);
});

backLink.addEventListener("click", async (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || isNavigating) return;
  event.preventDefault();
  isNavigating = true;
  document.body.classList.add("is-page-leaving");
  const departingPhotos = [...photos].reverse();
  await fadeElements(departingPhotos, 0, isMobile ? 210 : 250, isMobile ? 18 : 18);
  await fadeElements([gallerySubtitle, galleryTitle], 0, isMobile ? 210 : 240, isMobile ? 10 : 22);
  window.location.href = backLink.href;
});

window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  isNavigating = false;
  enterGallery();
});

requestAnimationFrame(() => requestAnimationFrame(enterGallery));
