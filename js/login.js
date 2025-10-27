// Hotel Management System - Authentication JavaScript

// Sample user accounts for testing
const users = [
    {
        id: 1,
        firstName: "Admin",
        lastName: "User",
        email: "",
        password: "admin123",
        role: "admin",
        phone: "+1 (555) 123-4567"
    },
    {
        id: 2,
        firstName: "John",
        lastName: "Manager",
        email: "manager@hotel.com",
        password: "manager123",
        role: "manager",
        phone: "+1 (555) 234-5678"
    },
    {
        id: 3,
        firstName: "Receptionist",
        lastName: "Receptionist",
        email: "",
        password: "reception123",
        role: "receptionist",
        phone: "+1 (555) 345-6789"
    }
    
];

// Store registered users in localStorage
function initializeUsers() {
    if (!localStorage.getItem('hotelUsers')) {
        localStorage.setItem('hotelUsers', JSON.stringify(users));
    }
}

// Initialize users on page load
initializeUsers();

// Password toggle functionality
function togglePassword(fieldId = 'password') {
    console.log('Toggle password called for field:', fieldId);
    
    const passwordField = document.getElementById(fieldId);
    
    // Find the toggle icon - it could be in different places
    let toggleIcon;
    
    if (fieldId === 'password') {
        toggleIcon = document.getElementById('passwordToggleIcon');
    } else if (fieldId === 'confirmPassword') {
        toggleIcon = document.getElementById('confirmPasswordToggleIcon');
    } else {
        // Fallback: look for icon in the same input group
        const inputGroup = passwordField.closest('.input-group');
        if (inputGroup) {
            toggleIcon = inputGroup.querySelector('.password-toggle i');
        }
    }
    
    if (!passwordField) {
        console.error('Password field not found:', fieldId);
        return;
    }
    
    if (!toggleIcon) {
        console.error('Toggle icon not found for field:', fieldId);
        return;
    }
    
    console.log('Password field found:', passwordField);
    console.log('Toggle icon found:', toggleIcon);
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
        console.log('Password shown');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
        console.log('Password hidden');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('hotelUsers'));
    
    // Find user by email
    const user = storedUsers.find(u => u.email === email);
    
    if (user && user.password === password) {
        // Login successful
        const userSession = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            phone: user.phone,
            loginTime: new Date().toISOString()
        };
        
        // Store session
        if (rememberMe) {
            localStorage.setItem('hotelUserSession', JSON.stringify(userSession));
        } else {
            sessionStorage.setItem('hotelUserSession', JSON.stringify(userSession));
        }
        
        // Show success message
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } else {
        // Login failed
        showMessage('Invalid email or password. Please try again.', 'error');
    }
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    // Password requirements: minimum 8 characters, at least one uppercase, one number, and one special character
    if (password.length < 8) {
        showMessage('Password must be at least 8 characters long!', 'error');
        return;
    }
    
    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
        showMessage('Password must contain at least one uppercase letter!', 'error');
        return;
    }
    
    // Check for number
    if (!/[0-9]/.test(password)) {
        showMessage('Password must contain at least one number!', 'error');
        return;
    }
    
    // Check for special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        showMessage('Password must contain at least one special character!', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showMessage('Please agree to the Terms of Service and Privacy Policy!', 'error');
        return;
    }
    
    // Get existing users
    const storedUsers = JSON.parse(localStorage.getItem('hotelUsers'));
    
    // Check if email already exists
    if (storedUsers.find(u => u.email === email)) {
        showMessage('Email already exists! Please use a different email.', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: storedUsers.length + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role,
        phone: phone,
        createdAt: new Date().toISOString()
    };
    
    // Add user to storage
    storedUsers.push(newUser);
    localStorage.setItem('hotelUsers', JSON.stringify(storedUsers));
    
    // Show success message
    showMessage('Account created successfully! Redirecting to login...', 'success');
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Check if user is already logged in
function checkAuth() {
    // Removed auto-redirect to allow access to login/register pages
    // Users can manually navigate to dashboard if already logged in
}

// Run auth check on login page
if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
    checkAuth();
}

