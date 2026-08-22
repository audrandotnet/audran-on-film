const tabletop = document.querySelector(".tabletop");
const home = document.querySelector(".home");
const stamps = [...document.querySelectorAll(".stamp")];
let topLayer = 30;
let dragState = null;
let isNavigating = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isMobile = window.matchMedia("(max-width: 760px)").matches;
const title = document.querySelector("#site-title");
const subtitle = document.querySelector(".subtitle");

const egyptPreviewUrls = [
  "https://lh3.googleusercontent.com/sitesv/AG8ngQXj4NjNvBN9HhCIhe_CSayoCVZsLwOuGszCP3v0zwAZtKTJ4LESyGMEq4VmSITTVrofZv2A1dRWk2Rf2JG8tkZYN8bCsSbG9fyDW6IQONvt12Q7CgxLgeF4lmYA8-oW4mqPP_5cQWj8MrAfurdHBWZlvZcnePCFVOitfdStB-yyJNeQ9tk27LCkcEPPuCanElnCuiKSiCfjfsGp_x4NaLvG3zGuRD_QVqU-dp2P0pI=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQXUBK2jJmJe6WVPDuBX7olxNtkUWQTV8iXonzC3VPaU7XMq6ffGDCsmwYPqh81DILb_8HQlxNMlkmR-DEAeS0TcKbcZ74ASRaMcbuXlCRW8vJ8LseKB-jy4WScFDTVA47EQ6EMX0W2nUQcYFVSl5BA8QyhJoklRpXQzt8aF0LGMmJNf9zTZLk6nhY73fZi62zFdBIK-8lsOzJ-v3sC_DiWgasCOe_KjouPzdmJE=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVlO9nakkEH9ppV_S28iVN7uiV28t2WM_GTEX3nMm5rbat3euUrlRk4zXPBEr8v9L8lMmAq5wRSmRlJsaUudu8UhWztL7_rObgPrf92s_beI69Rj9Ioa13Ryn9bpWhW-8_mC9NvjgUso7-O0yiA-a6qpi4EUzDMl6OcQEfNk_Y9Qh1DSi1JzrR2TuFIaL2a_MmtAjPKhLL39vpKMS2uZtezoQZ-n6V8lNFan6jmlXs=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQWAmqnlkGtTFuLFs4CB3VV8XsJ9F2iD6sSZGpaqdSpYOLZghmd1cFCsZtIMypeBOu8avuEP5u8kUWG3CSNX7RHuDLXMlUfHTdhEqjSnvgAHSwqItIWNqOxd93BMxh_WQzEchrgFPVPnH_MD9vDdp4E97ThkMNo9A63Fx2uvKj8h5gVEsxjCTPWHUvxXrQsxxghJOFMmm8U46WeeHrLKBGOxa1TCOek9cBJknWl04Hs=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQXI5qvNlUv6E_d6d_9DnJfJWLrZqsIkRnUitZeHn3AybddpnnQtyYCi_Gx12inru0PcHAKo-ZyBcawMQxNVfi85QK1GVboquDJ6TSvxSTt3k5qyl5sREp1LKFYkcEPm7wD8kmyhHikciaW0aiUYV-MQUef0tHzg3wsySJ7cnccsqnseYZkNIWwL4PMJJCIWIfStCu31oVjODmmGltxj4UkQNL0qdMD2ClctvDjikUQ=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQXk1ytIEb-jOVSxfB812TFuZtH2YiFSlOobJjsIJqzlY0HxG9YvIO1izCqu8dXuqoiL3XtKEJVcxs1qxbT4WPx8YU3bqSYjTqsjF_PZ_4Iw7rVmkr6-XpMT2N4R8adeZyaBN2-t0EfiW4kxh5PX0hESigPbd9uPIQ7GCGU2grU3d2WGyhHVF6Er47jJN6q7OF9Yc5_QA-YTfMfUMKm55UjdXCcUMtd9zsFXRBhelMM=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQXfI5WdUH1tGfY5I98I1fLO5eM456CZfR7qVq4NW3siMej2G4aZJuisxYLvDElvMO-3FOc2S6YHnrxy02V2LYqzJsmzlT6Rnw8xZyywvR8-ciiNSLKNOycsBxp1XXfXlxKTtk6M_2Lqq1PwKy5-HV_OVnTZbUl9NX01KuxBNkSQPxA6FL3JG1kLlpLsQpHbYl5BrDcAekBM6vqxL9hDoSyfZckLNzNEmLM0DETa=w1280",
  "https://lh3.googleusercontent.com/sitesv/AG8ngQVtYJYPuQ1U-srNQPEGJRvYlE7s5FCHyrH_rzKxteJPHlhAudQ5cdsNwadxwOe7DfeIRnDZCtHPDoqFWSNYXIbs9Au9TNLaPwntZAO5CPKTGDJ_-Dya82sR9Q5qBxx1TkB2acCH4OLs0R4T0M4jgnNvouJIyzGWYWKIOSwcxtc8Y7omhH_f_asXDI50vqy_J7PKzMUx0fxbGEnghKTb3hQndwURvo9vg35eqw04=w1280",
];

