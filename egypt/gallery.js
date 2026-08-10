const placeholderUrls = [
  "https://lh3.googleusercontent.com/sitesv/AG8ngQUrXo-V9puViUyRnXjurjm-gtGczYBBN6c2vG63rAJSSVi7kD-4mQhIblNrE7XMQPvrzwpHwgFtyGOxT1fOlPVVmVP8O2TqV1IeOYGUqllN2vu3XZwfRUjzC71BbLezuF3Ck8re3IgnriNKX90RagZjDUibsOkr5LZ2h-YjFHZXISyycxFLgGGb8tWhwhpIPyfffrbPF7I-ojBoLTdCy7w3Z4cAnPnRqrXcq12HZh0=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVi4gWdd7EA8tRwY5f0sulWv3vk220fWOyhNEN_2_o-vTIzAhyK48IjUSKoFoiO2zysM0lBUIH3ok9gY7KidM1l1VC2vgNma3yKHIuxq9Qz3aa4pV55osPuklKidJB6R9Lq-Vp_VnAlwFU6kRIA_CXU4RnjxkAvQgHDlVG902P4PLikIwyerEWSBAY9Po2c5yP2yNpjmPMnWzjDcHtDFhlxreEInFvfxDIgKyPx=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQUyPWue4R6ce6QO6FdsEm6ypF7dADcXdwjSdO4lBKN7meKkaRrRB4kb4oAyfyDLIadJ5VmD-G2Og8bRG036R2hgEJ6-J29jZDYYulKKldT0cxEEOmaTGemuyPWKU9b5vOdOuEbBP_-WqCVaZxs4lOqmCtF-dd0XoM0yl-_bKk1OwRCUAz6pPM9nu-Ce60U4vJCNO-ZopkgjzN5mO92Js2-HLX3c2rRJf6pxMwwt4gY=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVa4wAuX1hxeSyayfmJVDkssDncrW05yYMn_Rcwa8Ax3tlptfwQ4sGOFXGTRCzuof44qPK-ApXtwAiUVL4yuKK-hELrjUO8s65UjLrfUfZFiT2a-KGHZSYV7Ti4MZ6tvqsd5TESY18TFENEbfrwEdD1OIoKH5VWmCa7ZxqR_hUXKHh1W3AoGtZexA2c0ifdRvgpCHBxMhKWrCvAMpTIH7rRxrxJWqIGFGFhe9B3OFE=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQWXGLxEpQiRlMYGkw4Kc1BWBz0-_0824CmR_zf5-StZoZ2laNFqcawb4uaumi8bCkRCJQqlxd52LOtsO-6IQNfgASyfbjL9rJ4hXlDVM8JZuHaqm9prMxZwhkQNxGu8fNksfrLrV4XIuuHJd4gIL7lca_PK0rfEh39FMzqLyQOrS2ftVrXm398paV8gnvy4AlSXQ0_MYtKJpCosw9q_cg7kh-kGYsvfPPKer0Ow4ac=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQWk-5R1-A0IjU4f5dh1s8qvdFlcEqmTvmpx2sTPlzdoF5aN_740N4yehTvYY1zs51LlKhcVW4iKz0GyawJrEGvste7LO1s5sXafu3cok8QC6sMvtcGWWuWa07CYJR5qJDtZrSUB0ChyQdIu19ef2CoonWuJiRawO3tGz8X1hAskPclrKCSgK707zxnSBfXljWLrZ8huq07w8pCQ65I_C5ro1VnLxrclS-UsvjeVZ2o=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQWJf1as2m7FLrxvzaOZ2wa_TJErHDEtfhQ_dgIFB_0uXjK4z3uIACH3AWbG_-aMFM4XZAEysOgNaY278Z9rA8-pCUArGbUeCVv4ne_NWLOcfic1kfW4NmsiFApaf2pXcD5u2jQgDKN0YG2wmykMKogjEOikz_9DbOXERGFfobi3VDXojaVUdcjK4epuVESaEPMsN9ofqNM6HtQTv3ODQizaQF-0astckLtJ-hQV=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVSCTOv5VANEZFnstLI6jOrLuHIcHIjIFuKjAkfd7rD59LIKOJbV9OGwwy-CDyzMap6hY1YMQhLY4JH0MkQGo5EhIRTPgzv37tHo2-5-KYC20wiaO6BWelo_1BAtVYowuSjhb1CW3QIb5FSb7rMM6znolygeMd4RS3flVRku7I2n05ZZmkTK2RqmgN995ww4BJhfZxa0aUcjLQfd_vE3067V3OWfGKFW3YKfheWw7w=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQUrGZEnGG7XkYG3vILQ9fcV_ysRH34wN4Dexpavd82Kq6-pEtpcKiWO_RnKzD4Emc2MoVQZ50lvQeDnvEPCin1-sk87Z47srOMhdk-7HjOwtO3H2vPODBAND7J43779vxFJmuTEs0hjyiP8EYxCe9Acu1dsFcLLIxVPIX43Fs39FD5m4z-i-pIgeWJ3LLIFMqDnCiQClsM7ToWBFa99-rRQNj9pMwKzEWoQS6R2=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQUuMzsEZUXTuEFdKTAy3LwMSP0Ut-rKzupzusKiWaedpxEbuqrsR8tVnb8C6XkoUIW0NVpaR3GKDldDuPJGiwHQuZpdpzUagO-3YtizMhMYus7aGxehJgXZLbU4b9p5sW8kAOh4S_ueZ6sDr1w6Z1GIBfoq-JXyzZ7Xkaf2Jbcgmdzxe-13T_Nl66LECn-lCuTnXEKBN8g0N9eeHN0n89bZpdl8rpodzKBbYEqLGyY=w1280",
];
const photoNodes = [...document.querySelectorAll(".gallery-photo")];
photoNodes.slice(placeholderUrls.length).forEach((photo) => photo.remove());
const photos = photoNodes.slice(0, placeholderUrls.length);
photos.forEach((photo, index) => {
  const image = photo.querySelector("img");
  image.src = placeholderUrls[index];
  image.alt = `Égypte, août 2025 — photographie ${String(index + 1).padStart(2, "0")}`;
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
let focusedPlaceholder = null;
let focusedOrigin = null;
let isNavigating = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isMobile = window.matchMedia("(max-width: 760px)").matches;

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

  const animatedPhotos = isMobile ? photos.slice(0, 3) : photos;
  const remainingPhotos = isMobile ? photos.slice(3) : [];
  remainingPhotos.forEach((photo) => { photo.style.opacity = "1"; });
  await fadeElements(animatedPhotos, 1, isMobile ? 260 : 320, isMobile ? 45 : 55);
};

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
    if (!event.isPrimary || event.button !== 0 || drag || focusedPhoto) return;
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

    lastPhoto = photo;
    focusedPhoto = photo;
    const originCenterX = rect.left + rect.width / 2;
    const originCenterY = rect.top + rect.height / 2;
    const originScale = layoutWidth / targetWidth;
    focusedOrigin = { angle, x: originX, y: originY, targetWidth, targetHeight };
    focusedPlaceholder = document.createElement("span");
    focusedPlaceholder.className = "gallery-photo-placeholder";
    focusedPlaceholder.style.width = `${layoutWidth}px`;
    focusedPlaceholder.style.height = `${layoutHeight}px`;
    photo.before(focusedPlaceholder);
    document.body.append(photo);
    Object.assign(photo.style, {
      position: "fixed",
      left: "50%",
      top: "50%",
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      maxHeight: "none",
      margin: "0",
      transform: `translate(-50%, -50%) translate(${originCenterX - window.innerWidth / 2}px, ${originCenterY - window.innerHeight / 2}px) scale(${originScale}) rotate(${angle})`,
    });
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      photo.classList.add("is-focused");
      Object.assign(photo.style, {
        transform: "translate(-50%, -50%) rotate(0deg)",
      });
    }));
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
  if (!lightbox.classList.contains("is-open") || !focusedPhoto || !focusedPlaceholder || !focusedOrigin) return;
  const destination = focusedPlaceholder.getBoundingClientRect();
  const destinationCenterX = destination.left + destination.width / 2 + focusedOrigin.x;
  const destinationCenterY = destination.top + destination.height / 2 + focusedOrigin.y;
  const destinationScale = destination.width / focusedOrigin.targetWidth;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  Object.assign(focusedPhoto.style, {
    transform: `translate(-50%, -50%) translate(${destinationCenterX - window.innerWidth / 2}px, ${destinationCenterY - window.innerHeight / 2}px) scale(${destinationScale}) rotate(${focusedOrigin.angle})`,
  });
  window.setTimeout(() => {
    focusedPhoto.classList.remove("is-focused");
    focusedPlaceholder.before(focusedPhoto);
    focusedPlaceholder.remove();
    focusedPhoto.removeAttribute("style");
    focusedPhoto.dataset.x = `${focusedOrigin.x}`;
    focusedPhoto.dataset.y = `${focusedOrigin.y}`;
    focusedPhoto.style.setProperty("--x", `${focusedOrigin.x}px`);
    focusedPhoto.style.setProperty("--y", `${focusedOrigin.y}px`);
    focusedPhoto = null;
    focusedPlaceholder = null;
    focusedOrigin = null;
    lastPhoto?.focus({ preventScroll: true });
  }, 720);
};

closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

backLink.addEventListener("click", async (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || isNavigating) return;
  event.preventDefault();
  isNavigating = true;
  document.body.classList.add("is-page-leaving");
  const departingPhotos = isMobile ? photos.slice(0, 3).reverse() : [...photos].reverse();
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
