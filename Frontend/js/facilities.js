// Facilities Management JavaScript

// Sample facilities data
let facilities = [
    {
        id: 'F-001',
        name: 'Swimming Pool',
        type: 'recreation',
        capacity: 50,
        operatingHours: '6:00 AM - 10:00 PM',
        pricePerHour: 0,
        status: 'open',
        description: 'Outdoor swimming pool with lounge area'
    },
    {
        id: 'F-002',
        name: 'Fitness Center',
        type: 'recreation',
        capacity: 30,
        operatingHours: '24/7',
        pricePerHour: 0,
        status: 'open',
        description: 'Fully equipped gym with modern equipment'
    },
    {
        id: 'F-003',
        name: 'Conference Room A',
        type: 'business',
        capacity: 50,
        operatingHours: '8:00 AM - 8:00 PM',
        pricePerHour: 150,
        status: 'open',
        description: 'Professional meeting room with AV equipment'
    },
    {
        id: 'F-004',
        name: 'Spa & Wellness',
        type: 'wellness',
        capacity: 15,
        operatingHours: '9:00 AM - 9:00 PM',
        pricePerHour: 120,
        status: 'open',
        description: 'Relaxing spa with massage and wellness services'
    },
    {
        id: 'F-005',
        name: 'Restaurant',
        type: 'dining',
        capacity: 80,
        operatingHours: '7:00 AM - 11:00 PM',
        pricePerHour: 0,
        status: 'open',
        description: 'Fine dining restaurant with international cuisine'
    },
    {
        id: 'F-006',
        name: 'Banquet Hall',
        type: 'events',
        capacity: 200,
        operatingHours: 'By Reservation',
        pricePerHour: 500,
        status: 'maintenance',
        description: 'Large event space for weddings and conferences'
    }
];

// Sample bookings data
let bookings = [
    {
        id: 'FB-001',
        facilityId: 'F-003',
        facilityName: 'Conference Room A',
        guest: 'Tech Corp',
        date: '2025-10-15',
        time: '9:00 AM - 5:00 PM',
        status: 'confirmed',
        amount: 1200
    },
    {
        id: 'FB-002',
        facilityId: 'F-004',
        facilityName: 'Spa & Wellness',
        guest: 'Sarah Johnson',
        date: '2025-10-14',
        time: '2:00 PM - 4:00 PM',
        status: 'confirmed',
        amount: 240
    },
    {
        id: 'FB-003',
        facilityId: 'F-006',
        facilityName: 'Banquet Hall',
        guest: 'Wedding Party',
        date: '2025-10-20',
        time: '6:00 PM - 12:00 AM',
        status: 'pending',
        amount: 3000
    }
];

let currentFacilityId = null;

