const placeholderUrls = [
  "https://lh3.googleusercontent.com/sitesv/AG8ngQUe8fjhUfGyXK6J331eLm2GdSftvF2akO24OzYevwL7yQJn2F3UbpQLZrLyOZ-pOjFsN-azN_cDHNXfxXSV4LxcDelEpHJdWcS9badcUZELdQBv-sXWBGlLI03GfhNgKK3r6Npw5WqEyjuJv8e-XsVlgoHfiuBfICVquMuOwyPucrfkfyt2RnxKK6eOsVR0UrIQUU_ZFLLztx-Y9fhC0jobEjnIcTEIeOZnCG4KHME=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQX2F-xIlhQXEEoGpAl4LYAVQKGPiTVkyziL4xDZXkWyZktpAwZa07HU1boX_jEWnWIbZLM28i1EXh7z2Kwhwnd975qT3hOSJC8y0wkqop7nVoNWEGzqMjlrPZEMAFmQesnld-goVR6b0utAKFhaR7C_Oi7lvTaXKkyNU2qQsuQdUVQZEWcRKRDQOWdf_GOvVoGKvUE2xZkZfSDqqT-Qm_isCvp9SlEvWGh1Owye=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQUQt0fMtIEcCfV1zBzjPRVsqM2CsSFSyk_3JRRSGmfNn9o6edMLrc1XYLU2u6r8tfFwtZ0M45gp6AwaoMAz8tRS2mq8jUq4WjZlR2rkCehQ82q-PC8UO5vvlyC14u-MlzwyfAF3ai1mogqaMwuBfCdWtonofE_lvNto7Yybi1VGDt_4lyAyK0LNiAavqlfMLOpP-S-L06giMlfiA8Bf_dvM-WYXalyd8hFj4j8isUk=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQUFc48ZmPIrFisoIaEovYrWR2goAnh9zj2-rYCkX7HxP6DxTDL-_EcZYmWSxZbpqrcG8wB3kJCLYtKWPLD_lz4_giSuTC7pR1ND05ZSr_hlWRUWz6tSJWgIzJD4duKXQ9iRdT2oN5e_Sv26FYQwwJS4uZWFvm6g2peaN8NcZ6fEIFoXMtoX1q7K8_xeAPNVys0XlOVvOEFgtrZqRNTerQ37DmisLmxchT_tvPWxRHc=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVLmSkeBGW_FO60hk87eQDocnRKUg143AJkPUW-B4UefWtSfm3hmuOnGdbQ_wdNjEmvj3hZ5jDXml5U7ke39HHzWqmAKKjcZmC12gvbaCsBq1LS0NLKmQ1IWmYKNQJbTMyw8979mydlv0jAgdMVBJYP98hwuQfsDhtu9q1d9fl-nR4iSlnfxqHrkilWqTsHotZGuxOKk0UaY2qg2K2b_8rFaaaccAG5ogBHzM4-IWY=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQXFEIQetFkWKyPA_Ba5B50hlpGX-myLYJim1FVqx_-z3tRVeIrtUwe5LNLoIlznoP_EfcA-B-FKzX8VlqI59aOIdDOVpwgcW0LzqjER60eFerx9EtWe3OycrR4Beqsow0XgbSncZ2vJCo071f_zuH-A8K8hZRr0_mQLPERswcNQZG_VDYD0Z8_W9yDY3SaY_RglpPaJZgRwPv_ltO2Tc15iJagOEkXnYQ3lnpRltDA=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVqOWx5dnKbfe3pBKeMrYycXASDl-zwOvzHT3RC101-e7Nx1KsoiaaPn6BrMHYZiw9eubJ6OlrQWVbu55MUbpXb4IqXTYAFXU7J1kdUKGYvsWU5ZbjTNXQVnVcQ40X60s5jtPDNTjeKXNXgSHWOKzCeN4iIUE9uYFQFmuBpNAFpb796q2kwBmUbDPLw45n8ops8tf1RB1lNq5bnqNUNfVMUWwkMTgGCpx5b4tp8=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVQgjVbXj75lGYyB3pvRtcjP2bgPFJrqKGCr2T5te1f1zqpG-I0OPhXEXH068TNBRRUxGbl-5S6GE5VTTX9UIGjmt8O5bX-in7GoN0QqUnVx8Wb-t5DisBQiUqfxZfJm7D92rWBPg06lsLk7UcpcAMr2C5MNo82hDRUe9K4h9NI36fO-yEdCTxbeeJhicBoGnq6hsXzHIUwKVrtgnqISCIb6ZdtAhHqa7MZB5tjRAo=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVlYOTssJAqQvPmnzWeDNpnsB5K2eR68jHk1kw1Mm-Vf0lpepjxA-hPl58lw5ut05ndG-jOIT1wR10cj0rAMQMVcJkSySeLhhpswcz6IH1mRMMSd3krkmvQmPpkDCkAFUOlX8zl7-tqJvE-jgALCIlD3OWEPqSJsDR8AMERsXpf_eTbo4hurNQ1JiONLqFOVQw7P2BpHr_32evq4OM-qwG1oAFSsr94fbqHXm9V=w1280",
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
const galleryGrid = document.querySelector(".gallery-grid");
let drag = null;
let lastPhoto = null;
let focusedPhoto = null;
let focusedOrigin = null;
let focusedAnimation = null;
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
  const openPhoto = () => {
    if (photo.dataset.justDragged || focusedPhoto) return;
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
    const originCenterX = rect.left + rect.width / 2;
    const originCenterY = rect.top + rect.height / 2;
    const targetScale = targetWidth / layoutWidth;
    focusedOrigin = { angle, x: originX, y: originY, layoutWidth, layoutHeight, targetScale };
    focusedPhoto = photo.cloneNode(true);
    focusedPhoto.classList.add("is-focused");
    focusedPhoto.disabled = true;
    focusedPhoto.setAttribute("aria-hidden", "true");
    document.body.append(focusedPhoto);
    galleryGrid.classList.add("has-zoomed-photo");
    photo.classList.add("is-zoom-source");
    photo.style.visibility = "hidden";
    const originTransform = `translate(-50%, -50%) rotate(${angle})`;
    const focusedTransform = `translate(-50%, -50%) translate(${window.innerWidth / 2 - originCenterX}px, ${window.innerHeight / 2 - originCenterY}px) scale(${targetScale}) rotate(0deg)`;
    Object.assign(focusedPhoto.style, {
      position: "fixed",
      left: `${originCenterX}px`,
      top: `${originCenterY}px`,
      width: `${layoutWidth}px`,
      height: `${layoutHeight}px`,
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
    closeButton.focus({ preventScroll: true });
  };

  photo.addEventListener("click", () => {
    openPhoto();
  });

  photo.openFromPointer = openPhoto;
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
  if (!lightbox.classList.contains("is-open") || !focusedPhoto || !lastPhoto || !focusedOrigin) return;
  const destination = lastPhoto.getBoundingClientRect();
  const currentTransform = getComputedStyle(focusedPhoto).transform;
  const destinationCenterX = destination.left + destination.width / 2;
  const destinationCenterY = destination.top + destination.height / 2;
  const deltaX = destinationCenterX - Number.parseFloat(focusedPhoto.style.left);
  const deltaY = destinationCenterY - Number.parseFloat(focusedPhoto.style.top);
  const destinationTransform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) scale(1) rotate(${focusedOrigin.angle})`;
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
      });
    }));
  });
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
