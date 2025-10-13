// Step 1: Create arrays for available flights
const oneWayFlights = [
  { flightNo: "5J 560", from: "Manila", to: "Cebu", time: "08:00 AM", price: 3500, seats: 20, hours: 1.5, fareType: "Promo Fare" },
  { flightNo: "PR 221", from: "Manila", to: "Davao", time: "10:30 AM", price: 4200, seats: 15, hours: 2, fareType: "Regular" },
  { flightNo: "Z2 103", from: "Manila", to: "Iloilo", time: "01:00 PM", price: 2800, seats: 10, hours: 1, fareType: "Promo Fare" }
];

const roundTripFlights = [
  { flightNo: "5J 561", from: "Manila", to: "Cebu", depart: "07:00 AM", return: "05:00 PM", price: 6000, seats: 25, hours: 1.5, fareType: "Regular" },
  { flightNo: "PR 300", from: "Manila", to: "Davao", depart: "09:00 AM", return: "06:30 PM", price: 7500, seats: 18, hours: 2, fareType: "Promo Fare" },
  { flightNo: "Z2 104", from: "Manila", to: "Iloilo", depart: "11:00 AM", return: "07:00 PM", price: 5800, seats: 12, hours: 1, fareType: "Regular" }
];

function displayFlights(type) {
  // Remove existing results modal if present
  const existingModal = document.getElementById('resultsModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Create results modal
  const resultsModal = document.createElement('div');
  resultsModal.id = 'resultsModal';
  resultsModal.className = 'modal results-modal';
  resultsModal.innerHTML = `
    <div class="modal-content results-content">
      <span class="close" id="closeResults">&times;</span>
      <h2>Flight Results</h2>
      <div id="flightContainer" class="flight-list"></div>
    </div>
  `;
  document.body.appendChild(resultsModal);

  let flights = type === "oneway" ? oneWayFlights : roundTripFlights;

  const container = document.getElementById('flightContainer');
  container.innerHTML = ""; // clear old results

  if (flights.length === 0) {
    container.innerHTML = '<p>No flights available for this search.</p>';
    return;
  }

  flights.forEach(flight => {
    const card = document.createElement("div");
    card.classList.add("flight-card");
    card.innerHTML = `
      <h3>${flight.flightNo} — ${flight.from} ✈ ${flight.to}</h3>
      <p>Time: ${flight.time || flight.depart}</p>
      ${flight.return ? `<p>Return: ${flight.return}</p>` : ""}
      <p>Price: ₱${flight.price}</p>
      <p>Seats Available: ${flight.seats}</p>
      <p>Fare Type: ${flight.fareType}</p>
      <button class="select-btn">Select</button>
    `;
    container.appendChild(card);
  });

  // Show the modal
  resultsModal.classList.add('show');

  // Close functionality
  const closeResultsBtn = document.getElementById('closeResults');
  closeResultsBtn.addEventListener('click', () => {
    resultsModal.classList.add('hide');
    setTimeout(() => resultsModal.remove(), 300); // Remove after animation
  });

  // Close on outside click
  resultsModal.addEventListener('click', (e) => {
    if (e.target === resultsModal) {
      resultsModal.classList.add('hide');
      setTimeout(() => resultsModal.remove(), 300);
    }
  });

  // Handle Select button with event delegation (avoids scope issues)
  resultsModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-btn')) {
      const card = e.target.closest('.flight-card');
      const flightNo = card.querySelector('h3').textContent.split(' — ')[0];
      const seatsP = Array.from(card.querySelectorAll('p')).find(p => p.textContent.includes('Seats Available'));
      const seats = parseInt(seatsP.textContent.split(': ')[1]);
      alert(`Selected flight ${flightNo}! Booking confirmed for ${seats - 1} seats remaining.`);
      // TODO: Add real booking logic, e.g., close modal, show confirmation
    }
  });
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop page refresh
  const type = document.getElementById("flightType").value;
  displayFlights(type);

  // Close the booking modal after search
  const bookingModal = document.querySelector("#bookingModal");
  if (bookingModal) {
    bookingModal.classList.add("hide");
    bookingModal.classList.remove("show");
  }
});