// Type mapping
const typeMap = {
    'recreation': 'Recreation',
    'business': 'Business',
    'wellness': 'Wellness',
    'dining': 'Dining',
    'events': 'Events',
    'sports': 'Sports'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderFacilitiesTable();
    renderBookingsTable();
    updateSummaryCards();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('facilitySearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterFacilities);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addFacilityModal', 'editFacilityModal', 'viewFacilityModal', 'newBookingModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render facilities table
function renderFacilitiesTable(filteredFacilities = null) {
    const tbody = document.getElementById('facilitiesTableBody');
    if (!tbody) return;

    const facilitiesToRender = filteredFacilities || facilities;
    
    tbody.innerHTML = facilitiesToRender.map(facility => `
        <tr>
            <td>${facility.id}</td>
            <td>${facility.name}</td>
            <td>${typeMap[facility.type] || facility.type}</td>
            <td>${facility.capacity} people</td>
            <td>${facility.operatingHours}</td>
            <td>${facility.pricePerHour === 0 ? 'Free' : `$${facility.pricePerHour}`}</td>
            <td><span class="status-badge status-${facility.status}">${getStatusText(facility.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" onclick="editFacility('${facility.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn view-btn" onclick="viewFacility('${facility.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render bookings table
function renderBookingsTable() {
    const tbody = document.getElementById('bookingsTableBody');
    if (!tbody) return;

    tbody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.facilityName}</td>
            <td>${booking.guest}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td><span class="status-badge status-${booking.status}">${getBookingStatusText(booking.status)}</span></td>
        </tr>
    `).join('');
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'open': 'Open',
        'closed': 'Closed',
        'maintenance': 'Maintenance'
    };
    return statusMap[status] || status;
}

// Get booking status text
function getBookingStatusText(status) {
    const statusMap = {
        'confirmed': 'Confirmed',
        'pending': 'Pending',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const totalFacilities = facilities.length;
    const activeBookings = bookings.filter(booking => booking.status === 'confirmed').length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
    const utilization = 67; // This would be calculated based on actual usage data

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = totalFacilities;
        cards[1].querySelector('.card-content h3').textContent = activeBookings;
        cards[2].querySelector('.card-content h3').textContent = `$${totalRevenue.toLocaleString()}`;
        cards[3].querySelector('.card-content h3').textContent = `${utilization}%`;
    }
}

// Filter facilities
function filterFacilities() {
    const searchTerm = document.getElementById('facilitySearch').value.toLowerCase();

    const filteredFacilities = facilities.filter(facility => {
        const matchesSearch = !searchTerm || 
            facility.name.toLowerCase().includes(searchTerm) ||
            facility.id.toLowerCase().includes(searchTerm) ||
            (typeMap[facility.type] || facility.type).toLowerCase().includes(searchTerm);
        
        return matchesSearch;
    });

    renderFacilitiesTable(filteredFacilities);
}

// Modal functions
function openAddFacilityModal() {
    document.getElementById('addFacilityModal').style.display = 'block';
    document.getElementById('addFacilityForm').reset();
}

function closeAddFacilityModal() {
    document.getElementById('addFacilityModal').style.display = 'none';
}

function openNewBookingModal() {
    document.getElementById('newBookingModal').style.display = 'block';
    document.getElementById('newBookingForm').reset();
}

function closeNewBookingModal() {
    document.getElementById('newBookingModal').style.display = 'none';
}

function openViewFacilityModal(facilityId) {
    const facility = facilities.find(fac => fac.id === facilityId);
    if (!facility) return;

    // Populate view modal with facility data
    document.getElementById('viewFacilityId').textContent = facility.id;
    document.getElementById('viewFacilityName').textContent = facility.name;
    document.getElementById('viewFacilityType').textContent = typeMap[facility.type] || facility.type;
    document.getElementById('viewFacilityCapacity').textContent = `${facility.capacity} people`;
    document.getElementById('viewFacilityHours').textContent = facility.operatingHours;
    document.getElementById('viewFacilityPrice').textContent = facility.pricePerHour === 0 ? 'Free' : `$${facility.pricePerHour}`;
    document.getElementById('viewFacilityStatus').textContent = getStatusText(facility.status);
    document.getElementById('viewFacilityStatus').className = `status-badge status-${facility.status}`;
    document.getElementById('viewFacilityDescription').textContent = facility.description;

    document.getElementById('viewFacilityModal').style.display = 'block';
}

function closeViewFacilityModal() {
    document.getElementById('viewFacilityModal').style.display = 'none';
}

function openEditFacilityModal(facilityId) {
    const facility = facilities.find(fac => fac.id === facilityId);
    if (!facility) return;

    currentFacilityId = facilityId;
    
    // Populate form with facility data
    document.getElementById('editFacilityName').value = facility.name;
    document.getElementById('editFacilityType').value = facility.type;
    document.getElementById('editCapacity').value = facility.capacity;
    document.getElementById('editPricePerHour').value = facility.pricePerHour;
    document.getElementById('editOperatingHours').value = facility.operatingHours;
    document.getElementById('editFacilityStatus').value = facility.status;
    document.getElementById('editFacilityDescription').value = facility.description;

    document.getElementById('editFacilityModal').style.display = 'block';
}

function closeEditFacilityModal() {
    document.getElementById('editFacilityModal').style.display = 'none';
    currentFacilityId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editFacilityModal') {
        currentFacilityId = null;
    }
}

