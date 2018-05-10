// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

document.addEventListener("DOMContentLoaded", () => {
  let currentImage = null;

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      const video = document.querySelector("#camera");

      video.srcObject = stream;

      document.querySelector("#message").textContent = "Started";

      document.querySelector("#takepicture").addEventListener("click", () => {
        const canvas = document.querySelector("#image");

        const context = canvas.getContext("2d");

        context.drawImage(video, 0, 0, 640, 480);

        canvas.toBlob(blob => {
          if (currentImage != null) {
            URL.revokeObjectURL(currentImage);
          }

          currentImage = URL.createObjectURL(blob);

          document.querySelector("#resultimage").src = currentImage;
        }, "image/jpeg");
      });
    })
    .catch(error => {
      console.error(error);
      document.querySelector("#message").textContent = "Error";
    });
});
