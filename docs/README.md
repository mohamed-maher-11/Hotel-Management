# Hotel Management System

A comprehensive web-based hotel management system built with HTML, CSS, and JavaScript. This system provides a complete solution for managing hotel operations including room management, bookings, guest services, employee management, and more.

## 🏨 Features

### Core Modules
- **Dashboard** - Overview of hotel operations and key metrics
- **Room Management** - Manage rooms, types, availability, and pricing
- **Booking System** - Handle reservations, check-ins, and check-outs
- **Guest Management** - Track guest information and services
- **Employee Management** - Manage staff, roles, and departments
- **Inventory Management** - Track hotel supplies and assets
- **Room Service** - Manage room service orders and requests
- **Facilities Management** - Track hotel facilities and amenities
- **Maintenance** - Handle maintenance requests and scheduling
- **Reviews & Feedback** - Manage guest reviews and ratings
- **Payment Processing** - Handle billing and payment tracking
- **User Management** - Manage system users and permissions

### Key Features
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **User Authentication** - Secure login system with role-based access
- ✅ **Real-time Updates** - Live data updates and notifications
- ✅ **Interactive Charts** - Visual data representation with Chart.js
- ✅ **Modern UI/UX** - Clean, professional interface with smooth animations
- ✅ **Welcome Messages** - Personalized user experience
- ✅ **Logout Functionality** - Secure session management

## 📁 Project Structure

```
hotel-management-system/
├── index.html              # Main homepage
├── css/                    # Stylesheets
│   └── style.css          # Main stylesheet
├── js/                     # JavaScript files
│   ├── login.js           # Authentication & user management
│   ├── script.js          # Dashboard functionality
│   ├── rooms.js           # Room management
│   ├── bookings.js        # Booking system
│   ├── guests.js          # Guest management
│   ├── employees.js       # Employee management
│   ├── departments.js     # Department management
│   ├── inventory.js       # Inventory management
│   ├── roomservice.js     # Room service
│   ├── facilities.js      # Facilities management
│   ├── maintenance.js     # Maintenance system
│   ├── reviews.js         # Reviews management
│   ├── payments.js        # Payment processing
│   └── users.js           # User management
├── pages/                  # HTML pages
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── dashboard.html     # Main dashboard
│   ├── rooms.html         # Room management
│   ├── bookings.html      # Booking management
│   ├── guests.html        # Guest management
│   ├── employees.html     # Employee management
│   ├── departments.html   # Department management
│   ├── inventory.html     # Inventory management
│   ├── roomservice.html   # Room service
│   ├── facilities.html    # Facilities management
│   ├── maintenance.html   # Maintenance
│   ├── reviews.html       # Reviews
│   ├── payments.html      # Payments
│   └── users.html         # User management
├── tests/                  # Test files
│   ├── session_simulator.html  # Session testing
│   ├── debug_test.html         # Debug utilities
│   └── welcome_test.html       # Welcome message testing
├── docs/                   # Documentation
│   └── README.md          # This file
└── assets/                 # Static assets (images, icons, etc.)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The system is ready to use!

### Quick Start
1. **Homepage**: Open `index.html` to see the main landing page
2. **Login**: Click "Login to System" or navigate to `pages/login.html`
3. **Test Mode**: Use `tests/session_simulator.html` for quick testing

## 👤 Test Accounts

The system comes with pre-configured test accounts:

| Role | Email | Password | Full Name |
|------|-------|----------|-----------|
| Admin |  | admin123 | Admin |
| Manager | manager@hotel.com | manager123 | John Manager |
| Receptionist |  | reception123 | Receptionist |

## 🔧 Usage

### Login Process
1. Navigate to the login page
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to the dashboard with a personalized welcome message

### Navigation
- Use the sidebar to navigate between different modules
- Each page shows a personalized welcome message
- The header displays your name and provides logout functionality

### Testing
- Use the **Session Simulator** (`tests/session_simulator.html`) to quickly test different user roles
- Use the **Debug Test** (`tests/debug_test.html`) to troubleshoot issues
- All test files are located in the `tests/` directory

## 🎨 Customization

### Styling
- Main styles are in `css/style.css`
- The system uses a modern blue color scheme
- Responsive design works on all screen sizes

### Functionality
- JavaScript files are modular and well-organized
- Each module has its own JavaScript file
- Authentication and user management are centralized in `js/login.js`

## 📱 Responsive Design

The system is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔒 Security Features

- Session management with localStorage/sessionStorage
- Role-based access control
- Secure logout functionality
- Input validation and sanitization

## 🛠️ Development

### File Organization
- **HTML**: All pages in `pages/` directory
- **CSS**: Centralized in `css/` directory
- **JavaScript**: Modular files in `js/` directory
- **Tests**: Development and testing files in `tests/` directory

### Code Structure
- Clean, commented code
- Modular JavaScript architecture
- Consistent naming conventions
- Responsive CSS with mobile-first approach

## 📊 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Modern JavaScript features
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Local Storage** - Data persistence

## 🐛 Troubleshooting

### Common Issues
1. **Welcome message not appearing**: Check browser console for JavaScript errors
2. **Login not working**: Verify email/password combination
3. **Styling issues**: Ensure CSS files are loading correctly
4. **Navigation problems**: Check file paths in HTML files

### Debug Tools
- Use browser developer tools (F12)
- Check the console for JavaScript errors
- Use the debug test page for troubleshooting
- Verify file paths are correct

## 📈 Future Enhancements

- Database integration
- Real-time notifications
- Advanced reporting
- Mobile app development
- API integration
- Multi-language support

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For support or questions, please check the documentation or create an issue in the project repository.

---

**Hotel Management System** - Streamlining hotel operations with modern web technology.