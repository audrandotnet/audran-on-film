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

const previewBurst = document.createElement("div");
previewBurst.className = "stamp-burst";
previewBurst.setAttribute("aria-hidden", "true");
tabletop.append(previewBurst);

const previewCache = new Map();

const getPreviewImages = (root) => {
  if (previewCache.has(root)) return previewCache.get(root);

  const images = Array.from({ length: 5 }, (_, index) => {
    const image = new Image();
    image.className = "stamp-burst__photo";
    image.src = `${root}/${String(index + 1).padStart(2, "0")}.jpg`;
    image.alt = "";
    image.decoding = "async";
    image.fetchPriority = "low";
    image.style.setProperty("--burst-delay", `${index * 32}ms`);
    image.style.setProperty("--burst-out-delay", `${(4 - index) * 12}ms`);
    return image;
  });

  previewCache.set(root, images);
  return images;
};

const loadPreviewBurst = (stamp) => {
  const root = stamp.dataset.previewRoot;
  if (!root || previewBurst.dataset.root === root) return;
  previewBurst.dataset.root = root;
  previewBurst.replaceChildren(...getPreviewImages(root));
};

stamps.forEach((stamp) => {
  if (stamp.dataset.previewRoot) getPreviewImages(stamp.dataset.previewRoot);
});

const positionPreviewBurst = (stamp) => {
  previewBurst.style.left = `${stamp.offsetLeft + stamp.offsetWidth / 2}px`;
  previewBurst.style.top = `${stamp.offsetTop + stamp.offsetHeight * 0.22}px`;
};

const showPreviewBurst = (stamp) => {
  if (!stamp.classList.contains("stamp--collection")) return;
  loadPreviewBurst(stamp);
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
