// RedGirraffe Dashboard - World-Class Implementation

// Mock Data Service for Edit Records
class EditRecordsMockService {
    constructor() {
        this.mockRegistrations = [
            {
                id: 1,
                rgId: "RG-0000182568",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "Credit Card",
                status: "Approved",
                amount: "25000",
                birthDate: "06/12/2005",
                dueDate: "15/01/2025",
                frequency: "Monthly",
                endDate: "15/12/2025",
            },
            {
                id: 2,
                rgId: "RG-6000182595",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "Credit Card",
                status: "Approved",
                amount: "50000",
                birthDate: "06/12/2005",
                dueDate: "10/02/2025",
                frequency: "Half Yearly",
                endDate: "10/08/2025",
            },
            {
                id: 3,
                rgId: "RG-4000182596",
                userId: 1,
                type: "society",
                subtype: "Maintenance",
                mode: "Credit Card",
                status: "Approved",
                amount: "100000",
                birthDate: "06/12/2005",
                dueDate: "12/03/2025",
                frequency: "Half Yearly",
                endDate: "31/03/2025",
            },
        ];

        this.mockDetailedData = {
            "RG-0000182568": {
                registration: this.mockRegistrations[0],
                tenantDetails: {
                    name: "Mr. Piyush Kumar",
                    dob: "06/12/2005",
                    mobile: "918527586945",
                    email: "himanshu.gupta@red.com",
                    address: "A-123, Sector 15, Noida",
                    city: "Delhi",
                    pincode: "110053",
                    panNo: "BXNPC7894C",
                },
                tenancyDetails: {
                    rentAmount: "14000",
                    frequency: "Half Yearly",
                    dueDate: "2024-11-14",
                    tenancyEndDate: "2024-12-20",
                    cardIssuingBank: "Axis Bank",
                },
                landlordDetails: {
                    name: "Mrs. Efer Himanshu",
                    email: "df@dfgd.vpm",
                    phone: "9876543210",
                    address: "Property Address",
                    panNo: "BSEPD9456C",
                },
                accountDetails: [
                    {
                        id: 1,
                        accountHolderName: "Mrs. Efer Himanshu",
                        accountNumber: "123456789",
                        accountType: "Current",
                        ifscCode: "HDFC0012356",
                        bankName: "HDFC Bank",
                        panNumber: "BSEPD9456C"
                    }
                ],
            },
            "RG-6000182595": {
                registration: this.mockRegistrations[1],
                studentDetails: {
                    name: "Mr. Piyush Kumar",
                    gender: "Male",
                    dob: "06/12/2005",
                    email: "himanshu.gupta@redgiraffe.com",
                    mobile: "918527586945",
                    panNo: "BXNPC7894C",
                },
                educationDetails: {
                    feeAmount: "50000",
                    frequency: "Half Yearly",
                    dueDate: "2024-11-14",
                    cardIssuingBank: "HDFC Bank",
                },
                instituteDetails: {
                    instituteName: "CSDG",
                    website: null,
                    gstin: "07AAHCR5014K1ZB",
                    panNo: "AHCRD5014K",
                    phoneNumber: null,
                    addressLine1: "dsfe",
                    addressLine2: null,
                    city: "deed",
                    state: "Delhi",
                    pincode: "110053"
                },
            },
            "RG-4000182596": {
                registration: this.mockRegistrations[2],
                societyDetails: {
                    amount: "100000",
                    frequency: "Half Yearly",
                    dueDate: "12/03/2025",
                    cardIssuingBank: "Axis Bank",
                },
            },
        };

        this.auditLog = [
            {
                field: "Rent Amount",
                oldValue: "12000",
                newValue: "14000",
                timestamp: "2024-06-12 09:15:23",
                ipAddress: "192.168.1.15",
                registrationId: "RG-0000182568",
                registrationType: "Rent",
                changeType: "Field Update",
            },
            {
                field: "Due Date",
                oldValue: "2024-10-15",
                newValue: "2024-11-14",
                timestamp: "2024-06-12 10:22:41",
                ipAddress: "192.168.1.15",
                registrationId: "RG-0000182568",
                registrationType: "Rent",
                changeType: "Field Update",
            },
        ];
        this.nextAuditId = 3;
    }

    addAuditEntry(entry) {
        const auditEntry = {
            id: this.nextAuditId++,
            ...entry,
            timestamp: new Date().toLocaleString(),
            ipAddress: "192.168.1.15" // Mock IP address
        };
        this.auditLog.push(auditEntry);
    }

    async getRegistrations(userId) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        return this.mockRegistrations.filter((reg) => reg.userId === userId);
    }

    async getRegistrationByRgId(rgId) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const data = this.mockDetailedData[rgId];
        if (!data) {
            throw new Error("Registration not found");
        }
        return data;
    }

    async saveRegistration(rgId, formData) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        // In real implementation, this would save to backend
        console.log("Saving registration:", rgId, formData);
        return { success: true };
    }

    getAuditLog(filters = {}) {
        let filteredLog = [...this.auditLog];

        if (filters.registrationType && filters.registrationType !== "All") {
            filteredLog = filteredLog.filter(
                (entry) => entry.registrationType === filters.registrationType
            );
        }

        if (filters.registrationId) {
            filteredLog = filteredLog.filter((entry) =>
                entry.registrationId
                    .toLowerCase()
                    .includes(filters.registrationId.toLowerCase())
            );
        }

        return {
            entries: filteredLog,
            totalPages: Math.ceil(filteredLog.length / 10),
            currentPage: 1,
            totalEntries: filteredLog.length,
        };
    }

    addAuditEntry(entry) {
        this.auditLog.unshift({
            ...entry,
            timestamp: new Date().toLocaleString(),
            ipAddress: "192.168.1.1",
        });
    }
}

class RedGiraffeDashboard {
    constructor() {
        this.currentSection = "dashboard";
        this.apiBaseUrl = window.location.origin;
        this.userId = 1;
        this.charts = {};
        this.registrations = [];
        this.transactions = [];
        this.dashboardData = null;
        this.theme = "light";
        this.currentTransactionTab = "all";
        this.transactionHistoryData = [];

        // Initialize Edit Records service
        this.editRecordsService = new EditRecordsMockService();
        this.activeEditForm = null;
        this.selectedRegistration = null;
        this.selectedRegistrationForUpload = null;
        this.ownerAccounts = [];
        this.selectedFiles = []; // Track selected files for upload

        // Initialize Gift Cards data
        this.initializeGiftCardsData();

        // Initialize chart data for different filters
        this.initializeChartData();

        this.init();

        // Run tests on initialization to verify the logic
        setTimeout(() => {
            this.testSettlementStatusLogic();
        }, 1000);
    }

    initializeGiftCardsData() {
        // Categories for gift cards
        this.categories = [
            "All Products",
            "E-commerce/Online",
            "Grocery",
            "Fashion & Lifestyle",
            "Home Needs & Furnishings",
            "Food & Beverages",
            "Sportswear & Footwear",
            "Travel & Hospitality",
            "Health & Beauty",
            "Jewellery",
            "Entertainment",
            "Finance and Insurance",
            "Others",
        ];

        // Mock gift cards data
        this.mockGiftCards = [
            {
                id: "1",
                name: "Amazon Shopping Voucher",
                brand: "Amazon",
                category: "E-commerce/Online",
                denomination: 2000,
                discount: 6,
                finalPrice: 1880,
                image: "https://placehold.co/300x200/ff9500/ffffff?text=Amazon",
                description:
                    "Shop for everything you need on Amazon with this versatile gift card",
                terms: "Valid for 12 months from date of issue",
                popularity: 95,
                isPopular: true,
                addedDate: "2024-01-15",
                redemptionValue: "94%",
            },
            {
                id: "2",
                name: "Myntra CHECKOUT e-Gift Card",
                brand: "Myntra",
                category: "Fashion & Lifestyle",
                denomination: 1000,
                discount: 8,
                finalPrice: 920,
                image: "https://placehold.co/300x200/ff3f6c/ffffff?text=Myntra",
                description: "Fashion and lifestyle products for men, women and kids",
                terms: "Valid for 12 months from date of issue",
                popularity: 88,
                isPopular: true,
                addedDate: "2024-02-01",
                redemptionValue: "92%",
            },
            {
                id: "3",
                name: "Flipkart Gift Card",
                brand: "Flipkart",
                category: "E-commerce/Online",
                denomination: 1500,
                discount: 5,
                finalPrice: 1425,
                image: "https://placehold.co/300x200/047bd6/ffffff?text=Flipkart",
                description:
                    "India's leading e-commerce platform for all your shopping needs",
                terms: "Valid for 12 months from date of issue",
                popularity: 92,
                isPopular: true,
                addedDate: "2024-01-20",
                redemptionValue: "95%",
            },
            {
                id: "4",
                name: "BigBasket Gift Voucher",
                brand: "BigBasket",
                category: "Grocery",
                denomination: 500,
                discount: 4,
                finalPrice: 480,
                image: "https://placehold.co/300x200/84c225/ffffff?text=BigBasket",
                description:
                    "Fresh groceries and daily essentials delivered to your doorstep",
                terms: "Valid for 6 months from date of issue",
                popularity: 75,
                isPopular: false,
                addedDate: "2024-03-01",
                redemptionValue: "96%",
            },
            {
                id: "5",
                name: "Zomato Gift Card",
                brand: "Zomato",
                category: "Food & Beverages",
                denomination: 1000,
                discount: 7,
                finalPrice: 930,
                image: "https://placehold.co/300x200/e23744/ffffff?text=Zomato",
                description: "Order food from your favorite restaurants",
                terms: "Valid for 12 months from date of issue",
                popularity: 85,
                isPopular: true,
                addedDate: "2024-02-15",
                redemptionValue: "93%",
            },
            {
                id: "6",
                name: "BookMyShow Gift Card",
                brand: "BookMyShow",
                category: "Entertainment",
                denomination: 750,
                discount: 6,
                finalPrice: 705,
                image: "https://placehold.co/300x200/dc2626/ffffff?text=BookMyShow",
                description: "Book movie tickets and entertainment events",
                terms: "Valid for 12 months from date of issue",
                popularity: 70,
                isPopular: false,
                addedDate: "2024-03-10",
                redemptionValue: "94%",
            },
            {
                id: "7",
                name: "Nykaa Gift Voucher",
                brand: "Nykaa",
                category: "Health & Beauty",
                denomination: 2000,
                discount: 9,
                finalPrice: 1820,
                image: "https://placehold.co/300x200/fc0fc0/ffffff?text=Nykaa",
                description: "Beauty and wellness products for all your needs",
                terms: "Valid for 12 months from date of issue",
                popularity: 82,
                isPopular: true,
                addedDate: "2024-01-25",
                redemptionValue: "91%",
            },
            {
                id: "8",
                name: "Lifestyle Gift Card",
                brand: "Lifestyle",
                category: "Fashion & Lifestyle",
                denomination: 3000,
                discount: 5,
                finalPrice: 2850,
                image: "https://placehold.co/300x200/000000/ffffff?text=Lifestyle",
                description: "Fashion, footwear and accessories for the entire family",
                terms: "Valid for 12 months from date of issue",
                popularity: 78,
                isPopular: false,
                addedDate: "2024-02-20",
                redemptionValue: "95%",
            },
            {
                id: "9",
                name: "Swiggy Gift Card",
                brand: "Swiggy",
                category: "Food & Beverages",
                denomination: 800,
                discount: 8,
                finalPrice: 736,
                image: "https://placehold.co/300x200/fc8019/ffffff?text=Swiggy",
                description: "Food delivery from restaurants near you",
                terms: "Valid for 12 months from date of issue",
                popularity: 87,
                isPopular: true,
                addedDate: "2024-03-05",
                redemptionValue: "92%",
            },
            {
                id: "10",
                name: "Tanishq Gift Card",
                brand: "Tanishq",
                category: "Jewellery",
                denomination: 5000,
                discount: 3,
                finalPrice: 4850,
                image: "https://placehold.co/300x200/d4af37/ffffff?text=Tanishq",
                description: "Exquisite jewelry and precious ornaments",
                terms: "Valid for 12 months from date of issue",
                popularity: 65,
                isPopular: false,
                addedDate: "2024-01-30",
                redemptionValue: "97%",
            },
        ];

        // Mock purchase history data
        this.mockPurchases = [
            {
                id: "1",
                name: "Amazon Shopping",
                orderId: "REDG-2411283541",
                amount: 250,
                placedOn: "22-11-2024",
                quantity: 1,
                status: "Expired",
                paymentDetails: {
                    totalValue: 250,
                    savings: 6,
                    netAmount: 244,
                },
            },
            {
                id: "2",
                name: "Myntra CHECKOUT",
                orderId: "REDG-2408207897B",
                amount: 50,
                placedOn: "20-08-2024",
                quantity: 1,
                status: "Expired",
            },
            {
                id: "3",
                name: "Myntra CHECKOUT",
                orderId: "REDG-2407297790S",
                amount: 50,
                placedOn: "29-07-2024",
                quantity: 1,
                status: "Cancelled",
            },
        ];

        // Mock cash points transaction history (expanded for better history view)
        this.mockCashPointsTransactions = [
            {
                id: "1",
                type: "Earned",
                description: "Points earned from new payment",
                amount: 100,
                date: "11-09-2024",
                balance: 5000,
                category: "Payment",
                transactionId: "TXN-001",
            },
            {
                id: "2",
                type: "Redeemed",
                description: "Redeemed for Amazon Gift Card",
                amount: -250,
                date: "10-08-2024",
                balance: 4900,
                category: "Gift Card",
                transactionId: "TXN-002",
            },
            {
                id: "3",
                type: "Earned",
                description: "Points earned from RedGirraffe payment",
                amount: 75,
                date: "05-08-2024",
                balance: 5150,
                category: "Payment",
                transactionId: "TXN-003",
            },
            {
                id: "4",
                type: "Transferred",
                description: "Points transferred to user@example.com",
                amount: -50,
                date: "01-08-2024",
                balance: 5075,
                category: "Transfer",
                transactionId: "TXN-004",
            },
            {
                id: "5",
                type: "Received",
                description: "Received from gift card RedGirraffe.com",
                amount: 250,
                date: "15-07-2024",
                balance: 5025,
                category: "Gift Card",
                transactionId: "TXN-005",
            },
            {
                id: "6",
                type: "Earned",
                description: "Referral bonus from friend signup",
                amount: 500,
                date: "10-07-2024",
                balance: 4775,
                category: "Referral",
                transactionId: "TXN-006",
            },
            {
                id: "7",
                type: "Redeemed",
                description: "Redeemed for Flipkart Gift Card",
                amount: -300,
                date: "05-07-2024",
                balance: 4275,
                category: "Gift Card",
                transactionId: "TXN-007",
            },
            {
                id: "8",
                type: "Received",
                description: "Received from john.doe@example.com",
                amount: 100,
                date: "01-07-2024",
                balance: 4575,
                category: "Transfer",
                transactionId: "TXN-008",
            },
            {
                id: "9",
                type: "Earned",
                description: "Monthly bonus points",
                amount: 200,
                date: "25-06-2024",
                balance: 4475,
                category: "Bonus",
                transactionId: "TXN-009",
            },
            {
                id: "10",
                type: "Transferred",
                description: "Points transferred to friend@example.com",
                amount: -150,
                date: "20-06-2024",
                balance: 4275,
                category: "Transfer",
                transactionId: "TXN-010",
            },
        ];

        // Initialize transfer points state
        this.transferPointsState = {
            step: "form", // form, confirmation, success
            recipientType: "existing", // existing, new
            recipientValue: "",
            amount: "",
            message: "",
            transferFee: 0,
            isLoading: false,
        };
    }

