// User Management JavaScript

// Sample users data
let users = [
    {
        id: 'U-001',
        username: 'admin',
        fullName: 'Admin',
        email: '',
        role: 'admin',
        status: 'active',
        lastLogin: '2025-10-13 09:30',
        department: 'management'
    },
    {
        id: 'U-002',
        username: 'manager1',
        fullName: 'Emma Taylor',
        email: 'emma.t@hotel.com',
        role: 'manager',
        status: 'active',
        lastLogin: '2025-10-13 08:15',
        department: 'management'
    },
    {
        id: 'U-003',
        username: 'receptionist1',
        fullName: 'Alice Cooper',
        email: 'alice.c@hotel.com',
        role: 'receptionist',
        status: 'active',
        lastLogin: '2025-10-13 07:00',
        department: 'front-office'
    },
    {
        id: 'U-004',
        username: 'housekeeping1',
        fullName: 'Bob Martinez',
        email: 'bob.m@hotel.com',
        role: 'housekeeping',
        status: 'active',
        lastLogin: '2025-10-12 16:45',
        department: 'housekeeping'
    },
    {
        id: 'U-005',
        username: 'maintenance1',
        fullName: 'Daniel Lee',
        email: 'daniel.l@hotel.com',
        role: 'maintenance',
        status: 'active',
        lastLogin: '2025-10-13 06:30',
        department: 'maintenance'
    },
    {
        id: 'U-006',
        username: 'chef1',
        fullName: 'Carol White',
        email: 'carol.w@hotel.com',
        role: 'chef',
        status: 'inactive',
        lastLogin: '2025-10-05 14:20',
        department: 'food-beverage'
    }
];

let currentUserId = null;

// Role mapping
const roleMap = {
    'admin': 'Admin',
    'manager': 'Manager',
    'receptionist': 'Receptionist',
    'housekeeping': 'Housekeeping',
    'maintenance': 'Maintenance',
    'chef': 'Chef'
};

// Department mapping
const departmentMap = {
    'front-office': 'Front Office',
    'housekeeping': 'Housekeeping',
    'maintenance': 'Maintenance',
    'food-beverage': 'Food & Beverage',
    'management': 'Management'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderUsersTable();
    updateSummaryCards();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('userSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterUsers);
    }

    // Filter functionality
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', filterUsers);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['addUserModal', 'viewUserModal', 'editUserModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render users table
function renderUsersTable(filteredUsers = null) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    const usersToRender = filteredUsers || users;
    
    tbody.innerHTML = usersToRender.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${roleMap[user.role] || user.role}</span></td>
            <td>${user.lastLogin}</td>
            <td><span class="status-badge status-${user.status}">${getStatusText(user.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewUser('${user.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editUser('${user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteUser('${user.id}')">
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
        'inactive': 'Inactive'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === 'active').length;
    const adminUsers = users.filter(user => user.role === 'admin').length;
    const uniqueRoles = [...new Set(users.map(user => user.role))].length;

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = totalUsers;
        cards[1].querySelector('.card-content h3').textContent = activeUsers;
        cards[2].querySelector('.card-content h3').textContent = adminUsers;
        cards[3].querySelector('.card-content h3').textContent = uniqueRoles;
    }
}

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;

    const filteredUsers = users.filter(user => {
        const matchesSearch = !searchTerm || 
            user.id.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm) ||
            user.fullName.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm);
        
        const matchesRole = !roleFilter || user.role === roleFilter;
        
        return matchesSearch && matchesRole;
    });

    renderUsersTable(filteredUsers);
}

// Modal functions
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
    document.getElementById('addUserForm').reset();
}

function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
}

