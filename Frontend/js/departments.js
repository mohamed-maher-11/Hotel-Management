// Department Management JavaScript

// Sample department data
let departments = [
    {
        id: 'D-001',
        name: 'Front Desk',
        description: 'Handles guest check-in, check-out, and customer service',
        manager: 'Emma Taylor',
        employeeCount: 12,
        annualBudget: 540000,
        status: 'active'
    },
    {
        id: 'D-002',
        name: 'Housekeeping',
        description: 'Maintains cleanliness and orderliness of rooms and facilities',
        manager: 'Bob Martinez',
        employeeCount: 35,
        annualBudget: 820000,
        status: 'active'
    },
    {
        id: 'D-003',
        name: 'Restaurant & Bar',
        description: 'Food and beverage services for guests',
        manager: 'Carol White',
        employeeCount: 28,
        annualBudget: 980000,
        status: 'active'
    },
    {
        id: 'D-004',
        name: 'Maintenance',
        description: 'Repairs and maintenance of hotel facilities',
        manager: 'Daniel Lee',
        employeeCount: 18,
        annualBudget: 450000,
        status: 'active'
    },
    {
        id: 'D-005',
        name: 'Security',
        description: 'Ensures safety and security of guests and property',
        manager: 'Frank Anderson',
        employeeCount: 15,
        annualBudget: 380000,
        status: 'active'
    },
    {
        id: 'D-006',
        name: 'Spa & Wellness',
        description: 'Spa treatments and wellness services',
        manager: 'Grace Kim',
        employeeCount: 12,
        annualBudget: 320000,
        status: 'active'
    },
    {
        id: 'D-007',
        name: 'Events & Catering',
        description: 'Manages events, conferences, and catering services',
        manager: 'Henry Rodriguez',
        employeeCount: 20,
        annualBudget: 650000,
        status: 'active'
    },
    {
        id: 'D-008',
        name: 'Human Resources',
        description: 'Manages employee relations and recruitment',
        manager: 'Isabel Chen',
        employeeCount: 8,
        annualBudget: 280000,
        status: 'active'
    }
];

let currentDepartmentId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderDepartmentsGrid();
    updateSummaryCards();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addDepartmentModal', 'editDepartmentModal', 'viewDepartmentModal', 'deleteDepartmentModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render departments grid
