let currentPassengerIndex = 0;
let totalPassengers = 1;
let passengersData = [];

function initializePassengerSystem() {
    totalPassengers = bookingData.passengers || 1;
    currentPassengerIndex = 0;
    passengersData = [];
    updatePassengerForm();
}

function updatePassengerForm() {
    const passengerModal = document.getElementById("passengerModal");
    const modalTitle = passengerModal.querySelector("h2");
    const passengerForm = document.getElementById("passengerForm");
    
    modalTitle.textContent = `Passenger Information (${currentPassengerIndex + 1} of ${totalPassengers})`;
    passengerForm.reset();
    
    const submitButton = passengerForm.querySelector('button[type="submit"]');
    
    if (currentPassengerIndex === totalPassengers - 1) {
        submitButton.textContent = "Complete Booking";
    } else {
        submitButton.textContent = "Next Passenger";
    }
}

document.getElementById("closePassengerModal").addEventListener("click", function() {
    const passengerModal = document.getElementById("passengerModal");
    passengerModal.classList.add("hide");
    passengerModal.classList.remove("show");
    currentPassengerIndex = 0;
    passengersData = [];
});

document.getElementById("passengerModal").addEventListener("click", function(e) {
    if (e.target === this) {
        this.classList.add("hide");
        this.classList.remove("show");
        currentPassengerIndex = 0;
        passengersData = [];
    }
});

function validatePassengerForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dateOfBirth = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;

    const validationErrors = [];
    let formIsValid = true;

    if (!firstName) {
        formIsValid = false;
        validationErrors.push("First name is required.");
    }

    if (!lastName) {
        formIsValid = false;
        validationErrors.push("Last name is required.");
    }

    if (!email) {
        formIsValid = false;
        validationErrors.push("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formIsValid = false;
        validationErrors.push("Please enter a valid email address.");
    }

    if (!phone) {
        formIsValid = false;
        validationErrors.push("Phone number is required.");
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(phone)) {
        formIsValid = false;
        validationErrors.push("Please enter a valid phone number.");
    }

    if (!dateOfBirth) {
        formIsValid = false;
        validationErrors.push("Date of birth is required.");
    } else {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            formIsValid = false;
            validationErrors.push("You must be at least 18 years old to book a flight.");
        }
    }

    if (!gender) {
        formIsValid = false;
        validationErrors.push("Please select your gender.");
    }

    return {
        isValid: formIsValid,
        errors: validationErrors
    };
}

document.getElementById("passengerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const validation = validatePassengerForm();

    if (!validation.isValid) {
        showAlertModal("Please correct the following errors:\n" + validation.errors.join("\n"));
        return;
    }

    const currentPassengerData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value
    };

    passengersData[currentPassengerIndex] = currentPassengerData;

    if (currentPassengerIndex === totalPassengers - 1) {
        bookingData.passengers = passengersData;
        showSummaryModal(bookingData);

        const passengerModal = document.getElementById("passengerModal");
        passengerModal.classList.add("hide");
        passengerModal.classList.remove("show");

        currentPassengerIndex = 0;
        passengersData = [];
    } else {
        currentPassengerIndex++;
        updatePassengerForm();
    }
});