function openViewUserModal(userId) {
    const user = users.find(usr => usr.id === userId);
    if (!user) return;

    // Populate view modal with user data
    document.getElementById('viewUserId').textContent = user.id;
    document.getElementById('viewFullName').textContent = user.fullName;
    document.getElementById('viewEmail').textContent = user.email;
    document.getElementById('viewRole').textContent = roleMap[user.role] || user.role;
    document.getElementById('viewRole').className = `role-badge role-${user.role}`;
    document.getElementById('viewStatus').textContent = getStatusText(user.status);
    document.getElementById('viewStatus').className = `status-badge status-${user.status}`;
    document.getElementById('viewLastLogin').textContent = user.lastLogin;
    document.getElementById('viewDepartment').textContent = departmentMap[user.department] || user.department;

    document.getElementById('viewUserModal').style.display = 'block';
}

function closeViewUserModal() {
    document.getElementById('viewUserModal').style.display = 'none';
}

function openEditUserModal(userId) {
    const user = users.find(usr => usr.id === userId);
    if (!user) return;

    currentUserId = userId;
    
    // Populate form with user data
    document.getElementById('editFullName').value = user.fullName;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editRole').value = user.role;
    document.getElementById('editUserStatus').value = user.status;
    document.getElementById('editDepartment').value = user.department;

    document.getElementById('editUserModal').style.display = 'block';
}

function closeEditUserModal() {
    document.getElementById('editUserModal').style.display = 'none';
    currentUserId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editUserModal') {
        currentUserId = null;
    }
}

// User management functions
function viewUser(userId) {
    openViewUserModal(userId);
}

function editUser(userId) {
    openEditUserModal(userId);
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const userIndex = users.findIndex(usr => usr.id === userId);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            renderUsersTable();
            updateSummaryCards();
            alert('User deleted successfully!');
        }
    }
}

function saveUser() {
    const form = document.getElementById('addUserForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['username', 'fullName', 'email', 'role', 'password', 'confirmPassword'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Validate password confirmation
    if (formData.get('password') !== formData.get('confirmPassword')) {
        alert('Passwords do not match.');
        return;
    }


    // Check if email already exists
    if (users.find(user => user.email === formData.get('email'))) {
        alert('Email already exists. Please use a different email address.');
        return;
    }

    // Generate new user ID
    const newId = 'U-' + String(users.length + 1).padStart(3, '0');
    
    // Create new user object
    const newUser = {
        id: newId,
        username: formData.get('username'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: formData.get('userStatus') || 'active',
        lastLogin: 'Never',
        department: formData.get('department') || ''
    };

    // Add to users array
    users.push(newUser);
    
    // Refresh table and summary cards
    renderUsersTable();
    updateSummaryCards();
    
    // Close modal
    closeAddUserModal();
    
    // Show success message
    alert('User created successfully!');
}

function updateUser() {
    if (!currentUserId) return;

    const form = document.getElementById('editUserForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['username', 'fullName', 'email', 'role'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }


    // Check if email already exists (excluding current user)
    const existingEmail = users.find(user => user.email === formData.get('email') && user.id !== currentUserId);
    if (existingEmail) {
        alert('Email already exists. Please use a different email address.');
        return;
    }

    // Find and update user
    const userIndex = users.findIndex(usr => usr.id === currentUserId);
    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            username: formData.get('username'),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            role: formData.get('role'),
            status: formData.get('userStatus') || 'active',
            department: formData.get('department') || ''
        };

        // Refresh table and summary cards
        renderUsersTable();
        updateSummaryCards();
        
        // Close modal
        closeEditUserModal();
        
        // Show success message
        alert('User updated successfully!');
    }
}

function editUserFromView() {
    closeViewUserModal();
    if (currentUserId) {
        openEditUserModal(currentUserId);
    }
}

function editRolePermissions(role) {
    alert(`Edit permissions for ${roleMap[role] || role} role. This feature would open a permissions management interface.`);
}

// Export functions for global access
window.viewUser = viewUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.openAddUserModal = openAddUserModal;
window.closeAddUserModal = closeAddUserModal;
window.closeViewUserModal = closeViewUserModal;
window.closeEditUserModal = closeEditUserModal;
window.saveUser = saveUser;
window.updateUser = updateUser;
window.editUserFromView = editUserFromView;
window.editRolePermissions = editRolePermissions;


