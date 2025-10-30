// Payments Management JavaScript

// Sample payments data
let payments = [
    {
        id: 'PAY-001',
        bookingId: 'BK-001',
        guestName: 'John Smith',
        amount: 1000,
        paymentMethod: 'credit-card',
        transactionId: 'TXN-548932',
        date: '2025-10-12',
        status: 'completed',
        notes: 'Payment processed successfully'
    },
    {
        id: 'PAY-002',
        bookingId: 'BK-002',
        guestName: 'Sarah Johnson',
        amount: 1250,
        paymentMethod: 'debit-card',
        transactionId: 'TXN-548933',
        date: '2025-10-13',
        status: 'pending',
        notes: 'Awaiting bank confirmation'
    },
    {
        id: 'PAY-003',
        bookingId: 'BK-003',
        guestName: 'Michael Brown',
        amount: 300,
        paymentMethod: 'cash',
        transactionId: 'TXN-548934',
        date: '2025-10-11',
        status: 'completed',
        notes: 'Cash payment received'
    },
    {
        id: 'PAY-004',
        bookingId: 'BK-004',
        guestName: 'Emily Davis',
        amount: 2250,
        paymentMethod: 'credit-card',
        transactionId: 'TXN-548935',
        date: '2025-10-10',
        status: 'completed',
        notes: 'Payment processed successfully'
    },
    {
        id: 'PAY-005',
        bookingId: 'BK-005',
        guestName: 'David Wilson',
        amount: 500,
        paymentMethod: 'bank-transfer',
        transactionId: 'TXN-548936',
        date: '2025-10-13',
        status: 'failed',
        notes: 'Bank transfer failed - insufficient funds'
    }
];

let currentPaymentId = null;

