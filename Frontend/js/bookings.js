// Sample booking data
let bookings = [
    { 
        id: 'BK-001', 
        guestName: 'John Smith', 
        roomNumber: '201', 
        checkIn: '2025-10-14', 
        checkOut: '2025-10-18', 
        guests: 2, 
        amount: 1000, 
        status: 'Confirmed' 
    },
    { 
        id: 'BK-002', 
        guestName: 'Sarah Johnson', 
        roomNumber: '305', 
        checkIn: '2025-10-15', 
        checkOut: '2025-10-20', 
        guests: 3, 
        amount: 1250, 
        status: 'Pending' 
    },
    { 
        id: 'BK-003', 
        guestName: 'Michael Brown', 
        roomNumber: '102', 
        checkIn: '2025-10-14', 
        checkOut: '2025-10-16', 
        guests: 2, 
        amount: 300, 
        status: 'Confirmed' 
    },
    { 
        id: 'BK-004', 
        guestName: 'Emily Davis', 
        roomNumber: '408', 
        checkIn: '2025-10-16', 
        checkOut: '2025-10-21', 
        guests: 4, 
        amount: 2250, 
        status: 'Confirmed' 
    },
    { 
        id: 'BK-005', 
        guestName: 'David Wilson', 
        roomNumber: '203', 
        checkIn: '2025-10-17', 
        checkOut: '2025-10-19', 
        guests: 2, 
        amount: 500, 
        status: 'Checked-in' 
    },
    { 
        id: 'BK-006', 
        guestName: 'Lisa Anderson', 
        roomNumber: '301', 
        checkIn: '2025-10-18', 
        checkOut: '2025-10-22', 
        guests: 3, 
        amount: 1800, 
        status: 'Pending' 
    },
    { 
        id: 'BK-007', 
        guestName: 'Robert Taylor', 
        roomNumber: '105', 
        checkIn: '2025-10-19', 
        checkOut: '2025-10-21', 
        guests: 1, 
        amount: 400, 
        status: 'Confirmed' 
    }
];

// Sample room data for dropdown
let availableRooms = [
    { number: '101', type: 'Standard', price: 150 },
    { number: '102', type: 'Standard', price: 150 },
    { number: '201', type: 'Deluxe', price: 250 },
    { number: '202', type: 'Deluxe', price: 250 },
    { number: '203', type: 'Deluxe', price: 250 },
    { number: '301', type: 'Suite', price: 450 },
    { number: '302', type: 'Suite', price: 450 },
    { number: '305', type: 'Suite', price: 450 },
    { number: '401', type: 'Presidential', price: 850 },
    { number: '408', type: 'Presidential', price: 850 }
];

let currentEditingBooking = null;
let bookingToDelete = null;
let bookingToView = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    renderBookingsTable();
    populateRoomOptions();
    initializeModalEvents();
    setDefaultDates();
});

// Initialize sidebar functionality
function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            // Remove active class from all items
            sidebarItems.forEach(li => li.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Navigate to different pages
            if (text === 'Dashboard') {
                window.location.href = 'dashboard.html';
            } else if (text === 'Rooms') {
                window.location.href = 'rooms.html';
            }
            // Add more navigation logic here for other pages
            
            // Add animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Render the bookings table
function renderBookingsTable(filteredBookings = null) {
    const tableBody = document.getElementById('bookingsTableBody');
    const bookingsToRender = filteredBookings || bookings;
    
    tableBody.innerHTML = '';
    
    bookingsToRender.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>Room ${booking.roomNumber}</td>
            <td>${booking.checkIn}</td>
            <td>${booking.checkOut}</td>
            <td>${booking.guests}</td>
            <td>$${booking.amount}</td>
            <td><span class="booking-status-badge status-${booking.status.toLowerCase()}">${booking.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-booking-btn" onclick="viewBooking('${booking.id}')" title="View Booking">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editBooking('${booking.id}')" title="Edit Booking">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter bookings based on search and status
function filterBookings() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.id.toLowerCase().includes(searchTerm) ||
                            booking.guestName.toLowerCase().includes(searchTerm) ||
                            booking.roomNumber.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || booking.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    renderBookingsTable(filteredBookings);
}

// Populate room options in dropdown
function populateRoomOptions() {
    const roomSelect = document.getElementById('roomNumber');
    roomSelect.innerHTML = '<option value="">Select Room</option>';
    
    availableRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.number;
        option.textContent = `Room ${room.number} - ${room.type} ($${room.price}/night)`;
        roomSelect.appendChild(option);
    });
}

// Set default dates
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    checkInInput.min = today.toISOString().split('T')[0];
    checkOutInput.min = tomorrow.toISOString().split('T')[0];
}

// Open add booking modal
function openAddBookingModal() {
    currentEditingBooking = null;
    document.getElementById('modalTitle').textContent = 'Add New Booking';
    document.getElementById('bookingForm').reset();
    setDefaultDates();
    
    // Generate new booking ID
    const lastId = Math.max(...bookings.map(b => parseInt(b.id.split('-')[1])));
    const newId = `BK-${String(lastId + 1).padStart(3, '0')}`;
    
    document.getElementById('bookingModal').style.display = 'block';
    
    // Focus on first input
    document.getElementById('guestName').focus();
}

