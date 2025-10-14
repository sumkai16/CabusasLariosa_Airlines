// Step 1: Create arrays for available flights
let bookingData = {};
let selectedFlight = null;

const oneWayFlights = [
  { flightNo: "5J 560", from: "Manila", to: "Cebu", time: "08:00 AM", price: 3500, seats: 20, hours: 1.5, fareType: "Promo Fare", terminal: "Terminal A" },
  { flightNo: "PR 221", from: "Cebu", to: "Davao", time: "10:30 AM", price: 4200, seats: 15, hours: 2, fareType: "Regular", terminal: "Terminal B" },
  { flightNo: "Z2 103", from: "Manila", to: "Japan", time: "01:00 PM", price: 28000, seats: 10, hours: 4, fareType: "Promo Fare", terminal: "Terminal A" },
  { flightNo: "5J 562", from: "Davao", to: "Singapore", time: "09:15 AM", price: 32000, seats: 18, hours: 3.5, fareType: "Regular", terminal: "Terminal B" },
  { flightNo: "PR 222", from: "Cebu", to: "Boracay", time: "11:45 AM", price: 4500, seats: 12, hours: 1.75, fareType: "Promo Fare", terminal: "Terminal A" },
  { flightNo: "Z2 105", from: "Manila", to: "Palawan", time: "02:30 PM", price: 5500, seats: 8, hours: 2.5, fareType: "Regular", terminal: "Terminal B" },
  { flightNo: "5J 563", from: "Iloilo", to: "Hong Kong", time: "06:00 AM", price: 38000, seats: 22, hours: 2.75, fareType: "Promo Fare", terminal: "Terminal A" },
  { flightNo: "PR 223", from: "Manila", to: "Dumaguete", time: "12:15 PM", price: 3600, seats: 14, hours: 1.5, fareType: "Regular", terminal: "Terminal B" },
  { flightNo: "Z2 106", from: "Cebu", to: "Bangkok", time: "03:45 PM", price: 48000, seats: 16, hours: 3, fareType: "Promo Fare", terminal: "Terminal A" },
  { flightNo: "5J 564", from: "Manila", to: "Zamboanga", time: "07:30 AM", price: 5000, seats: 10, hours: 2.25, fareType: "Regular", terminal: "Terminal B" },
  { flightNo: "PR 224", from: "Davao", to: "Tokyo", time: "01:00 PM", price: 47000, seats: 13, hours: 4.5, fareType: "Promo Fare", terminal: "Terminal A" },
  { flightNo: "Z2 107", from: "Manila", to: "Butuan", time: "04:20 PM", price: 4300, seats: 11, hours: 1.75, fareType: "Regular", terminal: "Terminal B" },
  { flightNo: "5J 565", from: "Cebu", to: "Seoul", time: "08:45 AM", price: 41000, seats: 19, hours: 3.25, fareType: "Promo Fare", terminal: "Terminal A" },
  { flightNo: "PR 225", from: "Manila", to: "Kalibo", time: "10:00 AM", price: 3300, seats: 17, hours: 1, fareType: "Regular", terminal: "Terminal B" },
  { flightNo: "Z2 108", from: "Iloilo", to: "Sydney", time: "05:10 PM", price: 39000, seats: 9, hours: 8, fareType: "Promo Fare", terminal: "Terminal A" }
];

