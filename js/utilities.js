// Utilities for modals

// Create and show alert modal
function showAlertModal(message, onClose = null) {
  // Remove existing alert modal if present
  const existingAlert = document.getElementById('alertModal');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create alert modal
  const alertModal = document.createElement('div');
  alertModal.id = 'alertModal';
  alertModal.className = 'modal alert-modal';
  alertModal.innerHTML = `
    <div class="modal-content alert-content">
      <span class="close" id="closeAlert">&times;</span>
      <h2>Alert</h2>
      <p>${message}</p>
      <button id="alertOkBtn">OK</button>
    </div>
  `;
  document.body.appendChild(alertModal);

  // Close functionality
  const closeAlertBtn = document.getElementById('closeAlert');
  const alertOkBtn = document.getElementById('alertOkBtn');

  const closeModal = () => {
    alertModal.classList.add('hide');
    setTimeout(() => {
      alertModal.remove();
      if (onClose) onClose();
    }, 300);
  };

  closeAlertBtn.addEventListener('click', closeModal);
  alertOkBtn.addEventListener('click', closeModal);

  // Close on outside click
  alertModal.addEventListener('click', (e) => {
    if (e.target === alertModal) {
      closeModal();
    }
  });

  // Show the modal
  alertModal.classList.add('show');
}

// Create and show summary modal for booking
function showSummaryModal(bookingData) {
  // Remove existing summary modal if present
  const existingSummary = document.getElementById('summaryModal');
  if (existingSummary) {
    existingSummary.remove();
  }

  const flight = bookingData.flight;
  const passenger = bookingData.passenger;
  const totalPrice = flight.price * bookingData.passengers;

  // Create summary modal
  const summaryModal = document.createElement('div');
  summaryModal.id = 'summaryModal';
  summaryModal.className = 'modal summary-modal';
  summaryModal.innerHTML = `
    <div class="modal-content summary-content">
      <span class="close" id="closeSummary">&times;</span>
      <h2>Booking Summary</h2>
      <div class="summary-details">
        <h3>Flight Details</h3>
        <p><strong>Flight No:</strong> ${flight.flightNo}</p>
        <p><strong>From:</strong> ${flight.from}</p>
        <p><strong>To:</strong> ${flight.to}</p>
        <p><strong>Time:</strong> ${flight.time || flight.depart}</p>
        ${flight.return ? `<p><strong>Return:</strong> ${flight.return}</p>` : ""}
        <p><strong>Fare Type:</strong> ${flight.fareType}</p>
        <p><strong>Terminal:</strong> ${flight.terminal}</p>
        <p><strong>Price per Passenger:</strong> ₱${flight.price}</p>
        <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
        <p><strong>Total Price:</strong> ₱${totalPrice}</p>

        <h3>Passenger Details</h3>
        <p><strong>Name:</strong> ${passenger.firstName} ${passenger.lastName}</p>
        <p><strong>Email:</strong> ${passenger.email}</p>
        <p><strong>Phone:</strong> ${passenger.phone}</p>
        <p><strong>Date of Birth:</strong> ${passenger.dob}</p>
        <p><strong>Gender:</strong> ${passenger.gender}</p>

        <h3>Booking Info</h3>
        <p><strong>Type:</strong> ${bookingData.type === 'oneway' ? 'One Way' : 'Round Trip'}</p>
        <p><strong>Depart Date:</strong> ${bookingData.departDate}</p>
        ${bookingData.returnDate ? `<p><strong>Return Date:</strong> ${bookingData.returnDate}</p>` : ""}
      </div>
      <button id="confirmBookingBtn">Confirm Booking</button>
    </div>
  `;
  document.body.appendChild(summaryModal);

  // Close functionality
  const closeSummaryBtn = document.getElementById('closeSummary');
  const confirmBtn = document.getElementById('confirmBookingBtn');

  const closeModal = () => {
    summaryModal.classList.add('hide');
    setTimeout(() => summaryModal.remove(), 300);
  };

  closeSummaryBtn.addEventListener('click', closeModal);

  confirmBtn.addEventListener('click', () => {
    showAlertModal(`Booking confirmed for ${passenger.firstName} ${passenger.lastName}! You will receive a confirmation email at ${passenger.email}.`, () => {
      // Reset forms and close modals
      document.getElementById('bookingForm').reset();
      document.getElementById('passengerForm').reset();
      closeModal();
    });
  });

  // Close on outside click
  summaryModal.addEventListener('click', (e) => {
    if (e.target === summaryModal) {
      closeModal();
    }
  });

  // Show the modal
  summaryModal.classList.add('show');
}
