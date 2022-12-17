import Toastify from "toastify-js";

const Notification = (message: string) => {
  Toastify({
    text: message,
    duration: 5000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#2ecc71",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

export { Notification };
