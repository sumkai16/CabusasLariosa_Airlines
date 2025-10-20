let bookingData = {};
let selectedFlight = null;
const oneWayTemplates = [
    { flightNo: "5J 560", from: "Manila", to: "Cebu", time: "08:00 AM", basePrice: 3500, seats: 20, hours: 1.5, fareType: "Promo Fare", terminal: "Terminal A", departDate: "2025-12-15" },
    { flightNo: "PR 221", from: "Cebu", to: "Davao", time: "10:30 AM", basePrice: 4200, seats: 15, hours: 2, fareType: "Regular", terminal: "Terminal B", departDate: "2025-12-16" },
    { flightNo: "Z2 103", from: "Manila", to: "Japan", time: "01:00 PM", basePrice: 28000, seats: 10, hours: 4, fareType: "Promo Fare", terminal: "Terminal A", departDate: "2025-12-17" },
    { flightNo: "5J 562", from: "Davao", to: "Singapore", time: "09:15 AM", basePrice: 32000, seats: 18, hours: 3.5, fareType: "Regular", terminal: "Terminal B", departDate: "2025-12-18" },
    { flightNo: "PR 222", from: "Cebu", to: "Boracay", time: "11:45 AM", basePrice: 4500, seats: 12, hours: 1.75, fareType: "Promo Fare", terminal: "Terminal A", departDate: "2025-12-19" },
    { flightNo: "Z2 105", from: "Manila", to: "Palawan", time: "02:30 PM", basePrice: 5500, seats: 8, hours: 2.5, fareType: "Regular", terminal: "Terminal B", departDate: "2025-12-20" },
    { flightNo: "5J 570", from: "Manila", to: "Cebu", time: "06:30 AM", basePrice: 3200, seats: 30, hours: 1.5, fareType: "Regular", terminal: "Terminal A", departDate: "2025-12-21" },
    { flightNo: "PR 226", from: "Cebu", to: "Davao", time: "02:00 PM", basePrice: 3800, seats: 25, hours: 2, fareType: "Promo Fare", terminal: "Terminal B", departDate: "2025-12-22" }
];

const roundTripTemplates = [
    { flightNo: "5J 561", from: "Manila", to: "Cebu", depart: "07:00 AM", return: "05:00 PM", basePrice: 6000, seats: 25, hours: 1.5, fareType: "Regular", terminal: "Terminal A", departDate: "2025-12-15", returnDate: "2025-12-22" },
    { flightNo: "PR 300", from: "Cebu", to: "Davao", depart: "09:00 AM", return: "06:30 PM", basePrice: 7500, seats: 18, hours: 2, fareType: "Promo Fare", terminal: "Terminal B", departDate: "2025-12-16", returnDate: "2025-12-23" },
    { flightNo: "Z2 104", from: "Manila", to: "Japan", depart: "11:00 AM", return: "07:00 PM", basePrice: 58000, seats: 12, hours: 4, fareType: "Regular", terminal: "Terminal A", departDate: "2025-12-17", returnDate: "2025-12-24" },
    { flightNo: "5J 566", from: "Davao", to: "Singapore", depart: "08:30 AM", return: "04:30 PM", basePrice: 64000, seats: 20, hours: 3.5, fareType: "Promo Fare", terminal: "Terminal B", departDate: "2025-12-18", returnDate: "2025-12-25" },
    { flightNo: "PR 301", from: "Cebu", to: "Boracay", depart: "10:15 AM", return: "06:15 PM", basePrice: 8800, seats: 15, hours: 1.75, fareType: "Regular", terminal: "Terminal A", departDate: "2025-12-19", returnDate: "2025-12-26" },
    { flightNo: "Z2 109", from: "Manila", to: "Palawan", depart: "01:00 PM", return: "08:00 PM", basePrice: 10500, seats: 10, hours: 2.5, fareType: "Promo Fare", terminal: "Terminal B", departDate: "2025-12-20", returnDate: "2025-12-27" },
    { flightNo: "5J 571", from: "Manila", to: "Cebu", depart: "06:00 AM", return: "04:00 PM", basePrice: 5800, seats: 30, hours: 1.5, fareType: "Regular", terminal: "Terminal A", departDate: "2025-12-21", returnDate: "2025-12-28" },
    { flightNo: "PR 305", from: "Cebu", to: "Davao", depart: "01:30 PM", return: "08:30 PM", basePrice: 6800, seats: 25, hours: 2, fareType: "Promo Fare", terminal: "Terminal B", departDate: "2025-12-22", returnDate: "2025-12-29" }
];

function generateFlights(type, departDate, returnDate, from, to) {
    const flightTemplates = type === "oneway" ? oneWayTemplates : roundTripTemplates;
    const availableFlights = [];
    
    const matchingRouteFlights = flightTemplates.filter(function(template) {
        const fromMatches = template.from.toLowerCase() === from.toLowerCase();
        const toMatches = template.to.toLowerCase() === to.toLowerCase();
        return fromMatches && toMatches;
    });
    
    const matchingDateFlights = matchingRouteFlights.filter(function(template) {
        if (type === "oneway") {
            return template.departDate === departDate;
        } else {
            const departDateMatches = template.departDate === departDate;
            const returnDateMatches = template.returnDate === returnDate;
            return departDateMatches && returnDateMatches;
        }
    });
    
    if (matchingDateFlights.length === 0) {
        return [];
    }
    
    const numberOfFlightsToGenerate = Math.max(3, matchingDateFlights.length);
    
    for (let i = 0; i < numberOfFlightsToGenerate; i++) {
        const templateIndex = i % matchingDateFlights.length;
        const template = matchingDateFlights[templateIndex];
        
        const flight = {
            ...template,
            price: template.basePrice + (Math.floor(Math.random() * 1000) - 500)
        };
        
        const seatVariation = Math.floor(Math.random() * 10);
        flight.seats = Math.max(5, template.seats - seatVariation);
        
        availableFlights.push(flight);
    }
    
    return availableFlights;
}