function renderDepartmentsGrid() {
    const grid = document.getElementById('departmentsGrid');
    if (!grid) return;

    grid.innerHTML = departments.map(department => `
        <div class="department-card">
            <div class="department-card-header">
                <div>
                    <div class="department-name">${department.name}</div>
                    <div class="department-id">${department.id}</div>
                </div>
                <button class="edit-department-btn" onclick="editDepartment('${department.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
            <div class="department-description">${department.description}</div>
            <div class="department-details">
                <div class="detail-item">
                    <span class="detail-label">Manager</span>
                    <span class="detail-value">${department.manager}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Employees</span>
                    <span class="employee-count-badge">${department.employeeCount}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Annual Budget</span>
                    <span class="detail-value budget-amount">$${department.annualBudget.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update summary cards
function updateSummaryCards() {
    const totalDepartments = departments.length;
    const totalStaff = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
    const totalBudget = departments.reduce((sum, dept) => sum + dept.annualBudget, 0);
    const avgTeamSize = totalStaff / totalDepartments;

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = totalDepartments;
        cards[1].querySelector('.card-content h3').textContent = totalStaff;
        cards[2].querySelector('.card-content h3').textContent = `$${(totalBudget / 1000000).toFixed(2)}M`;
        cards[3].querySelector('.card-content h3').textContent = avgTeamSize.toFixed(1);
    }
}

// Modal functions
function openAddDepartmentModal() {
    document.getElementById('addDepartmentModal').style.display = 'block';
    document.getElementById('addDepartmentForm').reset();
}

function closeAddDepartmentModal() {
    document.getElementById('addDepartmentModal').style.display = 'none';
}

function openEditDepartmentModal(departmentId) {
    const department = departments.find(dept => dept.id === departmentId);
    if (!department) return;

    currentDepartmentId = departmentId;
    
    // Populate form with department data
    document.getElementById('editDepartmentName').value = department.name;
    document.getElementById('editDepartmentCode').value = department.id;
    document.getElementById('editDescription').value = department.description;
    document.getElementById('editManager').value = department.manager;
    document.getElementById('editEmployeeCount').value = department.employeeCount;
    document.getElementById('editAnnualBudget').value = department.annualBudget;
    document.getElementById('editDepartmentStatus').value = department.status;

    document.getElementById('editDepartmentModal').style.display = 'block';
}

function closeEditDepartmentModal() {
    document.getElementById('editDepartmentModal').style.display = 'none';
    currentDepartmentId = null;
}

function openViewDepartmentModal(departmentId) {
    const department = departments.find(dept => dept.id === departmentId);
    if (!department) return;

    // Populate view modal with department data
    document.getElementById('viewDepartmentId').textContent = department.id;
    document.getElementById('viewDepartmentName').textContent = department.name;
    document.getElementById('viewDepartmentDescription').textContent = department.description;
    document.getElementById('viewDepartmentManager').textContent = department.manager;
    document.getElementById('viewDepartmentEmployeeCount').textContent = department.employeeCount;
    document.getElementById('viewDepartmentBudget').textContent = `$${department.annualBudget.toLocaleString()}`;
    document.getElementById('viewDepartmentStatus').textContent = getStatusText(department.status);
    document.getElementById('viewDepartmentStatus').className = `status-badge status-${department.status}`;

    document.getElementById('viewDepartmentModal').style.display = 'block';
}

function closeViewDepartmentModal() {
    document.getElementById('viewDepartmentModal').style.display = 'none';
}

function openDeleteDepartmentModal(departmentId) {
    currentDepartmentId = departmentId;
    document.getElementById('deleteDepartmentModal').style.display = 'block';
}

function closeDeleteDepartmentModal() {
    document.getElementById('deleteDepartmentModal').style.display = 'none';
    currentDepartmentId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editDepartmentModal' || modalId === 'deleteDepartmentModal') {
        currentDepartmentId = null;
    }
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'active': 'Active',
        'inactive': 'Inactive',
        'under-review': 'Under Review'
    };
    return statusMap[status] || status;
}

// Department management functions
function editDepartment(departmentId) {
    openEditDepartmentModal(departmentId);
}

function viewDepartment(departmentId) {
    openViewDepartmentModal(departmentId);
}

function deleteDepartment(departmentId) {
    openDeleteDepartmentModal(departmentId);
}

function saveDepartment() {
    const form = document.getElementById('addDepartmentForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['departmentName', 'description'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Generate new department ID if not provided
    let departmentId = formData.get('departmentCode');
    if (!departmentId) {
        departmentId = 'D-' + String(departments.length + 1).padStart(3, '0');
    }
    
    // Create new department object
    const newDepartment = {
        id: departmentId,
        name: formData.get('departmentName'),
        description: formData.get('description'),
        manager: formData.get('manager') || '',
        employeeCount: parseInt(formData.get('employeeCount')) || 0,
        annualBudget: parseInt(formData.get('annualBudget')) || 0,
        status: formData.get('departmentStatus') || 'active'
    };

    // Add to departments array
    departments.push(newDepartment);
    
    // Refresh grid and summary cards
    renderDepartmentsGrid();
    updateSummaryCards();
    
    // Close modal
    closeAddDepartmentModal();
    
    // Show success message
    alert('Department added successfully!');
}

function updateDepartment() {
    if (!currentDepartmentId) return;

    const form = document.getElementById('editDepartmentForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['departmentName', 'description'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update department
    const departmentIndex = departments.findIndex(dept => dept.id === currentDepartmentId);
    if (departmentIndex !== -1) {
        departments[departmentIndex] = {
            ...departments[departmentIndex],
            name: formData.get('departmentName'),
            description: formData.get('description'),
            manager: formData.get('manager') || '',
            employeeCount: parseInt(formData.get('employeeCount')) || 0,
            annualBudget: parseInt(formData.get('annualBudget')) || 0,
            status: formData.get('departmentStatus') || 'active'
        };

        // Refresh grid and summary cards
        renderDepartmentsGrid();
        updateSummaryCards();
        
        // Close modal
        closeEditDepartmentModal();
        
        // Show success message
        alert('Department updated successfully!');
    }
}

function confirmDeleteDepartment() {
    if (!currentDepartmentId) return;

    // Find and remove department
    const departmentIndex = departments.findIndex(dept => dept.id === currentDepartmentId);
    if (departmentIndex !== -1) {
        departments.splice(departmentIndex, 1);
        
        // Refresh grid and summary cards
        renderDepartmentsGrid();
        updateSummaryCards();
        
        // Close modal
        closeDeleteDepartmentModal();
        
        // Show success message
        alert('Department deleted successfully!');
    }
}

function editDepartmentFromView() {
    closeViewDepartmentModal();
    if (currentDepartmentId) {
        openEditDepartmentModal(currentDepartmentId);
    }
}

// Export functions for global access
window.editDepartment = editDepartment;
window.viewDepartment = viewDepartment;
window.deleteDepartment = deleteDepartment;
window.openAddDepartmentModal = openAddDepartmentModal;
window.closeAddDepartmentModal = closeAddDepartmentModal;
window.closeEditDepartmentModal = closeEditDepartmentModal;
window.closeViewDepartmentModal = closeViewDepartmentModal;
window.closeDeleteDepartmentModal = closeDeleteDepartmentModal;
window.saveDepartment = saveDepartment;
window.updateDepartment = updateDepartment;
window.confirmDeleteDepartment = confirmDeleteDepartment;
window.editDepartmentFromView = editDepartmentFromView;

