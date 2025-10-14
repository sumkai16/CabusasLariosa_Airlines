// Passenger modal functionality
document.getElementById("closePassengerModal").addEventListener("click", function() {
  const passengerModal = document.getElementById("passengerModal");
  passengerModal.classList.add("hide");
  passengerModal.classList.remove("show");
});

// Close passenger modal on outside click
document.getElementById("passengerModal").addEventListener("click", function(e) {
  if (e.target === this) {
    this.classList.add("hide");
    this.classList.remove("show");
  }
});

// Passenger form validation and submission
document.getElementById("passengerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;

  // Validation
  let isValid = true;
  let errors = [];

  if (!firstName) {
    isValid = false;
    errors.push("First name is required.");
  }

  if (!lastName) {
    isValid = false;
    errors.push("Last name is required.");
  }

  if (!email) {
    isValid = false;
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    isValid = false;
    errors.push("Please enter a valid email address.");
  }

  if (!phone) {
    isValid = false;
    errors.push("Phone number is required.");
  } else if (!/^\+?[\d\s\-\(\)]+$/.test(phone)) {
    isValid = false;
    errors.push("Please enter a valid phone number.");
  }

  if (!dob) {
    isValid = false;
    errors.push("Date of birth is required.");
  } else {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      isValid = false;
      errors.push("You must be at least 18 years old to book a flight.");
    }
  }

  if (!gender) {
    isValid = false;
    errors.push("Please select your gender.");
  }

  if (!isValid) {
    showAlertModal("Please correct the following errors:\n" + errors.join("\n"));
    return;
  }

  // Add passenger data to bookingData
  bookingData.passenger = { firstName, lastName, email, phone, dob, gender };

  // Show summary modal instead of alert
  showSummaryModal(bookingData);

  // Close the passenger modal
  const passengerModal = document.getElementById("passengerModal");
  passengerModal.classList.add("hide");
  passengerModal.classList.remove("show");

  // Reset form
  this.reset();
});
