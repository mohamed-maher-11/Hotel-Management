// Employee Management JavaScript

// Sample employee data
let employees = [
    {
        id: 'E-001',
        firstName: 'Alice',
        lastName: 'Cooper',
        email: 'alice.c@hotel.com',
        phone: '+1 (555) 123-4567',
        department: 'front-desk',
        position: 'Receptionist',
        salary: 45000,
        status: 'active',
        employeeType: 'full-time',
        hireDate: '2023-01-15',
        address: '123 Main St, City, State 12345'
    },
    {
        id: 'E-002',
        firstName: 'Bob',
        lastName: 'Martinez',
        email: 'bob.m@hotel.com',
        phone: '+1 (555) 234-5678',
        department: 'housekeeping',
        position: 'Supervisor',
        salary: 52000,
        status: 'active',
        employeeType: 'full-time',
        hireDate: '2022-08-20',
        address: '456 Oak Ave, City, State 12345'
    },
    {
        id: 'E-003',
        firstName: 'Carol',
        lastName: 'White',
        email: 'carol.w@hotel.com',
        phone: '+1 (555) 345-6789',
        department: 'restaurant',
        position: 'Chef',
        salary: 65000,
        status: 'active',
        employeeType: 'full-time',
        hireDate: '2021-03-10',
        address: '789 Pine St, City, State 12345'
    },
    {
        id: 'E-004',
        firstName: 'Daniel',
        lastName: 'Lee',
        email: 'daniel.l@hotel.com',
        phone: '+1 (555) 456-7890',
        department: 'maintenance',
        position: 'Technician',
        salary: 48000,
        status: 'active',
        employeeType: 'full-time',
        hireDate: '2023-06-01',
        address: '321 Elm St, City, State 12345'
    },
    {
        id: 'E-005',
        firstName: 'Emma',
        lastName: 'Taylor',
        email: 'emma.t@hotel.com',
        phone: '+1 (555) 567-8901',
        department: 'front-desk',
        position: 'Manager',
        salary: 72000,
        status: 'active',
        employeeType: 'full-time',
        hireDate: '2020-11-15',
        address: '654 Maple Dr, City, State 12345'
    }
];

let currentEmployeeId = null;

