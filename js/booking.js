const openBookingButton = document.querySelector("#openBooking");
const bookingModal = document.querySelector("#bookingModal");
const closeBookingButton = document.querySelector(".close");

openBookingButton.addEventListener("click", function() {
    bookingModal.classList.add("show");
    bookingModal.classList.remove("hide");
});

closeBookingButton.addEventListener("click", function() {
    bookingModal.classList.add("hide");
    bookingModal.classList.remove("show");
});

function toggleReturnDate() {
    const selectedFlightType = document.getElementById('flightType').value;
    const returnDateLabel = document.querySelector('label[for="returnDate"]');
    const returnDateInput = document.getElementById('returnDate');

    if (selectedFlightType === 'oneway') {
        returnDateInput.required = false;
        returnDateLabel.style.display = 'none';
        returnDateInput.style.display = 'none';
    } else {
        returnDateInput.required = true;
        returnDateLabel.style.display = 'block';
        returnDateInput.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    toggleReturnDate();
});