// Maintenance Management JavaScript

// Sample maintenance requests data
let maintenanceRequests = [
    {
        id: 'MR-001',
        roomNumber: '305',
        issueTitle: 'AC not working',
        issueDescription: 'Air conditioning unit not cooling properly',
        priority: 'high',
        status: 'in-progress',
        assignedTo: 'Daniel Lee',
        reportDate: '2025-10-12',
        estimatedCost: 150
    },
    {
        id: 'MR-002',
        roomNumber: '210',
        issueTitle: 'Leaking faucet',
        issueDescription: 'Bathroom sink faucet dripping continuously',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'Unassigned',
        reportDate: '2025-10-13',
        estimatedCost: 75
    },
    {
        id: 'MR-003',
        roomNumber: '108',
        issueTitle: 'TV remote not working',
        issueDescription: 'TV remote control batteries dead',
        priority: 'low',
        status: 'pending',
        assignedTo: 'Unassigned',
        reportDate: '2025-10-13',
        estimatedCost: 25
    },
    {
        id: 'MR-004',
        roomNumber: '402',
        issueTitle: 'Door lock malfunction',
        issueDescription: 'Electronic door lock not responding to key card',
        priority: 'high',
        status: 'in-progress',
        assignedTo: 'Daniel Lee',
        reportDate: '2025-10-13',
        estimatedCost: 200
    },
    {
        id: 'MR-005',
        roomNumber: '203',
        issueTitle: 'Light bulb replacement',
        issueDescription: 'Multiple light bulbs need replacement',
        priority: 'low',
        status: 'completed',
        assignedTo: 'Maintenance Team',
        reportDate: '2025-10-11',
        estimatedCost: 50
    }
];