// Edit booking
function editBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    currentEditingBooking = booking;
    document.getElementById('modalTitle').textContent = 'Edit Booking';
    
    // Populate form with booking data
    document.getElementById('guestName').value = booking.guestName;
    document.getElementById('roomNumber').value = booking.roomNumber;
    document.getElementById('checkIn').value = booking.checkIn;
    document.getElementById('checkOut').value = booking.checkOut;
    document.getElementById('guests').value = booking.guests;
    document.getElementById('status').value = booking.status;
    document.getElementById('amount').value = booking.amount;
    
    document.getElementById('bookingModal').style.display = 'block';
}

// View booking details
function viewBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    bookingToView = booking;
    
    const bookingDetails = document.getElementById('bookingDetails');
    bookingDetails.innerHTML = `
        <div class="booking-detail-grid">
            <div class="detail-item">
                <label>Booking ID:</label>
                <span>${booking.id}</span>
            </div>
            <div class="detail-item">
                <label>Guest Name:</label>
                <span>${booking.guestName}</span>
            </div>
            <div class="detail-item">
                <label>Room:</label>
                <span>Room ${booking.roomNumber}</span>
            </div>
            <div class="detail-item">
                <label>Check-in:</label>
                <span>${booking.checkIn}</span>
            </div>
            <div class="detail-item">
                <label>Check-out:</label>
                <span>${booking.checkOut}</span>
            </div>
            <div class="detail-item">
                <label>Number of Guests:</label>
                <span>${booking.guests}</span>
            </div>
            <div class="detail-item">
                <label>Total Amount:</label>
                <span>$${booking.amount}</span>
            </div>
            <div class="detail-item">
                <label>Status:</label>
                <span class="booking-status-badge status-${booking.status.toLowerCase()}">${booking.status}</span>
            </div>
        </div>
    `;
    
    document.getElementById('viewBookingModal').style.display = 'block';
}

// Edit from view modal
function editFromView() {
    closeViewModal();
    if (bookingToView) {
        editBooking(bookingToView.id);
    }
}

// Save booking (add or edit)
function saveBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const bookingData = {
        guestName: formData.get('guestName'),
        roomNumber: formData.get('roomNumber'),
        checkIn: formData.get('checkIn'),
        checkOut: formData.get('checkOut'),
        guests: parseInt(formData.get('guests')),
        status: formData.get('status'),
        amount: parseFloat(formData.get('amount'))
    };
    
    // Validate dates
    if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
        showNotification('Check-out date must be after check-in date!', 'error');
        return;
    }
    
    if (currentEditingBooking) {
        // Update existing booking
        const bookingIndex = bookings.findIndex(b => b.id === currentEditingBooking.id);
        if (bookingIndex !== -1) {
            bookings[bookingIndex] = { ...bookings[bookingIndex], ...bookingData };
            showNotification('Booking updated successfully!', 'success');
        }
    } else {
        // Add new booking
        const lastId = Math.max(...bookings.map(b => parseInt(b.id.split('-')[1])));
        const newBooking = {
            id: `BK-${String(lastId + 1).padStart(3, '0')}`,
            ...bookingData
        };
        bookings.push(newBooking);
        showNotification('Booking added successfully!', 'success');
    }
    
    closeModal();
    renderBookingsTable();
}

// Close modal
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    currentEditingBooking = null;
}

// Close view modal
function closeViewModal() {
    document.getElementById('viewBookingModal').style.display = 'none';
    bookingToView = null;
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    bookingToDelete = null;
}

// Initialize modal events
function initializeModalEvents() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const bookingModal = document.getElementById('bookingModal');
        const viewModal = document.getElementById('viewBookingModal');
        const deleteModal = document.getElementById('deleteModal');
        
        if (event.target === bookingModal) {
            closeModal();
        }
        if (event.target === viewModal) {
            closeViewModal();
        }
        if (event.target === deleteModal) {
            closeDeleteModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeViewModal();
            closeDeleteModal();
        }
    });
    
    // Auto-calculate amount based on room and dates
    document.getElementById('roomNumber').addEventListener('change', calculateAmount);
    document.getElementById('checkIn').addEventListener('change', calculateAmount);
    document.getElementById('checkOut').addEventListener('change', calculateAmount);
}

// Calculate booking amount
function calculateAmount() {
    const roomNumber = document.getElementById('roomNumber').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    if (roomNumber && checkIn && checkOut) {
        const room = availableRooms.find(r => r.number === roomNumber);
        if (room) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
            const totalAmount = nights * room.price;
            
            document.getElementById('amount').value = totalAmount;
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications and booking details
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .booking-detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 20px 25px;
    }
    
    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .detail-item label {
        font-weight: 600;
        color: #2c3e50;
        font-size: 0.9rem;
    }
    
    .detail-item span {
        color: #666;
        font-size: 1rem;
    }
    
    @media (max-width: 600px) {
        .booking-detail-grid {
            grid-template-columns: 1fr;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// Add some interactive features
function addInteractiveFeatures() {
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.bookings-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e8f4fd';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Initialize interactive features
addInteractiveFeatures();