function displayFlights(type) {
  const existingModal = document.getElementById('resultsModal');
  if (existingModal) {
    existingModal.remove();
  }

  const fromValue = document.getElementById("from").value.trim();
  const toValue = document.getElementById("to").value.trim();
  const departDate = document.getElementById("departDate").value;
  const returnDate = document.getElementById("returnDate").value;

  const flights = generateFlights(type, departDate, returnDate, fromValue, toValue);

  const resultsModal = document.createElement('div');
  resultsModal.id = 'resultsModal';
  resultsModal.className = 'modal results-modal';
  resultsModal.innerHTML = `
    <div class="modal-content results-content">
      <span class="close" id="closeResults">&times;</span>
      <h2>Flight Results - ${type === 'oneway' ? 'One Way' : 'Round Trip'}</h2>
      <div class="search-info">
        <p><strong>Route:</strong> ${fromValue} → ${toValue}</p>
        <p><strong>Departure Date:</strong> ${formatDate(departDate)}</p>
        ${type === 'roundtrip' ? `<p><strong>Return Date:</strong> ${formatDate(returnDate)}</p>` : ''}
      </div>
      <div id="flightContainer" class="flight-list"></div>
    </div>
  `;
  document.body.appendChild(resultsModal);

  const closeResultsBtn = document.getElementById('closeResults');
  closeResultsBtn.addEventListener('click', () => {
    resultsModal.classList.add('hide');
    setTimeout(() => resultsModal.remove(), 300);
  });

  resultsModal.addEventListener('click', (e) => {
    if (e.target === resultsModal) {
      resultsModal.classList.add('hide');
      setTimeout(() => resultsModal.remove(), 300);
    }
  });

  const container = document.getElementById('flightContainer');
  container.innerHTML = "";

  if (flights.length === 0) {
    resultsModal.classList.add('hide');
    setTimeout(() => resultsModal.remove(), 300);
    
    const dateInfo = type === 'roundtrip' 
      ? `Departure: ${formatDate(departDate)} and Return: ${formatDate(returnDate)}`
      : `Departure: ${formatDate(departDate)}`;
    
    showAlertModal(`No flights available from ${fromValue} to ${toValue} on ${dateInfo}. Please try different dates.`, () => {
      const bookingModal = document.getElementById('bookingModal');
      if (bookingModal) {
        bookingModal.classList.add('show');
        bookingModal.classList.remove('hide');
      }
    });
    return;
  }

  flights.forEach(flight => {
    const card = document.createElement("div");
    card.classList.add("flight-card");
    
    const departTime = flight.time || flight.depart;
    const returnTime = flight.return;
    
    card.innerHTML = `
      <div class="flight-header">
        <h3>${flight.flightNo}</h3>
        <span class="fare-type ${flight.fareType.toLowerCase().replace(' ', '-')}">${flight.fareType}</span>
      </div>
      
      <div class="flight-route">
        <div class="route-info">
          <span class="airport">${flight.from}</span>
          <span class="arrow">✈</span>
          <span class="airport">${flight.to}</span>
        </div>
      </div>
      
      <div class="flight-details">
        <div class="time-info">
          <div class="departure">
            <label>Departure:</label>
            <span class="time">${departTime}</span>
            <span class="date">${formatDate(flight.departDate)}</span>
          </div>
          ${returnTime ? `
          <div class="return">
            <label>Return:</label>
            <span class="time">${returnTime}</span>
            <span class="date">${formatDate(flight.returnDate)}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="flight-info">
          <div class="info-item">
            <label>Duration:</label>
            <span>${flight.hours}h</span>
          </div>
          <div class="info-item">
            <label>Terminal:</label>
            <span>${flight.terminal}</span>
          </div>
          <div class="info-item">
            <label>Seats Available:</label>
            <span class="seats">${flight.seats}</span>
          </div>
        </div>
      </div>
      
      <div class="flight-price">
        <span class="price">₱${flight.price.toLocaleString()}</span>
        <button class="select-btn">Select Flight</button>
      </div>
    `;
    container.appendChild(card);
  });

  resultsModal.classList.add('show');

  resultsModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-btn')) {
      const card = e.target.closest('.flight-card');
      const flightNo = card.querySelector('h3').textContent;
      const seatsSpan = card.querySelector('.seats');
      const seats = parseInt(seatsSpan.textContent);
      const passengers = parseInt(document.getElementById("passengers").value) || 1;

      if (seats < passengers) {
        showAlertModal(`Not enough seats available. Only ${seats} seats left.`);
        return;
      }

      selectedFlight = flights.find(f => f.flightNo === flightNo);
      bookingData.flight = selectedFlight;

      showAlertModal(`Selected flight ${flightNo}! Proceeding to passenger details.`, () => {
        resultsModal.classList.add('hide');
        setTimeout(() => resultsModal.remove(), 300);

        const passengerModal = document.getElementById('passengerModal');
        initializePassengerSystem();
        passengerModal.classList.add('show');
      });
    }
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
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

  const bookingModal = document.querySelector("#bookingModal");
  if (bookingModal) {
    bookingModal.classList.add("hide");
    bookingModal.classList.remove("show");
  }
});