let currentRequestId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderMaintenanceTable();
    updateSummaryCards();
    updateAlertBanner();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('requestSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterRequests);
    }

    // Filter functionality
    const priorityFilter = document.getElementById('priorityFilter');
    if (priorityFilter) {
        priorityFilter.addEventListener('change', filterRequests);
    }

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterRequests);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addRequestModal', 'editRequestModal', 'viewRequestModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render maintenance table
function renderMaintenanceTable(filteredRequests = null) {
    const tbody = document.getElementById('maintenanceTableBody');
    if (!tbody) return;

    const requestsToRender = filteredRequests || maintenanceRequests;
    
    tbody.innerHTML = requestsToRender.map(request => `
        <tr>
            <td>${request.id}</td>
            <td>${request.roomNumber}</td>
            <td>
                <div class="issue-details">
                    <strong>${request.issueTitle}</strong>
                    <p>${request.issueDescription}</p>
                </div>
            </td>
            <td><span class="priority-badge priority-${request.priority}">${getPriorityText(request.priority)}</span></td>
            <td><span class="status-badge status-${request.status}">${getStatusText(request.status)}</span></td>
            <td>${request.assignedTo}</td>
            <td>${request.reportDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewRequest('${request.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editRequest('${request.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Get priority text
function getPriorityText(priority) {
    const priorityMap = {
        'high': 'High',
        'medium': 'Medium',
        'low': 'Low'
    };
    return priorityMap[priority] || priority;
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'pending': 'Pending',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const totalRequests = maintenanceRequests.length;
    const pendingRequests = maintenanceRequests.filter(req => req.status === 'pending').length;
    const inProgressRequests = maintenanceRequests.filter(req => req.status === 'in-progress').length;
    const highPriorityRequests = maintenanceRequests.filter(req => req.priority === 'high').length;

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = totalRequests;
        cards[1].querySelector('.card-content h3').textContent = pendingRequests;
        cards[2].querySelector('.card-content h3').textContent = inProgressRequests;
        cards[3].querySelector('.card-content h3').textContent = highPriorityRequests;
    }
}

// Update alert banner
function updateAlertBanner() {
    const highPriorityRequests = maintenanceRequests.filter(req => req.priority === 'high').length;
    
    const alertMessage = document.getElementById('alertMessage');
    if (alertMessage) {
        if (highPriorityRequests > 0) {
            alertMessage.textContent = `${highPriorityRequests} high priority maintenance requests require immediate attention. Please address these issues as soon as possible.`;
            document.getElementById('alertBanner').style.display = 'flex';
        } else {
            document.getElementById('alertBanner').style.display = 'none';
        }
    }
}

// Filter requests
function filterRequests() {
    const searchTerm = document.getElementById('requestSearch').value.toLowerCase();
    const priorityFilter = document.getElementById('priorityFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredRequests = maintenanceRequests.filter(request => {
        const matchesSearch = !searchTerm || 
            request.id.toLowerCase().includes(searchTerm) ||
            request.roomNumber.includes(searchTerm) ||
            request.issueTitle.toLowerCase().includes(searchTerm) ||
            request.issueDescription.toLowerCase().includes(searchTerm) ||
            request.assignedTo.toLowerCase().includes(searchTerm);
        
        const matchesPriority = !priorityFilter || request.priority === priorityFilter;
        const matchesStatus = !statusFilter || request.status === statusFilter;
        
        return matchesSearch && matchesPriority && matchesStatus;
    });

    renderMaintenanceTable(filteredRequests);
}

// Modal functions
function openAddRequestModal() {
    document.getElementById('addRequestModal').style.display = 'block';
    document.getElementById('addRequestForm').reset();
}

function closeAddRequestModal() {
    document.getElementById('addRequestModal').style.display = 'none';
}

function openViewRequestModal(requestId) {
    const request = maintenanceRequests.find(req => req.id === requestId);
    if (!request) return;

    // Populate view modal with request data
    document.getElementById('viewRequestId').textContent = request.id;
    document.getElementById('viewRequestRoom').textContent = request.roomNumber;
    document.getElementById('viewRequestIssue').textContent = request.issueTitle;
    document.getElementById('viewRequestDescription').textContent = request.issueDescription;
    document.getElementById('viewRequestPriority').textContent = getPriorityText(request.priority);
    document.getElementById('viewRequestPriority').className = `priority-badge priority-${request.priority}`;
    document.getElementById('viewRequestStatus').textContent = getStatusText(request.status);
    document.getElementById('viewRequestStatus').className = `status-badge status-${request.status}`;
    document.getElementById('viewRequestAssigned').textContent = request.assignedTo;
    document.getElementById('viewRequestDate').textContent = request.reportDate;
    document.getElementById('viewRequestCost').textContent = `$${request.estimatedCost}`;

    document.getElementById('viewRequestModal').style.display = 'block';
}

function closeViewRequestModal() {
    document.getElementById('viewRequestModal').style.display = 'none';
}

function openEditRequestModal(requestId) {
    const request = maintenanceRequests.find(req => req.id === requestId);
    if (!request) return;

    currentRequestId = requestId;
    
    // Populate form with request data
    document.getElementById('editRoomNumber').value = request.roomNumber;
    document.getElementById('editIssueTitle').value = request.issueTitle;
    document.getElementById('editPriority').value = request.priority;
    document.getElementById('editAssignedTo').value = request.assignedTo;
    document.getElementById('editIssueDescription').value = request.issueDescription;
    document.getElementById('editRequestStatus').value = request.status;
    document.getElementById('editEstimatedCost').value = request.estimatedCost;

    document.getElementById('editRequestModal').style.display = 'block';
}

function closeEditRequestModal() {
    document.getElementById('editRequestModal').style.display = 'none';
    currentRequestId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editRequestModal') {
        currentRequestId = null;
    }
}

// Request management functions
function viewRequest(requestId) {
    openViewRequestModal(requestId);
}

function editRequest(requestId) {
    openEditRequestModal(requestId);
}

function saveRequest() {
    const form = document.getElementById('addRequestForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['roomNumber', 'issueTitle', 'priority', 'issueDescription'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Generate new request ID
    const newId = 'MR-' + String(maintenanceRequests.length + 1).padStart(3, '0');
    
    // Create new request object
    const newRequest = {
        id: newId,
        roomNumber: formData.get('roomNumber'),
        issueTitle: formData.get('issueTitle'),
        issueDescription: formData.get('issueDescription'),
        priority: formData.get('priority'),
        status: formData.get('requestStatus') || 'pending',
        assignedTo: formData.get('assignedTo') || 'Unassigned',
        reportDate: new Date().toISOString().split('T')[0],
        estimatedCost: parseFloat(formData.get('estimatedCost')) || 0
    };

    // Add to requests array
    maintenanceRequests.push(newRequest);
    
    // Refresh table, summary cards, and alert banner
    renderMaintenanceTable();
    updateSummaryCards();
    updateAlertBanner();
    
    // Close modal
    closeAddRequestModal();
    
    // Show success message
    alert('Maintenance request created successfully!');
}

function updateRequest() {
    if (!currentRequestId) return;

    const form = document.getElementById('editRequestForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['roomNumber', 'issueTitle', 'priority', 'issueDescription'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update request
    const requestIndex = maintenanceRequests.findIndex(req => req.id === currentRequestId);
    if (requestIndex !== -1) {
        maintenanceRequests[requestIndex] = {
            ...maintenanceRequests[requestIndex],
            roomNumber: formData.get('roomNumber'),
            issueTitle: formData.get('issueTitle'),
            issueDescription: formData.get('issueDescription'),
            priority: formData.get('priority'),
            status: formData.get('requestStatus') || 'pending',
            assignedTo: formData.get('assignedTo') || 'Unassigned',
            estimatedCost: parseFloat(formData.get('estimatedCost')) || 0
        };

        // Refresh table, summary cards, and alert banner
        renderMaintenanceTable();
        updateSummaryCards();
        updateAlertBanner();
        
        // Close modal
        closeEditRequestModal();
        
        // Show success message
        alert('Maintenance request updated successfully!');
    }
}

function editRequestFromView() {
    closeViewRequestModal();
    if (currentRequestId) {
        openEditRequestModal(currentRequestId);
    }
}

// Export functions for global access
window.viewRequest = viewRequest;
window.editRequest = editRequest;
window.openAddRequestModal = openAddRequestModal;
window.closeAddRequestModal = closeAddRequestModal;
window.closeViewRequestModal = closeViewRequestModal;
window.closeEditRequestModal = closeEditRequestModal;
window.saveRequest = saveRequest;
window.updateRequest = updateRequest;
window.editRequestFromView = editRequestFromView;

