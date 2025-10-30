// Guest Management JavaScript

// Sample guest data
let guests = [
    {
        id: 'G001',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        nationality: 'American',
        idNumber: 'A123456789',
        roomNumber: '201',
        status: 'checked-in',
        checkInDate: '2025-01-15',
        checkOutDate: '2025-01-18',
        specialRequests: 'Late checkout requested'
    },
    {
        id: 'G002',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 234-5678',
        nationality: 'Canadian',
        idNumber: 'C987654321',
        roomNumber: '305',
        status: 'reserved',
        checkInDate: '2025-01-16',
        checkOutDate: '2025-01-20',
        specialRequests: 'High floor preferred'
    },
    {
        id: 'G003',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@email.com',
        phone: '+1 (555) 345-6789',
        nationality: 'British',
        idNumber: 'B456789123',
        roomNumber: '108',
        status: 'checked-out',
        checkInDate: '2025-01-10',
        checkOutDate: '2025-01-14',
        specialRequests: 'None'
    },
    {
        id: 'G004',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 456-7890',
        nationality: 'Australian',
        idNumber: 'A789123456',
        roomNumber: '402',
        status: 'checked-in',
        checkInDate: '2025-01-17',
        checkOutDate: '2025-01-21',
        specialRequests: 'Vegetarian meals'
    },
    {
        id: 'G005',
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 (555) 567-8901',
        nationality: 'German',
        idNumber: 'G321654987',
        roomNumber: '203',
        status: 'reserved',
        checkInDate: '2025-01-18',
        checkOutDate: '2025-01-22',
        specialRequests: 'Business center access'
    }
];

let currentGuestId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderGuestsTable();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('guestSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterGuests);
    }

    // Filter functionality
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterGuests);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addGuestModal', 'editGuestModal', 'viewGuestModal', 'deleteGuestModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render guests table
function renderGuestsTable(filteredGuests = null) {
    const tbody = document.getElementById('guestsTableBody');
    if (!tbody) return;

    const guestsToRender = filteredGuests || guests;
    
    tbody.innerHTML = guestsToRender.map(guest => `
        <tr>
            <td>#${guest.id}</td>
            <td>${guest.firstName} ${guest.lastName}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td>Room ${guest.roomNumber}</td>
            <td>${guest.checkInDate}</td>
            <td>${guest.checkOutDate}</td>
            <td><span class="status-badge status-${guest.status}">${getStatusText(guest.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" onclick="editGuest('${guest.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn view-btn" onclick="viewGuest('${guest.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteGuest('${guest.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'checked-in': 'Checked In',
        'checked-out': 'Checked Out',
        'reserved': 'Reserved'
    };
    return statusMap[status] || status;
}

// Filter guests
function filterGuests() {
    const searchTerm = document.getElementById('guestSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredGuests = guests.filter(guest => {
        const matchesSearch = !searchTerm || 
            guest.firstName.toLowerCase().includes(searchTerm) ||
            guest.lastName.toLowerCase().includes(searchTerm) ||
            guest.email.toLowerCase().includes(searchTerm) ||
            guest.phone.includes(searchTerm);
        
        const matchesStatus = !statusFilter || guest.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    renderGuestsTable(filteredGuests);
}

// Modal functions
function openAddGuestModal() {
    document.getElementById('addGuestModal').style.display = 'block';
    document.getElementById('addGuestForm').reset();
}

function closeAddGuestModal() {
    document.getElementById('addGuestModal').style.display = 'none';
}

function openEditGuestModal(guestId) {
    const guest = guests.find(g => g.id === guestId);
    if (!guest) return;

    currentGuestId = guestId;
    
    // Populate form with guest data
    document.getElementById('editFirstName').value = guest.firstName;
    document.getElementById('editLastName').value = guest.lastName;
    document.getElementById('editEmail').value = guest.email;
    document.getElementById('editPhone').value = guest.phone;
    document.getElementById('editNationality').value = guest.nationality;
    document.getElementById('editIdNumber').value = guest.idNumber;
    document.getElementById('editRoomNumber').value = guest.roomNumber;
    document.getElementById('editGuestStatus').value = guest.status;
    document.getElementById('editCheckInDate').value = guest.checkInDate;
    document.getElementById('editCheckOutDate').value = guest.checkOutDate;
    document.getElementById('editSpecialRequests').value = guest.specialRequests;

    document.getElementById('editGuestModal').style.display = 'block';
}

function closeEditGuestModal() {
    document.getElementById('editGuestModal').style.display = 'none';
    currentGuestId = null;
}

function openViewGuestModal(guestId) {
    const guest = guests.find(g => g.id === guestId);
    if (!guest) return;

    // Populate view modal with guest data
    document.getElementById('viewGuestId').textContent = `#${guest.id}`;
    document.getElementById('viewGuestName').textContent = `${guest.firstName} ${guest.lastName}`;
    document.getElementById('viewGuestEmail').textContent = guest.email;
    document.getElementById('viewGuestPhone').textContent = guest.phone;
    document.getElementById('viewGuestNationality').textContent = guest.nationality;
    document.getElementById('viewGuestIdNumber').textContent = guest.idNumber;
    document.getElementById('viewGuestRoom').textContent = `Room ${guest.roomNumber}`;
    document.getElementById('viewGuestStatus').textContent = getStatusText(guest.status);
    document.getElementById('viewGuestStatus').className = `status-badge status-${guest.status}`;
    document.getElementById('viewGuestCheckIn').textContent = guest.checkInDate;
    document.getElementById('viewGuestCheckOut').textContent = guest.checkOutDate;
    document.getElementById('viewGuestRequests').textContent = guest.specialRequests;

    document.getElementById('viewGuestModal').style.display = 'block';
}

function closeViewGuestModal() {
    document.getElementById('viewGuestModal').style.display = 'none';
}

function openDeleteGuestModal(guestId) {
    currentGuestId = guestId;
    document.getElementById('deleteGuestModal').style.display = 'block';
}

function closeDeleteGuestModal() {
    document.getElementById('deleteGuestModal').style.display = 'none';
    currentGuestId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editGuestModal' || modalId === 'deleteGuestModal') {
        currentGuestId = null;
    }
}

