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
function toggleReturnDate() {
  const flightType = document.getElementById('flightType').value;
  const returnContainer = document.getElementById('returnContainer');
  const returnDateInput = document.getElementById('returnDate');

  if (flightType === 'roundtrip') {
    returnContainer.style.display = 'block';
    returnDateInput.required = true;
  } else {
    returnContainer.style.display = 'none';
    returnDateInput.required = false;
  }
}
