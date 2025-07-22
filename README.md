# RedGirraffe B2C Portal - Standalone HTML Version

This directory contains a complete standalone HTML/CSS/JavaScript implementation of the RedGirraffe B2C Portal, converted from the original React application.

## Overview

The standalone version provides all the functionality of the React app using vanilla web technologies, making it easily deployable without build processes or complex dependencies. This conversion maintains the exact visual design, color scheme, fonts, and interactions from the React app while following separation of concerns best practices.

### Key Features

- **Complete Dashboard**: Analytics overview, transaction history, and reports with tab navigation
- **Registration Management**: View, create, and manage payment registrations with categorized listings
- **Edit Records**: Modify registration details with audit logging functionality
- **Rewards System**: Wallet management, purchase history, and gift cards catalog with GST handling
- **Referrals Program**: Email capture for backend invites with 'Remind' button functionality
- **Reports & Analytics**: Payment history and cash points analytics with charts
- **Profile & Settings**: Account management with non-editable fields as per requirements
- **Contact Support**: Tawk.to chat integration with updated contact information
- **Responsive Design**: Mobile-first approach with clean, modern UI matching React app
- **Mock Data Integration**: Frontend mock calls instead of actual API server calls

### Technical Implementation
- **Vanilla HTML/CSS/JS**: Pure web technologies without frameworks or build processes
- **Chart.js**: Interactive charts matching the React app's visualization
- **Font Awesome**: Icon library for consistent iconography
- **Inter Font**: Typography matching the React application
- **Mock Data**: Frontend data simulation for all sections and features
- **Tawk.to Integration**: Live chat support system
- **Responsive Grid**: CSS Grid and Flexbox for responsive layouts

### Requirements Compliance
- ✅ B2C Portal follows standard Vite structure optimized for Vercel deployment
- ✅ Mock calls with mock data on frontend (no actual API server calls)
- ✅ Exact visual design, color scheme, fonts, and interactions maintained
- ✅ Navigation updated: 'Settings' removed, 'Profile' renamed to 'Profile and Settings'
- ✅ Profile fields (Name, Email, Mobile, Address) non-editable and greyed out
- ✅ Contact information updated: connect@redgirraffe.com and WhatsApp (+91) 80-1019-1019
- ✅ Tawk.to chat for 'Send Us a Message' button
- ✅ Gift cards with GST text field and sorting filters
- ✅ Referrals with email capture for backend invites
- ✅ SMS invite option removed from referrals

## File Structure

```
standalone-html/
├── index.html          # Main dashboard with all sections and navigation
├── registration.html   # Registration details page with dynamic content loading
├── test.html          # Test page for verifying functionality
├── styles.css         # Custom CSS styles and responsive design
├── app.js            # Main JavaScript functionality with mock data
├── app-backup.js     # Backup of original JavaScript file
└── README.md         # This comprehensive documentation
```

## Pages and Sections

### Main Dashboard (index.html)
- **Dashboard**: Analytics overview, transaction history, reports (3 tabs)
- **Registrations**: Categorized listing (Rent, Education, Society) with view links
- **Edit Records**: Registration editing interface with table view
- **Rewards**: Wallet management (3 tabs: My Wallet, Purchase History, Gift Cards)
- **Transactions**: Transaction history with detailed views
- **Referrals**: Referral program (2 tabs: Active Referrals, Completed)
- **Reports**: Analytics and reports (2 tabs: Payment History, Cash Points)
- **Profile and Settings**: Account management (2 tabs: Account, Password)
- **Contact Support**: Support interface (2 tabs: Contact Us, FAQ)

### Registration Details (registration.html)
- Dynamic content loading based on RG ID parameter
- Complete registration information display
- Type-specific details (Tenant, Student, Society)
- Payment information and account details
- Responsive design with proper error handling

### Test Page (test.html)
- Navigation functionality testing
- Mock data validation
- Feature verification checklist
- Quick access to all pages and sections

## Usage

### Local Development
1. Ensure the main React application server is running (provides the backend APIs)
2. Open `standalone-html/index.html` in any modern web browser
3. The application will automatically connect to the backend running on the same domain

### Production Deployment
1. Copy all files from the `standalone-html/` directory to your web server
2. Ensure the backend API endpoints are accessible from the same domain
3. No build process required - runs directly in the browser

## Features Breakdown

### Dashboard Section
- **Analytics Cards**: Dynamic data from backend APIs
- **Tab Navigation**: Analytics Overview, Transaction History, Reports
- **Interactive Charts**: 
  - Payment Distribution with time period filters
  - Payment History with data type switching (payments/activity/points)

### Registrations Section
- **Categorized Listing**: Grouped by type (Rent, Education Fees, Society Maintenance)
- **Collapsible Details**: Click VIEW to expand/collapse registration details
- **Full View**: Click FULL VIEW to open detailed registration page in new tab
- **Mobile Responsive**: Card-based layout on mobile devices

