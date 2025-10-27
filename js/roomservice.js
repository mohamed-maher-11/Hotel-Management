// Room Service Management JavaScript

// Sample room service orders data
let orders = [
    {
        id: 'ORD-001',
        roomNumber: '201',
        guestName: 'John Smith',
        items: 'Club Sandwich, French Fries +1 more',
        orderTime: '2025-10-13 12:30',
        amount: 45,
        status: 'delivered',
        specialInstructions: 'No onions, extra ketchup'
    },
    {
        id: 'ORD-002',
        roomNumber: '305',
        guestName: 'Sarah Johnson',
        items: 'Caesar Salad, Grilled Chicken +1 more',
        orderTime: '2025-10-13 13:15',
        amount: 38,
        status: 'in-progress',
        specialInstructions: 'Dressing on the side'
    },
    {
        id: 'ORD-003',
        roomNumber: '102',
        guestName: 'Michael Brown',
        items: 'Breakfast Platter, Orange Juice +1 more',
        orderTime: '2025-10-13 08:45',
        amount: 52,
        status: 'pending',
        specialInstructions: 'Scrambled eggs, not fried'
    },
    {
        id: 'ORD-004',
        roomNumber: '408',
        guestName: 'Emily Davis',
        items: 'Pasta Carbonara, Garlic Bread +1 more',
        orderTime: '2025-10-13 19:20',
        amount: 68,
        status: 'in-progress',
        specialInstructions: 'Extra cheese'
    },
    {
        id: 'ORD-005',
        roomNumber: '203',
        guestName: 'David Wilson',
        items: 'Cheeseburger, Fries +1 more',
        orderTime: '2025-10-13 14:10',
        amount: 42,
        status: 'delivered',
        specialInstructions: 'Medium rare'
    }
];

let currentOrderId = null;

// Menu items with prices
const menuItems = {
    'Caesar Salad': 12,
    'Soup of the Day': 8,
    'Club Sandwich': 18,
    'Grilled Chicken': 22,
    'Pasta Carbonara': 20,
    'Cheeseburger': 16,
    'Orange Juice': 5,
    'Coffee': 4,
    'French Fries': 6,
    'Garlic Bread': 4,
    'Cola': 3
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderOrdersTable();
    updateSummaryCards();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('orderSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterOrders);
    }

    // Filter functionality
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrders);
    }

    // Menu item selection
    const menuCheckboxes = document.querySelectorAll('input[name="items"]');
    menuCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateOrderTotal);
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addOrderModal', 'editOrderModal', 'viewOrderModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render orders table
function renderOrdersTable(filteredOrders = null) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    const ordersToRender = filteredOrders || orders;
    
    tbody.innerHTML = ordersToRender.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>Room ${order.roomNumber}</td>
            <td>${order.guestName}</td>
            <td>${order.items}</td>
            <td>${order.orderTime}</td>
            <td>$${order.amount}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editOrder('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'pending': 'Pending',
        'in-progress': 'In Progress',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const today = new Date().toISOString().split('T')[0];
    const todaysOrders = orders.filter(order => order.orderTime.includes(today));
    const inProgressOrders = orders.filter(order => order.status === 'in-progress');
    const deliveredOrders = orders.filter(order => order.status === 'delivered');
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = todaysOrders.length;
        cards[1].querySelector('.card-content h3').textContent = inProgressOrders.length;
        cards[2].querySelector('.card-content h3').textContent = deliveredOrders.length;
        cards[3].querySelector('.card-content h3').textContent = `$${totalRevenue.toLocaleString()}`;
    }
}

// Filter orders
function filterOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = !searchTerm || 
            order.id.toLowerCase().includes(searchTerm) ||
            order.guestName.toLowerCase().includes(searchTerm) ||
            order.roomNumber.includes(searchTerm) ||
            order.items.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    renderOrdersTable(filteredOrders);
}

// Calculate order total
function calculateOrderTotal() {
    const selectedItems = Array.from(document.querySelectorAll('input[name="items"]:checked'))
        .map(checkbox => checkbox.value);
    
    const total = selectedItems.reduce((sum, item) => sum + (menuItems[item] || 0), 0);
    
    // You can display the total somewhere in the form if needed
    console.log('Order total:', total);
}

// Modal functions
function openAddOrderModal() {
    document.getElementById('addOrderModal').style.display = 'block';
    document.getElementById('addOrderForm').reset();
}

function closeAddOrderModal() {
    document.getElementById('addOrderModal').style.display = 'none';
}

