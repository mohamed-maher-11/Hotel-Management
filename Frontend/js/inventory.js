// Inventory Management JavaScript

// Sample inventory data
let inventory = [
    {
        id: 'INV-001',
        name: 'Bed Sheets (Queen)',
        category: 'linens',
        quantity: 250,
        minQuantity: 100,
        unit: 'pcs',
        supplier: 'Linen Plus Co.',
        costPerUnit: 15.50,
        description: 'High-quality cotton bed sheets for queen size beds',
        status: 'in-stock'
    },
    {
        id: 'INV-002',
        name: 'Towels (Bath)',
        category: 'linens',
        quantity: 45,
        minQuantity: 80,
        unit: 'pcs',
        supplier: 'Linen Plus Co.',
        costPerUnit: 8.75,
        description: 'Soft and absorbent bath towels',
        status: 'low-stock'
    },
    {
        id: 'INV-003',
        name: 'Shampoo Bottles',
        category: 'toiletries',
        quantity: 180,
        minQuantity: 100,
        unit: 'bottles',
        supplier: 'Beauty Essentials',
        costPerUnit: 3.25,
        description: 'Premium hotel-grade shampoo',
        status: 'in-stock'
    },
    {
        id: 'INV-004',
        name: 'Coffee Pods',
        category: 'food-beverage',
        quantity: 520,
        minQuantity: 200,
        unit: 'boxes',
        supplier: 'Coffee House Suppliers',
        costPerUnit: 0.85,
        description: 'Single-serve coffee pods for in-room coffee makers',
        status: 'in-stock'
    },
    {
        id: 'INV-005',
        name: 'Cleaning Solution',
        category: 'cleaning',
        quantity: 85,
        minQuantity: 50,
        unit: 'gallons',
        supplier: 'Clean Pro Industries',
        costPerUnit: 12.50,
        description: 'Multi-purpose cleaning solution for hotel maintenance',
        status: 'in-stock'
    },
    {
        id: 'INV-006',
        name: 'Light Bulbs (LED)',
        category: 'maintenance',
        quantity: 25,
        minQuantity: 50,
        unit: 'boxes',
        supplier: 'Electric Supply Co.',
        costPerUnit: 4.20,
        description: 'Energy-efficient LED light bulbs',
        status: 'critical'
    }
];

let currentItemId = null;

// Category mapping
const categoryMap = {
    'linens': 'Linens',
    'toiletries': 'Toiletries',
    'food-beverage': 'Food & Beverage',
    'cleaning': 'Cleaning',
    'maintenance': 'Maintenance',
    'electronics': 'Electronics',
    'furniture': 'Furniture',
    'safety': 'Safety'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderInventoryTable();
    updateSummaryCards();
    updateAlertBanner();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('inventorySearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterInventory);
    }

    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterInventory);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addItemModal', 'editItemModal', 'restockModal', 'deleteItemModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render inventory table
function renderInventoryTable(filteredInventory = null) {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;

    const inventoryToRender = filteredInventory || inventory;
    
    tbody.innerHTML = inventoryToRender.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${categoryMap[item.category] || item.category}</td>
            <td>${item.quantity} ${item.unit}</td>
            <td>${item.minQuantity} ${item.unit}</td>
            <td>${item.supplier}</td>
            <td><span class="status-badge status-${item.status}">${getStatusText(item.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" onclick="editItem('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn restock-btn" onclick="restockItem('${item.id}')">
                        <i class="fas fa-box"></i>
                        Restock
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'critical': 'Critical'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
    const criticalItems = inventory.filter(item => item.status === 'critical').length;
    const uniqueCategories = [...new Set(inventory.map(item => item.category))].length;

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = totalItems;
        cards[1].querySelector('.card-content h3').textContent = lowStockItems;
        cards[2].querySelector('.card-content h3').textContent = criticalItems;
        cards[3].querySelector('.card-content h3').textContent = uniqueCategories;
    }
}

// Update alert banner
function updateAlertBanner() {
    const criticalItems = inventory.filter(item => item.status === 'critical').length;
    const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
    
    const alertMessage = document.getElementById('alertMessage');
    if (alertMessage) {
        if (criticalItems > 0 || lowStockItems > 0) {
            alertMessage.textContent = `${criticalItems} item(s) critically low. ${lowStockItems} item(s) below minimum stock level. Please restock these items soon.`;
            document.getElementById('alertBanner').style.display = 'flex';
        } else {
            document.getElementById('alertBanner').style.display = 'none';
        }
    }
}

// Filter inventory
function filterInventory() {
    const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm) ||
            item.id.toLowerCase().includes(searchTerm) ||
            item.supplier.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });

    renderInventoryTable(filteredInventory);
}

// Modal functions
function openAddItemModal() {
    document.getElementById('addItemModal').style.display = 'block';
    document.getElementById('addItemForm').reset();
}

function closeAddItemModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

function openEditItemModal(itemId) {
    const item = inventory.find(inv => inv.id === itemId);
    if (!item) return;

    currentItemId = itemId;
    
    // Populate form with item data
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemCode').value = item.id;
    document.getElementById('editCategory').value = item.category;
    document.getElementById('editSupplier').value = item.supplier;
    document.getElementById('editQuantity').value = item.quantity;
    document.getElementById('editMinQuantity').value = item.minQuantity;
    document.getElementById('editUnit').value = item.unit;
    document.getElementById('editCostPerUnit').value = item.costPerUnit;
    document.getElementById('editDescription').value = item.description;

    document.getElementById('editItemModal').style.display = 'block';
}

function closeEditItemModal() {
    document.getElementById('editItemModal').style.display = 'none';
    currentItemId = null;
}

