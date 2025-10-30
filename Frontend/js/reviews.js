// Reviews Management JavaScript

// Sample reviews data
let reviews = [
    {
        id: 'REV-001',
        guestName: 'John Smith',
        roomNumber: '201',
        category: 'room',
        rating: 5,
        content: 'Excellent service and very clean rooms. The staff was incredibly helpful and friendly.',
        date: '2025-10-12',
        status: 'published'
    },
    {
        id: 'REV-002',
        guestName: 'Sarah Johnson',
        roomNumber: '305',
        category: 'service',
        rating: 4,
        content: 'Great location and comfortable beds. The breakfast could be improved.',
        date: '2025-10-11',
        status: 'published'
    },
    {
        id: 'REV-003',
        guestName: 'Michael Brown',
        roomNumber: '102',
        category: 'room',
        rating: 3,
        content: 'Average experience. Room was okay but the AC was not working properly.',
        date: '2025-10-10',
        status: 'under-review'
    },
    {
        id: 'REV-004',
        guestName: 'Emily Davis',
        roomNumber: '408',
        category: 'overall',
        rating: 5,
        content: 'Amazing stay! Beautiful room with a great view. Will definitely come back.',
        date: '2025-10-09',
        status: 'published'
    },
    {
        id: 'REV-005',
        guestName: 'David Wilson',
        roomNumber: '203',
        category: 'dining',
        rating: 4,
        content: 'Good food and excellent service in the restaurant. The room was clean and comfortable.',
        date: '2025-10-08',
        status: 'published'
    },
    {
        id: 'REV-006',
        guestName: 'Lisa Anderson',
        roomNumber: '156',
        category: 'facilities',
        rating: 2,
        content: 'The gym equipment was outdated and the pool was closed for maintenance.',
        date: '2025-10-07',
        status: 'under-review'
    }
];

let currentReviewId = null;

// Category mapping
const categoryMap = {
    'room': 'Room',
    'service': 'Service',
    'overall': 'Overall',
    'dining': 'Dining',
    'facilities': 'Facilities'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderReviewsList();
    updateSummaryCards();
    updateRatingDistribution();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('reviewSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterReviews);
    }

    // Filter functionality
    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterReviews);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = ['viewReviewModal', 'editReviewModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    });
}

// Render reviews list
function renderReviewsList(filteredReviews = null) {
    const reviewsList = document.querySelector('.reviews-list');
    if (!reviewsList) return;

    const reviewsToRender = filteredReviews || reviews;
    
    reviewsList.innerHTML = reviewsToRender.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.guestName}</h4>
                    <div class="review-badges">
                        <span class="badge room-badge">Room ${review.roomNumber}</span>
                        <span class="badge category-badge">${categoryMap[review.category] || review.category}</span>
                    </div>
                </div>
                <div class="review-meta">
                    <span class="review-date">${review.date}</span>
                    <div class="review-rating">
                        <div class="star-rating">
                            ${generateStarRating(review.rating)}
                        </div>
                        <span class="rating-score">${review.rating}.0</span>
                    </div>
                </div>
            </div>
            <div class="review-content">
                <p>${review.content}</p>
            </div>
            <div class="review-footer">
                <div class="review-status">
                    <span class="status-badge status-${review.status}">${getStatusText(review.status)}</span>
                    <span class="review-id">${review.id}</span>
                </div>
                <div class="review-actions">
                    <button class="action-btn view-btn" onclick="viewReview('${review.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editReview('${review.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'published': 'Published',
        'under-review': 'Under Review',
        'hidden': 'Hidden'
    };
    return statusMap[status] || status;
}

// Update summary cards
function updateSummaryCards() {
    const totalReviews = reviews.length;
    const publishedReviews = reviews.filter(review => review.status === 'published');
    const averageRating = publishedReviews.length > 0 ? 
        (publishedReviews.reduce((sum, review) => sum + review.rating, 0) / publishedReviews.length).toFixed(1) : 0;
    const fiveStarReviews = publishedReviews.filter(review => review.rating === 5).length;
    const lowRatingReviews = publishedReviews.filter(review => review.rating <= 2).length;

    // Update the summary cards
    const cards = document.querySelectorAll('.summary-card');
    if (cards.length >= 4) {
        cards[0].querySelector('.card-content h3').textContent = averageRating;
        cards[1].querySelector('.card-content h3').textContent = fiveStarReviews;
        cards[2].querySelector('.card-content h3').textContent = totalReviews;
        cards[3].querySelector('.card-content h3').textContent = lowRatingReviews;
    }
}