function openViewOrderModal(orderId) {
    const order = orders.find(ord => ord.id === orderId);
    if (!order) return;

    // Populate view modal with order data
    document.getElementById('viewOrderId').textContent = order.id;
    document.getElementById('viewOrderRoom').textContent = `Room ${order.roomNumber}`;
    document.getElementById('viewOrderGuest').textContent = order.guestName;
    document.getElementById('viewOrderItems').textContent = order.items;
    document.getElementById('viewOrderTime').textContent = order.orderTime;
    document.getElementById('viewOrderAmount').textContent = `$${order.amount}`;
    document.getElementById('viewOrderStatus').textContent = getStatusText(order.status);
    document.getElementById('viewOrderStatus').className = `status-badge status-${order.status}`;
    document.getElementById('viewOrderInstructions').textContent = order.specialInstructions || 'None';

    document.getElementById('viewOrderModal').style.display = 'block';
}

function closeViewOrderModal() {
    document.getElementById('viewOrderModal').style.display = 'none';
}

function openEditOrderModal(orderId) {
    const order = orders.find(ord => ord.id === orderId);
    if (!order) return;

    currentOrderId = orderId;
    
    // Populate form with order data
    document.getElementById('editRoomNumber').value = order.roomNumber;
    document.getElementById('editGuestName').value = order.guestName;
    document.getElementById('editOrderStatus').value = order.status;
    document.getElementById('editOrderAmount').value = order.amount;
    document.getElementById('editSpecialInstructions').value = order.specialInstructions || '';

    document.getElementById('editOrderModal').style.display = 'block';
}

function closeEditOrderModal() {
    document.getElementById('editOrderModal').style.display = 'none';
    currentOrderId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editOrderModal') {
        currentOrderId = null;
    }
}

// Order management functions
function viewOrder(orderId) {
    openViewOrderModal(orderId);
}

function editOrder(orderId) {
    openEditOrderModal(orderId);
}

function saveOrder() {
    const form = document.getElementById('addOrderForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['roomNumber', 'guestName'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Get selected menu items
    const selectedItems = Array.from(document.querySelectorAll('input[name="items"]:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedItems.length === 0) {
        alert('Please select at least one menu item.');
        return;
    }

    // Calculate total
    const total = selectedItems.reduce((sum, item) => sum + (menuItems[item] || 0), 0);
    
    // Generate new order ID
    const newId = 'ORD-' + String(orders.length + 1).padStart(3, '0');
    
    // Create new order object
    const newOrder = {
        id: newId,
        roomNumber: formData.get('roomNumber'),
        guestName: formData.get('guestName'),
        items: selectedItems.join(', '),
        orderTime: new Date().toLocaleString(),
        amount: total,
        status: formData.get('orderStatus') || 'pending',
        specialInstructions: formData.get('specialInstructions') || ''
    };

    // Add to orders array
    orders.push(newOrder);
    
    // Refresh table and summary cards
    renderOrdersTable();
    updateSummaryCards();
    
    // Close modal
    closeAddOrderModal();
    
    // Show success message
    alert('Order created successfully!');
}

function updateOrder() {
    if (!currentOrderId) return;

    const form = document.getElementById('editOrderForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['roomNumber', 'guestName'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update order
    const orderIndex = orders.findIndex(ord => ord.id === currentOrderId);
    if (orderIndex !== -1) {
        orders[orderIndex] = {
            ...orders[orderIndex],
            roomNumber: formData.get('roomNumber'),
            guestName: formData.get('guestName'),
            status: formData.get('orderStatus') || 'pending',
            amount: parseFloat(formData.get('orderAmount')) || orders[orderIndex].amount,
            specialInstructions: formData.get('specialInstructions') || ''
        };

        // Refresh table and summary cards
        renderOrdersTable();
        updateSummaryCards();
        
        // Close modal
        closeEditOrderModal();
        
        // Show success message
        alert('Order updated successfully!');
    }
}

function editOrderFromView() {
    closeViewOrderModal();
    if (currentOrderId) {
        openEditOrderModal(currentOrderId);
    }
}

// Export functions for global access
window.viewOrder = viewOrder;
window.editOrder = editOrder;
window.openAddOrderModal = openAddOrderModal;
window.closeAddOrderModal = closeAddOrderModal;
window.closeViewOrderModal = closeViewOrderModal;
window.closeEditOrderModal = closeEditOrderModal;
window.saveOrder = saveOrder;
window.updateOrder = updateOrder;
window.editOrderFromView = editOrderFromView;