// Payment method mapping
const methodMap = {
    'credit-card': 'Credit Card',
    'debit-card': 'Debit Card',
    'cash': 'Cash',
    'bank-transfer': 'Bank Transfer',
    'paypal': 'PayPal'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderPaymentsTable();
    updateSummaryCards();
    updateRevenueChart();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('paymentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterPayments);
    }

    // Filter functionality
    const methodFilter = document.getElementById('methodFilter');
    if (methodFilter) {
        methodFilter.addEventListener('change', filterPayments);
    }

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterPayments);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['viewPaymentModal', 'editPaymentModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render payments table
function renderPaymentsTable(filteredPayments = null) {
    const tbody = document.getElementById('paymentsTableBody');
    if (!tbody) return;

    const paymentsToRender = filteredPayments || payments;
    
    tbody.innerHTML = paymentsToRender.map(payment => `
        <tr>
            <td>${payment.id}</td>
            <td>${payment.bookingId}</td>
            <td>${payment.guestName}</td>
            <td>$${payment.amount.toLocaleString()}</td>
            <td>${methodMap[payment.paymentMethod] || payment.paymentMethod}</td>
            <td>${payment.transactionId}</td>
            <td>${payment.date}</td>
            <td><span class="status-badge status-${payment.status}">${getStatusText(payment.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewPayment('${payment.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editPayment('${payment.id}')">
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
        'completed': 'Completed',
        'pending': 'Pending',
        'failed': 'Failed',
        'refunded': 'Refunded'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const totalRevenue = payments.filter(payment => payment.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
    const completedPayments = payments.filter(payment => payment.status === 'completed').length;
    const pendingPayments = payments.filter(payment => payment.status === 'pending').length;
    const failedPayments = payments.filter(payment => payment.status === 'failed').length;

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = `$${totalRevenue.toLocaleString()}`;
        cards[1].querySelector('.card-content h3').textContent = completedPayments;
        cards[2].querySelector('.card-content h3').textContent = pendingPayments;
        cards[3].querySelector('.card-content h3').textContent = failedPayments;
    }
}

// Update revenue chart
function updateRevenueChart() {
    // Weekly revenue data (this would typically come from a backend)
    const weeklyRevenue = [4500, 5200, 4800, 6000, 7500, 8000, 7800];
    const maxRevenue = Math.max(...weeklyRevenue);
    
    // Update bar heights based on data
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach((bar, index) => {
        if (weeklyRevenue[index]) {
            const percentage = (weeklyRevenue[index] / maxRevenue) * 100;
            bar.style.height = `${percentage}%`;
            bar.setAttribute('data-value', weeklyRevenue[index]);
        }
    });
}

// Filter payments
function filterPayments() {
    const searchTerm = document.getElementById('paymentSearch').value.toLowerCase();
    const methodFilter = document.getElementById('methodFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = !searchTerm || 
            payment.id.toLowerCase().includes(searchTerm) ||
            payment.bookingId.toLowerCase().includes(searchTerm) ||
            payment.guestName.toLowerCase().includes(searchTerm) ||
            payment.transactionId.toLowerCase().includes(searchTerm);
        
        const matchesMethod = !methodFilter || payment.paymentMethod === methodFilter;
        const matchesStatus = !statusFilter || payment.status === statusFilter;
        
        return matchesSearch && matchesMethod && matchesStatus;
    });

    renderPaymentsTable(filteredPayments);
}

// Modal functions
function openViewPaymentModal(paymentId) {
    const payment = payments.find(pay => pay.id === paymentId);
    if (!payment) return;

    // Populate view modal with payment data
    document.getElementById('viewPaymentId').textContent = payment.id;
    document.getElementById('viewBookingId').textContent = payment.bookingId;
    document.getElementById('viewGuestName').textContent = payment.guestName;
    document.getElementById('viewAmount').textContent = `$${payment.amount.toLocaleString()}`;
    document.getElementById('viewPaymentMethod').textContent = methodMap[payment.paymentMethod] || payment.paymentMethod;
    document.getElementById('viewTransactionId').textContent = payment.transactionId;
    document.getElementById('viewPaymentDate').textContent = payment.date;
    document.getElementById('viewPaymentStatus').textContent = getStatusText(payment.status);
    document.getElementById('viewPaymentStatus').className = `status-badge status-${payment.status}`;
    document.getElementById('viewPaymentNotes').textContent = payment.notes || 'No notes';

    document.getElementById('viewPaymentModal').style.display = 'block';
}

function closeViewPaymentModal() {
    document.getElementById('viewPaymentModal').style.display = 'none';
}

function openEditPaymentModal(paymentId) {
    const payment = payments.find(pay => pay.id === paymentId);
    if (!payment) return;

    currentPaymentId = paymentId;
    
    // Populate form with payment data
    document.getElementById('editBookingId').value = payment.bookingId;
    document.getElementById('editGuestName').value = payment.guestName;
    document.getElementById('editAmount').value = payment.amount;
    document.getElementById('editPaymentMethod').value = payment.paymentMethod;
    document.getElementById('editTransactionId').value = payment.transactionId;
    document.getElementById('editPaymentStatus').value = payment.status;
    document.getElementById('editPaymentDate').value = payment.date;
    document.getElementById('editPaymentNotes').value = payment.notes || '';

    document.getElementById('editPaymentModal').style.display = 'block';
}

function closeEditPaymentModal() {
    document.getElementById('editPaymentModal').style.display = 'none';
    currentPaymentId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editPaymentModal') {
        currentPaymentId = null;
    }
}

// Payment management functions
function viewPayment(paymentId) {
    openViewPaymentModal(paymentId);
}

function editPayment(paymentId) {
    openEditPaymentModal(paymentId);
}

function updatePayment() {
    if (!currentPaymentId) return;

    const form = document.getElementById('editPaymentForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['bookingId', 'guestName', 'amount', 'paymentMethod'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update payment
    const paymentIndex = payments.findIndex(pay => pay.id === currentPaymentId);
    if (paymentIndex !== -1) {
        payments[paymentIndex] = {
            ...payments[paymentIndex],
            bookingId: formData.get('bookingId'),
            guestName: formData.get('guestName'),
            amount: parseFloat(formData.get('amount')),
            paymentMethod: formData.get('paymentMethod'),
            transactionId: formData.get('transactionId') || payments[paymentIndex].transactionId,
            status: formData.get('paymentStatus') || 'completed',
            date: formData.get('paymentDate') || payments[paymentIndex].date,
            notes: formData.get('paymentNotes') || ''
        };

        // Refresh table, summary cards, and revenue chart
        renderPaymentsTable();
        updateSummaryCards();
        updateRevenueChart();
        
        // Close modal
        closeEditPaymentModal();
        
        // Show success message
        alert('Payment updated successfully!');
    }
}

function editPaymentFromView() {
    closeViewPaymentModal();
    if (currentPaymentId) {
        openEditPaymentModal(currentPaymentId);
    }
}

function exportReport() {
    // This would typically generate and download a CSV or PDF report
    const reportData = payments.map(payment => ({
        'Payment ID': payment.id,
        'Booking ID': payment.bookingId,
        'Guest Name': payment.guestName,
        'Amount': `$${payment.amount}`,
        'Method': methodMap[payment.paymentMethod] || payment.paymentMethod,
        'Transaction ID': payment.transactionId,
        'Date': payment.date,
        'Status': getStatusText(payment.status)
    }));

    // Convert to CSV format
    const csvContent = [
        Object.keys(reportData[0]).join(','),
        ...reportData.map(row => Object.values(row).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('Payment report exported successfully!');
}

// Export functions for global access
window.viewPayment = viewPayment;
window.editPayment = editPayment;
window.closeViewPaymentModal = closeViewPaymentModal;
window.closeEditPaymentModal = closeEditPaymentModal;
window.updatePayment = updatePayment;
window.editPaymentFromView = editPaymentFromView;
window.exportReport = exportReport;