// Update rating distribution chart
function updateRatingDistribution() {
    const publishedReviews = reviews.filter(review => review.status === 'published');
    const ratingCounts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    
    publishedReviews.forEach(review => {
        ratingCounts[review.rating]++;
    });

    const maxCount = Math.max(...Object.values(ratingCounts));
    
    // Update bar fills
    for (let rating = 5; rating >= 1; rating--) {
        const barFill = document.querySelector(`.rating-bar:nth-child(${6-rating}) .bar-fill`);
        const barCount = document.querySelector(`.rating-bar:nth-child(${6-rating}) .bar-count`);
        
        if (barFill && barCount) {
            const percentage = maxCount > 0 ? (ratingCounts[rating] / maxCount) * 100 : 0;
            barFill.style.width = `${percentage}%`;
            barCount.textContent = ratingCounts[rating];
        }
    }
}

// Filter reviews
function filterReviews() {
    const searchTerm = document.getElementById('reviewSearch').value.toLowerCase();
    const ratingFilter = document.getElementById('ratingFilter').value;

    const filteredReviews = reviews.filter(review => {
        const matchesSearch = !searchTerm || 
            review.guestName.toLowerCase().includes(searchTerm) ||
            review.roomNumber.includes(searchTerm) ||
            review.content.toLowerCase().includes(searchTerm) ||
            (categoryMap[review.category] || review.category).toLowerCase().includes(searchTerm);
        
        const matchesRating = !ratingFilter || review.rating.toString() === ratingFilter;
        
        return matchesSearch && matchesRating;
    });

    renderReviewsList(filteredReviews);
}

// Modal functions
function openViewReviewModal(reviewId) {
    const review = reviews.find(rev => rev.id === reviewId);
    if (!review) return;

    // Populate view modal with review data
    document.getElementById('viewReviewId').textContent = review.id;
    document.getElementById('viewReviewGuest').textContent = review.guestName;
    document.getElementById('viewReviewRoom').textContent = `Room ${review.roomNumber}`;
    document.getElementById('viewReviewCategory').textContent = categoryMap[review.category] || review.category;
    document.getElementById('viewReviewDate').textContent = review.date;
    document.getElementById('viewReviewStatus').textContent = getStatusText(review.status);
    document.getElementById('viewReviewStatus').className = `status-badge status-${review.status}`;
    document.getElementById('viewReviewContent').textContent = review.content;
    
    // Update star rating in modal
    const starRating = document.querySelector('#viewReviewRating .star-rating');
    if (starRating) {
        starRating.innerHTML = generateStarRating(review.rating);
    }
    document.querySelector('#viewReviewRating .rating-score').textContent = `${review.rating}.0`;

    document.getElementById('viewReviewModal').style.display = 'block';
}

function closeViewReviewModal() {
    document.getElementById('viewReviewModal').style.display = 'none';
}

function openEditReviewModal(reviewId) {
    const review = reviews.find(rev => rev.id === reviewId);
    if (!review) return;

    currentReviewId = reviewId;
    
    // Populate form with review data
    document.getElementById('editGuestName').value = review.guestName;
    document.getElementById('editRoomNumber').value = review.roomNumber;
    document.getElementById('editCategory').value = review.category;
    document.getElementById('editRating').value = review.rating;
    document.getElementById('editReviewStatus').value = review.status;
    document.getElementById('editReviewDate').value = review.date;
    document.getElementById('editReviewContent').value = review.content;

    document.getElementById('editReviewModal').style.display = 'block';
}

function closeEditReviewModal() {
    document.getElementById('editReviewModal').style.display = 'none';
    currentReviewId = null;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'editReviewModal') {
        currentReviewId = null;
    }
}

// Review management functions
function viewReview(reviewId) {
    openViewReviewModal(reviewId);
}

function editReview(reviewId) {
    openEditReviewModal(reviewId);
}

function updateReview() {
    if (!currentReviewId) return;

    const form = document.getElementById('editReviewForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['guestName', 'roomNumber', 'category', 'rating', 'reviewContent'];
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }

    // Find and update review
    const reviewIndex = reviews.findIndex(rev => rev.id === currentReviewId);
    if (reviewIndex !== -1) {
        reviews[reviewIndex] = {
            ...reviews[reviewIndex],
            guestName: formData.get('guestName'),
            roomNumber: formData.get('roomNumber'),
            category: formData.get('category'),
            rating: parseInt(formData.get('rating')),
            status: formData.get('reviewStatus') || 'published',
            date: formData.get('reviewDate') || reviews[reviewIndex].date,
            content: formData.get('reviewContent')
        };

        // Refresh list, summary cards, and rating distribution
        renderReviewsList();
        updateSummaryCards();
        updateRatingDistribution();
        
        // Close modal
        closeEditReviewModal();
        
        // Show success message
        alert('Review updated successfully!');
    }
}

function editReviewFromView() {
    closeViewReviewModal();
    if (currentReviewId) {
        openEditReviewModal(currentReviewId);
    }
}

// Export functions for global access
window.viewReview = viewReview;
window.editReview = editReview;
window.closeViewReviewModal = closeViewReviewModal;
window.closeEditReviewModal = closeEditReviewModal;
window.updateReview = updateReview;
window.editReviewFromView = editReviewFromView;