const roundTripFlights = [
  { flightNo: "5J 561", from: "Manila", to: "Cebu", depart: "07:00 AM", return: "05:00 PM", price: 6000, seats: 25, hours: 1.5, fareType: "Regular", terminal: "Terminal A" },
  { flightNo: "PR 300", from: "Cebu", to: "Davao", depart: "09:00 AM", return: "06:30 PM", price: 7500, seats: 18, hours: 2, fareType: "Promo Fare", terminal: "Terminal B" },
  { flightNo: "Z2 104", from: "Manila", to: "Japan", depart: "11:00 AM", return: "07:00 PM", price: 58000, seats: 12, hours: 4, fareType: "Regular", terminal: "Terminal A" },
  { flightNo: "5J 566", from: "Davao", to: "Singapore", depart: "08:30 AM", return: "04:30 PM", price: 64000, seats: 20, hours: 3.5, fareType: "Promo Fare", terminal: "Terminal B" },
  { flightNo: "PR 301", from: "Cebu", to: "Boracay", depart: "10:15 AM", return: "06:15 PM", price: 8800, seats: 15, hours: 1.75, fareType: "Regular", terminal: "Terminal A" },
  { flightNo: "Z2 109", from: "Manila", to: "Palawan", depart: "01:00 PM", return: "08:00 PM", price: 10500, seats: 10, hours: 2.5, fareType: "Promo Fare", terminal: "Terminal B" },
  { flightNo: "5J 567", from: "Iloilo", to: "Hong Kong", depart: "05:30 AM", return: "03:30 PM", price: 72000, seats: 24, hours: 2.75, fareType: "Regular", terminal: "Terminal A" },
  { flightNo: "PR 302", from: "Manila", to: "Dumaguete", depart: "11:45 AM", return: "07:45 PM", price: 6800, seats: 16, hours: 1.5, fareType: "Promo Fare", terminal: "Terminal B" },
  { flightNo: "Z2 110", from: "Cebu", to: "Bangkok", depart: "02:15 PM", return: "09:15 PM", price: 92000, seats: 18, hours: 3, fareType: "Regular", terminal: "Terminal A" },
  { flightNo: "5J 568", from: "Manila", to: "Zamboanga", depart: "06:45 AM", return: "04:45 PM", price: 9600, seats: 12, hours: 2.25, fareType: "Promo Fare", terminal: "Terminal B" },
  { flightNo: "PR 303", from: "Davao", to: "Tokyo", depart: "12:30 PM", return: "08:30 PM", price: 90000, seats: 14, hours: 4.5, fareType: "Regular", terminal: "Terminal A" },
  { flightNo: "Z2 111", from: "Manila", to: "Butuan", depart: "03:50 PM", return: "10:50 PM", price: 8200, seats: 13, hours: 1.75, fareType: "Promo Fare", terminal: "Terminal B" },
  { flightNo: "5J 569", from: "Cebu", to: "Seoul", depart: "08:00 AM", return: "05:00 PM", price: 78000, seats: 21, hours: 3.25, fareType: "Regular", terminal: "Terminal A" },
  { flightNo: "PR 304", from: "Manila", to: "Kalibo", depart: "09:30 AM", return: "06:30 PM", price: 6400, seats: 19, hours: 1, fareType: "Promo Fare", terminal: "Terminal B" },
  { flightNo: "Z2 112", from: "Iloilo", to: "Sydney", depart: "04:40 PM", return: "11:40 PM", price: 74000, seats: 11, hours: 8, fareType: "Regular", terminal: "Terminal A" }
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

  // Close functionality (add before logic so it works for no results too)
  const closeResultsBtn = document.getElementById('closeResults');
  closeResultsBtn.addEventListener('click', () => {
    resultsModal.classList.add('hide');
    setTimeout(() => resultsModal.remove(), 300);
  });

  // Close on outside click
  resultsModal.addEventListener('click', (e) => {
    if (e.target === resultsModal) {
      resultsModal.classList.add('hide');
      setTimeout(() => resultsModal.remove(), 300);
    }
  });

  let flights = type === "oneway" ? oneWayFlights : roundTripFlights;
  const fromValue = document.getElementById("from").value.trim().toLowerCase();
  const toValue = document.getElementById("to").value.trim().toLowerCase();

  console.log("User typed From:", fromValue, "To:", toValue); 
  flights = flights.filter(flight => flight.from.toLowerCase() === fromValue && flight.to.toLowerCase() === toValue);
  console.log("Filtered flights length:", flights.length); 

  const container = document.getElementById('flightContainer');
  container.innerHTML = ""; // clear old results

  if (flights.length === 0) {
    container.innerHTML = '<p>No flights found from ' + fromValue.charAt(0).toUpperCase() + fromValue.slice(1) + ' to ' + toValue.charAt(0).toUpperCase() + toValue.slice(1) + '. <button onclick="location.reload()">Search Again</button></p>';
    //show no results modal
    resultsModal.classList.add('show');
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



  // Handle Select button with event delegation (avoids scope issues)
  resultsModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-btn')) {
      const card = e.target.closest('.flight-card');
      const flightNo = card.querySelector('h3').textContent.split(' — ')[0];
      const seatsP = Array.from(card.querySelectorAll('p')).find(p => p.textContent.includes('Seats Available'));
      const seats = parseInt(seatsP.textContent.split(': ')[1]);
      const passengers = parseInt(document.getElementById("passengers").value) || 1;

      if (seats < passengers) {
        showAlertModal(`Not enough seats available. Only ${seats} seats left.`);
        return;
      }

      selectedFlight = flights.find(f => f.flightNo === flightNo);
      bookingData.flight = selectedFlight;

      showAlertModal(`Selected flight ${flightNo}! Proceeding to passenger details.`, () => {
        // Close results modal and open passenger modal
        resultsModal.classList.add('hide');
        setTimeout(() => resultsModal.remove(), 300);

        // Open passenger modal
        const passengerModal = document.getElementById('passengerModal');
        passengerModal.classList.add('show');
      });
    }
  });
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const type = document.getElementById("flightType").value;
  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const passengers = parseInt(document.getElementById("passengers").value) || 1;
  const departDate = document.getElementById("departDate").value;
  const returnDate = document.getElementById("returnDate").value;

  bookingData = { type, from, to, passengers, departDate, returnDate };

  displayFlights(type);

  // Close the booking modal after search
  const bookingModal = document.querySelector("#bookingModal");
  if (bookingModal) {
    bookingModal.classList.add("hide");
    bookingModal.classList.remove("show");
  }
});