// Guest management functions
function editGuest(guestId) {
    openEditGuestModal(guestId);
}

function viewGuest(guestId) {
    openViewGuestModal(guestId);
}

function deleteGuest(guestId) {
    openDeleteGuestModal(guestId);
}

function saveGuest() {
    const form = document.getElementById('addGuestForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Generate new guest ID
    const newId = 'G' + String(guests.length + 1).padStart(3, '0');
    
    // Create new guest object
    const newGuest = {
        id: newId,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        nationality: formData.get('nationality') || '',
        idNumber: formData.get('idNumber') || '',
        roomNumber: formData.get('roomNumber') || '',
        status: formData.get('guestStatus') || 'reserved',
        checkInDate: formData.get('checkInDate') || '',
        checkOutDate: formData.get('checkOutDate') || '',
        specialRequests: formData.get('specialRequests') || ''
    };

    // Add to guests array
    guests.push(newGuest);
    
    // Refresh table
    renderGuestsTable();
    
    // Close modal
    closeAddGuestModal();
    
    // Show success message
    alert('Guest added successfully!');
}

function updateGuest() {
    if (!currentGuestId) return;

    const form = document.getElementById('editGuestForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update guest
    const guestIndex = guests.findIndex(g => g.id === currentGuestId);
    if (guestIndex !== -1) {
        guests[guestIndex] = {
            ...guests[guestIndex],
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            nationality: formData.get('nationality') || '',
            idNumber: formData.get('idNumber') || '',
            roomNumber: formData.get('roomNumber') || '',
            status: formData.get('guestStatus') || 'reserved',
            checkInDate: formData.get('checkInDate') || '',
            checkOutDate: formData.get('checkOutDate') || '',
            specialRequests: formData.get('specialRequests') || ''
        };

        // Refresh table
        renderGuestsTable();
        
        // Close modal
        closeEditGuestModal();
        
        // Show success message
        alert('Guest updated successfully!');
    }
}

function confirmDeleteGuest() {
    if (!currentGuestId) return;

    // Find and remove guest
    const guestIndex = guests.findIndex(g => g.id === currentGuestId);
    if (guestIndex !== -1) {
        guests.splice(guestIndex, 1);
        
        // Refresh table
        renderGuestsTable();
        
        // Close modal
        closeDeleteGuestModal();
        
        // Show success message
        alert('Guest deleted successfully!');
    }
}

function editGuestFromView() {
    closeViewGuestModal();
    if (currentGuestId) {
        openEditGuestModal(currentGuestId);
    }
}

// Export functions for global access
window.editGuest = editGuest;
window.viewGuest = viewGuest;
window.deleteGuest = deleteGuest;
window.openAddGuestModal = openAddGuestModal;
window.closeAddGuestModal = closeAddGuestModal;
window.closeEditGuestModal = closeEditGuestModal;
window.closeViewGuestModal = closeViewGuestModal;
window.closeDeleteGuestModal = closeDeleteGuestModal;
window.saveGuest = saveGuest;
window.updateGuest = updateGuest;
window.confirmDeleteGuest = confirmDeleteGuest;
window.editGuestFromView = editGuestFromView;