// Department mapping
const departmentMap = {
    'front-desk': 'Front Desk',
    'housekeeping': 'Housekeeping',
    'restaurant': 'Restaurant',
    'maintenance': 'Maintenance',
    'management': 'Management',
    'security': 'Security',
    'concierge': 'Concierge',
    'spa': 'Spa & Wellness'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderEmployeesTable();
    setupEventListeners();
    updateSummaryCards();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('employeeSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterEmployees);
    }

    // Filter functionality
    const departmentFilter = document.getElementById('departmentFilter');
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterEmployees);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addEmployeeModal', 'editEmployeeModal', 'viewEmployeeModal', 'deleteEmployeeModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render employees table
function renderEmployeesTable(filteredEmployees = null) {
    const tbody = document.getElementById('employeesTableBody');
    if (!tbody) return;

    const employeesToRender = filteredEmployees || employees;
    
    tbody.innerHTML = employeesToRender.map(employee => `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.firstName} ${employee.lastName}</td>
            <td>${employee.email}</td>
            <td>${departmentMap[employee.department] || employee.department}</td>
            <td>${employee.position}</td>
            <td>$${employee.salary.toLocaleString()}</td>
            <td><span class="status-badge status-${employee.status}">${getStatusText(employee.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" onclick="editEmployee('${employee.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn view-btn" onclick="viewEmployee('${employee.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteEmployee('${employee.id}')">
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
        'active': 'Active',
        'inactive': 'Inactive',
        'on-leave': 'On Leave'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'active').length;
    const onLeaveEmployees = employees.filter(emp => emp.status === 'on-leave').length;
    const uniqueDepartments = [...new Set(employees.map(emp => emp.department))].length;

    // Update the summary cards (if they exist in the DOM)
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = totalEmployees;
        cards[1].querySelector('.card-content h3').textContent = activeEmployees;
        cards[2].querySelector('.card-content h3').textContent = onLeaveEmployees;
        cards[3].querySelector('.card-content h3').textContent = uniqueDepartments;
    }
}

// Filter employees
function filterEmployees() {
    const searchTerm = document.getElementById('employeeSearch').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = !searchTerm || 
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.position.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
        
        return matchesSearch && matchesDepartment;
    });

    renderEmployeesTable(filteredEmployees);
}

// Modal functions
function openAddEmployeeModal() {
    document.getElementById('addEmployeeModal').style.display = 'block';
    document.getElementById('addEmployeeForm').reset();
}

function closeAddEmployeeModal() {
    document.getElementById('addEmployeeModal').style.display = 'none';
}

function openEditEmployeeModal(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    currentEmployeeId = employeeId;
    
    // Populate form with employee data
    document.getElementById('editFirstName').value = employee.firstName;
    document.getElementById('editLastName').value = employee.lastName;
    document.getElementById('editEmail').value = employee.email;
    document.getElementById('editPhone').value = employee.phone;
    document.getElementById('editDepartment').value = employee.department;
    document.getElementById('editPosition').value = employee.position;
    document.getElementById('editSalary').value = employee.salary;
    document.getElementById('editEmployeeStatus').value = employee.status;
    document.getElementById('editEmployeeType').value = employee.employeeType;
    document.getElementById('editHireDate').value = employee.hireDate;
    document.getElementById('editAddress').value = employee.address;

    document.getElementById('editEmployeeModal').style.display = 'block';
}

function closeEditEmployeeModal() {
    document.getElementById('editEmployeeModal').style.display = 'none';
    currentEmployeeId = null;
}

function openViewEmployeeModal(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    // Populate view modal with employee data
    document.getElementById('viewEmployeeId').textContent = employee.id;
    document.getElementById('viewEmployeeName').textContent = `${employee.firstName} ${employee.lastName}`;
    document.getElementById('viewEmployeeEmail').textContent = employee.email;
    document.getElementById('viewEmployeePhone').textContent = employee.phone;
    document.getElementById('viewEmployeeDepartment').textContent = departmentMap[employee.department] || employee.department;
    document.getElementById('viewEmployeePosition').textContent = employee.position;
    document.getElementById('viewEmployeeSalary').textContent = `$${employee.salary.toLocaleString()}`;
    document.getElementById('viewEmployeeStatus').textContent = getStatusText(employee.status);
    document.getElementById('viewEmployeeStatus').className = `status-badge status-${employee.status}`;
    document.getElementById('viewEmployeeType').textContent = employee.employeeType.charAt(0).toUpperCase() + employee.employeeType.slice(1).replace('-', ' ');
    document.getElementById('viewEmployeeHireDate').textContent = employee.hireDate;
    document.getElementById('viewEmployeeAddress').textContent = employee.address;

    document.getElementById('viewEmployeeModal').style.display = 'block';
}

function closeViewEmployeeModal() {
    document.getElementById('viewEmployeeModal').style.display = 'none';
}

function openDeleteEmployeeModal(employeeId) {
    currentEmployeeId = employeeId;
    document.getElementById('deleteEmployeeModal').style.display = 'block';
}

function closeDeleteEmployeeModal() {
    document.getElementById('deleteEmployeeModal').style.display = 'none';
    currentEmployeeId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editEmployeeModal' || modalId === 'deleteEmployeeModal') {
        currentEmployeeId = null;
    }
}

// Employee management functions
function editEmployee(employeeId) {
    openEditEmployeeModal(employeeId);
}

function viewEmployee(employeeId) {
    openViewEmployeeModal(employeeId);
}

function deleteEmployee(employeeId) {
    openDeleteEmployeeModal(employeeId);
}

function saveEmployee() {
    const form = document.getElementById('addEmployeeForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'position', 'salary', 'hireDate'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Generate new employee ID
    const newId = 'E-' + String(employees.length + 1).padStart(3, '0');
    
    // Create new employee object
    const newEmployee = {
        id: newId,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        department: formData.get('department'),
        position: formData.get('position'),
        salary: parseInt(formData.get('salary')),
        status: formData.get('employeeStatus') || 'active',
        employeeType: formData.get('employeeType') || 'full-time',
        hireDate: formData.get('hireDate'),
        address: formData.get('address') || ''
    };

    // Add to employees array
    employees.push(newEmployee);
    
    // Refresh table and summary cards
    renderEmployeesTable();
    updateSummaryCards();
    
    // Close modal
    closeAddEmployeeModal();
    
    // Show success message
    alert('Employee added successfully!');
}

function updateEmployee() {
    if (!currentEmployeeId) return;

    const form = document.getElementById('editEmployeeForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'position', 'salary', 'hireDate'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update employee
    const employeeIndex = employees.findIndex(emp => emp.id === currentEmployeeId);
    if (employeeIndex !== -1) {
        employees[employeeIndex] = {
            ...employees[employeeIndex],
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            department: formData.get('department'),
            position: formData.get('position'),
            salary: parseInt(formData.get('salary')),
            status: formData.get('employeeStatus') || 'active',
            employeeType: formData.get('employeeType') || 'full-time',
            hireDate: formData.get('hireDate'),
            address: formData.get('address') || ''
        };

        // Refresh table and summary cards
        renderEmployeesTable();
        updateSummaryCards();
        
        // Close modal
        closeEditEmployeeModal();
        
        // Show success message
        alert('Employee updated successfully!');
    }
}

function confirmDeleteEmployee() {
    if (!currentEmployeeId) return;

    // Find and remove employee
    const employeeIndex = employees.findIndex(emp => emp.id === currentEmployeeId);
    if (employeeIndex !== -1) {
        employees.splice(employeeIndex, 1);
        
        // Refresh table and summary cards
        renderEmployeesTable();
        updateSummaryCards();
        
        // Close modal
        closeDeleteEmployeeModal();
        
        // Show success message
        alert('Employee deleted successfully!');
    }
}

function editEmployeeFromView() {
    closeViewEmployeeModal();
    if (currentEmployeeId) {
        openEditEmployeeModal(currentEmployeeId);
    }
}

// Export functions for global access
window.editEmployee = editEmployee;
window.viewEmployee = viewEmployee;
window.deleteEmployee = deleteEmployee;
window.openAddEmployeeModal = openAddEmployeeModal;
window.closeAddEmployeeModal = closeAddEmployeeModal;
window.closeEditEmployeeModal = closeEditEmployeeModal;
window.closeViewEmployeeModal = closeViewEmployeeModal;
window.closeDeleteEmployeeModal = closeDeleteEmployeeModal;
window.saveEmployee = saveEmployee;
window.updateEmployee = updateEmployee;
window.confirmDeleteEmployee = confirmDeleteEmployee;
window.editEmployeeFromView = editEmployeeFromView;