// Update home page login status
function updateHomePageLoginStatus() {
    // Only run on home page (index.html)
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        const user = getCurrentUser();
        const welcomeElement = document.querySelector('.user-info h3');
        const loginMessageElement = document.querySelector('.user-info p');
        const quickActionsSection = document.querySelector('.quick-actions');
        
        if (user) {
            // User is logged in - hide login message and quick actions
            if (welcomeElement) {
                welcomeElement.textContent = 'Welcome Back!';
            }
            if (loginMessageElement) {
                loginMessageElement.textContent = 'You are logged in';
                loginMessageElement.style.color = '#27ae60'; // Green color
            }
            if (quickActionsSection) {
                quickActionsSection.style.display = 'none';
            }
        } else {
            // User is not logged in - show login message and quick actions
            if (welcomeElement) {
                welcomeElement.textContent = 'Welcome';
            }
            if (loginMessageElement) {
                loginMessageElement.textContent = 'Please login to continue';
                loginMessageElement.style.color = '#7f8c8d'; // Default gray color
            }
            if (quickActionsSection) {
                quickActionsSection.style.display = 'block';
            }
        }
    }
}

// Initialize user display on all pages (except login/register)
if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
    initializeUserDisplay();
    // Also check login status for home page
    updateHomePageLoginStatus();
}

// Logout function (can be used in other pages)
function logout() {
    console.log('Logout function called'); // Debug log
    
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        console.log('User confirmed logout'); // Debug log
        
        // Clear all session data
        localStorage.removeItem('hotelUserSession');
        sessionStorage.removeItem('hotelUserSession');
        
        // Clear all localStorage data to ensure complete logout
        localStorage.clear();
        sessionStorage.clear();
        
        console.log('Session data cleared'); // Debug log
        
        // Show logout message
        alert('Logged out successfully!');
        
        // Remove logout button immediately
        removeLogoutButton();
        
        // Update home page status if on home page
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            updateHomePageLoginStatus();
        } else {
            // Redirect to home page for other pages
            window.location.href = '../index.html';
        }
    } else {
        console.log('User cancelled logout'); // Debug log
    }
}

// Get current user session
function getCurrentUser() {
    const session = localStorage.getItem('hotelUserSession') || sessionStorage.getItem('hotelUserSession');
    return session ? JSON.parse(session) : null;
}

// Display current user information in header
function displayCurrentUser() {
    const user = getCurrentUser();
    
    if (user) {
        // User display removed - keeping header clean
        
        // Avatar display removed - keeping header clean
        
        // Add logout functionality to header
        addLogoutButton();
        
        
        console.log('User information updated:', user.name, user.email);
    } else {
        // No user logged in - remove logout button
        removeLogoutButton();
        console.log('No user session found');
    }
}

// Remove logout button from header
function removeLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.remove();
    }
}

// Add logout button to header
function addLogoutButton() {
    // Check if logout button already exists
    if (document.querySelector('.logout-btn')) {
        return;
    }
    
    // Find the header user section
    const headerUser = document.querySelector('.header-user');
    if (headerUser) {
        // Create logout button
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'logout-btn';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        logoutBtn.title = 'Logout';
        logoutBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            margin-left: 10px;
            transition: background-color 0.3s ease;
        `;
        
        // Add hover effect
        logoutBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#c0392b';
        });
        
        logoutBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#e74c3c';
        });
        
        // Add click event
        logoutBtn.addEventListener('click', logout);
        
        // Insert logout button in header-user div
        headerUser.appendChild(logoutBtn);
    }
}

// Initialize user display on page load
function initializeUserDisplay() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            displayCurrentUser();
        });
    } else {
        displayCurrentUser();
    }
}
