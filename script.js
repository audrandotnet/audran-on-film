const tabletop = document.querySelector(".tabletop");
const home = document.querySelector(".home");
const stamps = [...document.querySelectorAll(".stamp")];
let topLayer = 30;
let dragState = null;
let isNavigating = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const openCollection = (href) => {
  if (isNavigating) return;
  isNavigating = true;
  home.classList.add("is-opening-collection");

  window.setTimeout(() => {
    document.querySelector("#site-title").textContent = "Égypte";
    document.querySelector(".subtitle").textContent = "August 2025";
    home.classList.add("is-title-ready");
  }, 300);

  window.setTimeout(() => {
    window.location.href = href;
  }, 820);
};

const finishDrag = () => {
  if (!dragState) return;

  const { stamp, pointerId, tiltTimer, active } = dragState;
  window.clearTimeout(tiltTimer);
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

window.addEventListener("pageshow", () => {
  isNavigating = false;
  home.classList.remove("is-opening-collection", "is-title-ready");
  document.querySelector("#site-title").textContent = "My film photography";
  document.querySelector(".subtitle").textContent = "A collection by Audran";
});
