let openBtn = document.querySelector("#openBooking");
let modal = document.querySelector("#bookingModal");
let closeBtn = document.querySelector(".close");

openBtn.addEventListener("click", () => {
    modal.classList.add("show");
    modal.classList.remove("hide");
});
closeBtn.addEventListener("click", () => {
    modal.classList.add("hide");
    modal.classList.remove("show");
  
});
