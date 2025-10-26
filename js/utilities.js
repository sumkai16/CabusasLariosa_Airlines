function showAlertModal(message, onClose = null) {
    const existingAlert = document.getElementById('alertModal');
    if (existingAlert) {
        existingAlert.remove();
    }

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

    const closeAlertButton = document.getElementById('closeAlert');
    const alertOkButton = document.getElementById('alertOkBtn');

    const closeModal = function() {
        alertModal.classList.add('hide');
        setTimeout(function() {
            alertModal.remove();
            if (onClose) {
                onClose();
            }
        }, 300);
    };

    closeAlertButton.addEventListener('click', closeModal);
    alertOkButton.addEventListener('click', closeModal);

    alertModal.addEventListener('click', function(e) {
        if (e.target === alertModal) {
            closeModal();
        }
    });

    alertModal.classList.add('show');
}

function showSummaryModal(bookingData) {
    const existingSummary = document.getElementById('summaryModal');
    if (existingSummary) {
        existingSummary.remove();
    }

    const flightInfo = bookingData.flight;
    const allPassengers = bookingData.passengers;
    const numberOfPassengers = allPassengers.length;
    const pricePerPassenger = flightInfo.price;
    const totalPrice = pricePerPassenger * numberOfPassengers;

    let passengerDetailsHTML = '';
    for (let i = 0; i < allPassengers.length; i++) {
        const passenger = allPassengers[i];
        passengerDetailsHTML += `
            <div class="passenger-detail">
                <h4>Passenger ${i + 1}</h4>
                <p><strong>Name:</strong> ${passenger.firstName} ${passenger.lastName}</p>
                <p><strong>Email:</strong> ${passenger.email}</p>
                <p><strong>Phone:</strong> ${passenger.phone}</p>
                <p><strong>Date of Birth:</strong> ${passenger.dob}</p>
                <p><strong>Gender:</strong> ${passenger.gender}</p>
            </div>
        `;
    }

    const summaryModal = document.createElement('div');
    summaryModal.id = 'summaryModal';
    summaryModal.className = 'modal summary-modal';
    summaryModal.innerHTML = `
        <div class="modal-content summary-content">
            <span class="close" id="closeSummary">&times;</span>
            <h2>Booking Summary</h2>
            <div class="summary-details">
                <h3>Flight Details</h3>
                <p><strong>Flight No:</strong> ${flightInfo.flightNo}</p>
                <p><strong>From:</strong> ${flightInfo.from}</p>
                <p><strong>To:</strong> ${flightInfo.to}</p>
                <p><strong>Time:</strong> ${flightInfo.time || flightInfo.depart}</p>
                ${flightInfo.return ? `<p><strong>Return:</strong> ${flightInfo.return}</p>` : ""}
                <p><strong>Fare Type:</strong> ${flightInfo.fareType}</p>
                <p><strong>Terminal:</strong> ${flightInfo.terminal}</p>
                ${flightInfo.promoCode ? `<p><strong>Promo Code Applied:</strong> ${flightInfo.promoCode} (${flightInfo.discountApplied}% off)</p>` : ''}
                <p><strong>Price per Passenger:</strong> ₱${pricePerPassenger.toLocaleString()}</p>
                <p><strong>Number of Passengers:</strong> ${numberOfPassengers}</p>
                <p><strong>Total Price:</strong> ₱${totalPrice.toLocaleString()}</p>

                <h3>Passenger Details</h3>
                ${passengerDetailsHTML}

                <h3>Booking Info</h3>
                <p><strong>Type:</strong> ${bookingData.type === 'oneway' ? 'One Way' : 'Round Trip'}</p>
                <p><strong>Depart Date:</strong> ${bookingData.departDate}</p>
                ${bookingData.returnDate ? `<p><strong>Return Date:</strong> ${bookingData.returnDate}</p>` : ""}
            </div>
            <button id="confirmBookingBtn">Confirm Booking</button>
        </div>
    `;
    
    document.body.appendChild(summaryModal);

    const closeSummaryButton = document.getElementById('closeSummary');
    const confirmBookingButton = document.getElementById('confirmBookingBtn');

    const closeModal = function() {
        summaryModal.classList.add('hide');
        setTimeout(function() {
            summaryModal.remove();
        }, 300);
    };

    closeSummaryButton.addEventListener('click', closeModal);

    confirmBookingButton.addEventListener('click', function() {
        const firstPassenger = allPassengers[0];
        
        let passengerNames = '';
        for (let i = 0; i < allPassengers.length; i++) {
            passengerNames += allPassengers[i].firstName + ' ' + allPassengers[i].lastName;
            if (i < allPassengers.length - 1) {
                passengerNames += ', ';
            }
        }
        
        showAlertModal(`Booking confirmed for ${passengerNames}! You will receive a confirmation email at ${firstPassenger.email}.`, function() {
            document.getElementById('bookingForm').reset();
            document.getElementById('passengerForm').reset();
            closeModal();
        });
    });

    summaryModal.addEventListener('click', function(e) {
        if (e.target === summaryModal) {
            closeModal();
        }
    });

    summaryModal.classList.add('show');
}