    initializeChartData() {
        // Mock data for different chart filters
        this.chartData = {
            paymentDistribution: {
                yearly: {
                    labels: ["Rent", "Education", "Society", "Others"],
                    data: [45, 25, 20, 10],
                    backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24"]
                },
                quarterly: {
                    labels: ["Rent", "Education", "Society", "Others"],
                    data: [50, 30, 15, 5],
                    backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24"]
                },
                monthly: {
                    labels: ["Rent", "Education", "Society", "Others"],
                    data: [60, 20, 15, 5],
                    backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24"]
                }
            },
            paymentHistory: {
                payments: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{
                        label: "Payments",
                        data: [12000, 19000, 15000, 25000, 22000, 30000],
                        borderColor: "#ff6b6b",
                        backgroundColor: "rgba(255, 107, 107, 0.1)"
                    }]
                },
                activity: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{
                        label: "Transactions",
                        data: [8, 12, 10, 15, 14, 18],
                        borderColor: "#4ecdc4",
                        backgroundColor: "rgba(78, 205, 196, 0.1)"
                    }]
                },
                redpoints: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{
                        label: "Cash Points Earned",
                        data: [120, 190, 150, 250, 220, 300],
                        borderColor: "#45b7d1",
                        backgroundColor: "rgba(69, 183, 209, 0.1)"
                    }]
                }
            }
        };

        // Current filter states
        this.currentFilters = {
            paymentPeriod: 'yearly',
            historyType: 'payments'
        };
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.initializeCharts();
        this.initializeTheme();
        this.initializeSidebar();
        this.startLuxuryAnimations();
        this.initializeFirstSection();
        this.initializeTransactionHistoryData();
    }

    // Initialize comprehensive transaction history mock data
    initializeTransactionHistoryData() {
        this.transactionHistoryData = [
            // Upcoming payments
            {
                id: 1,
                rgId: "RG-0000182568",
                type: "Rent",
                amount: 14000,
                date: new Date("2025-01-15"),
                status: "UPCOMING",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 9,
                rgId: "RG-0000182569",
                type: "Rent",
                amount: 32000,
                date: new Date("2025-01-10"),
                status: "UPCOMING",
                isSettled: false, // No green tick - settlement pending
            },
            // Scheduled payments
            {
                id: 2,
                rgId: "RG-6000182595",
                type: "Education Fee",
                amount: 10000,
                date: new Date("2025-02-10"),
                status: "SCHEDULED",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 3,
                rgId: "RG-4000180380",
                type: "Maintenance",
                amount: 18000,
                date: new Date("2025-03-12"),
                status: "SCHEDULED",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 11,
                rgId: "RG-6000182598",
                type: "Education Fee",
                amount: 45000,
                date: new Date("2025-02-15"),
                status: "SCHEDULED",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 13,
                rgId: "RG-4000180381",
                type: "Maintenance",
                amount: 22000,
                date: new Date("2025-03-20"),
                status: "SCHEDULED",
                isSettled: false, // No green tick - settlement pending
            },
            // Completed payments
            {
                id: 4,
                rgId: "RG-0000182568",
                type: "Rent",
                amount: 14000,
                date: new Date("2024-12-15"),
                status: "PAID",
                isSettled: true, // Green tick - settlement completed
            },
            {
                id: 5,
                rgId: "RG-0000182568",
                type: "Rent",
                amount: 14000,
                date: new Date("2024-11-15"),
                status: "PAID",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 10,
                rgId: "RG-0000182569",
                type: "Rent",
                amount: 32000,
                date: new Date("2024-12-10"),
                status: "PAID",
                isSettled: true, // Green tick - settlement completed
            },
            {
                id: 6,
                rgId: "RG-6000182595",
                type: "Education Fee",
                amount: 10000,
                date: new Date("2024-11-10"),
                status: "PAID",
                isSettled: true, // Green tick - settlement completed
            },
            {
                id: 12,
                rgId: "RG-6000182598",
                type: "Education Fee",
                amount: 45000,
                date: new Date("2024-11-15"),
                status: "PAID",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 7,
                rgId: "RG-4000180380",
                type: "Maintenance",
                amount: 18000,
                date: new Date("2024-12-12"),
                status: "PAID",
                isSettled: true, // Green tick - settlement completed
            },
            {
                id: 14,
                rgId: "RG-4000180381",
                type: "Maintenance",
                amount: 22000,
                date: new Date("2024-12-20"),
                status: "PAID",
                isSettled: false, // No green tick - settlement pending
            },
            // Failed payments
            {
                id: 8,
                rgId: "RG-6000182595",
                type: "Education Fee",
                amount: 10000,
                date: new Date("2024-10-10"),
                status: "FAILED",
                isSettled: false, // No green tick - payment failed
            },
            // Additional transactions to match the React implementation
            {
                id: 15,
                rgId: "RG-0000182568",
                type: "Rent",
                amount: 14000,
                date: new Date("2024-10-15"),
                status: "PAID",
                isSettled: true, // Green tick - settlement completed
            },
            {
                id: 16,
                rgId: "RG-6000182595",
                type: "Education Fee",
                amount: 10000,
                date: new Date("2024-09-10"),
                status: "PAID",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 17,
                rgId: "RG-4000180380",
                type: "Maintenance",
                amount: 18000,
                date: new Date("2024-11-12"),
                status: "PAID",
                isSettled: true, // Green tick - settlement completed
            },
            {
                id: 18,
                rgId: "RG-0000182569",
                type: "Rent",
                amount: 32000,
                date: new Date("2024-11-10"),
                status: "PAID",
                isSettled: false, // No green tick - settlement pending
            },
            {
                id: 19,
                rgId: "RG-6000182598",
                type: "Education Fee",
                amount: 45000,
                date: new Date("2024-10-15"),
                status: "PAID",
                isSettled: true, // Green tick - settlement completed
            },
            {
                id: 20,
                rgId: "RG-4000180381",
                type: "Maintenance",
                amount: 22000,
                date: new Date("2024-11-20"),
                status: "PAID",
                isSettled: false, // No green tick - settlement pending
            },
        ];
    }

    // Initialize first section on page load
    initializeFirstSection() {
        // Set dashboard as initial active section
        const dashboardSection = document.getElementById("dashboard-section");
        const firstNavLink = document.querySelector('[data-section="dashboard"]');

        if (dashboardSection) {
            dashboardSection.classList.add("active");
            dashboardSection.style.opacity = "1";
            dashboardSection.style.transform = "translateY(0)";
        }

        if (firstNavLink) {
            firstNavLink.classList.add("active");
        }

        this.currentSection = "dashboard";

        // Initialize analytics view by default (including Payment Methods)
        this.renderDashboardAnalytics();
    }

    setupEventListeners() {
        // Navigation links with luxury transitions
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const section = link.getAttribute("data-section");
                this.showSection(section, link);
            });
        });

        // Mobile sidebar
        const hamburger = document.querySelector(".mobile-menu-btn");
        const overlay = document.querySelector(".mobile-overlay");

        if (hamburger) {
            hamburger.addEventListener("click", () => {
                this.toggleMobileSidebar();
            });
        }

        if (overlay) {
            overlay.addEventListener("click", () => {
                this.closeMobileSidebar();
            });
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById("sidebar-toggle");
        if (sidebarToggle) {
            sidebarToggle.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Sidebar toggle clicked");
                this.toggleSidebar();
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.addEventListener("click", () => {
                this.toggleTheme();
            });
        }

        // Edit Records modal
        const editModal = document.getElementById("edit-registration-modal");
        if (editModal) {
            const closeBtn = editModal.querySelector(".close");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    this.closeRegistrationModal();
                });
            }
        }
    }

    setupChartEventListeners() {
        // Payment Distribution chart filter
        const paymentPeriodSelect = document.getElementById("payment-period");
        if (paymentPeriodSelect) {
            paymentPeriodSelect.addEventListener("change", (e) => {
                this.currentFilters.paymentPeriod = e.target.value;
                this.updatePaymentChart();
                this.showNotification(`Payment distribution updated to ${e.target.options[e.target.selectedIndex].text}`, "success");
            });
        }

        // Payment History chart filter
        const historyTypeSelect = document.getElementById("history-type");
        if (historyTypeSelect) {
            historyTypeSelect.addEventListener("change", (e) => {
                this.currentFilters.historyType = e.target.value;
                this.updateHistoryChart();
                // Update chart title
                const chartTitle = document.getElementById("history-chart-title");
                if (chartTitle) {
                    const selectedOption = e.target.options[e.target.selectedIndex].text;
                    chartTitle.textContent = selectedOption;
                }
                this.showNotification(`Chart updated to ${e.target.options[e.target.selectedIndex].text}`, "success");
            });
        }
    }

    // Show section with luxury transitions
    showSection(sectionName, clickedLink) {
        // Prevent double-click on same section
        if (this.currentSection === sectionName) return;

        // Remove active class from all nav links
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active");
        });

        // Add active class to clicked link
        if (clickedLink) {
            clickedLink.classList.add("active");
        }

        // Hide current section with fade out
        const currentSectionEl = document.getElementById(
            this.currentSection + "-section"
        );
        if (currentSectionEl) {
            currentSectionEl.style.opacity = "0";
            currentSectionEl.style.transform = "translateY(20px)";

            setTimeout(() => {
                currentSectionEl.classList.remove("active");
                currentSectionEl.style.display = "none";
            }, 300);
        }

        // Show new section with fade in
        setTimeout(() => {
            const newSectionEl = document.getElementById(sectionName + "-section");
            if (newSectionEl) {
                newSectionEl.style.display = "block";
                newSectionEl.classList.add("active");

                // Trigger reflow
                newSectionEl.offsetHeight;

                newSectionEl.style.opacity = "1";
                newSectionEl.style.transform = "translateY(0)";
            }

            this.currentSection = sectionName;
            this.loadSectionData(sectionName);
        }, 320);

        // Close mobile sidebar if open
        this.closeMobileSidebar();
    }

    loadSectionData(sectionName) {
        switch (sectionName) {
            case "dashboard":
                this.loadDashboardData();
                break;
            case "registrations":
                this.loadRegistrations();
                break;
            case "transactions":
                this.loadTransactionHistory();
                break;
            case "edit-records":
                this.loadEditRecords();
                break;
            case "rewards":
                this.loadRewards();
                break;
            case "reports":
                this.loadReports();
                break;
            case "referrals":
                this.loadReferrals();
                break;
            case "profile":
                this.loadProfile();
                break;
            case "contact":
                this.loadContact();
                break;
        }
    }

    async apiRequest(endpoint, options = {}) {
        const url = this.apiBaseUrl + endpoint;
        const defaultOptions = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        } catch (error) {
            console.error("API request failed:", error);
            this.showNotification("Failed to load data. Please try again.", "error");
            return null;
        }
    }

    async loadDashboardData() {
        // Use mock data instead of API calls
        const mockData = {
            analytics: {
                totalSpent: 42890,
                activeRegistrations: 3,
                pendingPayments: 14000,
                walletBalance: 1240,
            },
            transactions: [
                {
                    id: 1,
                    rgId: "RG-0000182568",
                    type: "Rent",
                    amount: 14000,
                    date: "2024-11-14",
                    status: "Upcoming",
                },
                {
                    id: 2,
                    rgId: "RG-6000182595",
                    type: "Education Fee",
                    amount: 10,
                    date: "2025-03-10",
                    status: "Scheduled",
                },
                {
                    id: 3,
                    rgId: "RG-4000180380",
                    type: "Maintenance",
                    amount: 100000,
                    date: "2025-03-12",
                    status: "Scheduled",
                },
            ],
        };

        this.dashboardData = mockData;
        this.updateAnalyticsCards(mockData.analytics);
        this.updatePaymentChart();
        this.updateHistoryChart();
    }

    async loadRegistrations() {
        // Use mock data for registrations
        const mockData = [
            {
                id: 1,
                rgId: "RG-0000182568",
                type: "tenant",
                subtype: "Rent",
                mode: "Credit Card",
                status: "Approved",
                amount: 25000,
                frequency: "Monthly",
                dueDate: "2024-11-15",
            },
            {
                id: 2,
                rgId: "RG-6000182595",
                type: "education",
                subtype: "Education Fee",
                mode: "UPI",
                status: "Approved",
                amount: 10,
                frequency: "One-time",
                dueDate: "2025-03-10",
            },
            {
                id: 3,
                rgId: "RG-4000180380",
                type: "society",
                subtype: "Maintenance",
                mode: "Net Banking",
                status: "Approved",
                amount: 100000,
                frequency: "Monthly",
                dueDate: "2025-03-12",
            },
        ];

        this.registrations = mockData;
        this.renderRegistrationsTable(mockData);
    }

    async loadTransactionHistory() {
        // Load transaction history and render with default "all" tab
        this.currentTransactionTab = "all";
        this.renderTransactionHistory();
        this.showNotification("Transaction history loaded successfully", "success");
    }

    // Switch transaction tab and filter data
    switchTransactionTab(tab) {
        this.currentTransactionTab = tab;

        // Update active tab styling
        document.querySelectorAll(".transaction-tab").forEach((tabEl) => {
            tabEl.classList.remove("active");
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

        // Re-render with filtered data
        this.renderTransactionHistory();
    }

    // Filter transactions based on active tab
    getFilteredTransactions() {
        let filtered = [...this.transactionHistoryData];

        switch (this.currentTransactionTab) {
            case "rent":
                filtered = filtered.filter((tx) => tx.type === "Rent");
                break;
            case "education":
                filtered = filtered.filter((tx) => tx.type === "Education Fee");
                break;
            case "society":
                filtered = filtered.filter((tx) => tx.type === "Maintenance");
                break;
            case "completed":
                filtered = filtered.filter((tx) => tx.status === "PAID");
                break;
            case "all":
            default:
                // No filtering for "all" tab
                break;
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
    }

    // Render transaction history table
    renderTransactionHistory() {
        const filteredTransactions = this.getFilteredTransactions();
        const tableBody = document.getElementById("transaction-table-body");
        const emptyState = document.getElementById("transaction-empty-state");
        const countBadge = document.getElementById("transaction-count-badge");

        if (!tableBody) return;

        // Update count badge
        if (countBadge) {
            countBadge.textContent = `${filteredTransactions.length} records`;
        }

        // Clear existing content
        tableBody.innerHTML = "";

        if (filteredTransactions.length === 0) {
            // Show empty state
            if (emptyState) emptyState.style.display = "block";
            return;
        }

        // Hide empty state
        if (emptyState) emptyState.style.display = "none";

        // Render transactions
        filteredTransactions.forEach((transaction) => {
            const row = document.createElement("tr");

            // Get transaction type icon and color
            const typeInfo = this.getTransactionTypeInfo(transaction.type);

            // Get status badge styling using settlement status logic
            const statusInfo = this.getTransactionStatusInfo(transaction.status, transaction);

            // Format date
            const formattedDate = this.formatTransactionDate(transaction.date);

            // Add green tick icon for settled transactions
            const settlementIcon = transaction.isSettled ?
                '<i class="fas fa-check-circle" style="color: #10b981; margin-left: 8px;" title="Settlement Completed"></i>' :
                '';

            row.innerHTML = `
                <td>
                    <span style="font-weight: 600;">${transaction.rgId}</span>
                </td>
                <td>
                    <div class="transaction-type">
                        <i class="${typeInfo.icon}" style="color: ${typeInfo.color
                };"></i>
                        <span>${transaction.type}</span>
                    </div>
                </td>
                <td>${formattedDate}</td>
                <td>
                    <span class="transaction-amount">₹${transaction.amount.toLocaleString()}</span>
                </td>
                <td>
                    <span class="transaction-status-badge ${statusInfo.class}">
                        ${statusInfo.label}
                    </span>
                    ${settlementIcon}
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Get transaction type icon and color
    getTransactionTypeInfo(type) {
        switch (type) {
            case "Rent":
                return { icon: "fas fa-home", color: "#f97316" };
            case "Education Fee":
                return { icon: "fas fa-calendar", color: "#3b82f6" };
            case "Maintenance":
                return { icon: "fas fa-building", color: "#10b981" };
            default:
                return { icon: "fas fa-circle", color: "#6b7280" };
        }
    }

    // Get settlement status based on transaction ID pattern and settlement indicator
    getSettlementStatus(transaction) {
        const { rgId, isSettled } = transaction;

        // Extract transaction type from RG ID pattern
        const rgIdMatch = rgId.match(/^RG-([046])/);
        if (!rgIdMatch) {
            return { class: "scheduled", label: "Unknown Status" };
        }

        const transactionTypeCode = rgIdMatch[1];

        // Determine transaction type and status based on settlement indicator
        switch (transactionTypeCode) {
            case "0": // Rent transactions
                return {
                    class: isSettled ? "paid" : "pending",
                    label: isSettled ? "Rent Payment Settled" : "Rent Settlement Pending"
                };
            case "4": // Maintenance transactions
                return {
                    class: isSettled ? "paid" : "pending",
                    label: isSettled ? "Maintenance Payment Settled" : "Maintenance Settlement Pending"
                };
            case "6": // Fee transactions
                return {
                    class: isSettled ? "paid" : "pending",
                    label: isSettled ? "Fee Payment Settled" : "Fee Settlement Pending"
                };
            default:
                return { class: "scheduled", label: "Unknown Status" };
        }
    }

    // Get payment status step text based on transaction ID pattern and settlement status
    getPaymentStatusStepText(transactionId, isCompleted) {
        // Extract transaction type from RG ID pattern
        const rgIdMatch = transactionId.match(/^RG-([046])/);
        if (!rgIdMatch) {
            return isCompleted ? "Payment Settled" : "Settlement Pending";
        }

        const transactionTypeCode = rgIdMatch[1];

        // Determine step text based on transaction type and completion status
        switch (transactionTypeCode) {
            case "0": // Rent transactions
                return isCompleted ? "Rent Payment Settled" : "Rent Settlement Pending";
            case "4": // Maintenance transactions
                return isCompleted ? "Maintenance Payment Settled" : "Maintenance Settlement Pending";
            case "6": // Fee transactions
                return isCompleted ? "Fee Payment Settled" : "Fee Settlement Pending";
            default:
                return isCompleted ? "Payment Settled" : "Settlement Pending";
        }
    }

    // Get charges section title based on transaction ID pattern
    getChargesSectionTitle(transactionId) {
        const rgIdMatch = transactionId.match(/^RG-([046])/);
        if (!rgIdMatch) {
            return "Charges";
        }

        const transactionTypeCode = rgIdMatch[1];

        switch (transactionTypeCode) {
            case "0": // Rent transactions
                return "Rent Charges";
            case "4": // Maintenance transactions
                return "Maintenance Charges";
            case "6": // Fee transactions
                return "Fee Charges";
            default:
                return "Charges";
        }
    }

    getLabelSectionTitle(transactionId) {
        const rgIdMatch = transactionId.match(/^RG-([046])/);
        if (!rgIdMatch) {
            return "Charges";
        }

        const transactionTypeCode = rgIdMatch[1];

        switch (transactionTypeCode) {
            case "0": // Rent transactions
                return "Rent";
            case "4": // Maintenance transactions
                return "Maintenance";
            case "6": // Fee transactions
                return "Fee";
            default:
                return "Charges";
        }
    }

    // Get transactions section title based on transaction ID pattern
    getTransactionsSectionTitle(transactionId) {
        const rgIdMatch = transactionId.match(/^RG-([046])/);
        if (!rgIdMatch) {
            return "Transactions";
        }

        const transactionTypeCode = rgIdMatch[1];

        switch (transactionTypeCode) {
            case "0": // Rent transactions
                return "Rent Transactions";
            case "4": // Maintenance transactions
                return "Maintenance Transactions";
            case "6": // Fee transactions
                return "Education Fee Transactions";
            default:
                return "Transactions";
        }
    }

    // Get transaction status badge styling
    getTransactionStatusInfo(status, transaction = null) {
        // If transaction object is provided, use settlement status logic
        if (transaction) {
            return this.getSettlementStatus(transaction);
        }

        // Fallback to original status logic for backward compatibility
        switch (status) {
            case "PAID":
                return { class: "paid", label: "COMPLETED" };
            case "UPCOMING":
                return { class: "upcoming", label: "UPCOMING" };
            case "SCHEDULED":
                return { class: "scheduled", label: "SCHEDULED" };
            case "FAILED":
                return { class: "failed", label: "FAILED" };
            default:
                return { class: "scheduled", label: status };
        }
    }

    // Format transaction date
    formatTransactionDate(date) {
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return new Date(date).toLocaleDateString("en-GB", options);
    }

    // Test function to verify settlement status logic
    testSettlementStatusLogic() {
        console.log("Testing Settlement Status Logic:");

        // Test cases for different transaction types and settlement statuses
        const testCases = [
            { rgId: "RG-0000182568", isSettled: true, expected: "Rent Payment Settled" },
            { rgId: "RG-0000182568", isSettled: false, expected: "Rent Settlement Pending" },
            { rgId: "RG-4000180380", isSettled: true, expected: "Maintenance Payment Settled" },
            { rgId: "RG-4000180380", isSettled: false, expected: "Maintenance Settlement Pending" },
            { rgId: "RG-6000182595", isSettled: true, expected: "Fee Payment Settled" },
            { rgId: "RG-6000182595", isSettled: false, expected: "Fee Settlement Pending" },
        ];

        testCases.forEach((testCase, index) => {
            const result = this.getSettlementStatus(testCase);
            const passed = result.label === testCase.expected;
            console.log(`Test ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'} - ${testCase.rgId} (settled: ${testCase.isSettled}) -> "${result.label}"`);
        });

        console.log("\nTesting Payment Status Step Text Logic:");

        // Test cases for payment status step text
        const stepTestCases = [
            { transactionId: "RG-0000182568", isCompleted: true, expected: "Rent Payment Settled" },
            { transactionId: "RG-0000182568", isCompleted: false, expected: "Rent Settlement Pending" },
            { transactionId: "RG-4000180380", isCompleted: true, expected: "Maintenance Payment Settled" },
            { transactionId: "RG-4000180380", isCompleted: false, expected: "Maintenance Settlement Pending" },
            { transactionId: "RG-6000182595", isCompleted: true, expected: "Fee Payment Settled" },
            { transactionId: "RG-6000182595", isCompleted: false, expected: "Fee Settlement Pending" },
        ];

        stepTestCases.forEach((testCase, index) => {
            const result = this.getPaymentStatusStepText(testCase.transactionId, testCase.isCompleted);
            const passed = result === testCase.expected;
            console.log(`Step Test ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'} - ${testCase.transactionId} (completed: ${testCase.isCompleted}) -> "${result}"`);
        });

        console.log("\nTesting Charges Section Title Logic:");

        // Test cases for charges section titles
        const chargesTestCases = [
            { transactionId: "RG-0000182568", expected: "Rent Charges" },
            { transactionId: "RG-4000180380", expected: "Maintenance Charges" },
            { transactionId: "RG-6000182595", expected: "Fee Charges" },
        ];

        chargesTestCases.forEach((testCase, index) => {
            const result = this.getChargesSectionTitle(testCase.transactionId);
            const passed = result === testCase.expected;
            console.log(`Charges Test ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'} - ${testCase.transactionId} -> "${result}"`);
        });

        console.log("\nTesting Transactions Section Title Logic:");

        // Test cases for transactions section titles
        const transactionsTestCases = [
            { transactionId: "RG-0000182568", expected: "Rent Transactions" },
            { transactionId: "RG-4000180380", expected: "Maintenance Transactions" },
            { transactionId: "RG-6000182595", expected: "Education Fee Transactions" },
        ];

        transactionsTestCases.forEach((testCase, index) => {
            const result = this.getTransactionsSectionTitle(testCase.transactionId);
            const passed = result === testCase.expected;
            console.log(`Transactions Test ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'} - ${testCase.transactionId} -> "${result}"`);
        });
    }

    async loadEditRecords() {
        try {
            const registrations = await this.editRecordsService.getRegistrations(
                this.userId
            );
            this.registrations = registrations;
            this.renderEditRecords(registrations);
        } catch (error) {
            console.error("Error loading edit records:", error);
            this.showNotification("Failed to load edit records", "error");
        }
    }

    renderRegistrationsTable(registrations) {
        const tbody = document.getElementById("registrations-table-body");
        if (!tbody) return;

        let html = "";
        registrations.forEach((reg) => {
            html += `
                <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 16px; font-weight: 500; color: #111827; font-size: 14px;">
                        <a href="registration.html?rgId=${reg.rgId
                }" style="color: #ef4444; text-decoration: none; font-weight: 600;">${reg.rgId
                }</a>
                    </td>
                    <td style="padding: 16px; color: #6b7280; font-size: 14px;">${this.getTypeLabel(
                    reg.type
                )}</td>
                    <td style="padding: 16px; color: #6b7280; font-size: 14px;">${reg.mode
                }</td>
                    <td style="padding: 16px;">
                        <span style="background: ${this.getStatusColor(
                    reg.status
                )}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">${reg.status
                }</span>
                    </td>
                    <td style="padding: 16px; font-weight: 600; color: #111827; font-size: 14px;">₹${parseInt(
                    reg.amount
                ).toLocaleString()}</td>
                </tr>`;
        });

        tbody.innerHTML = html;

        // Hide loading state
        const loading = document.getElementById("registrations-loading");
        if (loading) loading.style.display = "none";
    }

    renderTransactions() {
        // Transactions are already rendered in the HTML
        // This method can be used to update the transaction list dynamically if needed
        this.showNotification("Transactions loaded successfully", "success");
    }

    async loadRewards() {
        // Default to Gift Cards tab
        this.renderGiftCards();
        this.showNotification("Rewards loaded successfully", "success");
    }

    async loadReports() {
        // Initialize reports data if not exists
        if (!this.reportsData) {
            this.reportsData = {
                currentTab: "payments",
                period: "6months",
                payments: {
                    overview: {
                        currentMonthTotal: 28800,
                        ytdSpending: 318200,
                        largestPayment: 48000,
                        nextDuePayment: 26000,
                    },
                    barChart: {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                        datasets: [
                            {
                                label: "Rent Payments",
                                data: [25000, 25000, 25000, 25000, 28800, 28800, 28800, 28800],
                                backgroundColor: "#f97316",
                            },
                            {
                                label: "Education Fees",
                                data: [0, 0, 45000, 0, 0, 0, 45000, 0],
                                backgroundColor: "#3b82f6",
                            },
                            {
                                label: "Society Charges",
                                data: [2500, 2500, 2500, 2500, 0, 0, 3000, 0],
                                backgroundColor: "#10b981",
                            },
                        ],
                    },
                    pieChart: {
                        labels: ["Rent", "Education", "Society", "Utilities", "Other"],
                        datasets: [
                            {
                                data: [63, 28, 7, 1.5, 0.5],
                                backgroundColor: [
                                    "#f97316",
                                    "#3b82f6",
                                    "#10b981",
                                    "#8b5cf6",
                                    "#f43f5e",
                                ],
                            },
                        ],
                    },
                },
                cashpoints: {
                    overview: {
                        availableCashPoints: 2182,
                        pointsEarnedThisMonth: 288,
                        totalEarned: 8450,
                        totalRedeemed: 6268,
                    },
                    barChart: {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                        datasets: [
                            {
                                label: "Points Earned",
                                data: [150, 200, 180, 220, 190, 250, 210, 288],
                                backgroundColor: "#10b981",
                            },
                            {
                                label: "Points Redeemed",
                                data: [100, 150, 120, 180, 140, 200, 160, 180],
                                backgroundColor: "#f97316",
                            },
                        ],
                    },
                    pieChart: {
                        labels: ["Available", "Redeemed", "Expired"],
                        datasets: [
                            {
                                data: [35, 60, 5],
                                backgroundColor: ["#10b981", "#f97316", "#ef4444"],
                            },
                        ],
                    },
                },
            };
        }

        // Set current tab and period from UI
        this.reportsData.currentTab = this.reportsData.currentTab || "payments";
        this.reportsData.period = this.reportsData.period || "6months";

        // Update overview cards
        this.updateReportsOverview();

        // Update charts
        this.updateReportsCharts();

        // Update additional content
        this.updateReportsAdditionalContent();
    }

    updateReportsOverview() {
        const container = document.getElementById("reports-overview-cards");
        if (!container || !this.reportsData) return;

        const currentData = this.reportsData[this.reportsData.currentTab];
        const isPayments = this.reportsData.currentTab === "payments";

        let html = "";

        if (isPayments) {
            html = `
                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">Current Month Total</h4>
                        <i class="fas fa-arrow-up-right" style="color: #10b981; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">₹${currentData.overview.currentMonthTotal.toLocaleString()}</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Across 2 active registrations</p>
                </div>

                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">YTD Spending</h4>
                        <i class="fas fa-arrow-up-right" style="color: #10b981; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">₹${currentData.overview.ytdSpending.toLocaleString()}</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">From Jan to Aug 2025</p>
                </div>

                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">Largest Payment</h4>
                        <i class="fas fa-arrow-up-right" style="color: #10b981; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">₹${currentData.overview.largestPayment.toLocaleString()}</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Education fees due July 2025</p>
                </div>

                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">Next Due Payment</h4>
                        <i class="fas fa-clock" style="color: #f59e0b; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">₹${currentData.overview.nextDuePayment.toLocaleString()}</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Due in 3 days (Rent)</p>
                </div>
            `;
        } else {
            html = `
                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">Available Cash Points</h4>
                        <i class="fas fa-arrow-up-right" style="color: #10b981; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">${currentData.overview.availableCashPoints.toLocaleString()}</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Worth approx. ₹${currentData.overview.availableCashPoints.toLocaleString()}</p>
                </div>

                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">Points Earned this Month</h4>
                        <i class="fas fa-arrow-up-right" style="color: #10b981; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">${currentData.overview.pointsEarnedThisMonth
                }</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">+15.4% over last month</p>
                </div>

                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">Total Earned</h4>
                        <i class="fas fa-trophy" style="color: #f59e0b; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">${currentData.overview.totalEarned.toLocaleString()}</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Lifetime earnings</p>
                </div>

                <div class="chart-card" style="padding: 20px; text-align: left;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                        <h4 style="font-size: 14px; font-weight: 500; color: #6b7280; margin: 0;">Total Redeemed</h4>
                        <i class="fas fa-gift" style="color: #8b5cf6; font-size: 14px;"></i>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">${currentData.overview.totalRedeemed.toLocaleString()}</div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Used for rewards</p>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    updateReportsCharts() {
        if (!this.reportsData) return;

        const currentData = this.reportsData[this.reportsData.currentTab];
        const isPayments = this.reportsData.currentTab === "payments";

        // Update chart titles
        const mainChartTitle = document.getElementById("main-chart-title");
        const mainChartDescription = document.getElementById(
            "main-chart-description"
        );
        const pieChartTitle = document.getElementById("pie-chart-title");
        const pieChartDescription = document.getElementById(
            "pie-chart-description"
        );

        if (mainChartTitle) {
            mainChartTitle.textContent = isPayments
                ? "Monthly Payment Breakdown"
                : "Cash Points Activity";
        }
        if (mainChartDescription) {
            mainChartDescription.textContent = isPayments
                ? "Your regular payments by category"
                : "Points earned vs redeemed each month";
        }
        if (pieChartTitle) {
            pieChartTitle.textContent = isPayments
                ? "Spending Distribution"
                : "Cash Points Distribution";
        }
        if (pieChartDescription) {
            pieChartDescription.textContent = isPayments
                ? "Percentage breakdown by category"
                : "Available vs redeemed points";
        }

        // Update main chart
        this.renderChart("main-chart", "bar", currentData.barChart);

        // Update pie chart
        this.renderChart("pie-chart", "pie", currentData.pieChart);
    }

    renderChart(canvasId, type, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas element with id '${canvasId}' not found`);
            return;
        }

        // Check if Chart.js is available
        if (typeof Chart === "undefined") {
            console.error("Chart.js library is not loaded");
            return;
        }

        // Destroy existing chart if it exists
        if (this.charts && this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        // Initialize charts object if it doesn't exist
        if (!this.charts) {
            this.charts = {};
        }

        const ctx = canvas.getContext("2d");

        try {
            // Chart.js configuration
            const config = {
                type: type,
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: type === "pie" ? "bottom" : "top",
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                },
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(17, 24, 39, 0.9)",
                            titleColor: "#f9fafb",
                            bodyColor: "#f3f4f6",
                            padding: 10,
                            cornerRadius: 6,
                            boxPadding: 4,
                        },
                    },
                    scales:
                        type === "pie"
                            ? {}
                            : {
                                x: {
                                    grid: {
                                        display: false,
                                    },
                                    ticks: {
                                        font: {
                                            size: 11,
                                        },
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: "rgba(203, 213, 225, 0.2)",
                                    },
                                    ticks: {
                                        font: {
                                            size: 11,
                                        },
                                        callback: function (value) {
                                            return type === "bar" && value >= 1000
                                                ? "₹" + value / 1000 + "k"
                                                : value;
                                        },
                                    },
                                },
                            },
                },
            };

            // Create new chart
            this.charts[canvasId] = new Chart(ctx, config);
        } catch (error) {
            console.error(`Error creating chart '${canvasId}':`, error);
        }
    }

    updateReportsAdditionalContent() {
        const container = document.getElementById("reports-additional-content");
        if (!container) return;

        // For now, we'll keep this simple - could add more detailed tables or insights here
        container.innerHTML = `
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Quick Insights</h3>
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">Key takeaways from your ${this.reportsData.currentTab === "payments"
                ? "payment"
                : "cash points"
            } data</p>
                </div>
                <div style="padding: 20px;">
                    ${this.reportsData.currentTab === "payments"
                ? this.getPaymentInsights()
                : this.getCashPointsInsights()
            }
                </div>
            </div>
        `;
    }

    getPaymentInsights() {
        return `
            <div style="display: grid; gap: 16px;">
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <i class="fas fa-info-circle" style="color: #3b82f6; font-size: 16px;"></i>
                    <div>
                        <p style="margin: 0; font-weight: 500; color: #1e40af;">Your largest expense category is Rent, accounting for 63% of total spending.</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                    <i class="fas fa-chart-line" style="color: #10b981; font-size: 16px;"></i>
                    <div>
                        <p style="margin: 0; font-weight: 500; color: #065f46;">Your spending has been consistent over the past 6 months with an average of ₹28,800 per month.</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #fefce8; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <i class="fas fa-calendar-alt" style="color: #f59e0b; font-size: 16px;"></i>
                    <div>
                        <p style="margin: 0; font-weight: 500; color: #92400e;">Your next payment of ₹26,000 for rent is due in 3 days.</p>
                    </div>
                </div>
            </div>
        `;
    }

    getCashPointsInsights() {
        return `
            <div style="display: grid; gap: 16px;">
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <i class="fas fa-trophy" style="color: #3b82f6; font-size: 16px;"></i>
                    <div>
                        <p style="margin: 0; font-weight: 500; color: #1e40af;">You've earned 288 points this month, a 15.4% increase from last month!</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                    <i class="fas fa-coins" style="color: #10b981; font-size: 16px;"></i>
                    <div>
                        <p style="margin: 0; font-weight: 500; color: #065f46;">You have 2,182 points available worth approximately ₹2,182 in rewards.</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #fdf4ff; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                    <i class="fas fa-gift" style="color: #8b5cf6; font-size: 16px;"></i>
                    <div>
                        <p style="margin: 0; font-weight: 500; color: #6b21a8;">You've redeemed 74% of your lifetime earnings - great job using your rewards!</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Export functionality
    exportReport() {
        const currentTab = this.reportsData?.currentTab || "payments";
        const period = this.reportsData?.period || "6months";

        // Create mock CSV data
        const csvData = this.generateReportCSV(currentTab, period);

        // Create and download file
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentTab}_report_${period}_${new Date().toISOString().split("T")[0]
            }.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showNotification(
            `${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)
            } report downloaded successfully!`,
            "success"
        );
    }

    generateReportCSV(type, period) {
        if (type === "payments") {
            const headers = ["Month", "Rent", "Education", "Society", "Total"];
            const data = [
                ["Jan 2025", "25000", "0", "2500", "27500"],
                ["Feb 2025", "25000", "0", "2500", "27500"],
                ["Mar 2025", "25000", "45000", "2500", "72500"],
                ["Apr 2025", "25000", "0", "2500", "27500"],
                ["May 2025", "28800", "0", "0", "28800"],
                ["Jun 2025", "28800", "0", "0", "28800"],
                ["Jul 2025", "28800", "45000", "3000", "76800"],
                ["Aug 2025", "28800", "0", "0", "28800"],
            ];
            return [headers, ...data].map((row) => row.join(",")).join("\n");
        } else {
            const headers = [
                "Month",
                "Points Earned",
                "Points Redeemed",
                "Net Change",
            ];
            const data = [
                ["Jan 2025", "150", "100", "50"],
                ["Feb 2025", "200", "150", "50"],
                ["Mar 2025", "180", "120", "60"],
                ["Apr 2025", "220", "180", "40"],
                ["May 2025", "190", "140", "50"],
                ["Jun 2025", "250", "200", "50"],
                ["Jul 2025", "210", "160", "50"],
                ["Aug 2025", "288", "180", "108"],
            ];
            return [headers, ...data].map((row) => row.join(",")).join("\n");
        }
    }

    async loadReferrals() {
        // Initialize referrals data if not exists
        if (!this.referralsData) {
            this.referralsData = {
                referralCode: "PIYUSH500",
                referralLink: "https://redgirraffe.com/ref/PIYUSH500",
                referrals: [
                    {
                        id: 1,
                        referrerId: 1,
                        referredEmail: "rahul.s@example.com",
                        referredName: "Rahul Sharma",
                        referralCode: "PIYUSH500",
                        status: "Pending",
                        invitedAt: new Date("2025-05-15"),
                        completedAt: null,
                        rewardAmount: "500",
                    },
                    {
                        id: 2,
                        referrerId: 1,
                        referredEmail: "priya.p@example.com",
                        referredName: "Priya Patel",
                        referralCode: "PIYUSH500",
                        status: "Pending",
                        invitedAt: new Date("2025-05-10"),
                        completedAt: null,
                        rewardAmount: "500",
                    },
                    {
                        id: 3,
                        referrerId: 1,
                        referredEmail: "vikram.s@example.com",
                        referredName: "Vikram Singh",
                        referralCode: "PIYUSH500",
                        status: "Completed",
                        invitedAt: new Date("2025-04-28"),
                        completedAt: new Date("2025-04-30"),
                        rewardAmount: "500",
                    },
                    {
                        id: 4,
                        referrerId: 1,
                        referredEmail: "anita.m@example.com",
                        referredName: "Anita Mehta",
                        referralCode: "PIYUSH500",
                        status: "Completed",
                        invitedAt: new Date("2025-04-15"),
                        completedAt: new Date("2025-04-18"),
                        rewardAmount: "500",
                    },
                ],
            };
        }

        // Update stats in the HTML
        this.updateReferralStats();

        // Load the current tab (default to active)
        this.currentReferralTab = this.currentReferralTab || "active";
        this.renderReferralTable(this.currentReferralTab);
    }

    updateReferralStats() {
        if (!this.referralsData) return;

        const referrals = this.referralsData.referrals;
        const totalReferrals = referrals.length;
        const completedReferrals = referrals.filter(
            (ref) => ref.status === "Completed"
        );
        const pendingReferrals = referrals.filter(
            (ref) => ref.status === "Pending"
        );
        const totalEarned = completedReferrals.length * 500;
        const completionRate =
            totalReferrals > 0
                ? Math.round((completedReferrals.length / totalReferrals) * 100)
                : 0;

        // Update stats in the DOM
        const totalElement = document.getElementById("total-referrals");
        const completedElement = document.getElementById("completed-referrals");
        const pendingElement = document.getElementById("pending-referrals");
        const earnedElement = document.getElementById("total-earned");
        const rateElement = document.getElementById("completion-rate");

        if (totalElement) totalElement.textContent = totalReferrals;
        if (completedElement)
            completedElement.textContent = completedReferrals.length;
        if (pendingElement) pendingElement.textContent = pendingReferrals.length;
        if (earnedElement)
            earnedElement.textContent = `₹${totalEarned.toLocaleString()}`;
        if (rateElement)
            rateElement.textContent = `${completionRate}% completion rate`;
    }

    renderReferralTable(tab) {
        const container = document.getElementById("referrals-table-content");
        if (!container || !this.referralsData) return;

        const referrals = this.referralsData.referrals;
        const filteredReferrals =
            tab === "active"
                ? referrals.filter((ref) => ref.status === "Pending")
                : referrals.filter((ref) => ref.status === "Completed");

        let html = "";

        if (filteredReferrals.length === 0) {
            const emptyMessage =
                tab === "active"
                    ? "No active referrals yet"
                    : "No completed referrals yet";
            const emptyDescription =
                tab === "active"
                    ? "Start sharing your referral link to invite friends"
                    : "Your completed referrals will appear here";

            html = `
                <div style="text-align: center; padding: 48px 24px;">
                    <div style="background: #f3f4f6; color: #9ca3af; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px;">
                        <i class="fas fa-${tab === "active" ? "user-plus" : "check-circle"
                }"></i>
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 8px;">${emptyMessage}</h3>
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">${emptyDescription}</p>
                </div>
            `;
        } else {
            html = `
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f8fafc;">
                            <tr>
                                <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Name</th>
                                <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Email</th>
                                <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Date</th>
                                <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Status</th>
                                ${tab === "active"
                    ? '<th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Action</th>'
                    : '<th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Earned</th>'
                }
                            </tr>
                        </thead>
                        <tbody>
            `;

            filteredReferrals.forEach((referral, index) => {
                const date =
                    tab === "completed" && referral.completedAt
                        ? new Date(referral.completedAt).toLocaleDateString()
                        : new Date(referral.invitedAt).toLocaleDateString();

                html += `
                    <tr style="border-bottom: 1px solid #f3f4f6; ${index % 2 === 0 ? "background: #fafafa;" : ""
                    }">
                        <td style="padding: 12px 16px; font-weight: 500; color: #111827;">${referral.referredName || "N/A"
                    }</td>
                        <td style="padding: 12px 16px; color: #6b7280;">${referral.referredEmail
                    }</td>
                        <td style="padding: 12px 16px; color: #6b7280;">${date}</td>
                        <td style="padding: 12px 16px;">
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-${referral.status === "Completed"
                        ? "check-circle"
                        : "clock"
                    }" style="color: ${referral.status === "Completed" ? "#10b981" : "#f59e0b"
                    }; font-size: 14px;"></i>
                                <span style="color: ${referral.status === "Completed"
                        ? "#10b981"
                        : "#f59e0b"
                    }; font-weight: 500;">${referral.status}</span>
                            </div>
                        </td>
                `;

                if (tab === "active") {
                    html += `
                        <td style="padding: 12px 16px;">
                            <button
                                onclick="dashboard.sendReminder(${referral.id})"
                                style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 4px;"
                            >
                                Remind <i class="fas fa-arrow-right" style="font-size: 10px;"></i>
                            </button>
                        </td>
                    `;
                } else {
                    html += `
                        <td style="padding: 12px 16px; font-weight: 600; color: #111827;">₹${referral.rewardAmount}</td>
                    `;
                }

                html += "</tr>";
            });

            html += `
                        </tbody>
                    </table>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    async loadProfile() {
        // Initialize profile/settings data if not exists
        if (!this.profileData) {
            this.profileData = {
                currentTab: "account",
                user: {
                    fullName: "Piyush Kumar",
                    displayName: "Piyush",
                    email: "piyush.kumar@example.com",
                    phone: "+91 98765 43210",
                    address: "123 Main Street, New Delhi",
                    city: "New Delhi",
                    state: "Delhi",
                    pincode: "110001",
                },
                formData: {
                    displayName: "Piyush",
                },
            };
        }

        // Show the appropriate tab content
        this.showProfileTab(this.profileData.currentTab);

        // Initialize event listeners after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.initializeSettingsEventListeners();
        }, 100);
    }

    showProfileTab(tab) {
        // Update current tab
        if (this.profileData) {
            this.profileData.currentTab = tab;
        }

        // Show/hide appropriate cards
        const accountCard = document.getElementById("account-settings-card");
        const pictureCard = document.getElementById("profile-picture-card");
        const passwordCard = document.getElementById("password-settings-card");

        if (tab === "account") {
            if (accountCard) accountCard.style.display = "block";
            if (pictureCard) pictureCard.style.display = "block";
            if (passwordCard) passwordCard.style.display = "none";
        } else if (tab === "password") {
            if (accountCard) accountCard.style.display = "none";
            if (pictureCard) pictureCard.style.display = "none";
            if (passwordCard) passwordCard.style.display = "block";
        }

        // Update form values if on account tab
        if (tab === "account" && this.profileData) {
            this.populateAccountForm();
        }
    }

    populateAccountForm() {
        if (!this.profileData) return;

        const user = this.profileData.user;
        const formData = this.profileData.formData;

        // Populate form fields
        const fullNameInput = document.getElementById("fullName");
        const displayNameInput = document.getElementById("displayName");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const addressInput = document.getElementById("address");
        const cityInput = document.getElementById("city");
        const stateInput = document.getElementById("state");
        const pincodeInput = document.getElementById("pincode");

        if (fullNameInput) fullNameInput.value = user.fullName;
        if (displayNameInput)
            displayNameInput.value = formData.displayName || user.displayName;
        if (emailInput) emailInput.value = user.email;
        if (phoneInput) phoneInput.value = user.phone;
        if (addressInput) addressInput.value = user.address;
        if (cityInput) cityInput.value = user.city;
        if (stateInput) stateInput.value = user.state;
        if (pincodeInput) pincodeInput.value = user.pincode;
    }

    // Account settings save functionality
    saveAccountSettings() {
        const saveBtn = document.getElementById("save-account-btn");
        const saveText = document.getElementById("save-account-text");
        const saveSpinner = document.getElementById("save-account-spinner");

        if (!saveBtn || !saveText || !saveSpinner) return;

        // Show loading state
        saveBtn.disabled = true;
        saveText.textContent = "Saving...";
        saveSpinner.style.display = "block";

        // Get form data
        const displayNameInput = document.getElementById("displayName");

        if (displayNameInput && this.profileData) {
            this.profileData.formData.displayName = displayNameInput.value;
        }

        // Simulate save operation
        setTimeout(() => {
            // Reset button state
            saveBtn.disabled = false;
            saveText.textContent = "Save Changes";
            saveSpinner.style.display = "none";

            // Show success notification
            this.showNotification("Account settings saved successfully!", "success");
        }, 1000);
    }

    // Password update functionality
    updatePassword() {
        const updateBtn = document.getElementById("update-password-btn");
        const updateText = document.getElementById("update-password-text");
        const updateSpinner = document.getElementById("update-password-spinner");

        if (!updateBtn || !updateText || !updateSpinner) return;

        // Get form inputs
        const currentPasswordInput = document.getElementById("currentPassword");
        const newPasswordInput = document.getElementById("newPassword");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput)
            return;

        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validation
        if (!currentPassword) {
            this.showNotification("Please enter your current password", "error");
            return;
        }

        if (!newPassword) {
            this.showNotification("Please enter a new password", "error");
            return;
        }

        if (newPassword.length < 8) {
            this.showNotification(
                "New password must be at least 8 characters long",
                "error"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showNotification("New passwords do not match", "error");
            return;
        }

        // Show loading state
        updateBtn.disabled = true;
        updateText.textContent = "Updating...";
        updateSpinner.style.display = "block";

        // Simulate password update
        setTimeout(() => {
            // Reset button state
            updateBtn.disabled = false;
            updateText.textContent = "Update Password";
            updateSpinner.style.display = "none";

            // Clear form
            currentPasswordInput.value = "";
            newPasswordInput.value = "";
            confirmPasswordInput.value = "";

            // Show success notification
            this.showNotification("Password updated successfully!", "success");
        }, 1200);
    }

    // Profile picture functionality
    uploadProfilePicture() {
        // Create file input
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";

        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    this.showNotification("File size must be less than 5MB", "error");
                    return;
                }

                // Validate file type
                if (!file.type.startsWith("image/")) {
                    this.showNotification("Please select a valid image file", "error");
                    return;
                }

                // Simulate upload
                this.showNotification(
                    "Profile picture uploaded successfully!",
                    "success"
                );
            }
        };

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    removeProfilePicture() {
        // Show confirmation
        if (confirm("Are you sure you want to remove your profile picture?")) {
            this.showNotification("Profile picture removed successfully!", "success");
        }
    }

    async loadContact() {
        this.renderContact();
    }

    updateAnalyticsCards(analytics) {
        if (!analytics) return;

        // Animate values with luxury effects
        this.animateValueWithDelay("total-spent", 0, analytics.totalSpent, "₹", 0);
        this.animateValueWithDelay(
            "active-registrations",
            0,
            analytics.activeRegistrations,
            "",
            200
        );
        this.animateValueWithDelay(
            "pending-payments",
            0,
            analytics.pendingPayments,
            "₹",
            400
        );
        this.animateValueWithDelay(
            "wallet-balance",
            0,
            analytics.walletBalance,
            "₹",
            600
        );
    }

    animateValueWithDelay(elementId, start, end, prefix = "", delay = 0) {
        setTimeout(() => {
            this.animateValue(elementId, start, end, prefix);
        }, delay);
    }

    animateValue(elementId, start, end, prefix = "") {
        const element = document.getElementById(elementId);
        if (!element) return;

        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOutCubic);

            element.textContent = prefix + current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    initializeCharts() {
        this.updatePaymentChart();
        this.updateHistoryChart();
        this.updatePaymentMethodsChart();

        // Set up chart event listeners after charts are created
        setTimeout(() => {
            this.setupChartEventListeners();
        }, 100);
    }

    updatePaymentChart() {
        const ctx = document.getElementById("paymentChart")?.getContext("2d");
        if (!ctx) return;

        if (this.charts.payment) {
            this.charts.payment.destroy();
        }

        // Get data based on current filter
        const currentPeriod = this.currentFilters?.paymentPeriod || 'yearly';
        const chartData = this.chartData?.paymentDistribution?.[currentPeriod] || {
            labels: ["Rent", "Education", "Society", "Others"],
            data: [45, 25, 20, 10],
            backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24"]
        };

        this.charts.payment = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        data: chartData.data,
                        backgroundColor: chartData.backgroundColor,
                        borderWidth: 0,
                        hoverOffset: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                            font: {
                                size: 12,
                            },
                        },
                    },
                },
                animation: {
                    animateRotate: true,
                    duration: 2000,
                },
            },
        });
    }

    updateHistoryChart() {
        const ctx = document.getElementById("historyChart")?.getContext("2d");
        if (!ctx) return;

        if (this.charts.history) {
            this.charts.history.destroy();
        }

        // Get data based on current filter
        const currentType = this.currentFilters?.historyType || 'payments';
        const chartData = this.chartData?.paymentHistory?.[currentType] || {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Payments",
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: "#ff6b6b",
                backgroundColor: "rgba(255, 107, 107, 0.1)"
            }]
        };

        this.charts.history = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.labels,
                datasets: chartData.datasets.map(dataset => ({
                    ...dataset,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: dataset.borderColor,
                    pointBorderColor: "#fff",
                    pointBorderWidth: 2,
                    pointRadius: 6,
                })),
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: "rgba(0,0,0,0.1)",
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                },
                animation: {
                    duration: 2000,
                    easing: "easeInOutCubic",
                },
            },
        });
    }

    updatePaymentMethodsChart() {
        const ctx = document
            .getElementById("paymentMethodsChart")
            ?.getContext("2d");
        if (!ctx) return;

        if (this.charts.paymentMethods) {
            this.charts.paymentMethods.destroy();
        }

        this.charts.paymentMethods = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Credit Card", "UPI", "Debit Card", "Net Banking"],
                datasets: [
                    {
                        data: [65, 20, 10, 5],
                        backgroundColor: [
                            "#007bff", // Blue for Credit Card
                            "#28a745", // Green for UPI
                            "#fd7e14", // Orange for Debit Card
                            "#dc3545", // Red for Net Banking
                        ],
                        borderWidth: 0,
                        hoverOffset: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            pointStyle: "circle",
                            padding: 15,
                            font: {
                                size: 12,
                                family: "Inter, sans-serif",
                            },
                            color: "#6b7280",
                        },
                    },
                    tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        titleColor: "#fff",
                        bodyColor: "#fff",
                        borderColor: "#e5e7eb",
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function (context) {
                                const label = context.label || "";
                                const value = context.parsed || 0;
                                return `${label}: ${value}%`;
                            },
                        },
                    },
                },
                animation: {
                    duration: 1500,
                    easing: "easeInOutCubic",
                },
            },
        });
    }

    async loadRegistrationsData() {
        const data = await this.apiRequest("/api/registrations/" + this.userId);
        if (data) {
            this.registrations = data;
            this.renderRegistrationsTable(data);
        }
    }

    renderRegistrationsTable(registrations) {
        const tableBody =
            document.getElementById("registrations-table-body") ||
            document.getElementById("edit-registrations-table-body");
        if (!tableBody || !registrations) return;

        tableBody.innerHTML = "";

        registrations.forEach((registration) => {
            const statusColors = this.getStatusColors(registration.status);

            const row = document.createElement("tr");
            row.className = "registration-row";
            row.setAttribute("data-rg-id", registration.rgId);

            row.innerHTML = `
                <td>
                    <div class="registration-info">
                        <div class="rg-id">${registration.rgId}</div>
                        <div class="registration-type">${registration.type
                }</div>
                    </div>
                </td>
                <td>
                    <span class="status-badge" style="background-color: ${statusColors.bg
                }; color: ${statusColors.text};">
                        ${registration.status}
                    </span>
                </td>
                <td class="amount">₹${registration.amount?.toLocaleString() || "0"
                }</td>
                <td class="date">${new Date(
                    registration.createdAt
                ).toLocaleDateString()}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-pay" onclick="dashboard.handlePayNow('${registration.rgId
                }')" style="background-color: #16a34a; color: white; margin-right: 8px;">
                            Pay Now
                        </button>
                        <button class="btn-action btn-edit" onclick="dashboard.openRegistrationModal('${registration.rgId
                }')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-clone" onclick="dashboard.cloneRegistration('${registration.rgId
                }')">
                            <i class="fas fa-clone"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    getStatusColors(status) {
        const colors = {
            active: { bg: "#d4edda", text: "#155724" },
            pending: { bg: "#fff3cd", text: "#856404" },
            inactive: { bg: "#f8d7da", text: "#721c24" },
            completed: { bg: "#d1ecf1", text: "#0c5460" },
        };
        return colors[status?.toLowerCase()] || colors.pending;
    }

    toggleRegistrationRow(rgId) {
        const row = document.querySelector(`[data-rg-id="${rgId}"]`);
        if (row) {
            row.classList.toggle("expanded");
        }
    }

    renderTransactions() {
        const container = document.getElementById("transactions-list");
        if (!container || !this.transactions) return;

        container.innerHTML = "";

        this.transactions.forEach((transaction) => {
            const transactionEl = document.createElement("div");
            transactionEl.className = "transaction-item";

            transactionEl.innerHTML = `
                <div class="transaction-info">
                    <div class="transaction-title">${transaction.description
                }</div>
                    <div class="transaction-date">${new Date(
                    transaction.date
                ).toLocaleDateString()}</div>
                </div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === "credit" ? "+" : "-"}₹${Math.abs(
                    transaction.amount
                ).toLocaleString()}
                </div>
            `;

            container.appendChild(transactionEl);
        });
    }

    switchTab(tabName) {
        // Remove active from all tabs
        document.querySelectorAll(".tab-btn").forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active to clicked tab
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add("active");
        }

        // Hide all tab contents
        document.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
        });

        // Show selected tab content
        const activeContent = document.getElementById(tabName + "-tab");
        if (activeContent) {
            activeContent.classList.add("active");
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";

            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("show");

            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }, 300);
        }
    }

    async openRegistrationModal(rgId) {
        const registration = this.registrations.find((r) => r.rgId === rgId);
        if (!registration) return;

        // Set modal title
        const modalTitle = document.getElementById("modal-title");
        if (modalTitle) {
            modalTitle.textContent = `Registration Details - ${rgId}`;
        }

        // Populate modal content
        const modalContent = document.getElementById("modal-content");
        if (modalContent) {
            modalContent.innerHTML = `
                <div class="detail-section">
                    <h4>Basic Information</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Registration ID:</label>
                            <span>${registration.rgId}</span>
                        </div>
                        <div class="detail-item">
                            <label>Type:</label>
                            <span>${registration.type}</span>
                        </div>
                        <div class="detail-item">
                            <label>Status:</label>
                            <span class="status-badge">${registration.status
                }</span>
                        </div>
                        <div class="detail-item">
                            <label>Amount:</label>
                            <span>₹${registration.amount?.toLocaleString() || "0"
                }</span>
                        </div>
                    </div>
                </div>
            `;
        }

        this.openModal("registration-modal");
    }

    openAddRegistrationModal() {
        this.openModal("add-registration-modal");
    }

    async submitRegistration(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const registrationData = Object.fromEntries(formData.entries());

        // Add user ID and timestamp
        registrationData.userId = this.userId;
        registrationData.createdAt = new Date().toISOString();

        const result = await this.createBackupAPI(
            "/api/registrations",
            registrationData
        );

        if (result.error) {
            this.showNotification(
                "Failed to create registration. Please try again.",
                "error"
            );
        } else {
            this.showNotification("Registration created successfully!", "success");
            this.closeModal("add-registration-modal");
            this.loadRegistrations();
            event.target.reset();
        }
    }

    async createBackupAPI(endpoint, data) {
        try {
            const response = await fetch(this.apiBaseUrl + endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Backup API call failed:", error);
            return { error: error.message };
        }
    }

    // Rewards Functions
    async redeemReward(rewardId) {
        const result = await this.createBackupAPI("/api/rewards/redeem", {
            rewardId: rewardId,
            userId: 1,
            points:
                rewardId === "amazon-500" ? 500 : rewardId === "uber-300" ? 300 : 800,
        });

        if (result.error) {
            this.showNotification(
                "Failed to redeem reward. Please try again.",
                "error"
            );
        } else {
            this.showNotification("Reward redeemed successfully!", "success");
            this.loadDashboardData();
        }
    }

    // Referral Functions
    copyReferralCode() {
        navigator.clipboard
            .writeText("PIYUSH2024")
            .then(() => {
                this.showNotification("Referral code copied to clipboard!", "success");
            })
            .catch(() => {
                this.showNotification("Failed to copy code", "error");
            });
    }

    shareReferralCode() {
        const message =
            "Join RedGirraffe and get amazing rewards! Use my referral code: PIYUSH2024. Download the app now!";
        const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(message);
        window.open(whatsappUrl, "_blank");
    }

    // Profile Functions
    editProfile() {
        this.showNotification("Profile editing feature coming soon!", "info");
    }

    // Settings Functions
    setTheme(theme) {
        document.body.className = theme === "dark" ? "dark-theme" : "";
        localStorage.setItem("theme", theme);
        this.showNotification("Theme switched to " + theme + " mode", "success");
    }

    changePassword() {
        this.showNotification("Password change feature coming soon!", "info");
    }

    // Support Functions
    openLiveChat() {
        // Check if Tawk.to is loaded
        if (typeof window !== "undefined" && window.Tawk_API) {
            window.Tawk_API.maximize();
        } else {
            // Fallback: show a message if Tawk.to is not loaded
            this.showNotification(
                "Loading chat support... Please try again in a moment.",
                "info"
            );
        }
    }

    sendEmail() {
        window.location.href =
            "mailto:support@redgirraffe.com?subject=Support Request&body=Hello RedGirraffe Support Team,";
    }

    callSupport() {
        window.location.href = "tel:+918001234567";
    }

    async submitSupportTicket(event) {
        event.preventDefault();

        const result = await this.createBackupAPI("/api/support/ticket", {
            userId: 1,
            subject: event.target.querySelector("select").value,
            priority: event.target.querySelectorAll("select")[1].value,
            message: event.target.querySelector("textarea").value,
            timestamp: new Date().toISOString(),
        });

        if (result.error) {
            this.showNotification(
                "Failed to submit ticket. Please try email support.",
                "error"
            );
        } else {
            this.showNotification(
                "Support ticket submitted successfully!",
                "success"
            );
            event.target.reset();
        }
    }

    // Edit Records Functions
    async handleEditClick(registrationType, rgId) {
        try {
            this.showNotification(`Loading registration data for ${rgId}...`, "info");
            const registrationData =
                await this.editRecordsService.getRegistrationByRgId(rgId);

            if (!registrationData) {
                throw new Error("Registration not found");
            }

            this.selectedRegistration = registrationData;
            this.activeEditForm = registrationType;
            this.showEditForm(registrationType, registrationData);
        } catch (error) {
            console.error("Error loading registration data:", error);
            this.showNotification(
                "Failed to load registration data. Please try again.",
                "error"
            );
        }
    }

    showEditForm(registrationType, registrationData) {
        const modalHtml = this.generateEditFormModal(
            registrationType,
            registrationData
        );
        this.showEditModal(modalHtml);
    }

    generateEditFormModal(registrationType, registrationData) {
        const title = this.getEditFormTitle(registrationType);
        const rgId = registrationData.registration?.rgId || 'N/A';

        return `
            <div style="background: white; border-radius: 12px; max-width: 1200px; width: 95%; max-height: 90vh; overflow-y: auto; position: relative; font-family: 'Inter', sans-serif;">
                <!-- Header -->
                <div style="padding: 24px; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; background: white; z-index: 10;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0;">${title} - ${rgId}</h2>
                        <button onclick="dashboard.closeUploadModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 8px; border-radius: 4px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='transparent'">×</button>
                    </div>
                </div>

                <!-- Info Alert -->
                <div style="margin: 24px; padding: 16px; background: #dbeafe; border: 1px solid #bfdbfe; border-radius: 8px; display: flex; align-items: start; gap: 12px;">
                    <i class="fas fa-info-circle" style="color: #2563eb; margin-top: 2px;"></i>
                    <div style="color: #1e40af; font-size: 14px; line-height: 1.5;">
                        Only certain fields are editable (marked with <i class="fas fa-edit" style="color: #2563eb; font-size: 12px;"></i> icon).
                        All changes are tracked in the audit log.
                    </div>
                </div>

                <!-- Form Content -->
                <div style="padding: 0 24px 24px;">
                    <form id="edit-form" onsubmit="dashboard.handleSaveEdit(event, '${registrationType}')">
                        ${this.getDetailedFormFields(registrationType, registrationData)}

                        <!-- Indemnity Section -->
                        <div style="margin-top: 32px; padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">Indemnity Undertaking Letter</h3>
                            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb; max-height: 160px; overflow-y: auto; margin-bottom: 16px;">
                                <div style="font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-line;">${this.getIndemnityText()}</div>
                            </div>
                            <div style="display: flex; align-items: start; gap: 12px;">
                                <input type="checkbox" id="indemnity-checkbox" required style="margin-top: 4px; width: 16px; height: 16px;">
                                <label for="indemnity-checkbox" style="font-size: 14px; color: #374151; line-height: 1.5; cursor: pointer;">
                                    I have read and agree to the Indemnity Undertaking Letter above. I confirm that all information provided is true and correct.
                                    <span style="color: #dc2626; margin-left: 4px;">*</span>
                                </label>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div style="display: flex; justify-content: end; gap: 12px; margin-top: 24px;">
                            <button type="button" onclick="dashboard.closeUploadModal()" style="padding: 12px 24px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='white'">
                                Cancel
                            </button>
                            <button type="submit" id="save-button" disabled style="padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; opacity: 0.5;">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    cloneRegistration(rgId) {
        this.showNotification("Cloning registration " + rgId + "...", "info");
        var self = this;
        setTimeout(function () {
            self.showNotification("Registration cloned successfully!", "success");
        }, 1500);
    }

    getEditFormTitle(registrationType) {
        switch (registrationType) {
            case "tenant":
                return "Edit Rent Details";
            case "education":
                return "Edit Education Fee Registration ";
            case "society":
                return "Edit Maintenance Registration";
            default:
                return "Edit Registration";
        }
    }

    getIndemnityText() {
        return `I/We confirm that I/we stay (use as residence) or function (use as office) in the same property and the landlord particulars as mentioned by me/us in the RentPay form is TRUE.

I/We are well aware that the rental payment platform RentPay offered by RedGiraffe.com enables the tenants to submit TRUE and CORRECT tenancy data. The transaction facilitating Bank/Card issuing Company & RedGiraffe.com may conduct various verifications to cross check the details submitted by me/us in the RentPay form. In case we are using School Fees or Society Maintenance Charges payment interface of RedGiraffe, I/We hereby confirm that all documents submitted by me/us are TRUE and CORRECT.

I/We am/are fully aware that any incorrect mention of details/facts could make me culpable to fraud and the participating Bank/Card issuing Company and/or RedGiraffe.com could initiate action against me/us.

I/We hereby undertake and indemnify RedGiraffe.com and the Bank from any claims, demands, actions, suits, losses, costs, charges, expenses, damages and liabilities whatsoever which the Bank/Card issuing Company or RedGiraffe.com may pay, sustain, suffer or incur by reason of or in connection with my/our filling up of FALSE/INCORRECT information, including, without limiting the generality of the foregoing, all costs and expenses (including legal expenses) incurred in defending any action or proceedings brought against the Bank/Card issuing Company or RedGiraffe.com.`;
    }

    getDetailedFormFields(registrationType, registrationData) {
        switch (registrationType) {
            case "tenant":
                return this.getDetailedTenantFormFields(registrationData);
            case "education":
                return this.getDetailedEducationFormFields(registrationData);
            case "society":
                return this.getDetailedSocietyFormFields(registrationData);
            default:
                return "";
        }
    }

    getEditFormFields(registrationType, registrationData) {
        switch (registrationType) {
            case "tenant":
                return this.getTenantFormFields(registrationData);
            case "education":
                return this.getEducationFormFields(registrationData);
            case "society":
                return this.getSocietyFormFields(registrationData);
            default:
                return "";
        }
    }

    getDetailedTenantFormFields(registrationData) {
        const registration = registrationData.registration || {};
        const tenantDetails = registrationData.tenantDetails || {};
        const tenancyDetails = registrationData.tenancyDetails || {};
        const landlordDetails = registrationData.landlordDetails || {};
        const accountDetails = registrationData.accountDetails || [];

        return `
            <!-- Registration Details (Read-only) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">Registration Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Registration ID</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.rgId || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Status</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.status || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Payment Mode</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.mode || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Type</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.subtype || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tenant Details (Read-only) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">Tenant Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; gap: 16px;">
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Name</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${tenantDetails.name || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Email</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${tenantDetails.email || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Mobile</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${tenantDetails.mobile || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">PAN Number</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${tenantDetails.panNo || 'N/A'}</div>
                        </div>

                        <!-- Editable: Date of Birth -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Date of Birth/Incorporation: *
                            </label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">8/10/1998</div>

                        </div>

                        <div style="grid-column: 1 / -1;">
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Address</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${tenantDetails.address || 'N/A'}, ${tenantDetails.city || ''} ${tenantDetails.pincode || ''}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tenancy Details (Editable Fields) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #b91c1c; margin: 0;">Tenancy Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <!-- Editable: Rent Amount -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Rent Amount (INR): *
                            </label>
                            <input type="text" name="rentAmount" value="${tenancyDetails.rentAmount || ''}"
                                   style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe; focus:border-color: #2563eb; focus:outline: none;"
                                   placeholder="Enter rent amount" required>
                        </div>

                        <!-- Editable: Frequency -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Frequency: *
                            </label>
                            <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;" required>
                                <option value="Monthly" ${tenancyDetails.frequency === "Monthly" ? "selected" : ""}>Monthly</option>
                                <option value="Quarterly" ${tenancyDetails.frequency === "Quarterly" ? "selected" : ""}>Quarterly</option>
                                <option value="Half Yearly" ${tenancyDetails.frequency === "Half Yearly" ? "selected" : ""}>Half Yearly</option>
                                <option value="Yearly" ${tenancyDetails.frequency === "Yearly" ? "selected" : ""}>Yearly</option>
                            </select>
                        </div>

                        <!-- Editable: Due Date -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Due Date: *
                            </label>
                            <input type="date" name="dueDate" value="${tenancyDetails.dueDate || ''}"
                                   style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;" required>
                        </div>

                        <!-- Editable: Tenancy End Date -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Tenancy End Date: *
                            </label>
                            <input type="date" name="tenancyEndDate" value="${tenancyDetails.tenancyEndDate || ''}"
                                   style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;" required>
                        </div>

                        <!-- Editable: Card Issuing Bank -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Card Issuing Bank:
                            </label>
                            <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;">
                                <option value="">Select Bank</option>
                                <option value="HDFC Bank" ${tenancyDetails.cardIssuingBank === "HDFC Bank" ? "selected" : ""}>HDFC Bank</option>
                                <option value="Axis Bank" ${tenancyDetails.cardIssuingBank === "Axis Bank" ? "selected" : ""}>Axis Bank</option>
                                <option value="ICICI Bank" ${tenancyDetails.cardIssuingBank === "ICICI Bank" ? "selected" : ""}>ICICI Bank</option>
                                <option value="SBI" ${tenancyDetails.cardIssuingBank === "SBI" ? "selected" : ""}>SBI</option>
                                <option value="CITIBank" ${tenancyDetails.cardIssuingBank === "CITIBank" ? "selected" : ""}>CITIBank</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Owner Details (Read-only) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #b91c1c; margin: 0;">Owner Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Owner Name</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500; background: #f3f4f6; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">${landlordDetails.name || 'Mrs. Efer Himanshu'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Email</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500; background: #f3f4f6; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">${landlordDetails.email || 'df@dfgd.vpm'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500; background: #f3f4f6; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">${landlordDetails.phone || '9876543210'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Address</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500; background: #f3f4f6; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">${landlordDetails.address || 'Property Address'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Owner Account Details (Read-only) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #b91c1c; margin: 0;">Owner Account Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div id="owner-accounts-container">
                        ${this.renderOwnerAccounts(accountDetails)}
                    </div>
                </div>
            </div>
        `;
    }

    getDetailedEducationFormFields(registrationData) {
        const registration = registrationData.registration || {};
        const studentDetails = registrationData.studentDetails || {};
        const educationDetails = registrationData.educationDetails || {};

        return `
            <!-- Registration Details (Read-only) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">Registration Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Registration ID</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.rgId || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Status</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.status || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Payment Mode</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.mode || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Type</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.subtype || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Student Details (Read-only) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">Student Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Name</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${studentDetails.name || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Email</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${studentDetails.email || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Mobile</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${studentDetails.mobile || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">PAN Number</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${studentDetails.panNo || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Education Details (Editable Fields) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #b91c1c; margin: 0;">Education Fee Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <!-- Editable: Fee Amount -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Fee Amount (INR): *
                            </label>
                            <input type="text" name="feeAmount" value="${educationDetails.feeAmount || ''}"
                                   style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;"
                                   placeholder="Enter fee amount" required>
                        </div>

                        <!-- Editable: Frequency -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Frequency: *
                            </label>
                            <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;" required>
                                <option value="Monthly" ${educationDetails.frequency === "Monthly" ? "selected" : ""}>Monthly</option>
                                <option value="Quarterly" ${educationDetails.frequency === "Quarterly" ? "selected" : ""}>Quarterly</option>
                                <option value="Half Yearly" ${educationDetails.frequency === "Half Yearly" ? "selected" : ""}>Half Yearly</option>
                                <option value="Yearly" ${educationDetails.frequency === "Yearly" ? "selected" : ""}>Yearly</option>
                            </select>
                        </div>

                        <!-- Editable: Due Date -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Due Date: *
                            </label>
                            <input type="date" name="dueDate" value="${educationDetails.dueDate || ''}"
                                   style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;" required>
                        </div>

                        <!-- Editable: Card Issuing Bank -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Card Issuing Bank:
                            </label>
                            <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;">
                                <option value="">Select Bank</option>
                                <option value="HDFC Bank" ${educationDetails.cardIssuingBank === "HDFC Bank" ? "selected" : ""}>HDFC Bank</option>
                                <option value="Axis Bank" ${educationDetails.cardIssuingBank === "Axis Bank" ? "selected" : ""}>Axis Bank</option>
                                <option value="ICICI Bank" ${educationDetails.cardIssuingBank === "ICICI Bank" ? "selected" : ""}>ICICI Bank</option>
                                <option value="SBI" ${educationDetails.cardIssuingBank === "SBI" ? "selected" : ""}>SBI</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getDetailedSocietyFormFields(registrationData) {
        const registration = registrationData.registration || {};
        const societyDetails = registrationData.societyDetails || {};

        return `
            <!-- Registration Details (Read-only) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">Registration Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Registration ID</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.rgId || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Status</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.status || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Payment Mode</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.mode || 'N/A'}</div>
                        </div>
                        <div>
                            <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Type</label>
                            <div style="color: #111827; font-size: 14px; font-weight: 500;">${registration.subtype || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Society Details (Editable Fields) -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <div style="background: #f9fafb; padding: 16px; border-bottom: 1px solid #e5e7eb;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #b91c1c; margin: 0;">Society Maintenance Details</h3>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <!-- Editable: Amount -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Amount (INR): *
                            </label>
                            <input type="text" name="amount" value="${societyDetails.amount || ''}"
                                   style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;"
                                   placeholder="Enter amount" required>
                        </div>

                        <!-- Editable: Frequency -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Frequency: *
                            </label>
                            <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;" required>
                                <option value="Monthly" ${societyDetails.frequency === "Monthly" ? "selected" : ""}>Monthly</option>
                                <option value="Quarterly" ${societyDetails.frequency === "Quarterly" ? "selected" : ""}>Quarterly</option>
                                <option value="Half Yearly" ${societyDetails.frequency === "Half Yearly" ? "selected" : ""}>Half Yearly</option>
                                <option value="Yearly" ${societyDetails.frequency === "Yearly" ? "selected" : ""}>Yearly</option>
                            </select>
                        </div>

                        <!-- Editable: Due Date -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Due Date: *
                            </label>
                            <input type="date" name="dueDate" value="${societyDetails.dueDate || ''}"
                                   style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;" required>
                        </div>

                        <!-- Editable: Card Issuing Bank -->
                        <div>
                            <label style="display: block; color: #2563eb; font-size: 14px; font-weight: 500; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-edit" style="font-size: 12px;"></i>
                                Card Issuing Bank:
                            </label>
                            <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; background: #dbeafe;">
                                <option value="">Select Bank</option>
                                <option value="HDFC Bank" ${societyDetails.cardIssuingBank === "HDFC Bank" ? "selected" : ""}>HDFC Bank</option>
                                <option value="Axis Bank" ${societyDetails.cardIssuingBank === "Axis Bank" ? "selected" : ""}>Axis Bank</option>
                                <option value="ICICI Bank" ${societyDetails.cardIssuingBank === "ICICI Bank" ? "selected" : ""}>ICICI Bank</option>
                                <option value="SBI" ${societyDetails.cardIssuingBank === "SBI" ? "selected" : ""}>SBI</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getEducationFormFields(registrationData) {
        const educationDetails = registrationData.educationDetails || {};
        return `
            <div style="display: grid; gap: 16px;">
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Fee Amount</label>
                    <input type="text" name="feeAmount" value="${educationDetails.feeAmount || ""
            }"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Frequency</label>
                    <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="Monthly" ${educationDetails.frequency === "Monthly"
                ? "selected"
                : ""
            }>Monthly</option>
                        <option value="Quarterly" ${educationDetails.frequency === "Quarterly"
                ? "selected"
                : ""
            }>Quarterly</option>
                        <option value="Half Yearly" ${educationDetails.frequency === "Half Yearly"
                ? "selected"
                : ""
            }>Half Yearly</option>
                        <option value="Yearly" ${educationDetails.frequency === "Yearly"
                ? "selected"
                : ""
            }>Yearly</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Due Date</label>
                    <input type="date" name="dueDate" value="${educationDetails.dueDate || ""
            }"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Card Issuing Bank</label>
                    <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="">Select Bank</option>
                        <option value="HDFC Bank" ${educationDetails.cardIssuingBank === "HDFC Bank"
                ? "selected"
                : ""
            }>HDFC Bank</option>
                        <option value="Axis Bank" ${educationDetails.cardIssuingBank === "Axis Bank"
                ? "selected"
                : ""
            }>Axis Bank</option>
                        <option value="ICICI Bank" ${educationDetails.cardIssuingBank === "ICICI Bank"
                ? "selected"
                : ""
            }>ICICI Bank</option>
                        <option value="SBI" ${educationDetails.cardIssuingBank === "SBI"
                ? "selected"
                : ""
            }>SBI</option>
                    </select>
                </div>
            </div>
        `;
    }

    getSocietyFormFields(registrationData) {
        const societyDetails = registrationData.societyDetails || {};
        return `
            <div style="display: grid; gap: 16px;">
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Amount</label>
                    <input type="text" name="amount" value="${societyDetails.amount || ""
            }"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Frequency</label>
                    <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="Monthly" ${societyDetails.frequency === "Monthly"
                ? "selected"
                : ""
            }>Monthly</option>
                        <option value="Quarterly" ${societyDetails.frequency === "Quarterly"
                ? "selected"
                : ""
            }>Quarterly</option>
                        <option value="Half Yearly" ${societyDetails.frequency === "Half Yearly"
                ? "selected"
                : ""
            }>Half Yearly</option>
                        <option value="Yearly" ${societyDetails.frequency === "Yearly"
                ? "selected"
                : ""
            }>Yearly</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Due Date</label>
                    <input type="date" name="dueDate" value="${societyDetails.dueDate || ""
            }"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Card Issuing Bank</label>
                    <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="">Select Bank</option>
                        <option value="HDFC Bank" ${societyDetails.cardIssuingBank === "HDFC Bank"
                ? "selected"
                : ""
            }>HDFC Bank</option>
                        <option value="Axis Bank" ${societyDetails.cardIssuingBank === "Axis Bank"
                ? "selected"
                : ""
            }>Axis Bank</option>
                        <option value="ICICI Bank" ${societyDetails.cardIssuingBank === "ICICI Bank"
                ? "selected"
                : ""
            }>ICICI Bank</option>
                        <option value="SBI" ${societyDetails.cardIssuingBank === "SBI"
                ? "selected"
                : ""
            }>SBI</option>
                    </select>
                </div>
            </div>
        `;
    }

    async handleSaveEdit(event, registrationType) {
        event.preventDefault();

        if (!this.selectedRegistration) return;

        // Check indemnity checkbox
        const indemnityCheckbox = document.getElementById('indemnity-checkbox');
        if (!indemnityCheckbox || !indemnityCheckbox.checked) {
            this.showNotification(
                "Please accept the indemnity undertaking to proceed with the update.",
                "error"
            );
            return;
        }

        try {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            // Remove the indemnity checkbox from the data
            delete data['indemnity-checkbox'];

            // Process owner account details
            const ownerAccountsData = this.processOwnerAccountsFromForm(formData);

            // Validate owner accounts
            const invalidAccounts = ownerAccountsData.filter(account =>
                !account.accountHolderName || !account.accountNumber || !account.ifscCode
            );

            if (invalidAccounts.length > 0) {
                this.showNotification(
                    "Please fill in all required fields for owner account details.",
                    "error"
                );
                return;
            }

            this.showNotification("Saving registration data...", "info");

            // Include owner accounts in the data
            data.ownerAccounts = ownerAccountsData;

            // Track changes in audit log
            this.trackFormChanges(registrationType, data);

            await this.editRecordsService.saveRegistration(
                this.selectedRegistration.registration.rgId,
                data
            );

            this.showNotification("Registration updated successfully!", "success");
            this.closeUploadModal();
            this.activeEditForm = null;
            this.selectedRegistration = null;

            // Reload the edit records to show updated data
            this.loadEditRecords();
        } catch (error) {
            console.error("Error saving registration data:", error);
            this.showNotification(
                "There was an error updating your registration. Please try again.",
                "error"
            );
        }
    }

    trackFormChanges(registrationType, newData) {
        const rgId = this.selectedRegistration.registration?.rgId || 'Unknown';
        const currentData = this.getCurrentFormData(registrationType);

        Object.keys(newData).forEach(field => {
            const oldValue = currentData[field] || '';
            const newValue = newData[field] || '';

            if (oldValue !== newValue) {
                this.editRecordsService.addAuditEntry({
                    field: `${registrationType} ${field}`,
                    oldValue,
                    newValue,
                    registrationId: rgId,
                    registrationType: registrationType.charAt(0).toUpperCase() + registrationType.slice(1),
                    changeType: 'Field Update',
                    userId: this.userId
                });
            }
        });
    }

    getCurrentFormData(registrationType) {
        switch (registrationType) {
            case 'tenant':
                return this.selectedRegistration.tenancyDetails || {};
            case 'education':
                return this.selectedRegistration.educationDetails || {};
            case 'society':
                return this.selectedRegistration.societyDetails || {};
            default:
                return {};
        }
    }

    // Owner Account Management Functions
    renderOwnerAccounts(accountDetails) {
        if (!accountDetails || accountDetails.length === 0) {
            accountDetails = [{
                id: 1,
                accountHolderName: "Mrs. Efer Himanshu",
                accountNumber: "123456789",
                accountType: "Current",
                ifscCode: "HDFC0012356",
                bankName: "HDFC Bank",
                panNumber: "BSEPD9456C"
            }];
        }

        this.ownerAccounts = accountDetails;

        return accountDetails.map((account, index) => `
            <div class="owner-account-item" data-account-id="${account.id}" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; background: #f9fafb;">
                <div style="margin-bottom: 16px;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0;">Account #${index + 1}</h4>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                    <!-- Account Holder Name -->
                    <div>
                        <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Account Holder Name
                        </label>
                        <div style="padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; background: #f9fafb; color: #111827;">
                            ${account.accountHolderName || 'N/A'}
                        </div>
                    </div>

                    <!-- Account Number -->
                    <div>
                        <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Account Number
                        </label>
                        <div style="padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; background: #f9fafb; color: #111827;">
                            ${account.accountNumber || 'N/A'}
                        </div>
                    </div>

                    <!-- Account Type -->
                    <div>
                        <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Account Type
                        </label>
                        <div style="padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; background: #f9fafb; color: #111827;">
                            ${account.accountType || 'N/A'}
                        </div>
                    </div>

                    <!-- IFSC Code -->
                    <div>
                        <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                            IFSC Code
                        </label>
                        <div style="padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; background: #f9fafb; color: #111827;">
                            ${account.ifscCode || 'N/A'}
                        </div>
                    </div>

                    <!-- Bank Name -->
                    <div>
                        <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                            Bank Name
                        </label>
                        <div style="padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; background: #f9fafb; color: #111827;">
                            ${account.bankName || 'N/A'}
                        </div>
                    </div>

                    <!-- PAN Number -->
                    <div>
                        <label style="display: block; color: #6b7280; font-size: 12px; font-weight: 500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                            PAN Number
                        </label>
                        <div style="padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; background: #f9fafb; color: #111827;">
                            ${account.panNumber || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }



    processOwnerAccountsFromForm(formData) {
        const accounts = [];
        const processedIds = new Set();

        // Extract account data from form
        for (const [key, value] of formData.entries()) {
            const match = key.match(/^(\w+)_(\d+)$/);
            if (match) {
                const [, fieldName, accountId] = match;
                const id = parseInt(accountId);

                if (!processedIds.has(id)) {
                    processedIds.add(id);
                    accounts.push({
                        id: id,
                        accountHolderName: formData.get(`accountHolderName_${id}`) || '',
                        accountNumber: formData.get(`accountNumber_${id}`) || '',
                        accountType: formData.get(`accountType_${id}`) || 'Savings',
                        ifscCode: formData.get(`ifscCode_${id}`) || '',
                        bankName: formData.get(`bankName_${id}`) || '',
                        panNumber: formData.get(`panNumber_${id}`) || ''
                    });
                }
            }
        }

        return accounts;
    }

    showEditModal(content) {
        const modalOverlay =
            document.getElementById("modal-overlay") || this.createModalOverlay();
        modalOverlay.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 16px; width: 100%;">
                ${content}
            </div>
        `;
        modalOverlay.style.display = "flex";
        modalOverlay.style.opacity = "1";
        document.body.style.overflow = "hidden";

        // Add backdrop click handler to close modal
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                this.closeUploadModal();
            }
        });

        // Setup indemnity checkbox functionality
        this.setupIndemnityCheckbox();
    }

    setupIndemnityCheckbox() {
        const checkbox = document.getElementById('indemnity-checkbox');
        const saveButton = document.getElementById('save-button');

        if (checkbox && saveButton) {
            const updateSaveButton = () => {
                if (checkbox.checked) {
                    saveButton.disabled = false;
                    saveButton.style.opacity = '1';
                    saveButton.style.backgroundColor = '#2563eb';
                    saveButton.style.cursor = 'pointer';
                } else {
                    saveButton.disabled = true;
                    saveButton.style.opacity = '0.5';
                    saveButton.style.backgroundColor = '#9ca3af';
                    saveButton.style.cursor = 'not-allowed';
                }
            };

            // Initial state
            updateSaveButton();

            // Listen for changes
            checkbox.addEventListener('change', updateSaveButton);
        }
    }

    createModalOverlay() {
        const overlay = document.createElement("div");
        overlay.id = "modal-overlay";
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            display: none;
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    closeUploadModal() {
        const modalOverlay = document.getElementById("modal-overlay");
        if (modalOverlay) {
            modalOverlay.style.opacity = "0";
            setTimeout(() => {
                modalOverlay.style.display = "none";
                modalOverlay.innerHTML = "";
            }, 300);
        }
        document.body.style.overflow = "auto";
        this.activeEditForm = null;
        this.selectedRegistration = null;
        this.selectedRegistrationForUpload = null;
        this.selectedFiles = []; // Reset selected files
    }

    showUploadModalForRegistration(registrationId) {
        this.selectedRegistrationForUpload = registrationId;
        this.showUploadModal();
    }

    showUploadModal() {
        const registrationText = this.selectedRegistrationForUpload ? ` for ${this.selectedRegistrationForUpload}` : '';
        const modalHtml = `
            <div style="background: white; border-radius: 12px; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto; position: relative;">
                <div style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">Upload Documents${registrationText}</h2>
                        <button onclick="dashboard.closeUploadModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 4px;">×</button>
                    </div>
                </div>
                <div style="padding: 24px;">
                    <form id="upload-form" onsubmit="dashboard.handleUploadDocuments(event)">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 8px; font-family: 'Inter', sans-serif;">Select Documents</label>
                            <div style="position: relative;">
                                <input type="file" id="file-input" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                       onchange="dashboard.handleFileSelection(event)"
                                       style="position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer; z-index: 2;">
                                <div id="file-drop-zone" style="width: 100%; height: 120px; padding: 20px; border: 2px dashed #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9fafb; cursor: pointer; transition: all 0.2s;"
                                     ondragover="dashboard.handleDragOver(event)" ondrop="dashboard.handleFileDrop(event)" ondragleave="dashboard.handleDragLeave(event)">
                                    <i class="fas fa-cloud-upload-alt" style="font-size: 24px; color: #6b7280; margin-bottom: 8px;"></i>
                                    <p style="margin: 0; color: #6b7280; text-align: center;">
                                        <span style="color: #2563eb; font-weight: 500;">Click to upload</span> or drag and drop files here
                                    </p>
                                    <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 12px;">PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB each)</p>
                                </div>
                            </div>
                        </div>

                        <!-- File Preview Section -->
                        <div id="file-preview-section" style="margin-bottom: 20px; display: none;">
                            <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 8px; font-family: 'Inter', sans-serif;">Selected Files</label>
                            <div id="file-preview-list" style="border: 1px solid #e5e7eb; border-radius: 6px; max-height: 200px; overflow-y: auto;">
                                <!-- File previews will be inserted here -->
                            </div>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 8px; font-family: 'Inter', sans-serif;">Remarks</label>
                            <textarea name="remarks" rows="3" placeholder="Add any remarks about the documents..."
                                      style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif; resize: vertical;"></textarea>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: flex; align-items: start; gap: 8px; font-size: 14px; color: #374151; font-family: 'Inter', sans-serif;">
                                <input type="checkbox" required style="margin-top: 2px;">
                                <span>I confirm that all documents submitted are true and correct, and I accept the indemnity terms.</span>
                            </label>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <button type="submit" id="upload-submit-btn" disabled style="flex: 1; background: #9ca3af; color: white; padding: 12px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: not-allowed; font-family: 'Inter', sans-serif; transition: all 0.2s;">
                                Upload Documents
                            </button>
                            <button type="button" onclick="dashboard.closeUploadModal()" style="flex: 1; background: #6b7280; color: white; padding: 12px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        this.showEditModal(modalHtml);
        this.selectedFiles = []; // Reset selected files
        this.updateUploadButton();
    }

    handleUploadDocuments(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const remarks = formData.get("remarks");

        if (this.selectedFiles.length === 0) {
            this.showNotification("Please select at least one file to upload.", "error");
            return;
        }

        const registrationText = this.selectedRegistrationForUpload ? ` for ${this.selectedRegistrationForUpload}` : '';
        this.showNotification(
            `Successfully uploaded ${this.selectedFiles.length} document(s)${registrationText}.`,
            "success"
        );
        this.closeUploadModal();
    }

    // File handling functions for upload modal
    handleFileSelection(event) {
        const files = Array.from(event.target.files);
        this.addFilesToSelection(files);
    }

    handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = document.getElementById('file-drop-zone');
        if (dropZone) {
            dropZone.style.borderColor = '#2563eb';
            dropZone.style.backgroundColor = '#eff6ff';
        }
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = document.getElementById('file-drop-zone');
        if (dropZone) {
            dropZone.style.borderColor = '#d1d5db';
            dropZone.style.backgroundColor = '#f9fafb';
        }
    }

    handleFileDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = document.getElementById('file-drop-zone');
        if (dropZone) {
            dropZone.style.borderColor = '#d1d5db';
            dropZone.style.backgroundColor = '#f9fafb';
        }

        const files = Array.from(event.dataTransfer.files);
        this.addFilesToSelection(files);
    }

    addFilesToSelection(files) {
        const validFiles = files.filter(file => {
            // Check file type
            const validTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (!validTypes.includes(fileExtension)) {
                this.showNotification(`File "${file.name}" has an invalid format. Please select PDF, DOC, DOCX, JPG, JPEG, or PNG files.`, "error");
                return false;
            }

            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                this.showNotification(`File "${file.name}" is too large. Maximum size is 10MB.`, "error");
                return false;
            }

            // Check if file already selected
            if (this.selectedFiles.some(selectedFile => selectedFile.name === file.name && selectedFile.size === file.size)) {
                this.showNotification(`File "${file.name}" is already selected.`, "warning");
                return false;
            }

            return true;
        });

        // Add valid files to selection
        this.selectedFiles.push(...validFiles);
        this.updateFilePreview();
        this.updateUploadButton();

        if (validFiles.length > 0) {
            this.showNotification(`Added ${validFiles.length} file(s) to upload queue.`, "success");
        }
    }

    updateFilePreview() {
        const previewSection = document.getElementById('file-preview-section');
        const previewList = document.getElementById('file-preview-list');

        if (!previewSection || !previewList) return;

        if (this.selectedFiles.length === 0) {
            previewSection.style.display = 'none';
            return;
        }

        previewSection.style.display = 'block';
        previewList.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                border-bottom: 1px solid #f3f4f6;
                font-family: 'Inter', sans-serif;
                transition: background-color 0.2s;
            `;

            fileItem.onmouseover = () => fileItem.style.backgroundColor = '#f9fafb';
            fileItem.onmouseout = () => fileItem.style.backgroundColor = 'transparent';

            const fileInfo = document.createElement('div');
            fileInfo.style.cssText = 'display: flex; align-items: center; gap: 12px; flex: 1;';

            // File icon based on type
            const fileIcon = this.getFileIcon(file.name);
            const iconElement = document.createElement('div');
            iconElement.innerHTML = `<i class="${fileIcon.class}" style="color: ${fileIcon.color}; font-size: 20px;"></i>`;

            // File details
            const fileDetails = document.createElement('div');
            fileDetails.style.cssText = 'flex: 1;';

            const fileName = document.createElement('div');
            fileName.textContent = file.name;
            fileName.style.cssText = 'font-weight: 500; color: #111827; font-size: 14px; margin-bottom: 2px;';

            const fileSize = document.createElement('div');
            fileSize.textContent = this.formatFileSize(file.size);
            fileSize.style.cssText = 'color: #6b7280; font-size: 12px;';

            fileDetails.appendChild(fileName);
            fileDetails.appendChild(fileSize);

            // Remove button
            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fas fa-times"></i>';
            removeButton.style.cssText = `
                background: #fee2e2;
                color: #dc2626;
                border: none;
                border-radius: 4px;
                width: 28px;
                height: 28px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            `;

            removeButton.onmouseover = () => {
                removeButton.style.backgroundColor = '#fecaca';
                removeButton.style.color = '#b91c1c';
            };
            removeButton.onmouseout = () => {
                removeButton.style.backgroundColor = '#fee2e2';
                removeButton.style.color = '#dc2626';
            };

            removeButton.onclick = () => this.removeFile(index);
            removeButton.title = 'Remove file';

            fileInfo.appendChild(iconElement);
            fileInfo.appendChild(fileDetails);
            fileItem.appendChild(fileInfo);
            fileItem.appendChild(removeButton);
            previewList.appendChild(fileItem);
        });
    }

    getFileIcon(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();

        switch (extension) {
            case 'pdf':
                return { class: 'fas fa-file-pdf', color: '#dc2626' };
            case 'doc':
            case 'docx':
                return { class: 'fas fa-file-word', color: '#2563eb' };
            case 'jpg':
            case 'jpeg':
            case 'png':
                return { class: 'fas fa-file-image', color: '#059669' };
            default:
                return { class: 'fas fa-file', color: '#6b7280' };
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.updateFilePreview();
        this.updateUploadButton();
        this.showNotification("File removed from upload queue.", "info");
    }

    updateUploadButton() {
        const uploadButton = document.getElementById('upload-submit-btn');
        if (!uploadButton) return;

        if (this.selectedFiles.length > 0) {
            uploadButton.disabled = false;
            uploadButton.style.background = '#dc2626';
            uploadButton.style.cursor = 'pointer';
            uploadButton.textContent = `Upload ${this.selectedFiles.length} Document${this.selectedFiles.length > 1 ? 's' : ''}`;
        } else {
            uploadButton.disabled = true;
            uploadButton.style.background = '#9ca3af';
            uploadButton.style.cursor = 'not-allowed';
            uploadButton.textContent = 'Upload Documents';
        }
    }

    showAuditLog() {
        const auditData = this.editRecordsService.getAuditLog();
        const modalHtml = `
            <div style="background: white; border-radius: 12px; max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto; position: relative;">
                <div style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">Audit Log</h2>
                        <button onclick="dashboard.closeUploadModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 4px;">×</button>
                    </div>
                </div>
                <div style="padding: 24px;">
                    <div style="margin-bottom: 20px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                            <div>
                                <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Registration Type</label>
                                <select id="audit-type-filter" onchange="dashboard.filterAuditLog()" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;">
                                    <option value="All">All Types</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Education">Education</option>
                                    <option value="Society">Society</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Registration ID</label>
                                <input type="text" id="audit-id-filter" placeholder="Search by RG ID..." onkeyup="dashboard.filterAuditLog()"
                                       style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;">
                            </div>
                        </div>
                    </div>
                    <div id="audit-log-content">
                        ${this.renderAuditLogEntries(auditData.entries)}
                    </div>
                </div>
            </div>
        `;
        this.showEditModal(modalHtml);
    }

    renderAuditLogEntries(entries) {
        if (entries.length === 0) {
            return "<p style=\"text-align: center; color: #6b7280; padding: 32px 0; font-family: 'Inter', sans-serif;\">No audit log entries found</p>";
        }

        return entries
            .map(
                (entry) => `
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; background: #f9fafb;">
                <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 8px;">
                    <div style="flex: 1;">
                        <h4 style="font-weight: 600; color: #111827; margin: 0 0 4px 0; font-family: 'Inter', sans-serif;">${entry.field}</h4>
                        <p style="color: #6b7280; font-size: 14px; margin: 0; font-family: 'Inter', sans-serif;">${entry.registrationId} - ${entry.registrationType}</p>
                    </div>
                    <span style="background: #dbeafe; color: #2563eb; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; font-family: 'Inter', sans-serif;">${entry.changeType}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
                    <div>
                        <span style="font-size: 12px; color: #6b7280; font-family: 'Inter', sans-serif;">Old Value:</span>
                        <p style="font-weight: 500; color: #dc2626; margin: 2px 0 0 0; font-family: 'Inter', sans-serif;">${entry.oldValue}</p>
                    </div>
                    <div>
                        <span style="font-size: 12px; color: #6b7280; font-family: 'Inter', sans-serif;">New Value:</span>
                        <p style="font-weight: 500; color: #16a34a; margin: 2px 0 0 0; font-family: 'Inter', sans-serif;">${entry.newValue}</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280; font-family: 'Inter', sans-serif;">
                    <span>${entry.timestamp}</span>
                    <span>IP: ${entry.ipAddress}</span>
                </div>
            </div>
        `
            )
            .join("");
    }

    filterAuditLog() {
        const typeFilter =
            document.getElementById("audit-type-filter")?.value || "All";
        const idFilter = document.getElementById("audit-id-filter")?.value || "";

        const auditData = this.editRecordsService.getAuditLog({
            registrationType: typeFilter,
            registrationId: idFilter,
        });

        const contentDiv = document.getElementById("audit-log-content");
        if (contentDiv) {
            contentDiv.innerHTML = this.renderAuditLogEntries(auditData.entries);
        }
    }

    handlePayNow(rgId) {
        this.showNotification("Initiating payment for " + rgId + "...", "info");
        var self = this;
        setTimeout(function () {
            self.showNotification("Payment gateway opened successfully!", "success");
        }, 1000);
        // Here you would typically redirect to payment gateway or open payment modal
        console.log("Pay Now clicked for registration:", rgId);
    }

    openEditModal() {
        const modal = document.getElementById("edit-registration-modal");
        if (modal) {
            modal.style.display = "block";
            setTimeout(function () {
                modal.style.opacity = "1";
                const content = modal.querySelector("div");
                if (content) {
                    content.style.transform = "translateX(0)";
                }
            }, 10);
        }
    }

    closeRegistrationModal() {
        const modal = document.getElementById("edit-registration-modal");
        if (modal) {
            modal.style.opacity = "0";
            const content = modal.querySelector("div");
            if (content) {
                content.style.transform = "translateX(100%)";
            }
            setTimeout(function () {
                modal.style.display = "none";
            }, 300);
        }
    }

    // Sidebar Functions
    toggleSidebar() {
        console.log("toggleSidebar method called");
        const sidebar = document.getElementById("sidebar");
        const main = document.querySelector("main");

        console.log("Sidebar element:", sidebar);
        console.log("Main element:", main);

        if (sidebar && main) {
            const isMinimized = sidebar.classList.contains("minimized");
            console.log("Is minimized:", isMinimized);

            if (isMinimized) {
                sidebar.classList.remove("minimized");
                main.classList.remove("sidebar-minimized");
                localStorage.setItem("sidebarMinimized", "false");
                console.log("Sidebar expanded");
            } else {
                sidebar.classList.add("minimized");
                main.classList.add("sidebar-minimized");
                localStorage.setItem("sidebarMinimized", "true");
                console.log("Sidebar minimized");
            }
        } else {
            console.log("Sidebar or main element not found");
        }
    }

    initializeSidebar() {
        const sidebarMinimized = localStorage.getItem("sidebarMinimized") === "true";
        const sidebar = document.getElementById("sidebar");
        const main = document.querySelector("main");

        if (sidebarMinimized && sidebar && main) {
            sidebar.classList.add("minimized");
            main.classList.add("sidebar-minimized");
        }
    }

    // Mobile Functions
    toggleMobileSidebar() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.querySelector(".mobile-overlay");

        if (sidebar && overlay) {
            const isOpen = sidebar.classList.contains("mobile-open");

            if (isOpen) {
                this.closeMobileSidebar();
            } else {
                sidebar.classList.add("mobile-open");
                overlay.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        }
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.querySelector(".mobile-overlay");

        if (sidebar && overlay) {
            sidebar.classList.remove("mobile-open");
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    }

    // Theme Functions
    initializeTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        this.setTheme(newTheme);
    }

    // Luxury Animation Functions
    startLuxuryAnimations() {
        // Add smooth reveal animations to cards
        const cards = document.querySelectorAll(
            ".analytics-card, .chart-container, .table-container"
        );
        cards.forEach((card, index) => {
            card.style.animationDelay = index * 100 + "ms";
            card.classList.add("fade-in-up");
        });
    }

    // Notification System
    showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === "success"
                ? "check-circle"
                : type === "error"
                    ? "exclamation-circle"
                    : "info-circle"
            }"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add("show");
        }, 100);

        // Hide notification
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    renderEditRecords(registrations) {
        // Filter registrations by type
        const rentRegistrations =
            registrations.filter((reg) => reg.type === "tenant") || [];
        const educationRegistrations =
            registrations.filter((reg) => reg.type === "education") || [];
        const societyRegistrations =
            registrations.filter((reg) => reg.type === "society") || [];

        const html = `
            <div style="padding: 0 16px;">
                <!-- Header with action buttons -->
                <div style="margin-bottom: 32px; ">
                    <div style=" width: 100%; display: flex; justify-content: end; align-items: center; margin-bottom: 16px;">
                        <div style="display: flex;  gap: 12px;">
                            <button onclick="dashboard.showAuditLog()"
                                    style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #dbeafe; color: #2563eb; padding: 12px 16px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;"
                                    onmouseover="this.style.backgroundColor='#bfdbfe'"
                                    onmouseout="this.style.backgroundColor='#dbeafe'">
                                <i class="fas fa-clock" style="font-size: 14px;"></i>
                                <span>View Audit Log</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Rent Records Card -->
                <div style="background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; margin-bottom: 24px;">
                    <div style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
                        <h3 style="display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">
                            <i class="fas fa-file-text" style="color: #2563eb; font-size: 20px;"></i>
                            Rent Records
                        </h3>
                    </div>
                    <div style="padding: 20px;">
                        ${this.renderRegistrationCards(
            rentRegistrations,
            "tenant"
        )}
                    </div>
                </div>

                <!-- Education Fees Records Card -->
                <div style="background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; margin-bottom: 24px;">
                    <div style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
                        <h3 style="display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">
                            <i class="fas fa-graduation-cap" style="color: #2563eb; font-size: 20px;"></i>
                            Education Fees Records
                        </h3>
                    </div>
                    <div style="padding: 20px;">
                        ${this.renderRegistrationCards(
            educationRegistrations,
            "education"
        )}
                    </div>
                </div>

                <!-- Society Charges Records Card -->
                <div style="background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; margin-bottom: 24px;">
                    <div style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
                        <h3 style="display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">
                            <i class="fas fa-building" style="color: #2563eb; font-size: 20px;"></i>
                            Society Charges Records
                        </h3>
                    </div>
                    <div style="padding: 20px;">
                        ${this.renderRegistrationCards(
            societyRegistrations,
            "society"
        )}
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById("edit-records-section");
        if (container) {
            const contentDiv =
                container.querySelector(".page-header").nextElementSibling;
            if (contentDiv) {
                contentDiv.innerHTML = html;
            } else {
                // Create content div if it doesn't exist
                const newContentDiv = document.createElement("div");
                newContentDiv.innerHTML = html;
                container.appendChild(newContentDiv);
            }
        }
    }

    renderRegistrationCards(registrations, type) {
        if (registrations.length === 0) {
            return `<p style="text-align: center; color: #6b7280; padding: 32px 0; font-family: 'Inter', sans-serif;">No ${type} registrations found</p>`;
        }

        return registrations
            .map(
                (registration) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px; gap: 12px;">
                <div style="flex: 1;">
                    <h3 style="font-weight: 600; font-size: 16px; color: #111827; margin: 0 0 8px 0; font-family: 'Inter', sans-serif;">${registration.rgId}</h3>
                    <div style="display: flex; flex-direction: column; gap: 4px; font-size: 14px; color: #6b7280; font-family: 'Inter', sans-serif;">
                        <p style="margin: 0;">Status: ${registration.status}</p>
                        <p style="margin: 0;">Mode: ${registration.mode}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button onclick="dashboard.showUploadModalForRegistration('${registration.rgId}')"
                            style="height: 40px; background: #dc2626; color: white; padding: 8px 16px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px;"
                            onmouseover="this.style.backgroundColor='#b91c1c'"
                            onmouseout="this.style.backgroundColor='#dc2626'">
                        <i class="fas fa-upload" style="font-size: 14px;"></i>
                        UPLOAD
                    </button>
                    <button onclick="dashboard.handleEditClick('${type}', '${registration.rgId}')"
                            style="height: 40px; background: #16a34a; color: white; padding: 8px 16px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px;"
                            onmouseover="this.style.backgroundColor='#15803d'"
                            onmouseout="this.style.backgroundColor='#16a34a'">
                        <i class="fas fa-edit" style="font-size: 14px;"></i>
                        EDIT
                    </button>
                </div>
            </div>
        `
            )
            .join("");
    }

    getTypeLabel(type) {
        const labels = {
            tenant: "Rent",
            education: "Education Fees",
            society: "Society Maintenance",
        };
        return labels[type] || type;
    }

    getStatusColor(status) {
        const colors = {
            active: "#10b981",
            pending: "#f59e0b",
            overdue: "#ef4444",
            approved: "#10b981",
        };
        return colors[status.toLowerCase()] || "#6b7280";
    }

    openEditModal(rgId) {
        this.showNotification(`Opening edit form for ${rgId}`, "info");
        // Here you would open the actual edit modal
    }
    renderRewards(data) {
        const container = document.getElementById("rewards-content");
        if (!container) return;

        let html = `
            <div class="chart-card">
                <div class="chart-header">
                    <div class="chart-title">My Wallet</div>
                </div>
                <div style="padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="font-size: 48px; font-weight: 700; color: #ef4444; margin-bottom: 8px;">${data.cashPoints.toLocaleString()}</div>
                        <div style="color: #6b7280; font-size: 16px;">RedGirraffe Cash Points</div>
                        <div style="color: #10b981; font-size: 14px; margin-top: 4px;">≈ ₹${data.cashPoints.toLocaleString()}</div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 30px;">
                        <button style="background: #ef4444; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">Transfer Points</button>
                        <button style="background: #f3f4f6; color: #374151; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">View History</button>
                    </div>

                    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Recent Transactions</h3>
                    <div style="space-y: 12px;">`;

        data.transactions.forEach((tx) => {
            html += `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 8px;">
                    <div>
                        <div style="font-weight: 500; color: #111827;">${tx.type
                }</div>
                        <div style="color: #6b7280; font-size: 14px;">${tx.description
                }</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 600; color: ${tx.amount > 0 ? "#10b981" : "#f59e0b"
                };">${tx.amount > 0 ? "+" : ""}${tx.amount} pts</div>
                        <div style="color: #6b7280; font-size: 12px;">${new Date(
                    tx.date
                ).toLocaleDateString()}</div>
                    </div>
                </div>`;
        });

        html += `
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    renderReports(data) {
        const container = document.getElementById("reports-content");
        if (!container) return;

        let html = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div class="analytics-card">
                    <div class="analytics-header">
                        <span class="analytics-title">Current Month Total</span>
                        <i class="fas fa-arrow-up analytics-icon" style="color: #10b981;"></i>
                    </div>
                    <div class="analytics-value">₹${data.payments.total.toLocaleString()}</div>
                    <div class="analytics-subtitle">Across ${data.payments.count
            } active registrations</div>
                </div>

                <div class="analytics-card">
                    <div class="analytics-header">
                        <span class="analytics-title">Available Cash Points</span>
                        <i class="fas fa-star analytics-icon" style="color: #f59e0b;"></i>
                    </div>
                    <div class="analytics-value">${data.cashPoints.available.toLocaleString()}</div>
                    <div class="analytics-subtitle">Earned: ${data.cashPoints.earned
            } | Redeemed: ${data.cashPoints.redeemed}</div>
                </div>
            </div>

            <div class="chart-card">
                <div class="chart-header">
                    <div class="chart-title">Payment History Overview</div>
                </div>
                <div style="padding: 20px; text-align: center; color: #6b7280;">
                    <p>Detailed charts and analytics will be displayed here</p>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    renderProfile(data) {
        const container = document.getElementById("profile-content");
        if (!container) return;

        let html = `
            <div class="chart-card">
                <div class="chart-header">
                    <div class="chart-title">Account Information</div>
                </div>
                <div style="padding: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <div>
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px;">Name</label>
                            <input type="text" value="${data.name}" readonly style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #f9fafb; color: #6b7280;">
                        </div>
                        <div>
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px;">Email</label>
                            <input type="email" value="${data.email}" readonly style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #f9fafb; color: #6b7280;">
                        </div>
                        <div>
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px;">Mobile</label>
                            <input type="tel" value="${data.mobile}" readonly style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #f9fafb; color: #6b7280;">
                        </div>
                        <div>
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px;">Address</label>
                            <textarea readonly style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #f9fafb; color: #6b7280; resize: vertical; min-height: 80px;">${data.address}</textarea>
                        </div>
                    </div>
                    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <p style="color: #92400e; margin: 0; font-size: 14px;">
                            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
                            Account fields are non-editable for security purposes. Contact support to make changes.
                        </p>
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    renderContact() {
        const container = document.getElementById("contact-content");
        if (!container) return;

        let html = `
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
                <div class="chart-card">
                    <div class="chart-header">
                        <div class="chart-title">Send us a message</div>
                    </div>
                    <div style="padding: 40px; text-align: center;">
                        <div style="width: 64px; height: 64px; background: #fef2f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                            <i class="fas fa-comments" style="color: #ef4444; font-size: 24px;"></i>
                        </div>
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Start Live Chat</h3>
                        <p style="color: #6b7280; margin-bottom: 24px;">Get instant help from our support team. Click the button below to start a live chat session.</p>
                        <button onclick="dashboard.openTawkToChat()" style="background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px;">
                            <i class="fas fa-comments" style="margin-right: 8px;"></i>
                            Send Us a Message
                        </button>
                    </div>
                </div>

                <div class="chart-card">
                    <div class="chart-header">
                        <div class="chart-title">Contact Information</div>
                    </div>
                    <div style="padding: 20px;">
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                <i class="fas fa-envelope" style="color: #ef4444; margin-right: 12px; width: 16px;"></i>
                                <span style="font-weight: 500;">Email Us</span>
                            </div>
                            <p style="color: #6b7280; margin: 0; margin-left: 28px;">connect@redgirraffe.com</p>
                        </div>

                        <div>
                            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                <i class="fab fa-whatsapp" style="color: #25d366; margin-right: 12px; width: 16px;"></i>
                                <span style="font-weight: 500;">WhatsApp</span>
                            </div>
                            <p style="color: #6b7280; margin: 0; margin-left: 28px;">(+91) 80-1019-1019</p>
                        </div>
                        <div style="margin-top: 20px;">
                            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                <i class="fas fa-clock" style="color: #ef4444; margin-right: 12px; width: 16px;"></i>
                                <span className="font-medium">Business Hours</span>
                            </div>

                                <p className="text-sm text-muted-foreground mt-1" style="color: #6b7280; margin: 0; margin-left: 28px;">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p className="text-sm text-muted-foreground" style="color: #6b7280; margin: 0; margin-left: 28px;">Saturday: 10:00 AM - 2:00 PM</p>
                                <p className="text-sm text-muted-foreground" style="color: #6b7280; margin: 0; margin-left: 28px;">Sunday: Closed</p>

                        </div>
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    copyReferralLink(link) {
        navigator.clipboard.writeText(link).then(() => {
            this.showNotification("Referral link copied to clipboard!", "success");
        });
    }

    sendReferralInvite() {
        const email = document.getElementById("referral-email").value;
        if (!email) {
            this.showNotification("Please enter an email address", "error");
            return;
        }

        // Open email client with pre-filled content
        const subject = encodeURIComponent("Join RedGirraffe - Get ₹500 Bonus!");
        const body = encodeURIComponent(
            `Hi there!\n\nI'd like to invite you to join RedGirraffe, an amazing payment platform.\n\nUse my referral code: PIYUSH500\nOr click this link: https://redgirraffe.com/ref/PIYUSH500\n\nYou'll get ₹500 bonus when you sign up and make your first payment!\n\nBest regards`
        );
        window.open(`mailto:${email}?subject=${subject}&body=${body}`);

        document.getElementById("referral-email").value = "";
        this.showNotification(
            "Email client opened with referral invitation",
            "success"
        );
    }

    openTawkToChat() {
        // Check if Tawk.to is loaded
        if (typeof window !== "undefined" && window.Tawk_API) {
            window.Tawk_API.maximize();
        } else {
            this.showNotification(
                "Loading chat support... Please try again in a moment.",
                "info"
            );
        }
    }

    // Tab switching methods for different sections
    switchRewardsTab(tab) {
        // Update active tab styling
        document
            .querySelectorAll("#rewards-section .header-nav-item")
            .forEach((item) => {
                item.classList.remove("active");
            });
        event.target.classList.add("active");

        // Load appropriate content based on tab
        switch (tab) {
            case "giftcards":
                this.renderGiftCards();
                break;
            case "wallet":
                this.renderMyWallet();
                break;
            case "history":
                this.renderRewardsPurchaseHistory();
                break;
        }
    }

    switchReportsTab(tab) {
        // Update active tab styling
        document
            .querySelectorAll("#reports-section .header-nav-item")
            .forEach((item) => {
                item.classList.remove("active");
            });
        event.target.classList.add("active");

        // Update current tab in data
        if (this.reportsData) {
            this.reportsData.currentTab = tab;
        }

        // Reload reports with new tab
        this.loadReports();
    }

    // Time period change handler
    changePeriod(period) {
        if (this.reportsData) {
            this.reportsData.period = period;
        }
        this.loadReports();
    }

    switchReferralsTab(tab) {
        // Update active tab styling
        document
            .querySelectorAll("#referrals-section .header-nav-item")
            .forEach((item) => {
                item.classList.remove("active");
            });
        event.target.classList.add("active");

        // Store current tab and render table
        this.currentReferralTab = tab;
        this.renderReferralTable(tab);
    }

    // New referral-specific methods
    shareReferral(method) {
        const referralCode = this.referralsData?.referralCode || "PIYUSH500";
        const referralLink =
            this.referralsData?.referralLink ||
            "https://redgirraffe.com/ref/PIYUSH500";

        if (method === "email") {
            const subject = encodeURIComponent("Join RedGirraffe - Get ₹500 Bonus!");
            const body = encodeURIComponent(
                `Hi there!\n\nI'd like to invite you to join RedGirraffe, an amazing payment platform.\n\nUse my referral code: ${referralCode}\nOr click this link: ${referralLink}\n\nYou'll get ₹500 bonus when you sign up and make your first payment!\n\nBest regards`
            );
            window.open(`mailto:?subject=${subject}&body=${body}`);
        } else if (method === "whatsapp") {
            const message = encodeURIComponent(
                `Join RedGirraffe and get ₹500 bonus! Use my referral code: ${referralCode} or click: ${referralLink}`
            );
            window.open(`https://wa.me/?text=${message}`, "_blank");
        }

        this.showNotification(`Referral shared via ${method}!`, "success");
    }

    copyReferralLink() {
        const referralLink =
            this.referralsData?.referralLink ||
            "https://redgirraffe.com/ref/PIYUSH500";
        navigator.clipboard
            .writeText(referralLink)
            .then(() => {
                this.showNotification("Referral link copied to clipboard!", "success");
            })
            .catch(() => {
                this.showNotification("Failed to copy link", "error");
            });
    }

    sendEmailInvite() {
        const emailInput = document.getElementById("email-invite-input");
        const errorDiv = document.getElementById("email-error");

        if (!emailInput) return;

        const email = emailInput.value.trim();

        // Clear previous errors
        if (errorDiv) {
            errorDiv.style.display = "none";
            errorDiv.textContent = "";
        }

        // Validate email
        if (!email) {
            this.showEmailError("Please enter a valid email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showEmailError("Please enter a valid email address.");
            return;
        }

        // Check if email already exists
        const existingReferral = this.referralsData.referrals.find(
            (ref) => ref.referredEmail === email
        );
        if (existingReferral) {
            this.showEmailError("This email has already been invited.");
            return;
        }

        // Create new referral
        const newReferral = {
            id: Date.now(),
            referrerId: 1,
            referredEmail: email,
            referredName: null,
            referralCode: this.referralsData.referralCode,
            status: "Pending",
            invitedAt: new Date(),
            completedAt: null,
            rewardAmount: "500",
        };

        // Add to referrals data
        this.referralsData.referrals.push(newReferral);

        // Open email client
        const subject = encodeURIComponent("Join RedGirraffe - Get ₹500 Bonus!");
        const body = encodeURIComponent(
            `Hi there!\n\nI'd like to invite you to join RedGirraffe, an amazing payment platform.\n\nUse my referral code: ${this.referralsData.referralCode}\nOr click this link: ${this.referralsData.referralLink}\n\nYou'll get ₹500 bonus when you sign up and make your first payment!\n\nBest regards`
        );
        window.open(`mailto:${email}?subject=${subject}&body=${body}`);

        // Clear input
        emailInput.value = "";

        // Update UI
        this.updateReferralStats();
        this.renderReferralTable(this.currentReferralTab);

        this.showNotification("Invitation sent successfully!", "success");
    }

    showEmailError(message) {
        const errorDiv = document.getElementById("email-error");
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = "block";
        }
    }

    sendReminder(referralId) {
        const referral = this.referralsData.referrals.find(
            (ref) => ref.id === referralId
        );
        if (!referral) return;

        const subject = encodeURIComponent(
            "Reminder: Join RedGirraffe - Get ₹500 Bonus!"
        );
        const body = encodeURIComponent(
            `Hi there!\n\nThis is a friendly reminder about my invitation to join RedGirraffe.\n\nUse my referral code: ${this.referralsData.referralCode}\nOr click this link: ${this.referralsData.referralLink}\n\nYou'll get ₹500 bonus when you sign up and make your first payment!\n\nBest regards`
        );
        window.open(
            `mailto:${referral.referredEmail}?subject=${subject}&body=${body}`
        );

        this.showNotification(
            `Reminder email opened for ${referral.referredEmail}`,
            "success"
        );
    }

    switchProfileTab(tab) {
        // Update active tab styling
        document
            .querySelectorAll("#profile-section .header-nav-item")
            .forEach((item) => {
                item.classList.remove("active");
            });
        event.target.classList.add("active");

        // Update current tab and show appropriate content
        if (this.profileData) {
            this.profileData.currentTab = tab;
        }

        this.showProfileTab(tab);
    }

    // Form validation helpers
    validateDisplayName(value) {
        if (!value || value.trim().length === 0) {
            return "Display name is required";
        }
        if (value.trim().length < 2) {
            return "Display name must be at least 2 characters";
        }
        if (value.trim().length > 50) {
            return "Display name must be less than 50 characters";
        }
        return null;
    }

    validatePassword(password) {
        if (!password || password.length === 0) {
            return "Password is required";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one number";
        }
        return null;
    }

    // Enhanced save with validation
    saveAccountSettingsWithValidation() {
        const displayNameInput = document.getElementById("displayName");

        if (!displayNameInput) return;

        const displayName = displayNameInput.value.trim();
        const validationError = this.validateDisplayName(displayName);

        if (validationError) {
            this.showNotification(validationError, "error");
            displayNameInput.focus();
            return;
        }

        // Proceed with save
        this.saveAccountSettings();
    }

    // Enhanced password update with validation
    updatePasswordWithValidation() {
        const currentPasswordInput = document.getElementById("currentPassword");
        const newPasswordInput = document.getElementById("newPassword");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput)
            return;

        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validate current password
        if (!currentPassword) {
            this.showNotification("Please enter your current password", "error");
            currentPasswordInput.focus();
            return;
        }

        // Validate new password
        const passwordError = this.validatePassword(newPassword);
        if (passwordError) {
            this.showNotification(passwordError, "error");
            newPasswordInput.focus();
            return;
        }

        // Validate password confirmation
        if (newPassword !== confirmPassword) {
            this.showNotification("New passwords do not match", "error");
            confirmPasswordInput.focus();
            return;
        }

        // Proceed with update
        this.updatePassword();
    }

    // Initialize form event listeners
    initializeSettingsEventListeners() {
        // Add real-time validation for display name
        const displayNameInput = document.getElementById("displayName");
        if (displayNameInput) {
            displayNameInput.addEventListener("input", (e) => {
                const value = e.target.value.trim();
                const error = this.validateDisplayName(value);

                if (error) {
                    e.target.classList.add("error");
                    e.target.classList.remove("success");
                } else {
                    e.target.classList.remove("error");
                    e.target.classList.add("success");
                }
            });
        }

        // Add real-time validation for password fields
        const newPasswordInput = document.getElementById("newPassword");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        if (newPasswordInput) {
            newPasswordInput.addEventListener("input", (e) => {
                const value = e.target.value;
                const error = this.validatePassword(value);

                if (error && value.length > 0) {
                    e.target.classList.add("error");
                    e.target.classList.remove("success");
                } else if (value.length > 0) {
                    e.target.classList.remove("error");
                    e.target.classList.add("success");
                }

                // Also validate confirm password if it has a value
                if (confirmPasswordInput && confirmPasswordInput.value) {
                    this.validateConfirmPassword();
                }
            });
        }

        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener("input", () => {
                this.validateConfirmPassword();
            });
        }

        // Add form submission handlers
        const accountForm = document.getElementById("account-settings-form");
        if (accountForm) {
            accountForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.saveAccountSettingsWithValidation();
            });
        }

        const passwordForm = document.getElementById("password-settings-form");
        if (passwordForm) {
            passwordForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.updatePasswordWithValidation();
            });
        }
    }

    validateConfirmPassword() {
        const newPasswordInput = document.getElementById("newPassword");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        if (!newPasswordInput || !confirmPasswordInput) return;

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword.length > 0) {
            if (newPassword === confirmPassword) {
                confirmPasswordInput.classList.remove("error");
                confirmPasswordInput.classList.add("success");
            } else {
                confirmPasswordInput.classList.add("error");
                confirmPasswordInput.classList.remove("success");
            }
        }
    }

    switchContactTab(tab) {
        // Update active tab styling
        document
            .querySelectorAll("#contact-section .header-nav-item")
            .forEach((item) => {
                item.classList.remove("active");
            });
        event.target.classList.add("active");

        // Load appropriate content based on tab
        if (tab === "contact") {
            this.loadContact();
        } else if (tab === "faq") {
            this.renderFAQ();
        }
    }

    renderRewardsPurchaseHistory() {
        const container = document.getElementById("rewards-content");
        if (!container) return;

        // Initialize expanded state if not exists
        if (!this.expandedPurchase) {
            this.expandedPurchase = null;
        }

        let html = `
            <div class="chart-card" style="overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="padding: 0;">
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <thead style="background: #f9fafb; color: #374151;">
                                <tr>
                                    <th style="padding: 16px; text-align: left; font-weight: 500; border-bottom: 1px solid #e5e7eb;">Name</th>
                                    <th style="padding: 16px; text-align: left; font-weight: 500; border-bottom: 1px solid #e5e7eb;">Order ID</th>
                                    <th style="padding: 16px; text-align: left; font-weight: 500; border-bottom: 1px solid #e5e7eb;">Total Amount</th>
                                    <th style="padding: 16px; text-align: left; font-weight: 500; border-bottom: 1px solid #e5e7eb;">Placed On</th>
                                    <th style="padding: 16px; text-align: left; font-weight: 500; border-bottom: 1px solid #e5e7eb;">Quantity</th>
                                    <th style="padding: 16px; text-align: left; font-weight: 500; border-bottom: 1px solid #e5e7eb;">Status</th>
                                    <th style="padding: 16px; text-align: left; font-weight: 500; border-bottom: 1px solid #e5e7eb;">View Details</th>
                                </tr>
                            </thead>
                            <tbody style="background: white;">
                                ${this.mockPurchases
                .map(
                    (purchase) => `
                                    <tr style="transition: background-color 0.15s ease; ${this.expandedPurchase === purchase.id
                            ? "background: #f9fafb;"
                            : ""
                        }"
                                        onmouseover="this.style.background='#f9fafb'"
                                        onmouseout="this.style.background='${this.expandedPurchase === purchase.id
                            ? "#f9fafb"
                            : "white"
                        }'">
                                        <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${purchase.name
                        }</td>
                                        <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${purchase.orderId
                        }</td>
                                        <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">₹ ${purchase.amount
                        }</td>
                                        <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${purchase.placedOn
                        }</td>
                                        <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${purchase.quantity
                        }</td>
                                        <td style="padding: 16px; border-bottom: 1px solid #f3f4f6;">
                                            <span style="padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; text-transform: uppercase; ${this.getStatusStyles(
                            purchase.status
                        )}">
                                                ${purchase.status}
                                            </span>
                                        </td>
                                        <td style="padding: 16px; border-bottom: 1px solid #f3f4f6;">
                                            <button
                                                onclick="dashboard.togglePurchaseDetails('${purchase.id
                        }')"
                                                style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 4px; border-radius: 4px; transition: background 0.15s ease;"
                                                onmouseover="this.style.background='#fef2f2'"
                                                onmouseout="this.style.background='none'"
                                            >
                                                <i class="fas fa-chevron-${this.expandedPurchase ===
                            purchase.id
                            ? "up"
                            : "down"
                        }" style="font-size: 16px;"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    ${this.expandedPurchase === purchase.id &&
                            purchase.paymentDetails
                            ? `
                                        <tr style="background: #f9fafb;">
                                            <td colspan="7" style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
                                                <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
                                                    <h4 style="font-weight: 600; color: #111827; margin: 0 0 12px 0; font-size: 16px;">Payment Details</h4>
                                                    <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb;">
                                                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                                            <span style="color: #6b7280; font-size: 14px;">Total value of CHECKOUT e-Gift Card being purchased:</span>
                                                            <span style="font-weight: 500; color: #111827;">₹ ${purchase.paymentDetails.totalValue}</span>
                                                        </div>
                                                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                                            <span style="color: #6b7280; font-size: 14px;">Your SAVINGS by redeeming RedGirraffe Cash Points:</span>
                                                            <span style="font-weight: 500; color: #16a34a;">[-] ₹ ${purchase.paymentDetails.savings}</span>
                                                        </div>
                                                        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #f3f4f6;">
                                                            <span style="font-weight: 600; color: #111827;">Net Amount Payable to RedGirraffe:</span>
                                                            <span style="font-weight: 600; color: #111827;">₹ ${purchase.paymentDetails.netAmount}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    `
                            : ""
                        }
                                `
                )
                .join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    getStatusStyles(status) {
        switch (status.toLowerCase()) {
            case "expired":
                return "background: #f3f4f6; color: #6b7280;";
            case "cancelled":
                return "background: #fee2e2; color: #dc2626;";
            case "active":
                return "background: #dcfce7; color: #16a34a;";
            default:
                return "background: #f3f4f6; color: #6b7280;";
        }
    }

    togglePurchaseDetails(purchaseId) {
        if (this.expandedPurchase === purchaseId) {
            this.expandedPurchase = null;
        } else {
            this.expandedPurchase = purchaseId;
        }
        this.renderRewardsPurchaseHistory();
    }

    renderPurchaseGuideModal() {
        return `
            <div style="max-width: 500px; width: 90vw; background: white; border-radius: 12px; padding: 32px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0;">Steps to Purchase Gift Card</h2>
                    <button onclick="dashboard.closeModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 4px;">×</button>
                </div>

                <div style="space-y: 20px;">
                    <div style="display: flex; align-items: start; gap: 16px; margin-bottom: 20px;">
                        <div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">1</div>
                        <div>
                            <h3 style="font-weight: 600; color: #111827; margin: 0 0 4px 0; font-size: 16px;">Browse Gift Cards</h3>
                            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Explore our wide selection of gift cards from popular brands. Use filters to find cards by category or search for specific brands.</p>
                        </div>
                    </div>

                    <div style="display: flex; align-items: start; gap: 16px; margin-bottom: 20px;">
                        <div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">2</div>
                        <div>
                            <h3 style="font-weight: 600; color: #111827; margin: 0 0 4px 0; font-size: 16px;">Select & Configure</h3>
                            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Choose your desired gift card, set the denomination (₹2000-₹100000), quantity (1-10), and delivery options. Add GST details if required.</p>
                        </div>
                    </div>

                    <div style="display: flex; align-items: start; gap: 16px; margin-bottom: 20px;">
                        <div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">3</div>
                        <div>
                            <h3 style="font-weight: 600; color: #111827; margin: 0 0 4px 0; font-size: 16px;">Review & Pay</h3>
                            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Review your order summary, see your savings with RedGirraffe Cash Points, and complete payment through our secure gateway.</p>
                        </div>
                    </div>

                    <div style="display: flex; align-items: start; gap: 16px; margin-bottom: 24px;">
                        <div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">4</div>
                        <div>
                            <h3 style="font-weight: 600; color: #111827; margin: 0 0 4px 0; font-size: 16px;">Receive Gift Card</h3>
                            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Your e-Gift Card will be sent to your registered email within minutes. Check your purchase history for order details.</p>
                        </div>
                    </div>
                </div>

                <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-top: 24px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <i class="fas fa-info-circle" style="color: #ef4444; font-size: 16px;"></i>
                        <h4 style="font-weight: 600; color: #111827; margin: 0; font-size: 14px;">Important Notes</h4>
                    </div>
                    <ul style="color: #6b7280; font-size: 13px; margin: 0; padding-left: 16px; line-height: 1.5;">
                        <li>Gift cards are delivered via email only</li>
                        <li>Ensure your email address is correct and active</li>
                        <li>For orders above 4 quantity, processing may take 1+ minutes</li>
                        <li>All purchases are final and non-refundable</li>
                    </ul>
                </div>

                <button
                    onclick="dashboard.closeModal()"
                    style="width: 100%; background: #ef4444; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 16px; margin-top: 24px;"
                >
                    Got it!
                </button>
            </div>
        `;
    }

    renderGiftCards() {
        const container = document.getElementById("rewards-content");
        if (!container) return;

        // Initialize gift cards state if not exists
        if (!this.giftCardsState) {
            this.giftCardsState = {
                currentPage: 1,
                cardsPerPage: 9,
                selectedCategory: "All Products",
                searchTerm: "",
                sortBy: "default",
                filteredCards: this.getFilteredGiftCards(),
            };
        }

        const {
            currentPage,
            cardsPerPage,
            selectedCategory,
            searchTerm,
            sortBy,
            filteredCards,
        } = this.giftCardsState;
        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const currentCards = filteredCards.slice(startIndex, endIndex);

        let html = `
            <div class="gift-cards-container">
                <!-- Header Section -->
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 16px;">
                        <div>
                            <h3 style="font-size: 20px; font-weight: 700; color: #ef4444; margin: 0 0 4px 0;">Shop Gift Cards</h3>
                            <p style="color: #6b7280; font-size: 14px; margin: 0;">Browse from over ${this.mockGiftCards.length
            } brands with exclusive RedGirraffe discounts</p>
                        </div>
                        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                            <div style="position: relative;">
                                <input
                                    type="search"
                                    placeholder="Search gift cards..."
                                    value="${searchTerm}"
                                    onchange="dashboard.updateGiftCardSearch(this.value)"
                                    style="padding: 8px 12px 8px 36px; border: 1px solid #d1d5db; border-radius: 6px; width: 250px; font-size: 14px;"
                                />
                                <i class="fas fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 14px;"></i>
                            </div>
                            <select onchange="dashboard.updateGiftCardSort(this.value)" style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; min-width: 180px;">
                                <option value="default" ${sortBy === "default" ? "selected" : ""
            }>Default</option>
                                <option value="discount-high" ${sortBy === "discount-high" ? "selected" : ""
            }>Discount: High to Low</option>
                                <option value="discount-low" ${sortBy === "discount-low" ? "selected" : ""
            }>Discount: Low to High</option>
                                <option value="popularity" ${sortBy === "popularity" ? "selected" : ""
            }>Most Popular</option>
                                <option value="recent" ${sortBy === "recent" ? "selected" : ""
            }>Recently Added</option>
                            </select>
                            <button onclick="dashboard.showPurchaseGuide()" style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer; font-size: 14px;">
                                Purchase Guide
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div style="display: grid; grid-template-columns: 250px 1fr; gap: 24px;">
                    <!-- Categories Sidebar -->
                    <div class="chart-card" style="height: fit-content;">
                        <div style="padding: 20px;">
                            <h4 style="font-weight: 600; color: #ef4444; margin: 0 0 16px 0; font-size: 16px;">Categories</h4>
                            <div style="space-y: 4px;">
                                ${this.categories
                .map((category) => {
                    const count =
                        this.getCategoryCount(category);
                    return `
                                        <button
                                            onclick="dashboard.updateGiftCardCategory('${category}')"
                                            style="width: 100%; text-align: left; padding: 10px 12px; border: none; background: ${selectedCategory === category
                            ? "#fef2f2"
                            : "transparent"
                        }; color: ${selectedCategory === category
                            ? "#ef4444"
                            : "#374151"
                        }; border-radius: 6px; cursor: pointer; font-size: 14px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;"
                                            onmouseover="if('${selectedCategory}' !== '${category}') { this.style.background='#f9fafb'; }"
                                            onmouseout="if('${selectedCategory}' !== '${category}') { this.style.background='transparent'; }"
                                        >
                                            <span>${category}</span>
                                            <span style="background: #f3f4f6; color: #6b7280; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${count}</span>
                                        </button>
                                    `;
                })
                .join("")}
                            </div>

                            <!-- Cash Points Balance -->
                            <div style="margin-top: 24px; padding: 16px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0;">Your available cash points:</p>
                                <div style="background: white; border-radius: 6px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="color: #6b7280; font-size: 14px;">Balance</span>
                                        <span style="font-weight: 700; font-size: 18px; color: #111827;">5,000</span>
                                    </div>
                                    <div style="margin-top: 4px; font-size: 12px; color: #6b7280;">
                                        Equal to ₹5,000 in redemption value
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Gift Cards Grid -->
                    <div>
                        ${filteredCards.length === 0
                ? `
                            <div class="chart-card" style="padding: 48px; text-align: center;">
                                <div style="width: 64px; height: 64px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                                    <i class="fas fa-search" style="color: #9ca3af; font-size: 24px;"></i>
                                </div>
                                <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">No gift cards found</h3>
                                <p style="color: #6b7280; margin: 0 0 24px 0;">We couldn't find any gift cards matching your search criteria. Try adjusting your filters or search term.</p>
                                <button onclick="dashboard.clearGiftCardFilters()" style="background: white; border: 1px solid #d1d5db; color: #374151; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                                    Clear Filters
                                </button>
                            </div>
                        `
                : `
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
                                ${currentCards
                    .map((card) => this.renderGiftCardItem(card))
                    .join("")}
                            </div>

                            <!-- Pagination -->
                            ${totalPages > 1
                    ? `
                                <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 32px;">
                                    <button
                                        onclick="dashboard.changeGiftCardPage(${currentPage - 1
                    })"
                                        ${currentPage === 1 ? "disabled" : ""}
                                        style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; cursor: ${currentPage === 1
                        ? "not-allowed"
                        : "pointer"
                    }; font-size: 14px; opacity: ${currentPage === 1 ? "0.5" : "1"
                    };"
                                    >
                                        Previous
                                    </button>

                                    ${Array.from(
                        { length: totalPages },
                        (_, i) => i + 1
                    )
                        .map(
                            (page) => `
                                        <button
                                            onclick="dashboard.changeGiftCardPage(${page})"
                                            style="padding: 8px 12px; border: 1px solid ${currentPage === page
                                    ? "#ef4444"
                                    : "#d1d5db"
                                }; background: ${currentPage === page
                                    ? "#ef4444"
                                    : "white"
                                }; color: ${currentPage === page
                                    ? "white"
                                    : "#374151"
                                }; border-radius: 6px; cursor: pointer; font-size: 14px; min-width: 40px;"
                                        >
                                            ${page}
                                        </button>
                                    `
                        )
                        .join("")}

                                    <button
                                        onclick="dashboard.changeGiftCardPage(${currentPage + 1
                    })"
                                        ${currentPage === totalPages
                        ? "disabled"
                        : ""
                    }
                                        style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; cursor: ${currentPage === totalPages
                        ? "not-allowed"
                        : "pointer"
                    }; font-size: 14px; opacity: ${currentPage === totalPages ? "0.5" : "1"
                    };"
                                    >
                                        Next
                                    </button>
                                </div>

                                <div style="text-align: center; margin-top: 16px; color: #6b7280; font-size: 14px;">
                                    Showing ${startIndex + 1}-${Math.min(
                        endIndex,
                        filteredCards.length
                    )} of ${filteredCards.length} gift cards
                                </div>
                            `
                    : ""
                }
                        `
            }
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    renderMyWallet() {
        const container = document.getElementById("rewards-content");
        if (!container) return;

        // Initialize expanded transactions state
        if (!this.expandedTransactions) {
            this.expandedTransactions = false;
        }

        const currentBalance = 5000;
        const earnedThisMonth = 175;
        const redeemedThisMonth = 250;
        const lifetimeEarned = 7500;

        // Show only first 5 transactions initially
        const visibleTransactions = this.expandedTransactions
            ? this.mockCashPointsTransactions
            : this.mockCashPointsTransactions.slice(0, 5);

        let html = `
            <!-- Points Expiration Notice -->
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 24px; display: flex; align-items: start; gap: 12px;">
                <div style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 12px;"></i>
                </div>
                <div style="flex: 1;">
                    <h4 style="font-weight: 600; color: #92400e; margin: 0 0 8px 0; font-size: 14px;">Points Expiration Notice</h4>
                    <p style="color: #92400e; margin: 0 0 8px 0; font-size: 13px; line-height: 1.4;">
                        You have <strong>1 month without transaction</strong> for each inactive month <strong>₹ 100 points</strong> are deducted as penalty.
                    </p>
                    <p style="color: #92400e; margin: 0 0 8px 0; font-size: 13px; line-height: 1.4;">
                        <strong>Monthly inactive fee: ₹ 100</strong>
                    </p>
                    <p style="color: #92400e; margin: 0 0 8px 0; font-size: 13px; line-height: 1.4;">
                        <strong>Your points due: ₹ 0.00</strong>
                    </p>
                    <p style="color: #92400e; margin: 0; font-size: 13px; line-height: 1.4;">
                        To prevent points deduction, generate at least one transaction monthly. Keep your RedGirraffe wallet active!
                    </p>
                </div>
                <button
                    onclick="dashboard.closeNotice(this)"
                    style="background: none; border: none; color: #92400e; cursor: pointer; padding: 4px; font-size: 16px; line-height: 1;"
                >×</button>
            </div>

            <!-- My RedGirraffe Wallet Card -->
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; color: white; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                <div style="position: absolute; bottom: -30px; left: -30px; width: 80px; height: 80px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>

                <div style="position: relative; z-index: 2;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="background: rgba(255,255,255,0.2); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-wallet" style="font-size: 18px;"></i>
                            </div>
                            <h2 style="font-size: 20px; font-weight: 700; margin: 0;">My RedGirraffe Wallet</h2>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button
                                onclick="dashboard.showTransferPoints()"
                                style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;"
                                onmouseover="this.style.background='rgba(255,255,255,0.3)'"
                                onmouseout="this.style.background='rgba(255,255,255,0.2)'"
                            >
                                Transfer Points
                            </button>
                            <button
                                onclick="dashboard.showPointsHistory()"
                                style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;"
                                onmouseover="this.style.background='rgba(255,255,255,0.3)'"
                                onmouseout="this.style.background='rgba(255,255,255,0.2)'"
                            >
                                View Points History
                            </button>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0 0 8px 0;">Available Balance</p>
                        <div style="font-size: 36px; font-weight: 700; margin: 0;">
                            ${currentBalance.toLocaleString()} <span style="font-size: 16px; font-weight: 500; color: rgba(255,255,255,0.8);">Cash Points</span>
                        </div>
                        <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0 0;">Equivalent to ₹ ${currentBalance.toLocaleString()}</p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                        <div style="text-align: center;">
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-bottom: 4px;">Earned this Month</div>
                            <div style="font-size: 18px; font-weight: 600;">${earnedThisMonth} pts</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-bottom: 4px;">Redeemed</div>
                            <div style="font-size: 18px; font-weight: 600;">${redeemedThisMonth} pts</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-bottom: 4px;">Lifetime Earned</div>
                            <div style="font-size: 18px; font-weight: 600;">${lifetimeEarned} pts</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cash Points Transaction History -->
            <div class="chart-card" style="overflow: hidden;">
                <div style="padding: 20px 24px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 12px;">
                    <div style="background: #fef2f2; color: #ef4444; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-history" style="font-size: 14px;"></i>
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0;">Cash Points Transaction History</h3>
                </div>

                <div style="padding: 0;">
                    ${visibleTransactions
                .map(
                    (transaction) => `
                        <div style="padding: 16px 24px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 16px; transition: background-color 0.15s ease;"
                             onmouseover="this.style.background='#f9fafb'"
                             onmouseout="this.style.background='white'">
                            <div style="background: ${this.getTransactionIconBg(
                        transaction.type
                    )}; color: ${this.getTransactionIconColor(
                        transaction.type
                    )}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fas fa-${this.getTransactionIcon(
                        transaction.type
                    )}" style="font-size: 16px;"></i>
                            </div>

                            <div style="flex: 1; min-width: 0;">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
                                    <h4 style="font-weight: 600; color: #111827; margin: 0; font-size: 16px;">${transaction.type
                        }</h4>
                                    <div style="text-align: right;">
                                        <div style="font-weight: 600; color: ${transaction.amount > 0
                            ? "#16a34a"
                            : "#ef4444"
                        }; font-size: 16px;">
                                            ${transaction.amount > 0 ? "+" : ""
                        }${transaction.amount} pts
                                        </div>
                                        <div style="color: #6b7280; font-size: 12px; margin-top: 2px;">
                                            ${transaction.date}
                                        </div>
                                    </div>
                                </div>
                                <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.4;">${transaction.description
                        }</p>
                            </div>
                        </div>
                    `
                )
                .join("")}

                    ${this.mockCashPointsTransactions.length > 5
                ? `
                        <div style="padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb; background: #f9fafb;">
                            <button
                                onclick="dashboard.toggleTransactionHistory()"
                                style="background: none; border: 1px solid #d1d5db; color: #374151; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;"
                                onmouseover="this.style.background='#f3f4f6'; this.style.borderColor='#9ca3af'"
                                onmouseout="this.style.background='none'; this.style.borderColor='#d1d5db'"
                            >
                                ${this.expandedTransactions
                    ? "View Less"
                    : "View All Transactions"
                }
                            </button>
                        </div>
                    `
                : ""
            }
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Helper methods for My Wallet
    getTransactionIconBg(type) {
        switch (type.toLowerCase()) {
            case "earned":
                return "#dcfce7";
            case "redeemed":
                return "#fee2e2";
            case "transferred":
                return "#dbeafe";
            case "received":
                return "#f3e8ff";
            default:
                return "#f3f4f6";
        }
    }

    getTransactionIconColor(type) {
        switch (type.toLowerCase()) {
            case "earned":
                return "#16a34a";
            case "redeemed":
                return "#dc2626";
            case "transferred":
                return "#2563eb";
            case "received":
                return "#7c3aed";
            default:
                return "#6b7280";
        }
    }

    getTransactionIcon(type) {
        switch (type.toLowerCase()) {
            case "earned":
                return "plus";
            case "redeemed":
                return "minus";
            case "transferred":
                return "arrow-right";
            case "received":
                return "gift";
            default:
                return "circle";
        }
    }

    toggleTransactionHistory() {
        this.expandedTransactions = !this.expandedTransactions;
        this.renderMyWallet();
    }

    showTransferPoints() {
        // Reset transfer state
        this.transferPointsState = {
            step: "form",
            recipientType: "existing",
            recipientValue: "",
            amount: "",
            message: "",
            transferFee: 0,
            isLoading: false,
        };

        const modalContent = this.renderTransferPointsModal();
        this.showModal("transfer-points-modal", modalContent);
    }

    renderTransferPointsModal() {
        const {
            step,
            recipientType,
            recipientValue,
            amount,
            message,
            transferFee,
            isLoading,
        } = this.transferPointsState;
        const currentBalance = 5000;
        const minTransfer = 100;
        const maxTransfer = 2000;

        if (step === "success") {
            return `
                <div style="background: white; border-radius: 12px; max-width: 500px; width: 90vw; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 40px 20px; background: white; border-radius: 12px;">
                        <div style="background: #dcfce7; color: #16a34a; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                            <i class="fas fa-check" style="font-size: 32px;"></i>
                        </div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Transfer Successful!</h2>
                    <p style="color: #6b7280; font-size: 16px; margin: 0 0 24px 0;">
                        ${amount} points have been successfully transferred to ${recipientValue}
                    </p>
                    <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: left;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #6b7280;">Transfer Amount:</span>
                            <span style="font-weight: 600; color: #111827;">${amount} points</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #6b7280;">Transfer Fee:</span>
                            <span style="font-weight: 600; color: #111827;">${transferFee} points</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                            <span style="color: #111827; font-weight: 600;">Total Deducted:</span>
                            <span style="font-weight: 700; color: #ef4444;">${parseInt(amount) + transferFee
                } points</span>
                        </div>
                    </div>
                    <button
                        onclick="dashboard.closeModal()"
                        style="background: #ef4444; color: white; border: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px;"
                    >
                        Done
                    </button>
                    </div>
                </div>
            `;
        }

        if (step === "confirmation") {
            const totalDeduction = parseInt(amount) + transferFee;
            return `
                <div style="background: white; border-radius: 12px; max-width: 600px; width: 90vw; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 24px; background: white; border-radius: 12px;">
                        <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 24px 0;">Confirm Transfer</h2>

                    <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                        <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">Transfer Details</h3>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <span style="color: #6b7280;">Recipient:</span>
                            <span style="font-weight: 600; color: #111827;">${recipientValue}</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <span style="color: #6b7280;">Transfer Amount:</span>
                            <span style="font-weight: 600; color: #111827;">${amount} points</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <span style="color: #6b7280;">Transfer Fee:</span>
                            <span style="font-weight: 600; color: #111827;">${transferFee} points</span>
                        </div>

                        ${message
                    ? `
                            <div style="margin-bottom: 12px;">
                                <span style="color: #6b7280; display: block; margin-bottom: 4px;">Message:</span>
                                <span style="font-weight: 500; color: #111827; font-style: italic;">"${message}"</span>
                            </div>
                        `
                    : ""
                }

                        <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 16px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #111827; font-weight: 600;">Total Deducted:</span>
                                <span style="font-weight: 700; color: #ef4444; font-size: 18px;">${totalDeduction} points</span>
                            </div>
                        </div>
                    </div>

                    <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 12px; margin-bottom: 24px;">
                        <p style="color: #92400e; margin: 0; font-size: 14px;">
                            <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
                            The recipient will receive an email and SMS notification about this transfer.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button
                            onclick="dashboard.updateTransferPointsState({step: 'form'})"
                            style="background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;"
                        >
                            Back
                        </button>
                        <button
                            onclick="dashboard.processTransfer()"
                            style="background: #ef4444; color: white; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-weight: 600;"
                            ${isLoading ? "disabled" : ""}
                        >
                            ${isLoading ? "Processing..." : "Confirm Transfer"}
                        </button>
                    </div>
                    </div>
                </div>
            `;
        }

        // Form step
        return `
            <div style="background: white; border-radius: 12px; max-width: 500px; width: 90vw; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); position: relative;">
                <!-- Close Button -->
                <button onclick="dashboard.closeModal()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 20px; color: #6b7280; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='transparent'">
                    ×
                </button>

                <div style="padding: 32px; background: white; border-radius: 12px;">
                    <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 24px 0; text-align: center; font-family: 'Inter', sans-serif;">Transfer Cash Points</h2>

                    <!-- Info Alert -->
                    <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                        <p style="color: #92400e; margin: 0; font-size: 14px; font-family: 'Inter', sans-serif;">
                            The recipient will receive an email and SMS notification about this transfer.
                        </p>
                    </div>

                    <form onsubmit="dashboard.handleTransferForm(event)">
                        <!-- Recipient Type -->
                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 12px; font-size: 14px; font-family: 'Inter', sans-serif;">Recipient Type</label>
                            <div style="display: flex; gap: 24px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-family: 'Inter', sans-serif;">
                                    <input
                                        type="radio"
                                        name="recipientType"
                                        value="existing"
                                        ${recipientType === "existing" ? "checked" : ""}
                                        onchange="dashboard.updateTransferPointsState({recipientType: this.value})"
                                        style="margin: 0; width: 16px; height: 16px; accent-color: #2563eb;"
                                    >
                                    <span style="color: #374151; font-size: 14px;">Existing RedGirraffe User</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-family: 'Inter', sans-serif;">
                                    <input
                                        type="radio"
                                        name="recipientType"
                                        value="new"
                                        ${recipientType === "new" ? "checked" : ""}
                                        onchange="dashboard.updateTransferPointsState({recipientType: this.value})"
                                        style="margin: 0; width: 16px; height: 16px; accent-color: #2563eb;"
                                    >
                                    <span style="color: #374151; font-size: 14px;">New User</span>
                                </label>
                            </div>
                        </div>

                        <!-- Transfer Amount -->
                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px; font-family: 'Inter', sans-serif;">Transfer Amount</label>
                            <input
                                type="number"
                                value="${amount}"
                                onchange="dashboard.updateTransferPointsState({amount: this.value})"
                                placeholder="Enter number of points to transfer"
                                min="${minTransfer}"
                                max="${maxTransfer}"
                                style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;"
                                required
                            >
                            <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: #6b7280; font-family: 'Inter', sans-serif;">
                                <span>Available balance: ${currentBalance.toLocaleString()} Cash Points</span>
                                <span>Minimum transfer: ${minTransfer} Points</span>
                            </div>
                        </div>

                        <!-- Search User Section -->
                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px; font-family: 'Inter', sans-serif;">Email or Mobile</label>
                            <div style="display: flex; gap: 8px;">
                                <input
                                    type="text"
                                    value="${recipientValue}"
                                    onchange="dashboard.updateTransferPointsState({recipientValue: this.value})"
                                    placeholder="Enter email address or mobile number"
                                    style="flex: 1; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;"
                                    required
                                >
                                <button
                                    type="button"
                                    onclick="dashboard.searchUser()"
                                    style="background: #f87171; color: white; border: none; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; transition: background-color 0.2s;"
                                    onmouseover="this.style.backgroundColor='#ef4444'"
                                    onmouseout="this.style.backgroundColor='#f87171'"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <!-- Message -->
                        <div style="margin-bottom: 32px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px; font-size: 14px; font-family: 'Inter', sans-serif;">Message (Optional)</label>
                            <textarea
                                value="${message}"
                                onchange="dashboard.updateTransferPointsState({message: this.value})"
                                placeholder="Add a personal message to the recipient"
                                rows="4"
                                style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; resize: vertical; font-family: 'Inter', sans-serif;"
                            ></textarea>
                        </div>

                        <!-- Action Buttons -->
                        <div style="display: flex; gap: 12px; justify-content: center;">
                            <button
                                type="button"
                                onclick="dashboard.closeModal()"
                                style="background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px; font-family: 'Inter', sans-serif; transition: background-color 0.2s;"
                                onmouseover="this.style.backgroundColor='#e5e7eb'"
                                onmouseout="this.style.backgroundColor='#f3f4f6'"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                style="background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px; font-family: 'Inter', sans-serif; transition: background-color 0.2s;"
                                onmouseover="this.style.backgroundColor='#dc2626'"
                                onmouseout="this.style.backgroundColor='#ef4444'"
                            >
                                Transfer Points
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    updateTransferPointsState(updates) {
        this.transferPointsState = { ...this.transferPointsState, ...updates };

        // Calculate transfer fee based on amount
        if (updates.amount) {
            const amount = parseInt(updates.amount);
            const transferFee = amount > 500 ? 10 : 5; // Higher fee for larger transfers
            this.transferPointsState.transferFee = transferFee;
        }

        // Re-render modal with updated state
        const modalContent = this.renderTransferPointsModal();
        const modalBody = document.querySelector("#dynamic-modal .modal-body");
        if (modalBody) {
            modalBody.innerHTML = modalContent;
        }
    }

    searchUser() {
        const { recipientValue } = this.transferPointsState;

        if (!recipientValue.trim()) {
            this.showNotification("Please enter an email address or mobile number", "error");
            return;
        }

        // Simulate user search
        this.showNotification("Searching for user...", "info");

        setTimeout(() => {
            // Mock search result - in real implementation, this would be an API call
            const isEmail = recipientValue.includes('@');
            const isMobile = /^\d{10}$/.test(recipientValue.replace(/\D/g, ''));

            if (isEmail || isMobile) {
                this.showNotification(`User found: ${recipientValue}`, "success");
            } else {
                this.showNotification("Please enter a valid email address or 10-digit mobile number", "error");
            }
        }, 1000);
    }

    handleTransferForm(event) {
        event.preventDefault();

        const { recipientValue, amount } = this.transferPointsState;
        const currentBalance = 5000;
        const minTransfer = 100;
        const maxTransfer = 2000;

        // Validation
        if (!recipientValue.trim()) {
            this.showNotification("Please enter recipient details", "error");
            return;
        }

        if (!amount || parseInt(amount) < minTransfer) {
            this.showNotification(
                `Minimum transfer amount is ${minTransfer} points`,
                "error"
            );
            return;
        }

        if (parseInt(amount) > maxTransfer) {
            this.showNotification(
                `Maximum transfer amount is ${maxTransfer} points`,
                "error"
            );
            return;
        }

        if (
            parseInt(amount) + this.transferPointsState.transferFee >
            currentBalance
        ) {
            this.showNotification("Insufficient balance for this transfer", "error");
            return;
        }

        // Move to confirmation step
        this.updateTransferPointsState({ step: "confirmation" });
    }

    async processTransfer() {
        this.updateTransferPointsState({ isLoading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { recipientValue, amount, transferFee } = this.transferPointsState;

        // Add new transaction to history
        const newTransaction = {
            id: `TXN-${Date.now()}`,
            type: "Transferred",
            description: `Points transferred to ${recipientValue}`,
            amount: -(parseInt(amount) + transferFee),
            date: new Date().toLocaleDateString("en-GB"),
            balance: 5000 - (parseInt(amount) + transferFee),
            category: "Transfer",
            transactionId: `TXN-${Date.now()}`,
        };

        this.mockCashPointsTransactions.unshift(newTransaction);

        // Show success
        this.updateTransferPointsState({
            step: "success",
            isLoading: false,
        });

        // Refresh wallet if currently viewing
        setTimeout(() => {
            this.closeModal();
            this.renderMyWallet();
            this.showNotification("Points transferred successfully!", "success");
        }, 3000);
    }

    showPointsHistory() {
        // Initialize points history state
        if (!this.pointsHistoryState) {
            this.pointsHistoryState = {
                dateRange: "3months",
                transactionType: "all",
                searchQuery: "",
                currentPage: 1,
                itemsPerPage: 10,
                customDateFrom: "",
                customDateTo: "",
            };
        }

        const modalContent = this.renderPointsHistoryModal();
        this.showModal("points-history-modal", modalContent);
    }

    renderPointsHistoryModal() {
        const {
            dateRange,
            transactionType,
            searchQuery,
            currentPage,
            itemsPerPage,
        } = this.pointsHistoryState;

        // Filter transactions based on current filters
        const filteredTransactions = this.getFilteredPointsTransactions();
        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedTransactions = filteredTransactions.slice(
            startIndex,
            startIndex + itemsPerPage
        );

        return `
            <div style="background: white; border-radius: 12px; width: 90vw; max-width: 1000px; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="padding: 24px 24px 0 24px; border-bottom: 1px solid #e5e7eb; flex-shrink: 0; background: white; border-radius: 12px 12px 0 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0;">Monthly Points History</h2>
                        <button
                            onclick="dashboard.closeModal()"
                            style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 8px; font-size: 20px; line-height: 1;"
                        >×</button>
                    </div>

                    <!-- Filters -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 16px; margin-bottom: 20px;">
                        <!-- Date Range Filter -->
                        <div>
                            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 6px; font-size: 14px;">Date Range</label>
                            <select
                                onchange="dashboard.updatePointsHistoryFilter('dateRange', this.value)"
                                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                            >
                                <option value="30days" ${dateRange === "30days" ? "selected" : ""
            }>Last 30 Days</option>
                                <option value="3months" ${dateRange === "3months" ? "selected" : ""
            }>Last 3 Months</option>
                                <option value="6months" ${dateRange === "6months" ? "selected" : ""
            }>Last 6 Months</option>
                                <option value="1year" ${dateRange === "1year" ? "selected" : ""
            }>Last 1 Year</option>
                                <option value="custom" ${dateRange === "custom" ? "selected" : ""
            }>Custom Range</option>
                            </select>
                        </div>

                        <!-- Transaction Type Filter -->
                        <div>
                            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 6px; font-size: 14px;">Transaction Type</label>
                            <select
                                onchange="dashboard.updatePointsHistoryFilter('transactionType', this.value)"
                                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                            >
                                <option value="all" ${transactionType === "all" ? "selected" : ""
            }>All Types</option>
                                <option value="earned" ${transactionType === "earned" ? "selected" : ""
            }>Earned</option>
                                <option value="redeemed" ${transactionType === "redeemed"
                ? "selected"
                : ""
            }>Redeemed</option>
                                <option value="transferred" ${transactionType === "transferred"
                ? "selected"
                : ""
            }>Transferred</option>
                                <option value="received" ${transactionType === "received"
                ? "selected"
                : ""
            }>Received</option>
                            </select>
                        </div>

                        <!-- Search -->
                        <div>
                            <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 6px; font-size: 14px;">Search</label>
                            <input
                                type="text"
                                value="${searchQuery}"
                                onchange="dashboard.updatePointsHistoryFilter('searchQuery', this.value)"
                                placeholder="Search descriptions..."
                                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                            >
                        </div>

                        <!-- Export Button -->
                        <div style="display: flex; align-items: end;">
                            <button
                                onclick="dashboard.exportPointsHistory()"
                                style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 14px; white-space: nowrap;"
                            >
                                <i class="fas fa-download" style="margin-right: 6px;"></i>Export CSV
                            </button>
                        </div>
                    </div>

                    ${dateRange === "custom"
                ? `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                            <div>
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 6px; font-size: 14px;">From Date</label>
                                <input
                                    type="date"
                                    value="${this.pointsHistoryState.customDateFrom}"
                                    onchange="dashboard.updatePointsHistoryFilter('customDateFrom', this.value)"
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                >
                            </div>
                            <div>
                                <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 6px; font-size: 14px;">To Date</label>
                                <input
                                    type="date"
                                    value="${this.pointsHistoryState.customDateTo}"
                                    onchange="dashboard.updatePointsHistoryFilter('customDateTo', this.value)"
                                    style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                >
                            </div>
                        </div>
                    `
                : ""
            }

                    <!-- Results Summary -->
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
                        <span style="color: #6b7280; font-size: 14px;">
                            Showing ${startIndex + 1}-${Math.min(
                startIndex + itemsPerPage,
                filteredTransactions.length
            )} of ${filteredTransactions.length} transactions
                        </span>
                        <span style="color: #6b7280; font-size: 14px;">
                            Page ${currentPage} of ${totalPages}
                        </span>
                    </div>
                </div>

                <!-- Transaction Table -->
                <div style="flex: 1; overflow-y: auto; padding: 0 24px; background: white;">
                    <table style="width: 100%; border-collapse: collapse; background: white;">
                        <thead style="background: #f8fafc; position: sticky; top: 0; z-index: 1;">
                            <tr>
                                <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 2px solid #e5e7eb;">Date</th>
                                <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 2px solid #e5e7eb;">Type</th>
                                <th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 2px solid #e5e7eb;">Description</th>
                                <th style="padding: 12px 16px; text-align: right; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 2px solid #e5e7eb;">Amount</th>
                                <th style="padding: 12px 16px; text-align: right; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 2px solid #e5e7eb;">Balance</th>
                                <th style="padding: 12px 16px; text-align: center; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 2px solid #e5e7eb;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${paginatedTransactions
                .map(
                    (transaction) => `
                                <tr style="border-bottom: 1px solid #f3f4f6;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
                                    <td style="padding: 16px; color: #6b7280; font-size: 14px;">${transaction.date
                        }</td>
                                    <td style="padding: 16px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <div style="background: ${this.getTransactionIconBg(
                            transaction.type
                        )}; color: ${this.getTransactionIconColor(
                            transaction.type
                        )}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                                <i class="fas fa-${this.getTransactionIcon(
                            transaction.type
                        )}" style="font-size: 10px;"></i>
                                            </div>
                                            <span style="font-weight: 500; color: #111827; font-size: 14px;">${transaction.type
                        }</span>
                                        </div>
                                    </td>
                                    <td style="padding: 16px; color: #111827; font-size: 14px; max-width: 300px; word-wrap: break-word;">${transaction.description
                        }</td>
                                    <td style="padding: 16px; text-align: right; font-weight: 600; color: ${transaction.amount > 0
                            ? "#16a34a"
                            : "#ef4444"
                        }; font-size: 14px;">
                                        ${transaction.amount > 0 ? "+" : ""}${transaction.amount
                        } pts
                                    </td>
                                    <td style="padding: 16px; text-align: right; font-weight: 600; color: #111827; font-size: 14px;">${transaction.balance.toLocaleString()} pts</td>
                                    <td style="padding: 16px; text-align: center;">
                                        <span style="background: #dcfce7; color: #16a34a; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500;">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            `
                )
                .join("")}
                        </tbody>
                    </table>

                    ${filteredTransactions.length === 0
                ? `
                        <div style="text-align: center; padding: 40px 20px; color: #6b7280;">
                            <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                            <p style="font-size: 16px; margin: 0;">No transactions found matching your criteria</p>
                        </div>
                    `
                : ""
            }
                </div>

                <!-- Pagination -->
                ${totalPages > 1
                ? `
                    <div style="padding: 20px 24px; border-top: 1px solid #e5e7eb; flex-shrink: 0; background: white; border-radius: 0 0 12px 12px;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                            <button
                                onclick="dashboard.updatePointsHistoryFilter('currentPage', ${currentPage - 1
                })"
                                ${currentPage === 1 ? "disabled" : ""}
                                style="background: ${currentPage === 1 ? "#f3f4f6" : "#ef4444"
                }; color: ${currentPage === 1 ? "#9ca3af" : "white"
                }; border: none; padding: 8px 12px; border-radius: 6px; cursor: ${currentPage === 1 ? "not-allowed" : "pointer"
                }; font-weight: 500;"
                            >
                                Previous
                            </button>

                            ${Array.from(
                    { length: Math.min(5, totalPages) },
                    (_, i) => {
                        const pageNum =
                            Math.max(
                                1,
                                Math.min(totalPages - 4, currentPage - 2)
                            ) + i;
                        return `
                                    <button
                                        onclick="dashboard.updatePointsHistoryFilter('currentPage', ${pageNum})"
                                        style="background: ${pageNum === currentPage
                                ? "#ef4444"
                                : "white"
                            }; color: ${pageNum === currentPage ? "white" : "#374151"
                            }; border: 1px solid ${pageNum === currentPage
                                ? "#ef4444"
                                : "#d1d5db"
                            }; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 500; min-width: 40px;"
                                    >
                                        ${pageNum}
                                    </button>
                                `;
                    }
                ).join("")}

                            <button
                                onclick="dashboard.updatePointsHistoryFilter('currentPage', ${currentPage + 1
                })"
                                ${currentPage === totalPages ? "disabled" : ""}
                                style="background: ${currentPage === totalPages
                    ? "#f3f4f6"
                    : "#ef4444"
                }; color: ${currentPage === totalPages ? "#9ca3af" : "white"
                }; border: none; padding: 8px 12px; border-radius: 6px; cursor: ${currentPage === totalPages ? "not-allowed" : "pointer"
                }; font-weight: 500;"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                `
                : ""
            }
            </div>
        `;
    }

    updatePointsHistoryFilter(key, value) {
        this.pointsHistoryState[key] = value;

        // Reset to first page when filters change (except when changing page)
        if (key !== "currentPage") {
            this.pointsHistoryState.currentPage = 1;
        }

        // Re-render modal with updated filters
        const modalContent = this.renderPointsHistoryModal();
        const modalBody = document.querySelector("#dynamic-modal .modal-body");
        if (modalBody) {
            modalBody.innerHTML = modalContent;
        }
    }

    getFilteredPointsTransactions() {
        let filtered = [...this.mockCashPointsTransactions];
        const {
            dateRange,
            transactionType,
            searchQuery,
            customDateFrom,
            customDateTo,
        } = this.pointsHistoryState;

        // Filter by date range
        if (dateRange !== "all") {
            const now = new Date();
            let cutoffDate;

            switch (dateRange) {
                case "30days":
                    cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    break;
                case "3months":
                    cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                    break;
                case "6months":
                    cutoffDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
                    break;
                case "1year":
                    cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                    break;
                case "custom":
                    if (customDateFrom && customDateTo) {
                        const fromDate = new Date(customDateFrom);
                        const toDate = new Date(customDateTo);
                        filtered = filtered.filter((transaction) => {
                            const transactionDate = this.parseDate(transaction.date);
                            return transactionDate >= fromDate && transactionDate <= toDate;
                        });
                    }
                    break;
            }

            if (dateRange !== "custom" && cutoffDate) {
                filtered = filtered.filter((transaction) => {
                    const transactionDate = this.parseDate(transaction.date);
                    return transactionDate >= cutoffDate;
                });
            }
        }

        // Filter by transaction type
        if (transactionType !== "all") {
            filtered = filtered.filter(
                (transaction) =>
                    transaction.type.toLowerCase() === transactionType.toLowerCase()
            );
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (transaction) =>
                    transaction.description.toLowerCase().includes(query) ||
                    transaction.type.toLowerCase().includes(query) ||
                    transaction.transactionId.toLowerCase().includes(query)
            );
        }

        return filtered;
    }

    parseDate(dateString) {
        // Parse DD-MM-YYYY format
        const [day, month, year] = dateString.split("-");
        return new Date(year, month - 1, day);
    }

    exportPointsHistory() {
        const filteredTransactions = this.getFilteredPointsTransactions();

        if (filteredTransactions.length === 0) {
            this.showNotification("No transactions to export", "error");
            return;
        }

        // Create CSV content
        const headers = [
            "Date",
            "Transaction ID",
            "Type",
            "Description",
            "Amount (Points)",
            "Balance (Points)",
            "Category",
        ];
        const csvContent = [
            headers.join(","),
            ...filteredTransactions.map((transaction) =>
                [
                    transaction.date,
                    transaction.transactionId,
                    transaction.type,
                    `"${transaction.description}"`, // Wrap in quotes to handle commas
                    transaction.amount,
                    transaction.balance,
                    transaction.category,
                ].join(",")
            ),
        ].join("\n");

        // Create and download file
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `points-history-${new Date().toISOString().split("T")[0]}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification(
            `Exported ${filteredTransactions.length} transactions to CSV`,
            "success"
        );
    }

    closeNotice(button) {
        const notice = button.closest('div[style*="background: #fef3c7"]');
        if (notice) {
            notice.style.display = "none";
        }
    }

    // Gift Cards Helper Methods
    getFilteredGiftCards() {
        if (!this.giftCardsState) return this.mockGiftCards;

        const { selectedCategory, searchTerm, sortBy } = this.giftCardsState;
        let filtered = [...this.mockGiftCards];

        // Filter by category
        if (selectedCategory !== "All Products") {
            filtered = filtered.filter((card) => card.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (card) =>
                    card.name.toLowerCase().includes(term) ||
                    card.brand.toLowerCase().includes(term) ||
                    card.description.toLowerCase().includes(term)
            );
        }

        // Sort cards
        switch (sortBy) {
            case "discount-high":
                filtered.sort((a, b) => b.discount - a.discount);
                break;
            case "discount-low":
                filtered.sort((a, b) => a.discount - b.discount);
                break;
            case "popularity":
                filtered.sort((a, b) => b.popularity - a.popularity);
                break;
            case "recent":
                filtered.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
                break;
            default:
                // Default sorting by popularity
                filtered.sort((a, b) => b.popularity - a.popularity);
        }

        return filtered;
    }

    getCategoryCount(category) {
        if (category === "All Products") {
            return this.mockGiftCards.length;
        }
        return this.mockGiftCards.filter((card) => card.category === category)
            .length;
    }

    renderGiftCardItem(card) {
        return `
            <div class="chart-card gift-card-item" style="overflow: hidden; transition: all 0.3s ease; cursor: pointer;"
                 onclick="dashboard.openGiftCardDetail('${card.id}')"
                 onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)';"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)';">

                <div style="position: relative; height: 160px; overflow: hidden; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
                    <div style="position: absolute; top: 8px; right: 8px; z-index: 10;">
                        <span style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                            ${card.discount}% OFF
                        </span>
                    </div>
                    ${card.isPopular
                ? `
                        <div style="position: absolute; top: 8px; left: 8px; z-index: 10;">
                            <span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                                Popular
                            </span>
                        </div>
                    `
                : ""
            }
                    <img
                        src="${card.image}"
                        alt="${card.name}"
                        style="width: 100%; height: 100%; object-fit: contain; padding: 20px; transition: transform 0.3s ease;"
                        onmouseover="this.style.transform='scale(1.05)'"
                        onmouseout="this.style.transform='scale(1)'"
                    />
                </div>

                <div style="padding: 16px;">
                    <h3 style="font-weight: 600; color: #111827; margin: 0 0 4px 0; font-size: 16px; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${card.name}
                    </h3>
                    <p style="color: #6b7280; font-size: 13px; margin: 0 0 12px 0; line-height: 1.4; height: 32px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                        ${card.description}
                    </p>

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="background: #f3f4f6; color: #6b7280; padding: 4px 8px; border-radius: 12px; font-size: 12px;">
                            ${card.category}
                        </span>
                        <div style="text-align: right;">
                            <div style="font-size: 14px; font-weight: 600; color: #111827;">₹${card.denomination.toLocaleString()}</div>
                            <div style="font-size: 12px; color: #10b981;">Save ₹${(
                card.denomination - card.finalPrice
            ).toLocaleString()}</div>
                        </div>
                    </div>

                    <button
                        onclick="event.stopPropagation(); dashboard.openGiftCardDetail('${card.id
            }')"
                        style="width: 100%; background: #ef4444; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px; transition: background 0.2s ease;"
                        onmouseover="this.style.background='#dc2626'"
                        onmouseout="this.style.background='#ef4444'"
                    >
                        Purchase
                    </button>
                </div>
            </div>
        `;
    }

    // Gift Cards Event Handlers
    updateGiftCardSearch(searchTerm) {
        if (!this.giftCardsState) return;
        this.giftCardsState.searchTerm = searchTerm;
        this.giftCardsState.currentPage = 1;
        this.giftCardsState.filteredCards = this.getFilteredGiftCards();
        this.renderGiftCards();
    }

    updateGiftCardCategory(category) {
        if (!this.giftCardsState) return;
        this.giftCardsState.selectedCategory = category;
        this.giftCardsState.currentPage = 1;
        this.giftCardsState.filteredCards = this.getFilteredGiftCards();
        this.renderGiftCards();
    }

    updateGiftCardSort(sortBy) {
        if (!this.giftCardsState) return;
        this.giftCardsState.sortBy = sortBy;
        this.giftCardsState.currentPage = 1;
        this.giftCardsState.filteredCards = this.getFilteredGiftCards();
        this.renderGiftCards();
    }

    changeGiftCardPage(page) {
        if (!this.giftCardsState) return;
        this.giftCardsState.currentPage = page;
        this.renderGiftCards();
        // Scroll to top of gift cards section
        document
            .querySelector(".gift-cards-container")
            ?.scrollIntoView({ behavior: "smooth" });
    }

    clearGiftCardFilters() {
        if (!this.giftCardsState) return;
        this.giftCardsState.selectedCategory = "All Products";
        this.giftCardsState.searchTerm = "";
        this.giftCardsState.sortBy = "default";
        this.giftCardsState.currentPage = 1;
        this.giftCardsState.filteredCards = this.getFilteredGiftCards();
        this.renderGiftCards();
    }

    openGiftCardDetail(cardId) {
        const card = this.mockGiftCards.find((c) => c.id === cardId);
        if (!card) return;

        this.showGiftCardDetailModal(card);
    }

    showPurchaseGuide() {
        this.showModal("purchase-guide-modal", this.renderPurchaseGuideModal());
    }

    showGiftCardDetailModal(card) {
        // Initialize form state
        this.giftCardFormState = {
            card: card,
            denomination: "2000",
            quantity: "1",
            gstNumber: false,
            gstDetails: "",
            deliveryOption: "self",
            cardDeliveryOptions: {}, // Individual card delivery options
            activeTab: "description",
            receiverName: "",
            receiverMobile: "",
            receiverEmail: "",
            receiverMessage: "",
        };

        this.showModal(
            "gift-card-detail-modal",
            this.renderGiftCardDetailModal(card)
        );
    }

    renderGiftCardDetailModal(card) {
        const { denomination, quantity, gstNumber, gstDetails, deliveryOption } =
            this.giftCardFormState;

        // Calculate values
        const totalValue =
            parseInt(denomination || "0") * parseInt(quantity || "0");
        const redemptionPercentage = parseFloat(
            card.redemptionValue.replace("%", "")
        );
        const savings = Math.round(
            (totalValue * (100 - redemptionPercentage)) / 100
        );
        const netPayable = totalValue - savings;

        return `
            <div style="max-width: 900px; width: 90vw; max-height: 90vh; overflow-y: auto; background: white; border-radius: 12px;">
                <div style="padding: 24px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="font-size: 20px; font-weight: 700; color: #ef4444; margin: 0;">${card.name
            }</h2>
                    <button onclick="dashboard.closeModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 4px;">×</button>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 24px;">
                    <!-- Left Column - Card Image and Info -->
                    <div>
                        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; padding: 16px;">
                            <img src="${card.image}" alt="${card.name
            }" style="width: 100%; height: auto; object-fit: contain;" />
                        </div>

                        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 12px;">
                                <div style="background: #fef2f2; color: #ef4444; padding: 8px; border-radius: 50%; flex-shrink: 0;">
                                    <i class="fas fa-check" style="font-size: 14px;"></i>
                                </div>
                                <p style="margin: 0; font-size: 14px; color: #374151;">
                                    <strong>Pay ${(100 - card.discount).toFixed(
                1
            )}%</strong> value of the Gift Card with your RedGirraffe Cash Points.
                                </p>
                            </div>

                            <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 12px;">
                                <div style="background: #fef2f2; color: #ef4444; padding: 8px; border-radius: 50%; flex-shrink: 0;">
                                    <i class="fas fa-check" style="font-size: 14px;"></i>
                                </div>
                                <p style="margin: 0; font-size: 14px; color: #374151;">
                                    <strong>Delivery Mode:</strong> Email Only
                                </p>
                            </div>

                            <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 12px;">
                                <div style="background: #fef2f2; color: #ef4444; padding: 8px; border-radius: 50%; flex-shrink: 0;">
                                    <i class="fas fa-check" style="font-size: 14px;"></i>
                                </div>
                                <p style="margin: 0; font-size: 14px; color: #374151;">
                                    <strong>Validity:</strong> ${card.terms}
                                </p>
                            </div>

                            <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 12px;">
                                <div style="background: #fef2f2; color: #ef4444; padding: 8px; border-radius: 50%; flex-shrink: 0;">
                                    <i class="fas fa-check" style="font-size: 14px;"></i>
                                </div>
                                <p style="margin: 0; font-size: 14px; color: #374151;">
                                    For quantity above 4 it may take 1 minute or more to fulfill the order; please wait while the order is being processed.
                                </p>
                            </div>

                            <div style="display: flex; align-items: start; gap: 12px;">
                                <div style="background: #fef2f2; color: #ef4444; padding: 8px; border-radius: 50%; flex-shrink: 0;">
                                    <i class="fas fa-check" style="font-size: 14px;"></i>
                                </div>
                                <p style="margin: 0; font-size: 14px; color: #374151;">
                                    Please ensure email ID is correct and active. All e-Gift Cards will be emailed to your registered email ID.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Purchase Form -->
                    <div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px;">
                                Enter Denomination <span style="color: #ef4444;">*</span>
                            </label>
                            <input
                                type="number"
                                value="${denomination}"
                                onchange="dashboard.updateGiftCardForm('denomination', this.value)"
                                style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                placeholder="Enter denomination"
                            />
                            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0;">Min: ₹2000 Max: ₹100000</p>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px;">
                                Enter Quantity <span style="color: #ef4444;">*</span>
                            </label>
                            <input
                                type="number"
                                value="${quantity}"
                                onchange="dashboard.updateGiftCardForm('quantity', this.value)"
                                style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                min="1" max="10"
                            />
                            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0;">Min: 1 Max: 10</p>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                <input
                                    type="checkbox"
                                    ${gstNumber ? "checked" : ""}
                                    onchange="dashboard.updateGiftCardForm('gstNumber', this.checked)"
                                    style="width: 16px; height: 16px;"
                                />
                                <span style="font-size: 14px; color: #374151;">I have a GST Number</span>
                            </label>
                        </div>

                        ${gstNumber
                ? `
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 8px;">
                                    GST Details <span style="color: #ef4444;">*</span>
                                </label>
                                <input
                                    type="text"
                                    value="${gstDetails}"
                                    onchange="dashboard.updateGiftCardForm('gstDetails', this.value)"
                                    style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                    placeholder="Enter your GST number"
                                />
                            </div>
                        `
                : ""
            }

                        <!-- Price Summary -->
                        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: #374151; font-size: 14px;">Total value of CHECKOUT e-Gift Card:</span>
                                <span style="font-weight: 600; color: #111827;">₹ ${totalValue.toLocaleString()}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="color: #374151; font-size: 14px;">Your <strong>SAVINGS</strong> by redeeming RedGirraffe Cash Points:</span>
                                <span style="font-weight: 600; color: #10b981;">[-] ₹ ${savings.toLocaleString()}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                                <span style="font-weight: 600; color: #111827;">Net Amount Payable today:</span>
                                <span style="font-weight: 700; color: #111827; font-size: 16px;">₹ ${netPayable.toLocaleString()}</span>
                            </div>
                        </div>

                        ${this.renderDeliveryOptions()}

                        <div style="display: flex; gap: 12px; margin-top: 24px;">
                            <button
                                onclick="dashboard.closeModal()"
                                style="flex: 1; background: white; border: 1px solid #d1d5db; color: #374151; padding: 12px; border-radius: 6px; font-weight: 500; cursor: pointer;"
                            >
                                Back
                            </button>
                            <button
                                onclick="dashboard.proceedToPurchase()"
                                style="flex: 2; background: #ef4444; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: 600; cursor: pointer;"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tabs Section -->
                ${this.renderGiftCardTabs()}
            </div>
        `;
    }

    renderGiftCardTabs() {
        const { activeTab } = this.giftCardFormState;

        return `
            <div style="margin-top: 32px; border-top: 1px solid #e5e7eb; padding: 24px;">
                <div style="display: flex; background: #f3f4f6; padding: 4px; border-radius: 8px; margin-bottom: 24px;">
                    <button
                        onclick="dashboard.updateGiftCardForm('activeTab', 'description')"
                        style="flex: 1; padding: 8px 16px; font-size: 14px; font-weight: 500; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s; ${
                            activeTab === 'description'
                                ? 'background: white; color: #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.1);'
                                : 'background: transparent; color: #6b7280;'
                        }"
                    >
                        Description
                    </button>
                    <button
                        onclick="dashboard.updateGiftCardForm('activeTab', 'terms')"
                        style="flex: 1; padding: 8px 16px; font-size: 14px; font-weight: 500; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s; ${
                            activeTab === 'terms'
                                ? 'background: white; color: #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.1);'
                                : 'background: transparent; color: #6b7280;'
                        }"
                    >
                        Terms & Condition
                    </button>
                    <button
                        onclick="dashboard.updateGiftCardForm('activeTab', 'redeem')"
                        style="flex: 1; padding: 8px 16px; font-size: 14px; font-weight: 500; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s; ${
                            activeTab === 'redeem'
                                ? 'background: white; color: #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.1);'
                                : 'background: transparent; color: #6b7280;'
                        }"
                    >
                        How to Redeem
                    </button>
                </div>

                <!-- Tab Content -->
                <div style="min-height: 200px; padding: 0 24px;">
                    ${this.renderTabContent(activeTab)}
                </div>
            </div>
        `;
    }

    renderTabContent(activeTab) {
        switch (activeTab) {
            case 'description':
                return `
                    <div>
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #111827;">Description</h3>
                        <div style="color: #374151; line-height: 1.6;">
                            <p>
                                BigBasket.com (Innovative Retail Concepts Private Limited) is India's largest online food and grocery store. With over 18,000 products and over a 1000 brands in our catalogue you will find everything you are looking for. Right from fresh Fruits and Vegetables, Rice and Dals, Spices and Seasonings to Packaged products, Beverages, Personal care products, Meats – we have it all. Choose from a wide range of options in every category, exclusively handpicked to help you find the best quality available at the lowest prices. Select a time slot for delivery and your order will be delivered right to your doorstep, anywhere in Bangalore, Hyderabad, Mumbai, Pune, Chennai, Delhi, Noida, Mysore, Coimbatore, Vijayawada, Madurai, Nashik, Lucknow, Kolkata, Ahmedabad, Ghaziabad, Chandigarh, Surat, Nagpur, Patna, Indore and Chandigarh Tricity You can pay online using your debit / credit card or by cash / sodexo on delivery. We guarantee on time delivery, and the best quality!
                            </p>
                        </div>
                    </div>
                `;
            case 'terms':
                return `
                    <div>
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #111827;">Terms & Conditions</h3>
                        <div style="color: #374151;">
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="margin-bottom: 8px;">• This e-Gift Card is valid for 12 months from the date of issue.</li>
                                <li style="margin-bottom: 8px;">• This e-Gift Card can be used only once and cannot be used partially.</li>
                                <li style="margin-bottom: 8px;">• This e-Gift Card cannot be exchanged for cash or returned.</li>
                                <li style="margin-bottom: 8px;">• This e-Gift Card is valid only on BigBasket.com and BigBasket mobile app.</li>
                                <li style="margin-bottom: 8px;">• Multiple e-Gift Cards can be used in a single transaction.</li>
                                <li style="margin-bottom: 8px;">• This e-Gift Card cannot be clubbed with any other offer or promotion.</li>
                                <li style="margin-bottom: 8px;">• BigBasket reserves the right to modify or cancel this offer at any time.</li>
                                <li style="margin-bottom: 8px;">• In case of any dispute, BigBasket's decision will be final.</li>
                                <li style="margin-bottom: 8px;">• For any queries related to this e-Gift Card, please contact BigBasket customer support.</li>
                            </ul>
                        </div>
                    </div>
                `;
            case 'redeem':
                return `
                    <div>
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #111827;">How to Redeem</h3>
                        <div style="color: #374151;">
                            <ol style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <span style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; margin-top: 2px; flex-shrink: 0;">1</span>
                                    <span>Visit BigBasket.com or download the BigBasket mobile app.</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <span style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; margin-top: 2px; flex-shrink: 0;">2</span>
                                    <span>Browse and add your desired products to the cart.</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <span style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; margin-top: 2px; flex-shrink: 0;">3</span>
                                    <span>Proceed to checkout and select your delivery slot.</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <span style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; margin-top: 2px; flex-shrink: 0;">4</span>
                                    <span>On the payment page, select "Gift Card" as your payment method.</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <span style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; margin-top: 2px; flex-shrink: 0;">5</span>
                                    <span>Enter your e-Gift Card number and PIN received via email.</span>
                                </li>
                                <li style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <span style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; margin-top: 2px; flex-shrink: 0;">6</span>
                                    <span>Complete your order and enjoy your shopping!</span>
                                </li>
                            </ol>
                            <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
                                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                                    <strong>Note:</strong> If your order value exceeds the e-Gift Card amount, you can pay the remaining balance using other payment methods.
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    renderDeliveryOptions() {
        const {
            quantity,
            cardDeliveryOptions,
            receiverName,
            receiverMobile,
            receiverEmail,
            receiverMessage,
        } = this.giftCardFormState;

        const giftCardCount = parseInt(quantity || "1");
        let giftCardsHTML = "";

        // Generate gift card sections based on quantity
        for (let i = 1; i <= giftCardCount; i++) {
            const currentDeliveryOption = cardDeliveryOptions[i] || "self";

            giftCardsHTML += `
                <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                    <div style="background: #f9fafb; padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                        <h3 style="font-weight: 600; color: #111827; margin: 0; font-size: 16px;">GIFT CARD - ${i}</h3>
                    </div>
                    <div style="padding: 16px;">
                        <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 16px;">
                            <h4 style="font-weight: 500; color: #374151; margin: 0;">Delivery Options</h4>
                            <div style="display: flex; gap: 16px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input
                                        type="radio"
                                        name="deliveryOption_${i}"
                                        value="gift"
                                        ${currentDeliveryOption === "gift" ? "checked" : ""}
                                        onchange="dashboard.updateGiftCardForm('deliveryOption', 'gift', ${i})"
                                        style="width: 16px; height: 16px;"
                                    />
                                    <span style="font-size: 14px; color: #374151;">Send as Gift</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input
                                        type="radio"
                                        name="deliveryOption_${i}"
                                        value="self"
                                        ${currentDeliveryOption === "self" ? "checked" : ""}
                                        onchange="dashboard.updateGiftCardForm('deliveryOption', 'self', ${i})"
                                        style="width: 16px; height: 16px;"
                                    />
                                    <span style="font-size: 14px; color: #374151;">Buy for Self</span>
                                </label>
                            </div>
                        </div>

                        ${currentDeliveryOption === "gift"
                            ? `
                                <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
                                    <h5 style="font-weight: 500; color: #ef4444; margin: 0 0 16px 0; font-size: 14px;">Gift Recipient Details</h5>

                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                                        <div>
                                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px; font-size: 14px;">
                                                Receiver's Name <span style="color: #ef4444;">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value="${receiverName}"
                                                onchange="dashboard.updateGiftCardForm('receiverName', this.value)"
                                                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                                placeholder="Enter receiver's full name"
                                            />
                                        </div>

                                        <div>
                                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px; font-size: 14px;">
                                                Mobile Number <span style="color: #ef4444;">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value="${receiverMobile}"
                                                onchange="dashboard.updateGiftCardForm('receiverMobile', this.value)"
                                                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                                placeholder="Enter receiver's mobile number"
                                            />
                                        </div>
                                    </div>

                                    <div style="margin-bottom: 16px;">
                                        <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px; font-size: 14px;">
                                            Email ID <span style="color: #ef4444;">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value="${receiverEmail}"
                                            onchange="dashboard.updateGiftCardForm('receiverEmail', this.value)"
                                            style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                                            placeholder="Enter receiver's email address"
                                        />
                                    </div>

                                    <div>
                                        <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px; font-size: 14px;">
                                            Message for Receiver <span style="color: #ef4444;">*</span>
                                        </label>
                                        <textarea
                                            value="${receiverMessage}"
                                            onchange="dashboard.updateGiftCardForm('receiverMessage', this.value)"
                                            style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; resize: none; height: 80px;"
                                            placeholder="Enter a personal message for the receiver"
                                        >${receiverMessage}</textarea>
                                    </div>
                                </div>
                            `
                            : ""
                        }
                    </div>
                </div>
            `;
        }

        return giftCardsHTML;
    }

    updateGiftCardForm(field, value, cardIndex = null) {
        if (!this.giftCardFormState) return;

        // Handle individual card delivery options
        if (field === 'deliveryOption' && cardIndex !== null) {
            if (!this.giftCardFormState.cardDeliveryOptions) {
                this.giftCardFormState.cardDeliveryOptions = {};
            }
            this.giftCardFormState.cardDeliveryOptions[cardIndex] = value;
        } else {
            this.giftCardFormState[field] = value;
        }

        const card = this.giftCardFormState.card;

        // Special handling for quantity changes - close and reopen modal
        if (field === 'quantity') {
            // Close the current modal first
            this.closeModal();

            // Small delay to ensure modal is closed before reopening
            setTimeout(() => {
                this.showModal(
                    "gift-card-detail-modal",
                    this.renderGiftCardDetailModal(card)
                );
            }, 100);
        } else {
            // For other fields, just re-render the modal
            this.showModal(
                "gift-card-detail-modal",
                this.renderGiftCardDetailModal(card)
            );
        }
    }

    proceedToPurchase() {
        const {
            card,
            denomination,
            quantity,
            gstNumber,
            gstDetails,
            cardDeliveryOptions,
            receiverName,
            receiverMobile,
            receiverEmail,
            receiverMessage,
        } = this.giftCardFormState;

        // Validation
        if (!denomination || !quantity) {
            this.showNotification(
                "Please fill in denomination and quantity",
                "error"
            );
            return;
        }

        if (gstNumber && !gstDetails.trim()) {
            this.showNotification("Please enter your GST details", "error");
            return;
        }

        // Check if any card is set to gift and validate recipient details
        const giftCardCount = parseInt(quantity || "1");
        let hasGiftCards = false;

        for (let i = 1; i <= giftCardCount; i++) {
            const cardDeliveryOption = cardDeliveryOptions[i] || "self";
            if (cardDeliveryOption === "gift") {
                hasGiftCards = true;
                break;
            }
        }

        if (hasGiftCards) {
            if (
                !receiverName.trim() ||
                !receiverMobile.trim() ||
                !receiverEmail.trim() ||
                !receiverMessage.trim()
            ) {
                this.showNotification(
                    "Please fill in all required gift recipient details for gift cards",
                    "error"
                );
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(receiverEmail)) {
                this.showNotification("Please enter a valid email address", "error");
                return;
            }

            // Basic mobile validation (10 digits)
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(receiverMobile.replace(/\D/g, ""))) {
                this.showNotification(
                    "Please enter a valid 10-digit mobile number",
                    "error"
                );
                return;
            }
        }

        // Calculate final amount
        const totalValue = parseInt(denomination) * parseInt(quantity);
        const redemptionPercentage = parseFloat(
            card.redemptionValue.replace("%", "")
        );
        const savings = Math.round(
            (totalValue * (100 - redemptionPercentage)) / 100
        );
        const netPayable = totalValue - savings;

        // Generate order ID
        const orderId = `REDG-${Date.now()}`;

        // Show payment gateway
        this.showPaymentGateway(netPayable, orderId, card.name);
    }

    showPaymentGateway(amount, orderId, productName) {
        this.paymentState = {
            amount: amount,
            orderId: orderId,
            productName: productName,
            step: "options",
            selectedOption: "UPI - FREE",
            isLoading: false,
        };

        this.showModal("payment-gateway-modal", this.renderPaymentGatewayModal());
    }

    renderPaymentGatewayModal() {
        const { amount, orderId, productName, step, selectedOption, isLoading } =
            this.paymentState;

        if (step === "success") {
            return `
                <div style="max-width: 500px; width: 90vw; background: white; border-radius: 12px; padding: 48px; text-align: center;">
                    <div style="width: 64px; height: 64px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                        <i class="fas fa-check" style="color: #16a34a; font-size: 24px;"></i>
                    </div>

                    <h3 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">Payment Successful!</h3>
                    <p style="color: #6b7280; margin: 0 0 8px 0; line-height: 1.5;">
                        Your payment of ₹${amount.toLocaleString()} has been processed successfully. Your gift card will be sent to your registered email shortly.
                    </p>
                    <p style="color: #ef4444; font-weight: 500; font-size: 14px; margin: 0 0 32px 0;">Order ID: ${orderId}</p>

                    <button
                        onclick="dashboard.completePayment()"
                        style="background: #ef4444; color: white; border: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 16px; width: 100%;"
                    >
                        Done
                    </button>
                </div>
            `;
        }

        return `
            <div style="max-width: 800px; width: 90vw; background: white; border-radius: 12px; overflow: hidden;">
                <!-- Header -->
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; background: white; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-credit-card" style="font-size: 14px;"></i>
                        </div>
                        <div>
                            <p style="font-weight: 600; color: #111827; margin: 0; font-size: 16px;">Gift Card Purchase Payment</p>
                            <div style="display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                                <span style="background: #dcfce7; color: #16a34a; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 500; display: flex; align-items: center; gap: 4px;">
                                    <i class="fas fa-check" style="font-size: 10px;"></i> Razorpay Trusted Business
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onclick="dashboard.closeModal()"
                        style="background: none; border: none; font-size: 20px; color: #6b7280; cursor: pointer; padding: 4px; border-radius: 4px;"
                    >×</button>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 3fr; padding: 24px;">
                    <!-- Left Panel - Price Summary -->
                    <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 24px;">
                        <div style="margin-bottom: 24px;">
                            <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0 0 4px 0;">Price Summary</p>
                            <p style="font-size: 28px; font-weight: 700; margin: 0;">₹${amount.toLocaleString()}</p>
                        </div>

                        <div style="background: rgba(185,28,28,0.5); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 24px;">
                            <div style="background: #b91c1c; border-radius: 50%; padding: 6px;">
                                <i class="fas fa-user" style="font-size: 12px;"></i>
                            </div>
                            <span style="font-size: 14px;">Using as +91 80101 91019</span>
                            <i class="fas fa-chevron-right" style="font-size: 12px; margin-left: auto;"></i>
                        </div>

                        <div style="margin-top: auto;">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-razorpay-1649771-1399875.png" alt="Razorpay" style="height: 24px; opacity: 0.9;" />
                            <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 8px 0 0 0;">Secured by</p>
                        </div>
                    </div>

                    <!-- Right Panel - Payment Options -->
                    <div style="padding: 24px;">
                        ${isLoading
                ? `
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; gap: 16px;">
                                <div style="width: 48px; height: 48px; border: 4px solid #ef4444; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                                <p style="color: #6b7280; margin: 0;">Processing your payment...</p>
                            </div>
                        `
                : `
                            <div style="margin-bottom: 24px;">
                                <p style="font-weight: 600; color: #111827; margin: 0 0 16px 0;">Payment Options</p>
                                <div style="background: #f3f4f6; padding: 12px; border-radius: 6px;">
                                    <div style="display: flex; align-items: center; justify-content: space-between;">
                                        <p style="font-weight: 500; color: #111827; margin: 0;">${selectedOption}</p>
                                        <i class="fas fa-check" style="color: #ef4444; font-size: 16px;"></i>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-bottom: 24px;">
                                <p style="font-weight: 600; color: #111827; margin: 0 0 16px 0;">Recommended</p>
                                <div
                                    onclick="dashboard.processPayment()"
                                    style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s;"
                                    onmouseover="this.style.borderColor='#ef4444'; this.style.background='#fef2f2';"
                                    onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='white';"
                                >
                                    <div style="display: flex; align-items: center; gap: 16px;">
                                        <div style="color: #ef4444;">
                                            <i class="fas fa-credit-card" style="font-size: 24px;"></i>
                                        </div>
                                        <p style="font-weight: 500; color: #111827; margin: 0;">UPI</p>
                                    </div>
                                    <i class="fas fa-chevron-right" style="color: #9ca3af; font-size: 16px;"></i>
                                </div>
                            </div>

                            <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 24px 0 0 0;">
                                By proceeding, I agree to Razorpay's Privacy Notice
                            </p>
                        `
            }
                    </div>
                </div>
            </div>

            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
    }

    processPayment() {
        this.paymentState.isLoading = true;
        this.showModal("payment-gateway-modal", this.renderPaymentGatewayModal());

        // Simulate payment processing
        setTimeout(() => {
            this.paymentState.step = "success";
            this.paymentState.isLoading = false;
            this.showModal("payment-gateway-modal", this.renderPaymentGatewayModal());
        }, 2000);
    }

    completePayment() {
        // Add to purchase history
        const newPurchase = {
            id: Date.now().toString(),
            name: this.giftCardFormState.card.name,
            orderId: this.paymentState.orderId,
            amount: this.paymentState.amount,
            placedOn: new Date().toLocaleDateString("en-GB"),
            quantity: parseInt(this.giftCardFormState.quantity),
            status: "Active",
            paymentDetails: {
                totalValue: this.paymentState.amount + 6,
                savings: 6,
                netAmount: this.paymentState.amount,
            },
        };

        this.mockPurchases.unshift(newPurchase);

        this.closeModal();
        this.showNotification(
            "Purchase successful! Your e-Gift Card has been sent to your registered email.",
            "success"
        );

        // Reset form state
        this.giftCardFormState = null;
        this.paymentState = null;
    }

    // Modal System
    showModal(modalId, content) {
        // Remove existing modal
        const existingModal = document.getElementById("dynamic-modal");
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement("div");
        modal.id = "dynamic-modal";
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        modal.innerHTML = content;
        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);

        // Close on backdrop click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById("dynamic-modal");
        if (modal) {
            modal.style.opacity = "0";
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    renderPasswordChange() {
        const container = document.getElementById("profile-content");
        if (!container) return;

        let html = `
            <div class="chart-card">
                <div class="chart-header">
                    <div class="chart-title">Change Password</div>
                </div>
                <div style="padding: 20px;">
                    <div style="max-width: 400px;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px;">Current Password</label>
                            <input type="password" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px;">New Password</label>
                            <input type="password" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; font-weight: 500; color: #374151; margin-bottom: 4px;">Confirm New Password</label>
                            <input type="password" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
                        </div>
                        <button style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Update Password</button>
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    renderFAQ() {
        const container = document.getElementById("contact-content");
        if (!container) return;

        let html = `
            <div class="chart-card">
                <div class="chart-header">
                    <div class="chart-title">Frequently Asked Questions</div>
                </div>
                <div style="padding: 20px;">
                    <div style="space-y: 20px;">
                        <div style="margin-bottom: 20px;">
                            <h3 style="font-weight: 600; margin-bottom: 8px;">How do I make a payment?</h3>
                            <p style="color: #6b7280; line-height: 1.5;">You can make payments through multiple methods including credit/debit cards, UPI, net banking, and wallet. Simply navigate to the registration you want to pay for, click on "Make Payment", and follow the on-screen instructions.</p>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <h3 style="font-weight: 600; margin-bottom: 8px;">What are RedGirraffe Cash Points?</h3>
                            <p style="color: #6b7280; line-height: 1.5;">RedGirraffe Cash Points are reward points that you earn on every transaction. 1 Cash Point equals ₹1 and can be used for future payments. You can view your current Cash Points balance in the Rewards section.</p>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <h3 style="font-weight: 600; margin-bottom: 8px;">How do I add a new registration?</h3>
                            <p style="color: #6b7280; line-height: 1.5;">To add a new registration, go to the Registrations page and click on "Add New Registration". Fill in the required details based on the registration type (Rent, Education, or Society) and submit the form.</p>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <h3 style="font-weight: 600; margin-bottom: 8px;">How can I edit my registration details?</h3>
                            <p style="color: #6b7280; line-height: 1.5;">You can edit certain fields of your registration by going to the registration details page and clicking on the "Edit" button. Please note that some fields cannot be edited once the registration is approved.</p>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <h3 style="font-weight: 600; margin-bottom: 8px;">How do I contact customer support?</h3>
                            <p style="color: #6b7280; line-height: 1.5;">You can contact our customer support team through multiple channels:</p>
                            <ul style="margin-left: 20px; color: #6b7280; line-height: 1.5;">
                                <li>Email us at connect@redgirraffe.com</li>
                                <li>WhatsApp us at (+91) 80-1019-1019</li>
                                <li>Use the live chat feature in the Contact Us section</li>
                            </ul>
                        </div>
                        
                    </div>

                    <div style="margin-top: 30px; padding: 16px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
                        <h3 style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center;">
                            <i class="fas fa-question-circle" style="color: #ef4444; margin-right: 8px;"></i>
                            Still have questions?
                        </h3>
                        <p style="color: #6b7280; margin-bottom: 12px;">If you couldn't find the answer to your question, please contact our customer support team for personalized assistance.</p>
                        <button onclick="dashboard.switchContactTab('contact')" style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer;">Contact Support</button>
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    // Dashboard tab switching
    switchTab(tab) {
        // Update active tab styling - only for dashboard section tabs
        const dashboardSection = document.getElementById("dashboard-section");
        if (dashboardSection) {
            const dashboardTabs =
                dashboardSection.querySelectorAll(".header-nav-item");
            dashboardTabs.forEach((item) => {
                item.classList.remove("active");
            });

            // Find and activate the clicked tab within dashboard section
            let clickedTab = null;
            if (tab === "analytics") {
                clickedTab = Array.from(dashboardTabs).find((item) =>
                    item.textContent.toLowerCase().includes("analytics")
                );
            } else if (tab === "transactions-history") {
                clickedTab = Array.from(dashboardTabs).find((item) =>
                    item.textContent.toLowerCase().includes("transaction")
                );
            } else if (tab === "reports") {
                clickedTab = Array.from(dashboardTabs).find((item) =>
                    item.textContent.toLowerCase().includes("reports")
                );
            }

            if (clickedTab) {
                clickedTab.classList.add("active");
            }
        }

        // Load appropriate content based on tab
        switch (tab) {
            case "analytics":
                this.renderDashboardAnalytics();
                break;
            case "transactions-history":
                this.renderDashboardTransactions();
                break;
            case "reports":
                this.renderDashboardReports();
                break;
        }
    }

    renderDashboardAnalytics() {
        // This is already rendered in the main dashboard section
        // Just ensure the analytics content is visible
        const analyticsSection = document.querySelector(".analytics-grid");
        const analyticsChartsSection = document.querySelector(
            ".analytics-charts-grid"
        );
        const paymentMethodsSection = document.getElementById(
            "payment-methods-section"
        );
        const dashboardTransactionHistory = document.getElementById(
            "dashboard-transaction-history"
        );
        const warningBanner = document.getElementById("warning-banner");
        const dashboardReports = document.getElementById("dashboard-reports");

        if (analyticsSection) analyticsSection.style.display = "grid";
        if (analyticsChartsSection) analyticsChartsSection.style.display = "grid";
        if (paymentMethodsSection) paymentMethodsSection.style.display = "grid";
        if (warningBanner) warningBanner.style.display = "block";
        // Hide dashboard transaction history and reports when in analytics view
        if (dashboardTransactionHistory)
            dashboardTransactionHistory.style.display = "none";
        if (dashboardReports) dashboardReports.style.display = "none";
    }

    renderDashboardTransactions() {
        // Hide analytics cards, analytics charts, and Payment Methods section
        const analyticsSection = document.querySelector(".analytics-grid");
        const analyticsChartsSection = document.querySelector(
            ".analytics-charts-grid"
        );
        const paymentMethodsSection = document.getElementById(
            "payment-methods-section"
        );
        const warningBanner = document.getElementById("warning-banner");
        const dashboardReports = document.getElementById("dashboard-reports");

        if (analyticsSection) analyticsSection.style.display = "none";
        if (analyticsChartsSection) analyticsChartsSection.style.display = "none";
        if (paymentMethodsSection) paymentMethodsSection.style.display = "none";
        if (warningBanner) warningBanner.style.display = "none";
        if (dashboardReports) dashboardReports.style.display = "none";

        // Show dashboard transaction history content
        const dashboardTransactionHistory = document.getElementById(
            "dashboard-transaction-history"
        );
        if (dashboardTransactionHistory) {
            dashboardTransactionHistory.style.display = "grid";
            // Load transaction history with mock data
            this.loadDashboardTransactionHistory();
        }
    }

    loadDashboardTransactionHistory() {
        // Mock transaction data with different transaction types to demonstrate dynamic settlement text
        // RG-4XXXXXXXXX = Maintenance transactions
        // RG-6XXXXXXXXX = Fee transactions
        // RG-0XXXXXXXXX = Rent transactions
        const mockTransactions = [
            {
                id: "RG-4000180380",
                date: "12/03/2025",
                amount: "₹18,000.00",
                status: "Scheduled",
                statusColor: "#2563eb",
                statusBg: "#dbeafe",
                icon: "fas fa-file-invoice",
                iconColor: "#ef4444",
                iconBg: "#fef2f2",
            },
            {
                id: "RG-6000182595",
                date: "10/02/2025",
                amount: "₹10,000.00",
                status: "Scheduled",
                statusColor: "#2563eb",
                statusBg: "#dbeafe",
                icon: "fas fa-file-invoice",
                iconColor: "#ef4444",
                iconBg: "#fef2f2",
            },
            {
                id: "RG-0000182568",
                date: "15/01/2025",
                amount: "₹14,000.00",
                status: "Upcoming",
                statusColor: "#d97706",
                statusBg: "#fef3c7",
                icon: "fas fa-file-invoice",
                iconColor: "#ef4444",
                iconBg: "#fef2f2",
            },
            {
                id: "RG-0000182568",
                date: "15/12/2024",
                amount: "₹14,000.00",
                status: "Completed",
                statusColor: "#16a34a",
                statusBg: "#dcfce7",
                icon: "fas fa-check-circle",
                iconColor: "#10b981",
                iconBg: "#f0fdf4",
            },
            {
                id: "RG-4000180380",
                date: "12/12/2024",
                amount: "₹18,000.00",
                status: "Failed",
                statusColor: "#dc2626",
                statusBg: "#fee2e2",
                icon: "fas fa-times-circle",
                iconColor: "#ef4444",
                iconBg: "#fef2f2",
            },
        ];

        // Update status cards with actual counts
        const statusCounts = {
            completed: mockTransactions.filter((t) => t.status === "Completed")
                .length,
            upcoming: mockTransactions.filter((t) => t.status === "Upcoming").length,
            scheduled: mockTransactions.filter((t) => t.status === "Scheduled")
                .length,
            failed: mockTransactions.filter((t) => t.status === "Failed").length,
        };

        // Render the transaction history content in dashboard
        this.renderDashboardTransactionHistoryContent(
            mockTransactions,
            statusCounts
        );
    }

    renderDashboardTransactionHistoryContent(transactions, statusCounts) {
        // Update status counts
        const completedCount = document.getElementById("completed-count");
        const upcomingCount = document.getElementById("upcoming-count");
        const scheduledCount = document.getElementById("scheduled-count");
        const failedCount = document.getElementById("failed-count");

        if (completedCount) completedCount.textContent = statusCounts.completed;
        if (upcomingCount) upcomingCount.textContent = statusCounts.upcoming;
        if (scheduledCount) scheduledCount.textContent = statusCounts.scheduled;
        if (failedCount) failedCount.textContent = statusCounts.failed;

        // Update transaction list
        const transactionList = document.getElementById("transaction-list");
        if (!transactionList) return;

        // Clear existing transactions
        transactionList.innerHTML = "";

        // Add each transaction
        transactions.forEach((transaction, index) => {
            const transactionElement = document.createElement("div");
            const transactionId = `transaction-${index}`;
            transactionElement.id = transactionId;
            transactionElement.style.cssText =
                "background: white; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; transition: box-shadow 0.2s;";

            transactionElement.addEventListener("mouseenter", function () {
                this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            });

            transactionElement.addEventListener("mouseleave", function () {
                this.style.boxShadow = "none";
            });

            // Check if transaction is completed for downloads section
            const isCompleted = transaction.status === 'Completed' || transaction.status === 'Approved';

            transactionElement.innerHTML = `
                <div style="padding: 20px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; border-bottom: 1px solid #f3f4f6;" onclick="dashboard.toggleTransactionExpansion('${transactionId}')">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 48px; height: 48px; background: ${transaction.iconBg}; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="${transaction.icon}" style="color: ${transaction.iconColor}; font-size: 20px;"></i>
                        </div>
                        <div>
                            <div style="font-weight: 600; color: #111827; font-size: 16px; margin-bottom: 4px; font-family: 'Inter', sans-serif;">
                                ${transaction.id}
                            </div>
                            <div style="color: #6b7280; font-size: 14px; font-family: 'Inter', sans-serif;">
                                ${transaction.date}
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="text-align: right;">
                            <div style="font-weight: 700; color: #111827; font-size: 18px; margin-bottom: 4px; font-family: 'Inter', sans-serif;">
                                ${transaction.amount}
                            </div>
                            <span style="background: ${transaction.statusBg}; color: ${transaction.statusColor}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; font-family: 'Inter', sans-serif;">
                                ${transaction.status}
                            </span>
                        </div>
                        <button style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                            <i class="fas fa-chevron-down" id="chevron-${transactionId}"></i>
                        </button>
                    </div>
                </div>

                <!-- Expanded Section -->
                <div id="expanded-${transactionId}" style="display: none; padding: 0; background: #f8fafc; border-top: 1px solid #e5e7eb;">

                    <!-- Section 1: Payment Status -->
                    <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                            <i class="fas fa-tasks" style="color: #ef4444; font-size: 16px;"></i>
                            <h4 style="font-weight: 600; font-size: 16px; color: #ef4444; margin: 0; font-family: 'Inter', sans-serif;">
                                Payment Status
                            </h4>
                        </div>

                        <!-- Payment Status Progress Line -->
                        <div style="position: relative; margin: 20px 0;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="display: flex; flex-direction: column; align-items: center; z-index: 10; position: relative; flex: 1;">
                                    <div style="height: 36px; width: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #10b981; color: white; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);">
                                        <i class="fas fa-check" style="font-size: 14px;"></i>
                                    </div>
                                    <span style="font-size: 12px; text-align: center; color: #374151; font-weight: 500; font-family: 'Inter', sans-serif;">RG ID Registered</span>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; z-index: 10; position: relative; flex: 1;">
                                    <div style="height: 36px; width: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #10b981; color: white; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);">
                                        <i class="fas fa-check" style="font-size: 14px;"></i>
                                    </div>
                                    <span style="font-size: 12px; text-align: center; color: #374151; font-weight: 500; font-family: 'Inter', sans-serif;">Bill Generated</span>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; z-index: 10; position: relative; flex: 1;">
                                    <div style="height: 36px; width: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #10b981; color: white; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);">
                                        <i class="fas fa-check" style="font-size: 14px;"></i>
                                    </div>
                                    <span style="font-size: 12px; text-align: center; color: #374151; font-weight: 500; font-family: 'Inter', sans-serif;">Payment Received</span>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; z-index: 10; position: relative; flex: 1;">
                                    <div style="height: 36px; width: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: ${isCompleted ? '#10b981' : '#d1d5db'}; color: ${isCompleted ? 'white' : '#6b7280'}; font-weight: 600; font-size: 14px; ${isCompleted ? 'box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);' : ''}">
                                        ${isCompleted ? '<i class="fas fa-check" style="font-size: 14px;"></i>' : '<i class="fas fa-clock" style="font-size: 14px;"></i>'}
                                    </div>
                                    <span style="font-size: 12px; text-align: center; color: #374151; font-weight: 500; font-family: 'Inter', sans-serif;">${this.getPaymentStatusStepText(transaction.id, isCompleted)}</span>
                                </div>
                            </div>
                            <!-- Progress Line -->
                            <div style="position: absolute; height: 3px; top: 18px; left: 18px; right: 18px; background: #e5e7eb; z-index: 0; border-radius: 2px;">
                                <div style="height: 100%; background: linear-gradient(90deg, #10b981, #059669); border-radius: 2px; transition: all 0.8s ease; width: ${isCompleted ? '100%' : '75%'};"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Downloads -->
                    <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                            <i class="fas fa-download" style="color: #ef4444; font-size: 16px;"></i>
                            <h4 style="font-weight: 600; font-size: 16px; color: #ef4444; margin: 0; font-family: 'Inter', sans-serif;">
                                Downloads
                            </h4>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                            <button
                                onclick="dashboard.downloadRentReceipt('${transaction.id}')"
                                style="background: #0891b2; color: white; border: none; padding: 12px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Inter', sans-serif; transition: all 0.2s; box-shadow: 0 2px 4px rgba(8, 145, 178, 0.2);"
                                onmouseover="this.style.background='#0e7490'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(8, 145, 178, 0.3)'"
                                onmouseout="this.style.background='#0891b2'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(8, 145, 178, 0.2)'"
                            >
                                <i class="fas fa-file-pdf" style="font-size: 16px;"></i>
                                Rent Receipt #1
                                <i class="fas fa-download" style="font-size: 12px; opacity: 0.8;"></i>
                            </button>
                            <button
                                onclick="dashboard.downloadInvoice('${transaction.id}')"
                                style="background: #0891b2; color: white; border: none; padding: 12px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Inter', sans-serif; transition: all 0.2s; box-shadow: 0 2px 4px rgba(8, 145, 178, 0.2);"
                                onmouseover="this.style.background='#0e7490'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(8, 145, 178, 0.3)'"
                                onmouseout="this.style.background='#0891b2'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(8, 145, 178, 0.2)'"
                            >
                                <i class="fas fa-file-invoice" style="font-size: 16px;"></i>
                                Invoice #1
                                <i class="fas fa-download" style="font-size: 12px; opacity: 0.8;"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Section 3: Charges -->
                    <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; background: white;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                            <i class="fas fa-calculator" style="color: #ef4444; font-size: 16px;"></i>
                            <h4 style="font-weight: 600; font-size: 16px; color: #ef4444; margin: 0; font-family: 'Inter', sans-serif;">
                                ${this.getChargesSectionTitle(transaction.id)}
                            </h4>
                        </div>

                        <!-- Dynamic Charges Section -->
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                            <h5 style="font-weight: 600; font-size: 14px; color: #475569; margin: 0 0 12px 0; font-family: 'Inter', sans-serif;">${this.getChargesSectionTitle(transaction.id)}</h5>
                            <div style="display: grid; gap: 8px; align-items: center;">
                                <div style="display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                    <span style="font-size: 14px; color: #64748b; font-family: 'Inter', sans-serif;"> ${this.getLabelSectionTitle(transaction.id)} Amount :</span>
                                    <span style="font-size: 14px; font-weight: 600; color: #1e293b; font-family: 'Inter', sans-serif;">₹${(parseFloat(transaction.amount.replace(/[₹,]/g, '')) - 100).toLocaleString()}.00</span>
                                </div>
                                <div style="display: flex; align-items: center; padding: 8px 0;">
                                    <span style="font-size: 14px; color: #64748b; font-family: 'Inter', sans-serif;"> ${this.getLabelSectionTitle(transaction.id)}Pay Charges :</span>
                                    <span style="font-size: 14px; font-weight: 600; color: #1e293b; font-family: 'Inter', sans-serif;">₹100.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Dynamic Transaction -->
                    <div style="padding: 20px; background: white;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                            <i class="fas fa-home" style="color: #ef4444; font-size: 16px;"></i>
                            <h4 style="font-weight: 600; font-size: 16px; color: #ef4444; margin: 0; font-family: 'Inter', sans-serif;">
                                ${this.getTransactionsSectionTitle(transaction.id)}
                            </h4>
                        </div>

                        <!-- Transaction Table -->
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                            <div style="background: #e2e8f0; padding: 12px 16px; border-bottom: 1px solid #cbd5e1;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; font-size: 13px; font-weight: 600; color: #475569; font-family: 'Inter', sans-serif;">
                                    <span>Account Name</span>
                                    <span>Account Number</span>
                                    <span>IFSC</span>
                                    <span>Amount</span>
                                </div>
                            </div>
                            <div style="padding: 16px; background: white;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; align-items: center; font-size: 14px; font-family: 'Inter', sans-serif;">
                                    <span style="font-weight: 500; color: #1e293b;">Mukul Dani</span>
                                    <span style="color: #64748b;">006301529829</span>
                                    <span style="color: #64748b;">ICIC0000063</span>
                                    <span style="font-weight: 600; color: #059669;">₹${(parseFloat(transaction.amount.replace(/[₹,]/g, '')) - 100).toLocaleString()}.00</span>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Transaction Details -->
                        <div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; font-size: 14px;">
                            <div style="padding: 12px; background: #f1f5f9; border-radius: 6px;">
                                <p style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; font-family: 'Inter', sans-serif;">Order ID</p>
                                <p style="font-weight: 600; color: #1e293b; margin: 0; font-size: 13px;">${transaction.id.replace('RG-', 'ORD-')}</p>
                            </div>
                            <div style="padding: 12px; background: #f1f5f9; border-radius: 6px;">
                                <p style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; font-family: 'Inter', sans-serif;">Due Date</p>
                                <p style="font-weight: 600; color: #1e293b; margin: 0; font-family: 'Inter', sans-serif;">${transaction.date}</p>
                            </div>
                            <div style="padding: 12px; background: #f1f5f9; border-radius: 6px;">
                                <p style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; font-family: 'Inter', sans-serif;">Settlement Date</p>
                                <p style="font-weight: 600; color: #1e293b; margin: 0; font-family: 'Inter', sans-serif;">${isCompleted ? transaction.date : 'Pending'}</p>
                            </div>
                            <div style="padding: 12px; background: #f1f5f9; border-radius: 6px;">
                                <p style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; font-family: 'Inter', sans-serif;">Cash Points Earned</p>
                                <p style="font-weight: 600; color: #059669; margin: 0; font-family: 'Inter', sans-serif;">${Math.floor(parseFloat(transaction.amount.replace(/[₹,]/g, '')) * 0.01)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            transactionList.appendChild(transactionElement);
        });

        // Add refresh button event listener
        const refreshBtn = document.getElementById("refresh-transactions-btn");
        if (refreshBtn) {
            refreshBtn.onclick = () => {
                this.loadDashboardTransactionHistory();
            };
        }
    }

    // Toggle transaction expansion
    toggleTransactionExpansion(transactionId) {
        const expandedSection = document.getElementById(`expanded-${transactionId}`);
        const chevron = document.getElementById(`chevron-${transactionId}`);

        if (!expandedSection || !chevron) return;

        const isExpanded = expandedSection.style.display !== 'none';

        if (isExpanded) {
            // Collapse
            expandedSection.style.display = 'none';
            expandedSection.classList.remove('transaction-expanded');
            chevron.className = 'fas fa-chevron-down';
        } else {
            // Expand
            expandedSection.style.display = 'block';
            expandedSection.classList.add('transaction-expanded');
            chevron.className = 'fas fa-chevron-up';
        }
    }

    // Download rent receipt
    downloadRentReceipt(transactionId) {
        console.log('Downloading rent receipt for transaction:', transactionId);
        this.showNotification('Rent receipt download started', 'success');
        // Here you would typically trigger the actual download
        // For demo purposes, we'll just show a notification
    }

    // Download invoice
    downloadInvoice(transactionId) {
        console.log('Downloading invoice for transaction:', transactionId);
        this.showNotification('Invoice download started', 'success');
        // Here you would typically trigger the actual download
        // For demo purposes, we'll just show a notification
    }

    renderTransactionHistoryContent(transactions, statusCounts) {
        const container = document.getElementById("transaction-history-content");
        if (!container) return;

        // This function is for the separate transactions section (not dashboard)
        // Implementation can be added if needed
        container.innerHTML = "<p>Transaction History Content</p>";
    }

    renderDashboardReports() {
        // Hide analytics cards, analytics charts, and Payment Methods section
        const analyticsSection = document.querySelector(".analytics-grid");
        const analyticsChartsSection = document.querySelector(
            ".analytics-charts-grid"
        );
        const paymentMethodsSection = document.getElementById(
            "payment-methods-section"
        );
        const dashboardTransactionHistory = document.getElementById(
            "dashboard-transaction-history"
        );

        if (analyticsSection) analyticsSection.style.display = "none";
        if (analyticsChartsSection) analyticsChartsSection.style.display = "none";
        if (paymentMethodsSection) paymentMethodsSection.style.display = "none";
        if (dashboardTransactionHistory)
            dashboardTransactionHistory.style.display = "none";

        // Show dashboard reports content
        const dashboardReports = document.getElementById("dashboard-reports");
        if (dashboardReports) {
            dashboardReports.style.display = "block";
            // Initialize reports functionality
            this.initializeReportsForm();
        }
    }

    initializeReportsForm() {
        // Set default dates
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 3, 1); // April 1st (Indian Financial Year)
        const endDate = document.getElementById("end-date");
        const startDate = document.getElementById("start-date");

        if (endDate) {
            endDate.value = today.toISOString().split("T")[0];
        }
        if (startDate) {
            startDate.value = startOfYear.toISOString().split("T")[0];
        }

        // Add event listeners for radio buttons
        const radioButtons = document.querySelectorAll('input[name="reportType"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener("change", (e) => {
                this.handleReportTypeChange(e.target.value);
            });
        });
    }

    handleReportTypeChange(reportType) {
        const startDate = document.getElementById("start-date");
        const endDate = document.getElementById("end-date");
        const today = new Date();

        switch (reportType) {
            case "current":
                // Current Financial Year (April 1st to March 31st)
                const currentYearStart = new Date(today.getFullYear(), 3, 1); // April 1st
                if (startDate)
                    startDate.value = currentYearStart.toISOString().split("T")[0];
                if (endDate) endDate.value = today.toISOString().split("T")[0];
                break;

            case "previous":
                // Previous Financial Year
                const prevYearStart = new Date(today.getFullYear() - 1, 3, 1); // April 1st previous year
                const prevYearEnd = new Date(today.getFullYear(), 2, 31); // March 31st current year
                if (startDate)
                    startDate.value = prevYearStart.toISOString().split("T")[0];
                if (endDate) endDate.value = prevYearEnd.toISOString().split("T")[0];
                break;

            case "custom":
                // Clear dates for custom selection
                if (startDate) startDate.value = "";
                if (endDate) endDate.value = "";
                break;
        }
    }

    downloadReport() {
        const reportType = document.querySelector(
            'input[name="reportType"]:checked'
        )?.value;
        const startDate = document.getElementById("start-date")?.value;
        const endDate = document.getElementById("end-date")?.value;

        if (!startDate || !endDate) {
            this.showNotification("Please select both start and end dates", "error");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            this.showNotification(
                "Start date cannot be later than end date",
                "error"
            );
            return;
        }

        // Show loading state
        const downloadBtn = document.getElementById("download-report-btn");
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Generating Report...';
        downloadBtn.disabled = true;

        // Simulate report generation
        setTimeout(() => {
            // Generate mock CSV data
            const csvData = this.generateMockReportData(
                startDate,
                endDate,
                reportType
            );
            this.downloadCSV(
                csvData,
                `RedGirraffe_Report_${reportType}_${startDate}_to_${endDate}.csv`
            );

            // Reset button
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;

            this.showNotification("Report downloaded successfully!", "success");
        }, 2000);
    }

    generateMockReportData(startDate, endDate, reportType) {
        const headers = [
            "Date",
            "RG ID",
            "Type",
            "Amount",
            "Status",
            "Payment Mode",
        ];
        const mockData = [
            [
                "2024-11-14",
                "RG-0000182568",
                "Rent",
                "₹14,000.00",
                "Upcoming",
                "Credit Card",
            ],
            [
                "2025-03-10",
                "RG-6000182595",
                "Education Fee",
                "₹10.00",
                "Scheduled",
                "UPI",
            ],
            [
                "2025-03-12",
                "RG-4000180380",
                "Maintenance",
                "₹18,000.00",
                "Scheduled",
                "Net Banking",
            ],
            [
                "2024-10-15",
                "RG-6000180475",
                "Fees",
                "₹5,000.00",
                "Completed",
                "Credit Card",
            ],
            ["2024-09-20", "RG-5000180123", "Rent", "₹12,000.00", "Completed", "UPI"],
        ];

        // Convert to CSV format
        const csvContent = [headers, ...mockData]
            .map((row) => row.join(","))
            .join("\n");

        return csvContent;
    }

    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Registration modal methods
    openCreateRegistrationModal() {
        this.showNotification("Opening registration creation modal...", "info");
        // Here you would implement the actual modal opening logic
    }

    openNotifications() {
        this.showNotification("Opening notifications panel...", "info");
        // Here you would implement the notifications panel
    }
}

// Global functions for the Edit Records modal
function handleRegistrationSelection(value) {
    const button = document.getElementById("editRegistrationButton");
    if (button) {
        if (value) {
            button.style.opacity = "1";
            button.disabled = false;
            button.style.cursor = "pointer";
        } else {
            button.style.opacity = "0.5";
            button.disabled = true;
            button.style.cursor = "not-allowed";
        }
    }
}

function proceedToEdit() {
    const select = document.getElementById("registrationEditSelect");
    const selectedValue = select && select.value;
    if (selectedValue) {
        dashboard.showNotification(
            "Opening edit form for " + selectedValue,
            "info"
        );
    }
}

// Async functions outside the dashboard object
async function loadRegistrationForEdit(rgId) {
    try {
        const response = await fetch("/api/registration/rg/" + rgId);
        const data = await response.json();

        if (data.tenantDetails) {
            const dobEl = document.getElementById("edit-dob");
            if (dobEl) dobEl.value = data.tenantDetails.dob || "06/12/2005";
        }
    } catch (error) {
        console.error("Error loading registration for edit:", error);
        dashboard.showNotification("Error loading registration data", "error");
    }
}

async function saveRegistration() {
    const selectedRgId = document.getElementById(
        "edit-registration-select"
    )?.value;
    if (!selectedRgId) {
        dashboard.showNotification("No registration selected", "error");
        return;
    }

    // Collect form data
    const formData = {
        // Tenant details
        dob: document.getElementById("edit-dob")?.value,
        mobileNumber: document.getElementById("edit-mobile")?.value,
        email: document.getElementById("edit-email")?.value,
        city: document.getElementById("edit-city")?.value,
        address: document.getElementById("edit-address")?.value,

        // Tenancy details
        rentAmount: document.getElementById("edit-rent-amount")?.value,
        frequency: document.getElementById("edit-frequency")?.value,
        dueDate: document.getElementById("edit-due-date")?.value,
        tenancyEndDate: document.getElementById("edit-tenancy-end-date")?.value,
        cardIssuingBank: document.getElementById("edit-card-bank")?.value,
        gstin: document.getElementById("edit-gstin")?.value,

        // Landlord details
        landlordName: document.getElementById("edit-landlord-name")?.value,
        landlordEmail: document.getElementById("edit-landlord-email")?.value,
        landlordMobile: document.getElementById("edit-landlord-mobile")?.value,
        landlordAddress: document.getElementById("edit-landlord-address")?.value,

        // Account details
        accountNumber: document.getElementById("edit-account-number")?.value,
        ifscCode: document.getElementById("edit-ifsc")?.value,
        bankName: document.getElementById("edit-bank-name")?.value,
        accountHolderName: document.getElementById("edit-account-holder")?.value,
    };

    try {
        const response = await fetch("/api/registration/tenant/" + selectedRgId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            dashboard.showNotification(
                "Registration updated successfully!",
                "success"
            );
            dashboard.closeUploadModal();
            dashboard.loadRegistrationsData();
        } else {
            dashboard.showNotification("Failed to update registration", "error");
        }
    } catch (error) {
        console.error("Error saving registration:", error);
        dashboard.showNotification("Error saving registration", "error");
    }
}

// Registrations Management Class
class RegistrationsManager {
    constructor() {
        this.userId = 1; // Hardcoded for demo
        this.registrations = [];
        this.expandedRgId = null;
        this.showAllByType = {};
        this.selectedRegistrationType = null;
        this.expandedRowDetails = {}; // Track expanded row details

        this.init();
    }

    init() {
        this.loadRegistrations();
        this.initializeModal();
    }

    async loadRegistrations() {
        try {
            // Show loading state
            this.showLoadingState();

            // Simulate API call with mock data
            await this.delay(500);
            this.registrations = this.getMockRegistrations();
            this.renderRegistrations();
        } catch (error) {
            console.error("Failed to load registrations:", error);
            this.showErrorState();
        }
    }

    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    showLoadingState() {
        const loadingEl = document.getElementById("registrations-loading");
        const contentEl = document.getElementById("registrations-content");
        const errorEl = document.getElementById("registrations-error");

        if (loadingEl) loadingEl.style.display = "block";
        if (contentEl) contentEl.style.display = "none";
        if (errorEl) errorEl.style.display = "none";
    }

    showErrorState() {
        const loadingEl = document.getElementById("registrations-loading");
        const contentEl = document.getElementById("registrations-content");
        const errorEl = document.getElementById("registrations-error");

        if (loadingEl) loadingEl.style.display = "none";
        if (contentEl) contentEl.style.display = "none";
        if (errorEl) errorEl.style.display = "block";
    }

    getMockRegistrations() {
        return [
            // Rent registrations (8 total - to test show more/less)
            {
                id: 1,
                rgId: "RG-0000182568",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "Credit Card",
                status: "Approved",
                amount: "25000",
                dueDate: "15/01/2025",
                frequency: "Monthly",
                endDate: "15/12/2025",
                // Detailed information for expandable row
                tenantDetails: {
                    userType: "Company",
                    name: "Mr. Piyush jgh Kumar",
                    dob: "23/07/1971",
                    mobileNo: "919560714492",
                    email: "kumar1993piyush@gmail.com",
                    panNo: "AWQQQ1224F",
                    address: "test",
                    city: "new",
                    pinCode: "119900"
                },
                tenancyDetails: {
                    rentAmount: "₹10.00",
                    frequency: "Monthly",
                    dueDate: "21/06/2025",
                    tenancyEndDate: "21/07/2025",
                    cardIssuingBankName: "HDFC Bank",
                    gstin: ""
                },
                ownerDetails: {
                    name: "Mrs. knjbh j test",
                    email: "test@7676@exsete.com",
                    mobileNo: "",
                    panNo: "JJJJG6666F"
                },
                accountDetails: {
                    accountHolder: "test",
                    accountNo: "111111",
                    accountType: "Savings",
                    rentAmount: "₹10.00",
                    ifsc: "IFSC0111111",
                    panNo: "JJJJG6666F"
                }
            },
            {
                id: 2,
                rgId: "RG-0000182569",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "UPI",
                status: "Pending",
                amount: "32000",
                dueDate: "10/01/2025",
                frequency: "Monthly",
                endDate: "10/12/2025",
                // Detailed information for expandable row
                tenantDetails: {
                    userType: "Individual",
                    name: "Ms. Priya Sharma",
                    dob: "15/03/1985",
                    mobileNo: "919876543210",
                    email: "priya.sharma@gmail.com",
                    panNo: "BXPPS1234K",
                    address: "123 MG Road, Bangalore",
                    city: "Bangalore",
                    pinCode: "560001"
                },
                tenancyDetails: {
                    rentAmount: "₹32,000.00",
                    frequency: "Monthly",
                    dueDate: "10/01/2025",
                    tenancyEndDate: "10/12/2025",
                    cardIssuingBankName: "SBI Bank",
                    gstin: "29BXPPS1234K1ZX"
                },
                ownerDetails: {
                    name: "Mr. Rajesh Kumar",
                    email: "rajesh.kumar@property.com",
                    mobileNo: "919123456789",
                    panNo: "AABPR1234C"
                },
                accountDetails: {
                    accountHolder: "Rajesh Kumar",
                    accountNo: "123456789012",
                    accountType: "Current",
                    rentAmount: "₹32,000.00",
                    ifsc: "SBIN0001234",
                    panNo: "AABPR1234C"
                }
            },
            {
                id: 3,
                rgId: "RG-0000182570",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "Net Banking",
                status: "Approved",
                amount: "28000",
                dueDate: "05/01/2025",
                frequency: "Monthly",
                endDate: "05/12/2025",
                // Detailed information for expandable row
                tenantDetails: {
                    userType: "Individual",
                    name: "Mr. Amit Singh",
                    dob: "12/08/1990",
                    mobileNo: "919988776655",
                    email: "amit.singh@email.com",
                    panNo: "CXYZS5678P",
                    address: "456 Park Street, Delhi",
                    city: "Delhi",
                    pinCode: "110001"
                },
                tenancyDetails: {
                    rentAmount: "₹28,000.00",
                    frequency: "Monthly",
                    dueDate: "05/01/2025",
                    tenancyEndDate: "05/12/2025",
                    cardIssuingBankName: "ICICI Bank",
                    gstin: "07CXYZS5678P1ZY"
                },
                ownerDetails: {
                    name: "Mrs. Sunita Verma",
                    email: "sunita.verma@property.com",
                    mobileNo: "919876543210",
                    panNo: "BCDPQ9876L"
                },
                accountDetails: {
                    accountHolder: "Sunita Verma",
                    accountNo: "987654321098",
                    accountType: "Savings",
                    rentAmount: "₹28,000.00",
                    ifsc: "ICIC0001234",
                    panNo: "BCDPQ9876L"
                }
            },
            {
                id: 4,
                rgId: "RG-0000182571",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "Debit Card",
                status: "Rejected",
                amount: "22000",
                dueDate: "25/01/2025",
                frequency: "Monthly",
                endDate: "25/12/2025",
                // Detailed information for expandable row
                tenantDetails: {
                    userType: "Company",
                    name: "Ms. Neha Gupta",
                    dob: "05/11/1988",
                    mobileNo: "919123456789",
                    email: "neha.gupta@company.com",
                    panNo: "DEFGH1234M",
                    address: "789 Business District, Mumbai",
                    city: "Mumbai",
                    pinCode: "400001"
                },
                tenancyDetails: {
                    rentAmount: "₹22,000.00",
                    frequency: "Monthly",
                    dueDate: "25/01/2025",
                    tenancyEndDate: "25/12/2025",
                    cardIssuingBankName: "Axis Bank",
                    gstin: "27DEFGH1234M1ZX"
                },
                ownerDetails: {
                    name: "Mr. Ravi Patel",
                    email: "ravi.patel@realty.com",
                    mobileNo: "919876543211",
                    panNo: "EFGHI5678N"
                },
                accountDetails: {
                    accountHolder: "Ravi Patel",
                    accountNo: "456789123456",
                    accountType: "Current",
                    rentAmount: "₹22,000.00",
                    ifsc: "UTIB0001234",
                    panNo: "EFGHI5678N"
                }
            },
            {
                id: 5,
                rgId: "RG-0000182572",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "Credit Card",
                status: "Approved",
                amount: "35000",
                dueDate: "12/01/2025",
                frequency: "Monthly",
                endDate: "12/12/2025",
                // Detailed information for expandable row
                tenantDetails: {
                    userType: "Individual",
                    name: "Dr. Kavita Sharma",
                    dob: "18/04/1985",
                    mobileNo: "919876543212",
                    email: "kavita.sharma@hospital.com",
                    panNo: "GHIJK9876Q",
                    address: "321 Medical Colony, Chennai",
                    city: "Chennai",
                    pinCode: "600001"
                },
                tenancyDetails: {
                    rentAmount: "₹35,000.00",
                    frequency: "Monthly",
                    dueDate: "12/01/2025",
                    tenancyEndDate: "12/12/2025",
                    cardIssuingBankName: "Kotak Bank",
                    gstin: "33GHIJK9876Q1ZW"
                },
                ownerDetails: {
                    name: "Mr. Suresh Kumar",
                    email: "suresh.kumar@estates.com",
                    mobileNo: "919876543213",
                    panNo: "HIJKL1234R"
                },
                accountDetails: {
                    accountHolder: "Suresh Kumar",
                    accountNo: "789123456789",
                    accountType: "Savings",
                    rentAmount: "₹35,000.00",
                    ifsc: "KKBK0001234",
                    panNo: "HIJKL1234R"
                }
            },
            {
                id: 6,
                rgId: "RG-0000182573",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "UPI",
                status: "Approved",
                amount: "30000",
                dueDate: "20/01/2025",
                frequency: "Monthly",
                endDate: "20/12/2025",
                // Detailed information for expandable row
                tenantDetails: {
                    userType: "Individual",
                    name: "Mr. Rohit Mehta",
                    dob: "22/09/1992",
                    mobileNo: "919876543214",
                    email: "rohit.mehta@tech.com",
                    panNo: "IJKLM5678S",
                    address: "654 Tech Park, Hyderabad",
                    city: "Hyderabad",
                    pinCode: "500001"
                },
                tenancyDetails: {
                    rentAmount: "₹30,000.00",
                    frequency: "Monthly",
                    dueDate: "20/01/2025",
                    tenancyEndDate: "20/12/2025",
                    cardIssuingBankName: "Yes Bank",
                    gstin: "36IJKLM5678S1ZV"
                },
                ownerDetails: {
                    name: "Mrs. Anita Reddy",
                    email: "anita.reddy@properties.com",
                    mobileNo: "919876543215",
                    panNo: "JKLMN9876T"
                },
                accountDetails: {
                    accountHolder: "Anita Reddy",
                    accountNo: "321654987321",
                    accountType: "Savings",
                    rentAmount: "₹30,000.00",
                    ifsc: "YESB0001234",
                    panNo: "JKLMN9876T"
                }
            },
            {
                id: 7,
                rgId: "RG-0000182574",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "Net Banking",
                status: "Pending",
                amount: "27000",
                dueDate: "18/01/2025",
                frequency: "Monthly",
                endDate: "18/12/2025",
                // Detailed information for expandable row
                tenantDetails: {
                    userType: "Company",
                    name: "Mr. Vikash Agarwal",
                    dob: "30/06/1987",
                    mobileNo: "919876543216",
                    email: "vikash.agarwal@startup.com",
                    panNo: "KLMNO1234U",
                    address: "987 Innovation Hub, Pune",
                    city: "Pune",
                    pinCode: "411001"
                },
                tenancyDetails: {
                    rentAmount: "₹27,000.00",
                    frequency: "Monthly",
                    dueDate: "18/01/2025",
                    tenancyEndDate: "18/12/2025",
                    cardIssuingBankName: "IndusInd Bank",
                    gstin: "27KLMNO1234U1ZU"
                },
                ownerDetails: {
                    name: "Mr. Deepak Joshi",
                    email: "deepak.joshi@realestate.com",
                    mobileNo: "919876543217",
                    panNo: "LMNOP5678V"
                },
                accountDetails: {
                    accountHolder: "Deepak Joshi",
                    accountNo: "654321987654",
                    accountType: "Current",
                    rentAmount: "₹27,000.00",
                    ifsc: "INDB0001234",
                    panNo: "LMNOP5678V"
                }
            },
            // Education registrations (6 total - to test show more/less)
            {
                id: 9,
                rgId: "RG-6000182595",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "Credit Card",
                status: "Approved",
                amount: "45000",
                dueDate: "15/02/2025",
                frequency: "Quarterly",
                endDate: "15/06/2025",
                // Detailed information for expandable row
                studentDetails: {
                    gender: "Male",
                    dateOfBirth: "15/10/1995",
                    email: "test.srsj@redgirraffe.com",
                    mobileNo: "919876445544",
                    whatsappNo: "919876445542",
                    alternateNo: "919876445542",
                    panNo: "TESTA12342",
                    addressLine1: "sdf",
                    addressLine2: "",
                    state: "sdf",
                    city: "sdf",
                    pincode: "110048",
                    studentName: "sksdf",
                    admissionNo: "654sdv",
                    studentGender: "Male",
                    studentDateOfBirth: "02/11/2001",
                    class: "Montessori 1",
                    applicantRelationship: "Brother",
                    payerName: "Mr. John Doe",
                    feeType: "Tuition Fee",
                    name: "Student Registration",
                    payerGSTIN: "07AAHCR5014K1ZB"
                },
                studentFeesDetails: {
                    feeAmount: "₹200.00",
                    frequency: "Monthly",
                    dueDate: "25/06/2024",
                    currentSessionEndDate: "25/06/2025",
                    gstin: "",
                    cardIssuingBank: "Axis Bank"
                },
                instituteDetails: {
                    instituteName: "sdf",
                    website: "",
                    phoneNumber: "",
                    email: "sdf@exsete.com",
                    addressLine1: "sdf",
                    addressLine2: "hjk",
                    state: "hj",
                    city: "sdf",
                    pincode: "110048"
                },
                instituteAccountDetails: {
                    accountHolder: "sdf",
                    accountNo: "123",
                    accountType: "Savings",
                    feeAmount: "₹200.00",
                    ifsc: "ICIC0000014"
                }
            },
            {
                id: 10,
                rgId: "RG-6000182596",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "UPI",
                status: "Pending",
                amount: "50000",
                dueDate: "20/02/2025",
                frequency: "Quarterly",
                endDate: "20/06/2025",
                // Detailed information for expandable row
                studentDetails: {
                    gender: "Female",
                    dateOfBirth: "22/08/1990",
                    email: "priya.student@gmail.com",
                    mobileNo: "919876543220",
                    whatsappNo: "919876543220",
                    alternateNo: "919876543221",
                    panNo: "STUDE1234B",
                    addressLine1: "123 Student Colony",
                    addressLine2: "Near University",
                    state: "Karnataka",
                    city: "Bangalore",
                    pincode: "560001",
                    studentName: "Priya Sharma",
                    admissionNo: "STU2024001",
                    studentGender: "Female",
                    studentDateOfBirth: "22/08/1990",
                    class: "MBA 2nd Year",
                    applicantRelationship: "Self",
                    payerName: "Mrs. Priya Sharma",
                    feeType: "MBA Fee",
                    name: "MBA Program Registration",
                    payerGSTIN: "29STUDE1234B1ZC"
                },
                studentFeesDetails: {
                    feeAmount: "₹50,000.00",
                    frequency: "Quarterly",
                    dueDate: "20/02/2025",
                    currentSessionEndDate: "20/06/2025",
                    gstin: "29STUDE1234B1ZX",
                    cardIssuingBank: "SBI Bank"
                },
                instituteDetails: {
                    instituteName: "Bangalore Management Institute",
                    website: "www.bmi.edu.in",
                    phoneNumber: "080-12345678",
                    email: "admissions@bmi.edu.in",
                    addressLine1: "456 Education Street",
                    addressLine2: "University Area",
                    state: "Karnataka",
                    city: "Bangalore",
                    pincode: "560002"
                },
                instituteAccountDetails: {
                    accountHolder: "Bangalore Management Institute",
                    accountNo: "987654321012",
                    accountType: "Current",
                    feeAmount: "₹50,000.00",
                    ifsc: "SBIN0012345"
                }
            },
            {
                id: 11,
                rgId: "RG-6000182597",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "Net Banking",
                status: "Approved",
                amount: "42000",
                dueDate: "25/02/2025",
                frequency: "Quarterly",
                endDate: "25/06/2025",
                // Detailed information for expandable row
                studentDetails: {
                    gender: "Male",
                    dateOfBirth: "10/05/1992",
                    email: "rahul.tech@gmail.com",
                    mobileNo: "919876543222",
                    whatsappNo: "919876543222",
                    alternateNo: "919876543223",
                    panNo: "TECHR1234C",
                    addressLine1: "789 Tech Park",
                    addressLine2: "IT Corridor",
                    state: "Tamil Nadu",
                    city: "Chennai",
                    pincode: "600032",
                    studentName: "Rahul Kumar",
                    admissionNo: "TECH2024002",
                    studentGender: "Male",
                    studentDateOfBirth: "10/05/1992",
                    class: "B.Tech 3rd Year",
                    applicantRelationship: "Self"
                },
                studentFeesDetails: {
                    feeAmount: "₹42,000.00",
                    frequency: "Quarterly",
                    dueDate: "25/02/2025",
                    currentSessionEndDate: "25/06/2025",
                    gstin: "33TECHR1234C1ZY",
                    cardIssuingBank: "HDFC Bank"
                },
                instituteDetails: {
                    instituteName: "Chennai Institute of Technology",
                    website: "www.cit.edu.in",
                    phoneNumber: "044-12345678",
                    email: "admissions@cit.edu.in",
                    addressLine1: "123 Tech Campus",
                    addressLine2: "Engineering Block",
                    state: "Tamil Nadu",
                    city: "Chennai",
                    pincode: "600044"
                },
                instituteAccountDetails: {
                    accountHolder: "Chennai Institute of Technology",
                    accountNo: "456123789456",
                    accountType: "Current",
                    feeAmount: "₹42,000.00",
                    ifsc: "HDFC0001234"
                }
            },
            {
                id: 12,
                rgId: "RG-6000182598",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "Credit Card",
                status: "Approved",
                amount: "48000",
                dueDate: "28/02/2025",
                frequency: "Quarterly",
                endDate: "28/06/2025",
                studentDetails: {
                    gender: "Female", dateOfBirth: "12/09/1993", email: "anita.med@gmail.com", mobileNo: "919876543224",
                    whatsappNo: "919876543224", alternateNo: "919876543225", panNo: "MEDIC1234D", addressLine1: "456 Medical Street",
                    addressLine2: "Hospital Area", state: "Maharashtra", city: "Mumbai", pincode: "400012",
                    studentName: "Anita Sharma", admissionNo: "MED2024003", studentGender: "Female", studentDateOfBirth: "12/09/1993",
                    class: "MBBS 4th Year", applicantRelationship: "Self"
                },
                studentFeesDetails: { feeAmount: "₹48,000.00", frequency: "Quarterly", dueDate: "28/02/2025", currentSessionEndDate: "28/06/2025", gstin: "27MEDIC1234D1ZX", cardIssuingBank: "ICICI Bank" },
                instituteDetails: { instituteName: "Mumbai Medical College", website: "www.mmc.edu.in", phoneNumber: "022-12345678", email: "admissions@mmc.edu.in", addressLine1: "789 Medical Campus", addressLine2: "Health Sciences", state: "Maharashtra", city: "Mumbai", pincode: "400020" },
                instituteAccountDetails: { accountHolder: "Mumbai Medical College", accountNo: "789456123789", accountType: "Current", feeAmount: "₹48,000.00", ifsc: "ICIC0001234" }
            },
            {
                id: 13,
                rgId: "RG-6000182599",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "UPI",
                status: "Rejected",
                amount: "46000",
                dueDate: "05/03/2025",
                frequency: "Quarterly",
                endDate: "05/07/2025",
                studentDetails: {
                    gender: "Male", dateOfBirth: "25/11/1991", email: "vikram.law@gmail.com", mobileNo: "919876543226",
                    whatsappNo: "919876543226", alternateNo: "919876543227", panNo: "LAWST1234E", addressLine1: "321 Law Street",
                    addressLine2: "Court Complex", state: "Delhi", city: "New Delhi", pincode: "110001",
                    studentName: "Vikram Singh", admissionNo: "LAW2024004", studentGender: "Male", studentDateOfBirth: "25/11/1991",
                    class: "LLB 2nd Year", applicantRelationship: "Self"
                },
                studentFeesDetails: { feeAmount: "₹46,000.00", frequency: "Quarterly", dueDate: "05/03/2025", currentSessionEndDate: "05/07/2025", gstin: "07LAWST1234E1ZW", cardIssuingBank: "Punjab National Bank" },
                instituteDetails: { instituteName: "Delhi Law College", website: "www.dlc.edu.in", phoneNumber: "011-12345678", email: "admissions@dlc.edu.in", addressLine1: "654 Law Campus", addressLine2: "Justice Block", state: "Delhi", city: "New Delhi", pincode: "110003" },
                instituteAccountDetails: { accountHolder: "Delhi Law College", accountNo: "321789456321", accountType: "Current", feeAmount: "₹46,000.00", ifsc: "PUNB0001234" }
            },
            {
                id: 14,
                rgId: "RG-6000182600",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "Net Banking",
                status: "Approved",
                amount: "47000",
                dueDate: "10/03/2025",
                frequency: "Quarterly",
                endDate: "10/07/2025",
                studentDetails: {
                    gender: "Female", dateOfBirth: "08/07/1994", email: "meera.arts@gmail.com", mobileNo: "919876543228",
                    whatsappNo: "919876543228", alternateNo: "919876543229", panNo: "ARTST1234F", addressLine1: "987 Arts Colony",
                    addressLine2: "Cultural District", state: "Rajasthan", city: "Jaipur", pincode: "302001",
                    studentName: "Meera Gupta", admissionNo: "ART2024005", studentGender: "Female", studentDateOfBirth: "08/07/1994",
                    class: "MA Fine Arts", applicantRelationship: "Self"
                },
                studentFeesDetails: { feeAmount: "₹47,000.00", frequency: "Quarterly", dueDate: "10/03/2025", currentSessionEndDate: "10/07/2025", gstin: "08ARTST1234F1ZV", cardIssuingBank: "Bank of Baroda" },
                instituteDetails: { instituteName: "Jaipur Arts University", website: "www.jau.edu.in", phoneNumber: "0141-12345678", email: "admissions@jau.edu.in", addressLine1: "147 Arts Campus", addressLine2: "Creative Block", state: "Rajasthan", city: "Jaipur", pincode: "302004" },
                instituteAccountDetails: { accountHolder: "Jaipur Arts University", accountNo: "147852963147", accountType: "Current", feeAmount: "₹47,000.00", ifsc: "BARB0001234" }
            },
            // Society Maintenance registrations (5 total)
            {
                id: 15,
                rgId: "RG-4000182596",
                userId: 1,
                type: "society",
                subtype: "Maintenance",
                mode: "Credit Card",
                status: "Approved",
                amount: "8500",
                dueDate: "01/02/2025",
                frequency: "Monthly",
                endDate: "01/12/2025",
                // Detailed information for expandable row
                payerDetails: {
                    payerType: "Tenant",
                    userType: "Individual",
                    name: "Mr. Test Rick",
                    gender: "Male",
                    dateOfBirth: "15/10/1996",
                    email: "test.srsj@redgirraffe.com",
                    mobileNo: "919876445544",
                    alternateNo: "919876445542",
                    panNo: "TESTA12342"
                },
                payerPropertyAddressDetails: {
                    apartmentNumber: "s015",
                    addressLine1: "sdf",
                    addressLine2: "sdf",
                    street: "sdf",
                    state: "sfsdf",
                    city: "sdfds",
                    pincode: "110048"
                },
                societyMaintenanceChargesDetails: {
                    amount: "₹110.00",
                    frequency: "Monthly",
                    startDate: "24/04/2024",
                    dueDate: "12/09/2024",
                    endDate: "25/06/2025",
                    gstin: "",
                    cardIssuingBank: "Axis Bank"
                },
                societyAgencyDetails: {
                    societyAgencyName: "DPS",
                    email: "sdfds@exsete.com",
                    phoneLandlineNumber: "",
                    pan: "HFHFH3223F"
                },
                societyAgencyAccountDetails: {
                    accountHolder: "sdf",
                    accountNo: "147",
                    accountType: "Current",
                    maintenanceAmount: "₹110.00",
                    ifsc: "ICIC0000012",
                    panNo: ""
                }
            },
            {
                id: 16,
                rgId: "RG-4000182597",
                userId: 1,
                type: "society",
                subtype: "Maintenance",
                mode: "UPI",
                status: "Approved",
                amount: "9200",
                dueDate: "05/02/2025",
                frequency: "Monthly",
                endDate: "05/12/2025",
                payerDetails: { payerType: "Owner", userType: "Individual", name: "Mrs. Priya Sharma", gender: "Female", dateOfBirth: "22/08/1985", email: "priya.sharma@gmail.com", mobileNo: "919876543230", alternateNo: "919876543231", panNo: "OWNER1234A" },
                payerPropertyAddressDetails: { apartmentNumber: "A-201", addressLine1: "Green Valley Apartments", addressLine2: "Sector 15", street: "MG Road", state: "Haryana", city: "Gurgaon", pincode: "122001" },
                societyMaintenanceChargesDetails: { amount: "₹9,200.00", frequency: "Monthly", startDate: "01/01/2024", dueDate: "05/02/2025", endDate: "05/12/2025", gstin: "06OWNER1234A1ZX", cardIssuingBank: "HDFC Bank" },
                societyAgencyDetails: { societyAgencyName: "Green Valley Society", email: "admin@greenvalley.com", phoneLandlineNumber: "0124-1234567", pan: "SOCTY1234B" },
                societyAgencyAccountDetails: { accountHolder: "Green Valley Society", accountNo: "987654321098", accountType: "Current", maintenanceAmount: "₹9,200.00", ifsc: "HDFC0001234", panNo: "SOCTY1234B" }
            },
            {
                id: 17,
                rgId: "RG-4000182598",
                userId: 1,
                type: "society",
                subtype: "Maintenance",
                mode: "Net Banking",
                status: "Pending",
                amount: "7800",
                dueDate: "10/02/2025",
                frequency: "Monthly",
                endDate: "10/12/2025",
                payerDetails: { payerType: "Tenant", userType: "Company", name: "Mr. Rajesh Kumar", gender: "Male", dateOfBirth: "15/03/1988", email: "rajesh.kumar@techcorp.com", mobileNo: "919876543232", alternateNo: "919876543233", panNo: "TENANT1234C" },
                payerPropertyAddressDetails: { apartmentNumber: "B-305", addressLine1: "Blue Heights Complex", addressLine2: "Phase 2", street: "Cyber City", state: "Karnataka", city: "Bangalore", pincode: "560100" },
                societyMaintenanceChargesDetails: { amount: "₹7,800.00", frequency: "Monthly", startDate: "15/02/2024", dueDate: "10/02/2025", endDate: "10/12/2025", gstin: "29TENANT1234C1ZY", cardIssuingBank: "SBI Bank" },
                societyAgencyDetails: { societyAgencyName: "Blue Heights Residents Association", email: "admin@blueheights.org", phoneLandlineNumber: "080-9876543", pan: "ASSOC1234D" },
                societyAgencyAccountDetails: { accountHolder: "Blue Heights RWA", accountNo: "456789123456", accountType: "Savings", maintenanceAmount: "₹7,800.00", ifsc: "SBIN0012345", panNo: "ASSOC1234D" }
            },
            {
                id: 18,
                rgId: "RG-4000182599",
                userId: 1,
                type: "society",
                subtype: "Maintenance",
                mode: "Credit Card",
                status: "Approved",
                amount: "8900",
                dueDate: "15/02/2025",
                frequency: "Monthly",
                endDate: "15/12/2025",
                payerDetails: { payerType: "Owner", userType: "Individual", name: "Dr. Anita Verma", gender: "Female", dateOfBirth: "08/12/1980", email: "dr.anita@hospital.com", mobileNo: "919876543234", alternateNo: "919876543235", panNo: "DOCTR1234E" },
                payerPropertyAddressDetails: { apartmentNumber: "C-102", addressLine1: "Sunrise Towers", addressLine2: "Medical District", street: "Hospital Road", state: "Maharashtra", city: "Pune", pincode: "411001" },
                societyMaintenanceChargesDetails: { amount: "₹8,900.00", frequency: "Monthly", startDate: "01/03/2024", dueDate: "15/02/2025", endDate: "15/12/2025", gstin: "27DOCTR1234E1ZW", cardIssuingBank: "ICICI Bank" },
                societyAgencyDetails: { societyAgencyName: "Sunrise Towers Management", email: "management@sunrise.com", phoneLandlineNumber: "020-7654321", pan: "MGMNT1234F" },
                societyAgencyAccountDetails: { accountHolder: "Sunrise Management Pvt Ltd", accountNo: "789123456789", accountType: "Current", maintenanceAmount: "₹8,900.00", ifsc: "ICIC0001234", panNo: "MGMNT1234F" }
            },
            {
                id: 19,
                rgId: "RG-4000182600",
                userId: 1,
                type: "society",
                subtype: "Maintenance",
                mode: "UPI",
                status: "Rejected",
                amount: "8300",
                dueDate: "20/02/2025",
                frequency: "Monthly",
                endDate: "20/12/2025",
                payerDetails: { payerType: "Tenant", userType: "Individual", name: "Mr. Vikash Gupta", gender: "Male", dateOfBirth: "25/07/1990", email: "vikash.gupta@startup.com", mobileNo: "919876543236", alternateNo: "919876543237", panNo: "RENTER1234G" },
                payerPropertyAddressDetails: { apartmentNumber: "D-404", addressLine1: "Golden Heights", addressLine2: "New Town", street: "IT Park Road", state: "West Bengal", city: "Kolkata", pincode: "700156" },
                societyMaintenanceChargesDetails: { amount: "₹8,300.00", frequency: "Monthly", startDate: "10/04/2024", dueDate: "20/02/2025", endDate: "20/12/2025", gstin: "19RENTER1234G1ZV", cardIssuingBank: "Axis Bank" },
                societyAgencyDetails: { societyAgencyName: "Golden Heights Welfare Society", email: "welfare@goldenheights.in", phoneLandlineNumber: "033-2468135", pan: "WELFR1234H" },
                societyAgencyAccountDetails: { accountHolder: "Golden Heights Welfare Society", accountNo: "123456789012", accountType: "Savings", maintenanceAmount: "₹8,300.00", ifsc: "UTIB0001234", panNo: "WELFR1234H" }
            },
        ];
    }

    renderRegistrations() {
        const container = document.getElementById("registrations-container");

        // Group registrations by type
        const registrationsByType = this.registrations.reduce(
            (acc, registration) => {
                const type = registration.type;
                if (!acc[type]) {
                    acc[type] = [];
                }
                acc[type].push(registration);
                return acc;
            },
            {}
        );

        let html = "";
        const registrationTypes = Object.keys(registrationsByType);

        registrationTypes.forEach((type, index) => {
            const typeRegistrations = registrationsByType[type];
            const isShowingAll = this.showAllByType[type] || false;
            const visibleRegistrations = isShowingAll
                ? typeRegistrations
                : typeRegistrations.slice(0, 1);
            const hasMoreToShow = typeRegistrations.length > 1;

            // Category header
            const typeLabel = this.getTypeLabel(type);
            const typeColor = this.getTypeColor(type);

            html += `
                <div class="registration-category mb-2" data-category="${type}">
                    <div class="category-header" style="background: #f8fafc; border-left: 4px solid ${this.getTypeColorHex(
                type
            )}; padding: 16px 24px; border-bottom: 1px solid #e5e7eb;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-weight: 600; color: ${this.getTypeColorHex(
                type
            )}; font-size: 16px;">${typeLabel}</span>
                            <span style="background: ${this.getTypeBadgeColor(
                type
            )}; color: ${this.getTypeColorHex(
                type
            )}; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">${typeRegistrations.length
                } RG IDs</span>
                        </div>
                    </div>

                    <!-- Desktop Table -->
                    <div style="display: block;">
                        <table style="width: 100%; border-collapse: collapse; background: white;">
                            <thead style="background: #f8fafc;">
                                <tr>
                                    <th style="padding: 12px 24px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">RG ID</th>
                                    <th style="padding: 12px 24px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subtype</th>
                                    <th style="padding: 12px 24px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Mode</th>
                                    <th style="padding: 12px 24px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Status</th>
                                    <th style="padding: 12px 24px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Amount</th>
                                    <th style="padding: 12px 24px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Action</th>
                                </tr>
                            </thead>
                            <tbody>`;

            visibleRegistrations.forEach((registration) => {
                const statusClass = this.getStatusClass(registration.status);
                const statusColor = this.getStatusColor(registration.status);
                const isExpanded = this.expandedRowDetails[registration.rgId];
                const expandIcon = isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';

                // Main row
                html += `
                    <tr style="border-bottom: 1px solid #f3f4f6; cursor: pointer;" onclick="registrations.toggleRowExpansion('${registration.rgId}')">
                        <td style="padding: 16px 24px; font-weight: 500; color: #111827; font-size: 14px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <i class="fas ${expandIcon}" style="color: #6b7280; font-size: 12px; transition: transform 0.2s;"></i>
                                ${registration.rgId}
                            </div>
                        </td>
                        <td style="padding: 16px 24px; color: #6b7280; font-size: 14px; text-transform: capitalize;">${registration.subtype || "Maintenance"}</td>
                        <td style="padding: 16px 24px; color: #6b7280; font-size: 14px;">${registration.mode}</td>
                        <td style="padding: 16px 24px;">
                            <span style="background: ${statusColor.bg}; color: ${statusColor.text}; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">${registration.status}</span>
                        </td>
                        <td style="padding: 16px 24px; font-weight: 600; color: #111827; font-size: 14px;">₹${parseInt(registration.amount).toLocaleString()}</td>
                        <td style="padding: 16px 24px;" onclick="event.stopPropagation();">
                            <button onclick="registrations.handlePayNow('${registration.rgId}')" style="background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: 500;">
                                Pay Now
                            </button>
                        </td>
                    </tr>`;

                // Expandable details row (for rent/tenant, education, and society types with detailed data)
                if (isExpanded && ((registration.type === 'tenant' && registration.tenantDetails) ||
                                   (registration.type === 'education' && registration.studentDetails) ||
                                   (registration.type === 'society' && registration.payerDetails))) {
                    html += this.renderExpandedRowDetails(registration);
                }
            });

            html += `
                            </tbody>
                        </table>
                    </div>`;

            // Show All / Show Less Button
            if (hasMoreToShow) {
                const hiddenCount = typeRegistrations.length - 1;
                const buttonText = isShowingAll
                    ? "Show Less"
                    : `Show All (${hiddenCount} more)`;
                const iconClass = isShowingAll ? "eye-slash" : "eye";

                html += `
                    <div style="text-align: center; padding: 16px; border-top: 1px solid #f3f4f6; background: ${isShowingAll ? "#f0f9ff" : "#fafafa"
                    };">
                        <div style="margin-bottom: 8px;">
                        </div>
                        <button onclick="registrations.toggleShowAll('${type}')"
                            style="font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; margin: 0 auto; padding: 8px 16px; border-radius: 6px; transition: all 0.15s ease;"
                            onmouseover="this.style.background='${isShowingAll ? "#bfdbfe" : "#fef2f2"
                    }'; this.style.transform='translateY(-1px)'"
                            onmouseout="this.style.background='${isShowingAll ? "#dbeafe" : "none"
                    }'; this.style.transform='translateY(0)'">
                            <i class="fas fa-${iconClass}" style="font-size: 12px;"></i>
                            <span>${buttonText}</span>
                            ${isShowingAll
                        ? '<i class="fas fa-chevron-up" style="font-size: 10px; margin-left: 4px;"></i>'
                        : '<i class="fas fa-chevron-down" style="font-size: 10px; margin-left: 4px;"></i>'
                    }
                        </button>
                    </div>`;
            }

            html += `</div>`;

            // Add spacing between categories
            if (index < registrationTypes.length - 1) {
                html += '<div style="margin-bottom: 16px;"></div>';
            }
        });

        if (container) {
            container.innerHTML = html;
        }

        // Show main content and hide loading
        const loadingEl = document.getElementById("registrations-loading");
        const contentEl = document.getElementById("registrations-content");
        const errorEl = document.getElementById("registrations-error");

        if (loadingEl) loadingEl.style.display = "none";
        if (contentEl) contentEl.style.display = "block";
        if (errorEl) errorEl.style.display = "none";
    }

    // Utility methods
    getTypeLabel(type) {
        const labels = {
            tenant: "Rent",
            education: "Education Fees",
            society: "Society Maintenance",
        };
        return labels[type] || type;
    }

    getTypeColor(type) {
        const colors = {
            tenant: "danger",
            education: "primary",
            society: "success",
        };
        return colors[type] || "secondary";
    }

    getTypeColorHex(type) {
        const colors = {
            tenant: "#ef4444",
            education: "#3b82f6",
            society: "#10b981",
        };
        return colors[type] || "#6b7280";
    }

    getTypeBadgeColor(type) {
        const colors = {
            tenant: "#fee2e2",
            education: "#dbeafe",
            society: "#dcfce7",
        };
        return colors[type] || "#f3f4f6";
    }

    getStatusClass(status) {
        const classes = {
            Approved: "success",
            Pending: "warning",
            Rejected: "danger",
            Active: "success",
        };
        return classes[status] || "secondary";
    }

    getStatusColor(status) {
        const colors = {
            Approved: { bg: "#dcfce7", text: "#16a34a" },
            Pending: { bg: "#fef3c7", text: "#d97706" },
            Rejected: { bg: "#fee2e2", text: "#dc2626" },
            Active: { bg: "#dcfce7", text: "#16a34a" },
        };
        return colors[status] || { bg: "#f3f4f6", text: "#6b7280" };
    }

    toggleShowAll(type) {
        // Toggle the state
        this.showAllByType[type] = !this.showAllByType[type];
        const isExpanding = this.showAllByType[type];

        // Get category element for smooth scrolling reference
        const categoryElement = document.querySelector(`[data-category="${type}"]`);

        // Re-render immediately without delays
        this.renderRegistrations();

        // Smooth scroll to maintain user context when expanding
        if (isExpanding && categoryElement) {
            // Use requestAnimationFrame for smooth scrolling
            requestAnimationFrame(() => {
                const updatedCategoryElement = document.querySelector(
                    `[data-category="${type}"]`
                );
                if (updatedCategoryElement) {
                    updatedCategoryElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                    });
                }
            });
        }

        // Debug log for development
        const typeLabel = this.getTypeLabel(type);
        const registrationCount = this.registrations.filter(
            (r) => r.type === type
        ).length;
        console.log(`${typeLabel} section ${isExpanding ? 'expanded' : 'collapsed'} - showing ${isExpanding ? registrationCount : 1} registrations`);
    }

    toggleRowExpansion(rgId) {
        // Toggle the expanded state for this specific row
        this.expandedRowDetails[rgId] = !this.expandedRowDetails[rgId];

        // Re-render to show/hide the expanded details
        this.renderRegistrations();

        // Log for debugging
        console.log(`Row ${rgId} ${this.expandedRowDetails[rgId] ? 'expanded' : 'collapsed'}`);
    }

    renderExpandedRowDetails(registration) {
        if (registration.type === 'tenant') {
            return this.renderRentExpandedDetails(registration);
        } else if (registration.type === 'education') {
            return this.renderEducationExpandedDetails(registration);
        } else if (registration.type === 'society') {
            return this.renderSocietyExpandedDetails(registration);
        }
        return '';
    }

    renderRentExpandedDetails(registration) {
        const { tenantDetails, tenancyDetails, ownerDetails, accountDetails } = registration;

        return `
            <tr style="background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                <td colspan="6" style="padding: 0;">
                    <div class="expandable-details-container" style="padding: 24px; margin: 0;">
                        <!-- Tenant Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #ef4444; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #ef4444;">
                                Tenant Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">User Type:</span>
                                    <span style="color: #6b7280;">${tenantDetails.userType}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">D.O.B:</span>
                                    <span style="color: #6b7280;">${tenantDetails.dob}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Name:</span>
                                    <span style="color: #6b7280;">${tenantDetails.name}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Email:</span>
                                    <span style="color: #6b7280;">${tenantDetails.email}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Mobile No.:</span>
                                    <span style="color: #6b7280;">${tenantDetails.mobileNo}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Address:</span>
                                    <span style="color: #6b7280;">${tenantDetails.address}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN No.:</span>
                                    <span style="color: #6b7280;">${tenantDetails.panNo}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PIN Code:</span>
                                    <span style="color: #6b7280;">${tenantDetails.pinCode}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">City:</span>
                                    <span style="color: #6b7280;">${tenantDetails.city}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Tenancy Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #ef4444; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #ef4444;">
                                Tenancy Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Rent Amount:</span>
                                    <span style="color: #6b7280;">${tenancyDetails.rentAmount}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Frequency:</span>
                                    <span style="color: #6b7280;">${tenancyDetails.frequency}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Due Date:</span>
                                    <span style="color: #6b7280;">${tenancyDetails.dueDate}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Tenancy End Date:</span>
                                    <span style="color: #6b7280;">${tenancyDetails.tenancyEndDate}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Card Issuing Bank Name:</span>
                                    <span style="color: #6b7280;">${tenancyDetails.cardIssuingBankName}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">GSTIN:</span>
                                    <span style="color: #6b7280;">${tenancyDetails.gstin || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Owner Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 style="color: #ef4444; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #ef4444;">
                                Owner Details
                            </h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Name:</span>
                                    <span style="color: #6b7280;">${ownerDetails.name}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Email:</span>
                                    <span style="color: #6b7280;">${ownerDetails.email}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Mobile No.:</span>
                                    <span style="color: #6b7280;">${ownerDetails.mobileNo || 'N/A'}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN No.:</span>
                                    <span style="color: #6b7280;">${ownerDetails.panNo}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Account Details Section -->
                        <div>
                            <h4 style="color: #ef4444; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #ef4444;">
                                Account 1 Details
                            </h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account Holder:</span>
                                    <span style="color: #6b7280;">${accountDetails.accountHolder}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account No.:</span>
                                    <span style="color: #6b7280;">${accountDetails.accountNo}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account Type:</span>
                                    <span style="color: #6b7280;">${accountDetails.accountType}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Rent Amount:</span>
                                    <span style="color: #6b7280;">${accountDetails.rentAmount}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">IFSC:</span>
                                    <span style="color: #6b7280;">${accountDetails.ifsc}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN No.:</span>
                                    <span style="color: #6b7280;">${accountDetails.panNo}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    renderEducationExpandedDetails(registration) {
        const { studentDetails, studentFeesDetails, instituteDetails, instituteAccountDetails } = registration;

        return `
            <tr style="background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                <td colspan="6" style="padding: 0;">
                    <div class="expandable-details-container" style="padding: 24px; margin: 0;">
                        <!-- Applicant Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #3b82f6; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                                Applicant Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Payer Name:</span>
                                    <span style="color: #6b7280;">${studentDetails.payerName || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Fee Type:</span>
                                    <span style="color: #6b7280;">${studentDetails.feeType || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Name:</span>
                                    <span style="color: #6b7280;">${studentDetails.name || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Payer GSTIN:</span>
                                    <span style="color: #6b7280;">${studentDetails.payerGSTIN || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Gender:</span>
                                    <span style="color: #6b7280;">${studentDetails.gender}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Date of Birth:</span>
                                    <span style="color: #6b7280;">${studentDetails.dateOfBirth}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Email:</span>
                                    <span style="color: #6b7280;">${studentDetails.email}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Mobile No.:</span>
                                    <span style="color: #6b7280;">${studentDetails.mobileNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">WhatsApp No.:</span>
                                    <span style="color: #6b7280;">${studentDetails.whatsappNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Alternate no.:</span>
                                    <span style="color: #6b7280;">${studentDetails.alternateNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN No.:</span>
                                    <span style="color: #6b7280;">${studentDetails.panNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Address Line 1:</span>
                                    <span style="color: #6b7280;">${studentDetails.addressLine1}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Address Line 2:</span>
                                    <span style="color: #6b7280;">${studentDetails.addressLine2 || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">State:</span>
                                    <span style="color: #6b7280;">${studentDetails.state}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">City:</span>
                                    <span style="color: #6b7280;">${studentDetails.city}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Pincode:</span>
                                    <span style="color: #6b7280;">${studentDetails.pincode}</span>
                                </div>
                                
                            </div>
                        </div>

                        <!-- Student Details Section (Additional) -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #3b82f6; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                                Student Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Student Name:</span>
                                    <span style="color: #6b7280;">${studentDetails.studentName}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Admission No / Roll No:</span>
                                    <span style="color: #6b7280;">${studentDetails.admissionNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Gender:</span>
                                    <span style="color: #6b7280;">${studentDetails.studentGender}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Student Date of Birth:</span>
                                    <span style="color: #6b7280;">${studentDetails.studentDateOfBirth}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Class:</span>
                                    <span style="color: #6b7280;">${studentDetails.class}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Applicant Relationship with Student:</span>
                                    <span style="color: #6b7280;">${studentDetails.applicantRelationship}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Student Fees Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #3b82f6; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                                Student Fees Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Fee Amount:</span>
                                    <span style="color: #6b7280;">${studentFeesDetails.feeAmount}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Frequency:</span>
                                    <span style="color: #6b7280;">${studentFeesDetails.frequency}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Due Date:</span>
                                    <span style="color: #6b7280;">${studentFeesDetails.dueDate}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Current Session End Date:</span>
                                    <span style="color: #6b7280;">${studentFeesDetails.currentSessionEndDate}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Card Issuing Bank:</span>
                                    <span style="color: #6b7280;">${studentFeesDetails.cardIssuingBank}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Institute Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #3b82f6; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                                Institute Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Institute Name:</span>
                                    <span style="color: #6b7280;">${instituteDetails.instituteName}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Email:</span>
                                    <span style="color: #6b7280;">${instituteDetails.email}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Website:</span>
                                    <span style="color: #6b7280;">${instituteDetails.website || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Address Line 1:</span>
                                    <span style="color: #6b7280;">${instituteDetails.addressLine1}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Phone Number:</span>
                                    <span style="color: #6b7280;">${instituteDetails.phoneNumber || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">State:</span>
                                    <span style="color: #6b7280;">${instituteDetails.state}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Address Line 2:</span>
                                    <span style="color: #6b7280;">${instituteDetails.addressLine2 || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Pincode:</span>
                                    <span style="color: #6b7280;">${instituteDetails.pincode}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">City:</span>
                                    <span style="color: #6b7280;">${instituteDetails.city}</span>
                                </div>
                                
                            </div>
                        </div>

                        <!-- Institute Account Details Section -->
                        <div>
                            <h4 class="expandable-section-header" style="color: #3b82f6; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                                Institute Account Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account Holder:</span>
                                    <span style="color: #6b7280;">${instituteAccountDetails.accountHolder}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account No.:</span>
                                    <span style="color: #6b7280;">${instituteAccountDetails.accountNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account Type:</span>
                                    <span style="color: #6b7280;">${instituteAccountDetails.accountType}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Fee Amount:</span>
                                    <span style="color: #6b7280;">${instituteAccountDetails.feeAmount}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">IFSC:</span>
                                    <span style="color: #6b7280;">${instituteAccountDetails.ifsc}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN No.:</span>
                                    <span style="color: #6b7280;">${instituteDetails.panNo || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    renderSocietyExpandedDetails(registration) {
        const { payerDetails, payerPropertyAddressDetails, societyMaintenanceChargesDetails, societyAgencyDetails, societyAgencyAccountDetails } = registration;

        return `
            <tr style="background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                <td colspan="6" style="padding: 0;">
                    <div class="expandable-details-container" style="padding: 24px; margin: 0;">
                        <!-- Payer Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #10b981; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #10b981;">
                                Payer Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Payer Type:</span>
                                    <span style="color: #6b7280;">${payerDetails.payerType}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">User Type:</span>
                                    <span style="color: #6b7280;">${payerDetails.userType}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Name:</span>
                                    <span style="color: #6b7280;">${payerDetails.name}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Gender:</span>
                                    <span style="color: #6b7280;">${payerDetails.gender}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Date of Birth:</span>
                                    <span style="color: #6b7280;">${payerDetails.dateOfBirth}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Email:</span>
                                    <span style="color: #6b7280;">${payerDetails.email}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Mobile No.:</span>
                                    <span style="color: #6b7280;">${payerDetails.mobileNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Alternate no.:</span>
                                    <span style="color: #6b7280;">${payerDetails.alternateNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN No.:</span>
                                    <span style="color: #6b7280;">${payerDetails.panNo}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Payer Property Address Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #10b981; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #10b981;">
                                Payer Property Address Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Apartment Number:</span>
                                    <span style="color: #6b7280;">${payerPropertyAddressDetails.apartmentNumber}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Address Line 1:</span>
                                    <span style="color: #6b7280;">${payerPropertyAddressDetails.addressLine1}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Address Line 2:</span>
                                    <span style="color: #6b7280;">${payerPropertyAddressDetails.addressLine2 || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Street:</span>
                                    <span style="color: #6b7280;">${payerPropertyAddressDetails.street}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">State:</span>
                                    <span style="color: #6b7280;">${payerPropertyAddressDetails.state}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">City:</span>
                                    <span style="color: #6b7280;">${payerPropertyAddressDetails.city}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Pincode:</span>
                                    <span style="color: #6b7280;">${payerPropertyAddressDetails.pincode}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Society Maintenance Charges Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #10b981; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #10b981;">
                                Society Maintenance Charges Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Amount:</span>
                                    <span style="color: #6b7280;">${societyMaintenanceChargesDetails.amount}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Frequency:</span>
                                    <span style="color: #6b7280;">${societyMaintenanceChargesDetails.frequency}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Start Date:</span>
                                    <span style="color: #6b7280;">${societyMaintenanceChargesDetails.startDate}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Due Date:</span>
                                    <span style="color: #6b7280;">${societyMaintenanceChargesDetails.dueDate}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">End Date:</span>
                                    <span style="color: #6b7280;">${societyMaintenanceChargesDetails.endDate}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">GSTIN:</span>
                                    <span style="color: #6b7280;">${societyMaintenanceChargesDetails.gstin || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Card Issuing Bank:</span>
                                    <span style="color: #6b7280;">${societyMaintenanceChargesDetails.cardIssuingBank}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Society/Agency Details Section -->
                        <div style="margin-bottom: 24px;">
                            <h4 class="expandable-section-header" style="color: #10b981; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #10b981;">
                                Society/Agency Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Society/Agency Name:</span>
                                    <span style="color: #6b7280;">${societyAgencyDetails.societyAgencyName}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Phone/Landline Number:</span>
                                    <span style="color: #6b7280;">${societyAgencyDetails.phoneLandlineNumber || 'N/A'}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Email:</span>
                                    <span style="color: #6b7280;">${societyAgencyDetails.email}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN:</span>
                                    <span style="color: #6b7280;">${societyAgencyDetails.pan}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Society/Agency Account Details Section -->
                        <div>
                            <h4 class="expandable-section-header" style="color: #10b981; font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #10b981;">
                                Society/Agency Account Details
                            </h4>
                            <div class="expandable-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account Holder:</span>
                                    <span style="color: #6b7280;">${societyAgencyAccountDetails.accountHolder}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account No.:</span>
                                    <span style="color: #6b7280;">${societyAgencyAccountDetails.accountNo}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Account Type:</span>
                                    <span style="color: #6b7280;">${societyAgencyAccountDetails.accountType}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">Maintenance Amount:</span>
                                    <span style="color: #6b7280;">${societyAgencyAccountDetails.maintenanceAmount}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">IFSC:</span>
                                    <span style="color: #6b7280;">${societyAgencyAccountDetails.ifsc}</span>
                                </div>
                                <div class="expandable-detail-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                                    <span style="font-weight: 500; color: #374151;">PAN No.:</span>
                                    <span style="color: #6b7280;">${societyAgencyAccountDetails.panNo || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    handlePayNow(rgId) {
        // Open payment page in new window
        window.open("https://redgirraffe.com/in/app/paymentmode", "_blank");

        // Show success message
        if (window.dashboard && window.dashboard.showNotification) {
            window.dashboard.showNotification(
                `Payment initiated for ${rgId}`,
                "success"
            );
        } else {
            alert(`Payment initiated for ${rgId}`);
        }
    }

    // Modal functionality
    initializeModal() {
        // Handle registration type selection
        document.addEventListener("click", (e) => {
            if (e.target.closest(".registration-type-option")) {
                const option = e.target.closest(".registration-type-option");

                // Remove active state from all options
                document
                    .querySelectorAll(".registration-type-option")
                    .forEach((opt) => {
                        opt.style.borderColor = "#e5e7eb";
                        opt.style.background = "white";
                        const arrow = opt.querySelector(".fa-arrow-right");
                        if (arrow) arrow.style.display = "none";
                    });

                // Add active state to selected option
                option.style.borderColor = "#ef4444";
                option.style.background = "#fef2f2";
                const arrow = option.querySelector(".fa-arrow-right");
                if (arrow) arrow.style.display = "block";

                // Store selected type
                this.selectedRegistrationType = option.dataset.type;

                // Enable the button
                const btn = document.getElementById("openRegistrationBtn");
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = "1";
                }
            }
        });
    }

    openNewRegistrationModal() {
        const modal = document.getElementById("newRegistrationModal");
        if (modal) {
            modal.style.display = "block";
            // Reset modal state
            this.resetModal();
        }
    }

    closeNewRegistrationModal() {
        const modal = document.getElementById("newRegistrationModal");
        if (modal) {
            modal.style.display = "none";
            this.resetModal();
        }
    }

    handleRedirect() {
        if (this.selectedRegistrationType) {
            // Open the correct registration URL
            window.open("https://redgirraffe.com/in/app/paymentmode", "_blank");

            // Optionally open a second window for the registration form
            window.open(
                `https://redgirraffe.com/in/app/register/${this.selectedRegistrationType.toLowerCase()}`,
                "_blank"
            );

            // Show success message
            if (window.dashboard && window.dashboard.showNotification) {
                window.dashboard.showNotification(
                    "Registration pages opened in new windows",
                    "success"
                );
            } else {
                alert("Registration pages opened in new windows");
            }

            // Close the modal
            this.closeNewRegistrationModal();
        }
    }

    resetModal() {
        this.selectedRegistrationType = null;
        const btn = document.getElementById("openRegistrationBtn");
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = "0.5";
        }
        document.querySelectorAll(".registration-type-option").forEach((opt) => {
            opt.style.borderColor = "#e5e7eb";
            opt.style.background = "white";
            const arrow = opt.querySelector(".fa-arrow-right");
            if (arrow) arrow.style.display = "none";
        });
    }
}

// Global utility functions
function toggleMobileSidebar() {
    if (window.dashboard) {
        window.dashboard.toggleMobileSidebar();
    } else {
        console.log('Dashboard not ready yet');
    }
}

function closeMobileSidebar() {
    if (window.dashboard) {
        window.dashboard.closeMobileSidebar();
    }
}

function toggleSidebar() {
    if (window.dashboard) {
        window.dashboard.toggleSidebar();
    }
}

function toggleTheme() {
    if (window.dashboard) {
        window.dashboard.toggleTheme();
    }
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "/login";
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    window.dashboard = new RedGiraffeDashboard();
    window.registrations = new RegistrationsManager();

    // Setup sidebar toggle after dashboard is initialized
    setTimeout(() => {
        const sidebarToggle = document.getElementById("sidebar-toggle");
        if (sidebarToggle) {
            console.log("Setting up sidebar toggle event listener");
            sidebarToggle.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Sidebar toggle clicked via event listener");
                if (window.dashboard) {
                    window.dashboard.toggleSidebar();
                }
            });
        } else {
            console.log("Sidebar toggle button not found");
        }
    }, 100);
});

// Global function for transaction tab switching (called from HTML)
function switchTransactionTab(tab) {
    if (window.dashboard) {
        window.dashboard.switchTransactionTab(tab);
    }
}
