const tabletop = document.querySelector(".tabletop");
const stamps = [...document.querySelectorAll(".stamp")];
let topLayer = stamps.length;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

stamps.forEach((stamp) => {
  let dragState = null;

  stamp.addEventListener("pointerdown", (event) => {
    const surface = tabletop.getBoundingClientRect();
    const item = stamp.getBoundingClientRect();

    stamp.style.left = `${item.left - surface.left}px`;
    stamp.style.top = `${item.top - surface.top}px`;
    stamp.style.zIndex = `${++topLayer}`;
    stamp.classList.add("is-dragging");
    stamp.setPointerCapture(event.pointerId);

    dragState = {
      pointerId: event.pointerId,
      offsetX: event.clientX - item.left,
      offsetY: event.clientY - item.top,
    };
  });

  stamp.addEventListener("pointermove", (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const surface = tabletop.getBoundingClientRect();
    const maxX = Math.max(0, surface.width - stamp.offsetWidth);
    const maxY = Math.max(0, surface.height - stamp.offsetHeight);
    const x = clamp(event.clientX - surface.left - dragState.offsetX, 0, maxX);
    const y = clamp(event.clientY - surface.top - dragState.offsetY, 0, maxY);

    stamp.style.left = `${x}px`;
    stamp.style.top = `${y}px`;
  });

  const release = (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    stamp.classList.remove("is-dragging");
    dragState = null;
  };

  stamp.addEventListener("pointerup", release);
  stamp.addEventListener("pointercancel", release);

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