const previewBurst = document.createElement("div");
previewBurst.className = "stamp-burst";
previewBurst.setAttribute("aria-hidden", "true");
egyptPreviewUrls.forEach((src, index) => {
  const image = document.createElement("img");
  image.className = "stamp-burst__photo";
  image.src = src;
  image.alt = "";
  image.decoding = "async";
  image.loading = "eager";
  image.style.setProperty("--burst-delay", `${index * 32}ms`);
  image.style.setProperty("--burst-out-delay", `${(egyptPreviewUrls.length - index - 1) * 12}ms`);
  previewBurst.append(image);
});
tabletop.append(previewBurst);

const positionPreviewBurst = (stamp) => {
  previewBurst.style.left = `${stamp.offsetLeft + stamp.offsetWidth / 2}px`;
  previewBurst.style.top = `${stamp.offsetTop + stamp.offsetHeight * 0.22}px`;
};

const showPreviewBurst = (stamp) => {
  if (!stamp.classList.contains("stamp--collection")) return;
  positionPreviewBurst(stamp);
  previewBurst.style.zIndex = `${Math.max(1, Number(stamp.style.zIndex || topLayer) - 1)}`;
  previewBurst.classList.add("is-visible");
};

const hidePreviewBurst = () => {
  previewBurst.classList.remove("is-visible");
};

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

const enterHomepage = async () => {
  [title, subtitle, ...stamps].forEach((element) => { element.style.opacity = "0"; });
  document.body.classList.remove("is-page-leaving");
  document.body.classList.add("is-page-ready");
  await fadeElements([title, subtitle], 1, isMobile ? 230 : 280, isMobile ? 20 : 35);
  await fadeElements(stamps, 1, isMobile ? 240 : 300, isMobile ? 18 : 42);
};

const openCollection = async (href) => {
  if (isNavigating) return;
  isNavigating = true;
  document.body.classList.add("is-page-leaving");
  await fadeElements(stamps, 0, isMobile ? 230 : 280, isMobile ? 0 : 14);
  await fadeElements([title, subtitle], 0, isMobile ? 210 : 240, isMobile ? 10 : 22);
  window.location.href = href;
};

const finishDrag = () => {
  if (!dragState) return;

  const { stamp, pointerId, tiltTimer, active } = dragState;
  window.clearTimeout(tiltTimer);
  hidePreviewBurst();
  dragState = null;
  stamp.classList.remove("is-dragging");
  stamp.style.setProperty("--drag-tilt", "0deg");

  if (active) {
    stamp.dataset.justDragged = "true";
    stamp.classList.add("is-settling");
    window.setTimeout(() => stamp.classList.remove("is-settling"), 650);
    window.setTimeout(() => delete stamp.dataset.justDragged, 160);
  }

  if (stamp.hasPointerCapture(pointerId)) stamp.releasePointerCapture(pointerId);
};

stamps.forEach((stamp) => {
  stamp.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || dragState) return;
    stamp.classList.remove("is-settling");

    const item = stamp.getBoundingClientRect();
    stamp.style.left = `${stamp.offsetLeft}px`;
    stamp.style.top = `${stamp.offsetTop}px`;
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
    if ((event.key === "Enter" || event.key === " ") && stamp.dataset.href) {
      event.preventDefault();
      openCollection(stamp.dataset.href);
      return;
    }

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

  const distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
  if (!dragState.active) {
    if (distance < 4) return;
    dragState.active = true;
    dragState.stamp.setPointerCapture(event.pointerId);
    dragState.stamp.style.zIndex = `${++topLayer}`;
    dragState.stamp.classList.add("is-dragging");
    showPreviewBurst(dragState.stamp);
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
  if (previewBurst.classList.contains("is-visible")) positionPreviewBurst(stamp);
}, { passive: false });

document.addEventListener("pointerup", (event) => {
  if (dragState?.pointerId !== event.pointerId) return;
  const href = !dragState.active ? dragState.stamp.dataset.href : null;
  finishDrag();
  if (href) openCollection(href);
});

document.addEventListener("pointercancel", (event) => {
  if (dragState?.pointerId === event.pointerId) finishDrag();
});

window.addEventListener("blur", finishDrag);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) finishDrag();
});

window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  isNavigating = false;
  enterHomepage();
});

requestAnimationFrame(() => requestAnimationFrame(enterHomepage));
