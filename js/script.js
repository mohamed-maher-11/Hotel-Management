// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeSidebar();
});

// Initialize Revenue Chart
function initializeCharts() {
    // Revenue Overview Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [45000, 52000, 48000, 61000, 58000, 67000],
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 80000,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'k';
                        }
                    },
                    grid: {
                        color: '#ecf0f1'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Room Occupancy Pie Chart
    const occupancyCtx = document.getElementById('occupancyChart').getContext('2d');
    new Chart(occupancyCtx, {
        type: 'doughnut',
        data: {
            labels: ['Occupied', 'Available'],
            datasets: [{
                data: [68, 32],
                backgroundColor: ['#3498db', '#ecf0f1'],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Initialize Sidebar functionality
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
            if (text === 'Rooms') {
                window.location.href = 'rooms.html';
            } else if (text === 'Bookings') {
                window.location.href = 'bookings.html';
            }
            // Add more navigation logic here for other pages
            
            // Add a subtle animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Mobile sidebar toggle (if needed)
    const sidebarToggle = document.createElement('button');
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1001;
        background: #3498db;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    `;

    document.body.appendChild(sidebarToggle);

    sidebarToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
    });

    // Show/hide toggle button based on screen size
    function handleResize() {
        if (window.innerWidth <= 600) {
            sidebarToggle.style.display = 'block';
        } else {
            sidebarToggle.style.display = 'none';
            document.querySelector('.sidebar').classList.remove('open');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
}

// Add some interactive features
function addInteractiveFeatures() {
    // Add hover effects to KPI cards
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });

    // Add click effects to booking and maintenance items
    const bookingItems = document.querySelectorAll('.booking-item, .maintenance-item');
    bookingItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = '#e8f4fd';
            setTimeout(() => {
                this.style.backgroundColor = '#f8f9fa';
            }, 200);
        });
    });
}

// Initialize interactive features
addInteractiveFeatures();

// Add real-time data updates simulation
function simulateDataUpdates() {
    const cardValues = document.querySelectorAll('.card-value');
    const metrics = document.querySelectorAll('.card-metric span');
    
    setInterval(() => {
        // Simulate small changes in the data
        cardValues.forEach((value, index) => {
            const currentValue = parseInt(value.textContent.replace(/[^\d]/g, ''));
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newValue = Math.max(0, currentValue + change);
            
            if (index === 0) value.textContent = newValue; // Total Rooms
            else if (index === 1) value.textContent = newValue; // Active Bookings
            else if (index === 2) value.textContent = newValue.toLocaleString(); // Total Guests
            else if (index === 3) value.textContent = '$' + newValue.toLocaleString(); // Revenue
        });
    }, 30000); // Update every 30 seconds
}

// Start data simulation
simulateDataUpdates();

// Add smooth scrolling for sidebar navigation
document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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
