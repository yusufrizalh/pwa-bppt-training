document.addEventListener("DOMContentLoaded", init, false);
function init() {
  if (!navigator.onLine) {
    const statusElement = document.querySelector(".page-status");
    statusElement.innerHTML = "offline";
  }
}
