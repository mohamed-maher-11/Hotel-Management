// Sample room data
let rooms = [
    { id: 1, number: '101', type: 'Standard', floor: 1, status: 'Available', price: 150, capacity: 2 },
    { id: 2, number: '102', type: 'Standard', floor: 1, status: 'Occupied', price: 150, capacity: 2 },
    { id: 3, number: '201', type: 'Deluxe', floor: 2, status: 'Available', price: 250, capacity: 3 },
    { id: 4, number: '202', type: 'Deluxe', floor: 2, status: 'Maintenance', price: 250, capacity: 3 },
    { id: 5, number: '301', type: 'Suite', floor: 3, status: 'Available', price: 450, capacity: 4 },
    { id: 6, number: '302', type: 'Suite', floor: 3, status: 'Occupied', price: 450, capacity: 4 },
    { id: 7, number: '401', type: 'Presidential', floor: 4, status: 'Available', price: 850, capacity: 6 },
    { id: 8, number: '105', type: 'Standard', floor: 1, status: 'Available', price: 150, capacity: 2 },
    { id: 9, number: '203', type: 'Deluxe', floor: 2, status: 'Occupied', price: 250, capacity: 3 },
    { id: 10, number: '303', type: 'Suite', floor: 3, status: 'Available', price: 450, capacity: 4 },
    { id: 11, number: '106', type: 'Standard', floor: 1, status: 'Maintenance', price: 150, capacity: 2 },
    { id: 12, number: '204', type: 'Deluxe', floor: 2, status: 'Available', price: 250, capacity: 3 }
];

let currentEditingRoom = null;
let roomToDelete = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    renderRoomsTable();
    initializeModalEvents();
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
            } else if (text === 'Bookings') {
                window.location.href = 'bookings.html';
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

// Render the rooms table
function renderRoomsTable(filteredRooms = null) {
    const tableBody = document.getElementById('roomsTableBody');
    const roomsToRender = filteredRooms || rooms;
    
    tableBody.innerHTML = '';
    
    roomsToRender.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${room.number}</td>
            <td>${room.type}</td>
            <td>${room.floor}</td>
            <td><span class="status-badge status-${room.status.toLowerCase()}">${room.status}</span></td>
            <td>$${room.price}</td>
            <td>${room.capacity} guests</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" onclick="editRoom(${room.id})" title="Edit Room">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteRoom(${room.id})" title="Delete Room">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter rooms based on search and status
function filterRooms() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredRooms = rooms.filter(room => {
        const matchesSearch = room.number.toLowerCase().includes(searchTerm) ||
                            room.type.toLowerCase().includes(searchTerm) ||
                            room.floor.toString().includes(searchTerm);
        
        const matchesStatus = !statusFilter || room.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    renderRoomsTable(filteredRooms);
}

// Open add room modal
function openAddRoomModal() {
    currentEditingRoom = null;
    document.getElementById('modalTitle').textContent = 'Add New Room';
    document.getElementById('roomForm').reset();
    document.getElementById('roomModal').style.display = 'block';
    
    // Focus on first input
    document.getElementById('roomNumber').focus();
}

// Edit room
function editRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    currentEditingRoom = room;
    document.getElementById('modalTitle').textContent = 'Edit Room';
    
    // Populate form with room data
    document.getElementById('roomNumber').value = room.number;
    document.getElementById('roomType').value = room.type;
    document.getElementById('floor').value = room.floor;
    document.getElementById('status').value = room.status;
    document.getElementById('price').value = room.price;
    document.getElementById('capacity').value = room.capacity;
    
    document.getElementById('roomModal').style.display = 'block';
}

// Delete room
function deleteRoom(roomId) {
    roomToDelete = roomId;
    document.getElementById('deleteModal').style.display = 'block';
}

// Confirm delete
function confirmDelete() {
    if (roomToDelete) {
        rooms = rooms.filter(room => room.id !== roomToDelete);
        renderRoomsTable();
        closeDeleteModal();
        
        // Show success message
        showNotification('Room deleted successfully!', 'success');
    }
}

// Save room (add or edit)
function saveRoom(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const roomData = {
        number: formData.get('roomNumber'),
        type: formData.get('roomType'),
        floor: parseInt(formData.get('floor')),
        status: formData.get('status'),
        price: parseFloat(formData.get('price')),
        capacity: parseInt(formData.get('capacity'))
    };
    
    // Check if room number already exists (for new rooms or when changing number)
    if (!currentEditingRoom || currentEditingRoom.number !== roomData.number) {
        const existingRoom = rooms.find(r => r.number === roomData.number);
        if (existingRoom) {
            showNotification('Room number already exists!', 'error');
            return;
        }
    }
    
    if (currentEditingRoom) {
        // Update existing room
        const roomIndex = rooms.findIndex(r => r.id === currentEditingRoom.id);
        if (roomIndex !== -1) {
            rooms[roomIndex] = { ...rooms[roomIndex], ...roomData };
            showNotification('Room updated successfully!', 'success');
        }
    } else {
        // Add new room
        const newRoom = {
            id: Math.max(...rooms.map(r => r.id)) + 1,
            ...roomData
        };
        rooms.push(newRoom);
        showNotification('Room added successfully!', 'success');
    }
    
    closeModal();
    renderRoomsTable();
}

// Close modal
function closeModal() {
    document.getElementById('roomModal').style.display = 'none';
    currentEditingRoom = null;
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    roomToDelete = null;
}

// Initialize modal events
function initializeModalEvents() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const roomModal = document.getElementById('roomModal');
        const deleteModal = document.getElementById('deleteModal');
        
        if (event.target === roomModal) {
            closeModal();
        }
        if (event.target === deleteModal) {
            closeDeleteModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeDeleteModal();
        }
    });
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

// Add CSS animations for notifications
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
`;
document.head.appendChild(style);

// Add some interactive features
function addInteractiveFeatures() {
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.rooms-table tbody tr');
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