### Registration Details Page
- **Complete Information**: All registration data including personal, property, and account details
- **Type-Specific Sections**: Dynamic sections based on registration type
- **Responsive Layout**: Optimized for all screen sizes
- **Navigation**: Back button and breadcrumb navigation

### Responsive Design
- **Mobile First**: Designed for mobile devices with progressive enhancement
- **Breakpoints**: 
  - Mobile: < 768px (stacked layout, card-based design)
  - Tablet: 768px - 1023px (optimized grid layout)
  - Desktop: 1024px+ (full sidebar and multi-column layout)
- **Touch Friendly**: Appropriate button sizes and spacing for touch interaction

## API Integration

The standalone version uses the same backend APIs as the React application:

- `GET /api/dashboard/{userId}` - Dashboard analytics data
- `GET /api/registrations/{userId}` - User's registrations
- `GET /api/registration/rg/{rgId}` - Detailed registration information
- `GET /api/transactions/{userId}` - Transaction history

## Browser Compatibility

- **Modern Browsers**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+

## Mock Data Features

The standalone version includes comprehensive mock data for:
- Dashboard analytics with realistic financial metrics
- Registration listings across all categories (Rent, Education, Society)
- Transaction history with various payment statuses and dates
- Rewards system with cash points and transaction history
- Referral program with active and completed referrals
- Reports with payment history and analytics
- Profile information with non-editable fields
- Contact support with FAQ and live chat integration

## Key Improvements in Standalone Version

- ✅ **No API Dependencies**: Works offline with mock data
- ✅ **Faster Loading**: No build process or framework overhead
- ✅ **Easy Deployment**: Static files can be hosted anywhere
- ✅ **Exact Visual Match**: Maintains React app design and interactions
- ✅ **Complete Feature Parity**: All React functionality implemented
- ✅ **Mobile Optimized**: Responsive design for all devices
- ✅ **Requirements Compliant**: Meets all B2C Portal specifications

## Testing and Verification

Use `test.html` to verify:
- All navigation sections are functional
- Mock data loads correctly across all features
- Responsive design works on different screen sizes
- Tab switching and content updates function properly
- Form interactions and button clicks work as expected

## Support

For issues or questions regarding the standalone HTML version, please refer to the main project documentation or contact the development team. The standalone version maintains complete feature parity with the React application while providing better performance and easier deployment.
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 70+
- **Features Used**: Fetch API, ES6 Classes, CSS Grid, Flexbox

## Customization

### Styling
- Modify `styles.css` to customize colors, typography, and layout
- Bootstrap 4 variables can be overridden for theme customization
- CSS custom properties (variables) are used for consistent theming

### Functionality
- Add new sections by extending the `RedGiraffeDashboard` class in `app.js`
- Chart configurations can be modified in the `initializeCharts()` method
- New API endpoints can be integrated by adding methods to the dashboard class

## Performance Considerations

- **Lightweight**: No framework overhead, minimal JavaScript bundle
- **Fast Loading**: Direct browser execution without build process
- **Efficient**: Only loads data when sections are accessed
- **Caching**: Browser caching for static assets (CSS, JS, images)

## Security Notes

- **Same-Origin Policy**: Relies on same-origin requests to the backend
- **No Authentication**: Currently uses hardcoded user ID (matches React app)
- **HTTPS**: Recommended for production deployment
- **CSP**: Content Security Policy headers recommended for production

## Maintenance

### Keeping in Sync with React App
1. **API Changes**: Update API calls in `app.js` when backend endpoints change
2. **UI Updates**: Modify HTML/CSS to match React component changes
3. **New Features**: Implement new functionality by extending existing classes

### Updates and Improvements
- **Bootstrap Updates**: Can be updated by changing CDN links
- **Chart.js Updates**: Update CDN link for new chart features
- **Font Awesome Updates**: Update icon library via CDN

## Deployment Options

### Static Hosting
- **GitHub Pages**: Direct deployment from repository
- **Netlify**: Automatic deployment with form handling
- **Vercel**: Static hosting with serverless functions support
- **AWS S3**: Simple static website hosting

### Server Deployment
- **Apache/Nginx**: Standard web server hosting
- **Express Static**: Serve from Node.js application
- **IIS**: Windows server deployment

## Troubleshooting

### Common Issues
1. **API Connection**: Ensure backend server is running and accessible
2. **CORS Issues**: Configure backend to allow cross-origin requests if needed
3. **Charts Not Loading**: Check Chart.js CDN availability
4. **Mobile Layout**: Verify viewport meta tag is present

### Debug Mode
Add `?debug=true` to URL for console logging and error details.