function openRestockModal(itemId) {
    currentItemId = itemId;
    document.getElementById('restockModal').style.display = 'block';
    document.getElementById('restockForm').reset();
}

function closeRestockModal() {
    document.getElementById('restockModal').style.display = 'none';
    currentItemId = null;
}

function openDeleteItemModal(itemId) {
    currentItemId = itemId;
    document.getElementById('deleteItemModal').style.display = 'block';
}

function closeDeleteItemModal() {
    document.getElementById('deleteItemModal').style.display = 'none';
    currentItemId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editItemModal' || modalId === 'restockModal' || modalId === 'deleteItemModal') {
        currentItemId = null;
    }
}

// Item management functions
function editItem(itemId) {
    openEditItemModal(itemId);
}

function restockItem(itemId) {
    openRestockModal(itemId);
}

function deleteItem(itemId) {
    openDeleteItemModal(itemId);
}

function saveItem() {
    const form = document.getElementById('addItemForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['itemName', 'category', 'supplier', 'quantity', 'minQuantity'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Generate new item ID if not provided
    let itemId = formData.get('itemCode');
    if (!itemId) {
        itemId = 'INV-' + String(inventory.length + 1).padStart(3, '0');
    }
    
    // Determine status based on quantity
    const quantity = parseInt(formData.get('quantity'));
    const minQuantity = parseInt(formData.get('minQuantity'));
    let status = 'in-stock';
    if (quantity <= 0) {
        status = 'critical';
    } else if (quantity <= minQuantity) {
        status = 'low-stock';
    }
    
    // Create new item object
    const newItem = {
        id: itemId,
        name: formData.get('itemName'),
        category: formData.get('category'),
        quantity: quantity,
        minQuantity: minQuantity,
        unit: formData.get('unit') || 'pcs',
        supplier: formData.get('supplier'),
        costPerUnit: parseFloat(formData.get('costPerUnit')) || 0,
        description: formData.get('description') || '',
        status: status
    };

    // Add to inventory array
    inventory.push(newItem);
    
    // Refresh table, summary cards, and alert banner
    renderInventoryTable();
    updateSummaryCards();
    updateAlertBanner();
    
    // Close modal
    closeAddItemModal();
    
    // Show success message
    alert('Item added successfully!');
}

function updateItem() {
    if (!currentItemId) return;

    const form = document.getElementById('editItemForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['itemName', 'category', 'supplier', 'quantity', 'minQuantity'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update item
    const itemIndex = inventory.findIndex(inv => inv.id === currentItemId);
    if (itemIndex !== -1) {
        const quantity = parseInt(formData.get('quantity'));
        const minQuantity = parseInt(formData.get('minQuantity'));
        let status = 'in-stock';
        if (quantity <= 0) {
            status = 'critical';
        } else if (quantity <= minQuantity) {
            status = 'low-stock';
        }

        inventory[itemIndex] = {
            ...inventory[itemIndex],
            name: formData.get('itemName'),
            category: formData.get('category'),
            quantity: quantity,
            minQuantity: minQuantity,
            unit: formData.get('unit') || 'pcs',
            supplier: formData.get('supplier'),
            costPerUnit: parseFloat(formData.get('costPerUnit')) || 0,
            description: formData.get('description') || '',
            status: status
        };

        // Refresh table, summary cards, and alert banner
        renderInventoryTable();
        updateSummaryCards();
        updateAlertBanner();
        
        // Close modal
        closeEditItemModal();
        
        // Show success message
        alert('Item updated successfully!');
    }
}

function confirmRestock() {
    if (!currentItemId) return;

    const form = document.getElementById('restockForm');
    const formData = new FormData(form);
    
    const restockQuantity = parseInt(formData.get('restockQuantity'));
    if (!restockQuantity || restockQuantity <= 0) {
        alert('Please enter a valid restock quantity.');
        return;
    }

    // Find and update item
    const itemIndex = inventory.findIndex(inv => inv.id === currentItemId);
    if (itemIndex !== -1) {
        const newQuantity = inventory[itemIndex].quantity + restockQuantity;
        const minQuantity = inventory[itemIndex].minQuantity;
        
        let status = 'in-stock';
        if (newQuantity <= 0) {
            status = 'critical';
        } else if (newQuantity <= minQuantity) {
            status = 'low-stock';
        }

        inventory[itemIndex].quantity = newQuantity;
        inventory[itemIndex].status = status;

        // Refresh table, summary cards, and alert banner
        renderInventoryTable();
        updateSummaryCards();
        updateAlertBanner();
        
        // Close modal
        closeRestockModal();
        
        // Show success message
        alert(`Item restocked successfully! Added ${restockQuantity} ${inventory[itemIndex].unit}.`);
    }
}

function confirmDeleteItem() {
    if (!currentItemId) return;

    // Find and remove item
    const itemIndex = inventory.findIndex(inv => inv.id === currentItemId);
    if (itemIndex !== -1) {
        inventory.splice(itemIndex, 1);
        
        // Refresh table, summary cards, and alert banner
        renderInventoryTable();
        updateSummaryCards();
        updateAlertBanner();
        
        // Close modal
        closeDeleteItemModal();
        
        // Show success message
        alert('Item deleted successfully!');
    }
}

// Export functions for global access
window.editItem = editItem;
window.restockItem = restockItem;
window.deleteItem = deleteItem;
window.openAddItemModal = openAddItemModal;
window.closeAddItemModal = closeAddItemModal;
window.closeEditItemModal = closeEditItemModal;
window.closeRestockModal = closeRestockModal;
window.closeDeleteItemModal = closeDeleteItemModal;
window.saveItem = saveItem;
window.updateItem = updateItem;
window.confirmRestock = confirmRestock;
window.confirmDeleteItem = confirmDeleteItem;

