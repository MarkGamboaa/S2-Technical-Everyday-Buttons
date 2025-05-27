const days = [
  { name: "Sunday", color: "#ff5733" },
  { name: "Monday", color: "#3498db" },
  { name: "Tuesday", color: "#2ecc71" },
  { name: "Wednesday", color: "#9b59b6" },
  { name: "Thursday", color: "#e67e22" },
  { name: "Friday", color: "#1abc9c" },
  { name: "Saturday", color: "#e84393" },
];

const container = document.getElementById("dayContainer");
const popupWrapper = document.querySelector(".popup-wrapper");

let currentDay = null;
let isAnimating = false;

days.forEach((day) => {
  const box = document.createElement("div");
  box.className = "day-box";
  box.style.backgroundColor = day.color;
  box.innerText = day.name;
  box.onclick = () => {
    if (isAnimating) return;
    if (currentDay === day.name) return;

    isAnimating = true;

    const oldPopup = popupWrapper.querySelector(".popup.slide-down");
    if (oldPopup) {
      const newPopup = createPopup(day, "slide-down");
      popupWrapper.appendChild(newPopup);
      oldPopup.classList.remove("slide-down");
      oldPopup.classList.add("slide-up");
      oldPopup.addEventListener("animationend", function handler() {
        oldPopup.remove();
        isAnimating = false;
        oldPopup.removeEventListener("animationend", handler);
      });
      newPopup.addEventListener("animationend", function handler() {
        currentDay = day.name;
        newPopup.removeEventListener("animationend", handler);
      });
    } else {
      const newPopup = createPopup(day, "slide-down");
      popupWrapper.appendChild(newPopup);
      newPopup.addEventListener("animationend", function handler() {
        isAnimating = false;
        currentDay = day.name;
        newPopup.removeEventListener("animationend", handler);
      });
    }
  };
  container.appendChild(box);
});

function createPopup(day, animationClass) {
  const popup = document.createElement("div");
  popup.className = `popup ${animationClass}`;
  popup.style.backgroundColor = day.color;
  popup.style.visibility = "visible";
  return popup;
}
