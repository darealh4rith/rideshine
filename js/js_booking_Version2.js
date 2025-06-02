// Booking form functionality
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const bookingData = {
        serviceType: document.getElementById('service-type').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value
    };

    // Here you would typically send this data to your backend
    console.log('Booking submitted:', bookingData);
    alert('Booking received! We will contact you shortly to confirm.');
});

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);