// Facility management functions
function editFacility(facilityId) {
    openEditFacilityModal(facilityId);
}

function viewFacility(facilityId) {
    openViewFacilityModal(facilityId);
}

function saveFacility() {
    const form = document.getElementById('addFacilityForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['facilityName', 'facilityType', 'capacity', 'operatingHours'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Generate new facility ID
    const newId = 'F-' + String(facilities.length + 1).padStart(3, '0');
    
    // Create new facility object
    const newFacility = {
        id: newId,
        name: formData.get('facilityName'),
        type: formData.get('facilityType'),
        capacity: parseInt(formData.get('capacity')),
        operatingHours: formData.get('operatingHours'),
        pricePerHour: parseFloat(formData.get('pricePerHour')) || 0,
        status: formData.get('facilityStatus') || 'open',
        description: formData.get('facilityDescription') || ''
    };

    // Add to facilities array
    facilities.push(newFacility);
    
    // Refresh table and summary cards
    renderFacilitiesTable();
    updateSummaryCards();
    
    // Close modal
    closeAddFacilityModal();
    
    // Show success message
    alert('Facility added successfully!');
}

function updateFacility() {
    if (!currentFacilityId) return;

    const form = document.getElementById('editFacilityForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['facilityName', 'facilityType', 'capacity', 'operatingHours'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update facility
    const facilityIndex = facilities.findIndex(fac => fac.id === currentFacilityId);
    if (facilityIndex !== -1) {
        facilities[facilityIndex] = {
            ...facilities[facilityIndex],
            name: formData.get('facilityName'),
            type: formData.get('facilityType'),
            capacity: parseInt(formData.get('capacity')),
            operatingHours: formData.get('operatingHours'),
            pricePerHour: parseFloat(formData.get('pricePerHour')) || 0,
            status: formData.get('facilityStatus') || 'open',
            description: formData.get('facilityDescription') || ''
        };

        // Refresh table and summary cards
        renderFacilitiesTable();
        updateSummaryCards();
        
        // Close modal
        closeEditFacilityModal();
        
        // Show success message
        alert('Facility updated successfully!');
    }
}

function saveBooking() {
    const form = document.getElementById('newBookingForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['bookingFacility', 'bookingGuest', 'bookingDate', 'bookingTime'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Get facility details
    const facilityId = formData.get('bookingFacility');
    const facility = facilities.find(fac => fac.id === facilityId);
    if (!facility) {
        alert('Selected facility not found.');
        return;
    }

    // Generate new booking ID
    const newId = 'FB-' + String(bookings.length + 1).padStart(3, '0');
    
    // Create new booking object
    const newBooking = {
        id: newId,
        facilityId: facilityId,
        facilityName: facility.name,
        guest: formData.get('bookingGuest'),
        date: formData.get('bookingDate'),
        time: formData.get('bookingTime'),
        status: formData.get('bookingStatus') || 'pending',
        amount: parseFloat(formData.get('bookingAmount')) || 0
    };

    // Add to bookings array
    bookings.push(newBooking);
    
    // Refresh tables and summary cards
    renderBookingsTable();
    updateSummaryCards();
    
    // Close modal
    closeNewBookingModal();
    
    // Show success message
    alert('Booking created successfully!');
}

function editFacilityFromView() {
    closeViewFacilityModal();
    if (currentFacilityId) {
        openEditFacilityModal(currentFacilityId);
    }
}

// Export functions for global access
window.editFacility = editFacility;
window.viewFacility = viewFacility;
window.openAddFacilityModal = openAddFacilityModal;
window.closeAddFacilityModal = closeAddFacilityModal;
window.openNewBookingModal = openNewBookingModal;
window.closeNewBookingModal = closeNewBookingModal;
window.closeViewFacilityModal = closeViewFacilityModal;
window.closeEditFacilityModal = closeEditFacilityModal;
window.saveFacility = saveFacility;
window.updateFacility = updateFacility;
window.saveBooking = saveBooking;
window.editFacilityFromView = editFacilityFromView;

