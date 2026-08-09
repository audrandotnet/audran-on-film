const tabletop = document.querySelector(".tabletop");
const stamps = [...document.querySelectorAll(".stamp")];
let topLayer = stamps.length;
let dragState = null;

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
    const surface = tabletop.getBoundingClientRect();
    const item = stamp.getBoundingClientRect();
    let x = item.left - surface.left;
    let y = item.top - surface.top;

    if (event.key === "ArrowLeft") x -= step;
    if (event.key === "ArrowRight") x += step;
    if (event.key === "ArrowUp") y -= step;
    if (event.key === "ArrowDown") y += step;

    stamp.style.left = `${clamp(x, 0, surface.width - stamp.offsetWidth)}px`;
    stamp.style.top = `${clamp(y, 0, surface.height - stamp.offsetHeight)}px`;
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

  const surface = tabletop.getBoundingClientRect();
  const maxX = Math.max(0, surface.width - stamp.offsetWidth);
  const maxY = Math.max(0, surface.height - stamp.offsetHeight);
  const x = clamp(event.clientX - surface.left - dragState.offsetX, 0, maxX);
  const y = clamp(event.clientY - surface.top - dragState.offsetY, 0, maxY);

  stamp.style.left = `${x}px`;
  stamp.style.top = `${y}px`;
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
