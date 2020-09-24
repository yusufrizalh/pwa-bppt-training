document.addEventListener("DOMContentLoaded", init, false);

function init() {
  const btnNotification = document.querySelector(".btn-notification");

  btnNotification.addEventListener("click", () => {
    // melakukan cek terhadap notification (allow atau denied)
    showNotifications();
  });

  function showNotifications() {
    navigator.serviceWorker.register("../service-worker.js");
    Notification.requestPermission(function (result) {
      if (result === "denied") {
        // tombol block ditekan
        console.log("Access Denied!");
      } else if (result === "granted") {
        // tombol allow ditekan
        console.log("Access Granted!");
        navigator.serviceWorker.ready.then(function (notify) {
          notify.showNotification("Ada event terjadi", {
            body: "Ada pesan yang dibaca",
            tag: "simple-notification",
            icon: "../images/notification.png",
          });
        });
      }
    });
  }
}
