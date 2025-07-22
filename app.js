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
                dueDate: "15/01/2025",
                frequency: "Monthly",
                endDate: "15/12/2025"
            },
            {
                id: 2,
                rgId: "RG-4000182596",
                userId: 1,
                type: "education",
                subtype: "Fees",
                mode: "Credit Card",
                status: "Approved",
                amount: "50000",
                dueDate: "10/02/2025",
                frequency: "Half Yearly",
                endDate: "10/08/2025"
            },
            {
                id: 3,
                rgId: "RG-6000182595",
                userId: 1,
                type: "society",
                subtype: "Maintenance",
                mode: "Credit Card",
                status: "Approved",
                amount: "100000",
                dueDate: "12/03/2025",
                frequency: "Half Yearly",
                endDate: "31/03/2025"
            }
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
                    panNo: "BXNPC7894C"
                },
                tenancyDetails: {
                    rentAmount: "14000",
                    frequency: "Half Yearly",
                    dueDate: "2024-11-14",
                    tenancyEndDate: "2024-12-20",
                    cardIssuingBank: "Axis Bank"
                }
            },
            "RG-4000182596": {
                registration: this.mockRegistrations[1],
                studentDetails: {
                    name: "Mr. Piyush Kumar",
                    gender: "Male",
                    dob: "06/12/2005",
                    email: "himanshu.gupta@redgiraffe.com",
                    mobile: "918527586945",
                    panNo: "BXNPC7894C"
                },
                educationDetails: {
                    feeAmount: "50000",
                    frequency: "Half Yearly",
                    dueDate: "2024-11-14",
                    cardIssuingBank: "HDFC Bank"
                }
            },
            "RG-6000182595": {
                registration: this.mockRegistrations[2],
                societyDetails: {
                    amount: "100000",
                    frequency: "Half Yearly",
                    dueDate: "12/03/2025",
                    cardIssuingBank: "Axis Bank"
                }
            }
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
                changeType: "Field Update"
            },
            {
                field: "Due Date",
                oldValue: "2024-10-15",
                newValue: "2024-11-14",
                timestamp: "2024-06-12 10:22:41",
                ipAddress: "192.168.1.15",
                registrationId: "RG-0000182568",
                registrationType: "Rent",
                changeType: "Field Update"
            }
        ];
    }

    async getRegistrations(userId) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.mockRegistrations.filter(reg => reg.userId === userId);
    }

    async getRegistrationByRgId(rgId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const data = this.mockDetailedData[rgId];
        if (!data) {
            throw new Error('Registration not found');
        }
        return data;
    }

    async saveRegistration(rgId, formData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real implementation, this would save to backend
        console.log('Saving registration:', rgId, formData);
        return { success: true };
    }

    getAuditLog(filters = {}) {
        let filteredLog = [...this.auditLog];

        if (filters.registrationType && filters.registrationType !== 'All') {
            filteredLog = filteredLog.filter(entry => entry.registrationType === filters.registrationType);
        }

        if (filters.registrationId) {
            filteredLog = filteredLog.filter(entry =>
                entry.registrationId.toLowerCase().includes(filters.registrationId.toLowerCase())
            );
        }

        return {
            entries: filteredLog,
            totalPages: Math.ceil(filteredLog.length / 10),
            currentPage: 1,
            totalEntries: filteredLog.length
        };
    }

    addAuditEntry(entry) {
        this.auditLog.unshift({
            ...entry,
            timestamp: new Date().toLocaleString(),
            ipAddress: '192.168.1.1'
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

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.initializeCharts();
        this.initializeTheme();
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
                status: "UPCOMING"
            },
            {
                id: 2,
                rgId: "RG-6000182595",
                type: "Education Fee",
                amount: 10000,
                date: new Date("2025-02-10"),
                status: "SCHEDULED"
            },
            {
                id: 3,
                rgId: "RG-4000180380",
                type: "Maintenance",
                amount: 18000,
                date: new Date("2025-03-12"),
                status: "SCHEDULED"
            },
            // Completed payments
            {
                id: 4,
                rgId: "RG-0000182568",
                type: "Rent",
                amount: 14000,
                date: new Date("2024-12-15"),
                status: "PAID"
            },
            {
                id: 5,
                rgId: "RG-0000182568",
                type: "Rent",
                amount: 14000,
                date: new Date("2024-11-15"),
                status: "PAID"
            },
            {
                id: 6,
                rgId: "RG-6000182595",
                type: "Education Fee",
                amount: 10000,
                date: new Date("2024-11-10"),
                status: "PAID"
            },
            {
                id: 7,
                rgId: "RG-4000180380",
                type: "Maintenance",
                amount: 18000,
                date: new Date("2024-12-12"),
                status: "PAID"
            },
            {
                id: 8,
                rgId: "RG-6000182595",
                type: "Education Fee",
                amount: 10000,
                date: new Date("2024-10-10"),
                status: "FAILED"
            },
            // Additional rent transactions
            {
                id: 9,
                rgId: "RG-0000182569",
                type: "Rent",
                amount: 32000,
                date: new Date("2025-01-10"),
                status: "UPCOMING"
            },
            {
                id: 10,
                rgId: "RG-0000182569",
                type: "Rent",
                amount: 32000,
                date: new Date("2024-12-10"),
                status: "PAID"
            },
            // Additional education transactions
            {
                id: 11,
                rgId: "RG-6000182596",
                type: "Education Fee",
                amount: 45000,
                date: new Date("2025-02-15"),
                status: "SCHEDULED"
            },
            {
                id: 12,
                rgId: "RG-6000182596",
                type: "Education Fee",
                amount: 45000,
                date: new Date("2024-11-15"),
                status: "PAID"
            },
            // Additional maintenance transactions
            {
                id: 13,
                rgId: "RG-4000180381",
                type: "Maintenance",
                amount: 22000,
                date: new Date("2025-03-20"),
                status: "SCHEDULED"
            },
            {
                id: 14,
                rgId: "RG-4000180381",
                type: "Maintenance",
                amount: 22000,
                date: new Date("2024-12-20"),
                status: "PAID"
            }
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
        const hamburger = document.getElementById("hamburger");
        const mobileSidebar = document.getElementById("mobile-sidebar");
        const overlay = document.getElementById("mobile-overlay");

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
                    this.closeEditModal();
                });
            }
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
        document.querySelectorAll('.transaction-tab').forEach(tabEl => {
            tabEl.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Re-render with filtered data
        this.renderTransactionHistory();
    }

    // Filter transactions based on active tab
    getFilteredTransactions() {
        let filtered = [...this.transactionHistoryData];

        switch (this.currentTransactionTab) {
            case "rent":
                filtered = filtered.filter(tx => tx.type === "Rent");
                break;
            case "education":
                filtered = filtered.filter(tx => tx.type === "Education Fee");
                break;
            case "society":
                filtered = filtered.filter(tx => tx.type === "Maintenance");
                break;
            case "completed":
                filtered = filtered.filter(tx => tx.status === "PAID");
                break;
            case "all":
            default:
                // No filtering for "all" tab
                break;
        }

        return filtered;
    }

    // Render transaction history table
    renderTransactionHistory() {
        const filteredTransactions = this.getFilteredTransactions();
        const tableBody = document.getElementById('transaction-table-body');
        const emptyState = document.getElementById('transaction-empty-state');
        const countBadge = document.getElementById('transaction-count-badge');

        if (!tableBody) return;

        // Update count badge
        if (countBadge) {
            countBadge.textContent = `${filteredTransactions.length} records`;
        }

        // Clear existing content
        tableBody.innerHTML = '';

        if (filteredTransactions.length === 0) {
            // Show empty state
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        // Hide empty state
        if (emptyState) emptyState.style.display = 'none';

        // Render transactions
        filteredTransactions.forEach(transaction => {
            const row = document.createElement('tr');

            // Get transaction type icon and color
            const typeInfo = this.getTransactionTypeInfo(transaction.type);

            // Get status badge styling
            const statusInfo = this.getTransactionStatusInfo(transaction.status);

            // Format date
            const formattedDate = this.formatTransactionDate(transaction.date);

            row.innerHTML = `
                <td>
                    <span style="font-weight: 600;">${transaction.rgId}</span>
                </td>
                <td>
                    <div class="transaction-type">
                        <i class="${typeInfo.icon}" style="color: ${typeInfo.color};"></i>
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

    // Get transaction status badge styling
    getTransactionStatusInfo(status) {
        switch (status) {
            case "PAID":
                return { class: "paid", label: "Completed" };
            case "UPCOMING":
                return { class: "upcoming", label: "Upcoming" };
            case "SCHEDULED":
                return { class: "scheduled", label: "Scheduled" };
            case "FAILED":
                return { class: "failed", label: "Failed" };
            default:
                return { class: "scheduled", label: status };
        }
    }

    // Format transaction date
    formatTransactionDate(date) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    }

    async loadEditRecords() {
        try {
            const registrations = await this.editRecordsService.getRegistrations(this.userId);
            this.registrations = registrations;
            this.renderEditRecords(registrations);
        } catch (error) {
            console.error('Error loading edit records:', error);
            this.showNotification('Failed to load edit records', 'error');
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
        // Mock data for rewards
        const mockData = {
            cashPoints: 5000,
            transactions: [
                {
                    id: 1,
                    type: "Earned",
                    description: "Payment for RG-0000182568",
                    amount: 140,
                    date: "2024-11-14",
                },
                {
                    id: 2,
                    type: "Redeemed",
                    description: "Gift card purchase",
                    amount: -500,
                    date: "2024-11-10",
                },
            ],
            giftCards: [
                {
                    id: 1,
                    name: "Amazon Gift Card",
                    value: 500,
                    discount: 10,
                    category: "Shopping",
                },
                {
                    id: 2,
                    name: "Flipkart Gift Card",
                    value: 1000,
                    discount: 15,
                    category: "Shopping",
                },
            ],
        };
        this.renderRewards(mockData);
    }

    async loadReports() {
        // Initialize reports data if not exists
        if (!this.reportsData) {
            this.reportsData = {
                currentTab: 'payments',
                period: '6months',
                payments: {
                    overview: {
                        currentMonthTotal: 28800,
                        ytdSpending: 318200,
                        largestPayment: 48000,
                        nextDuePayment: 26000
                    },
                    barChart: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                        datasets: [
                            {
                                label: 'Rent Payments',
                                data: [25000, 25000, 25000, 25000, 28800, 28800, 28800, 28800],
                                backgroundColor: '#f97316'
                            },
                            {
                                label: 'Education Fees',
                                data: [0, 0, 45000, 0, 0, 0, 45000, 0],
                                backgroundColor: '#3b82f6'
                            },
                            {
                                label: 'Society Charges',
                                data: [2500, 2500, 2500, 2500, 0, 0, 3000, 0],
                                backgroundColor: '#10b981'
                            }
                        ]
                    },
                    pieChart: {
                        labels: ['Rent', 'Education', 'Society', 'Utilities', 'Other'],
                        datasets: [{
                            data: [63, 28, 7, 1.5, 0.5],
                            backgroundColor: ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#f43f5e']
                        }]
                    }
                },
                cashpoints: {
                    overview: {
                        availableCashPoints: 2182,
                        pointsEarnedThisMonth: 288,
                        totalEarned: 8450,
                        totalRedeemed: 6268
                    },
                    barChart: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                        datasets: [
                            {
                                label: 'Points Earned',
                                data: [150, 200, 180, 220, 190, 250, 210, 288],
                                backgroundColor: '#10b981'
                            },
                            {
                                label: 'Points Redeemed',
                                data: [100, 150, 120, 180, 140, 200, 160, 180],
                                backgroundColor: '#f97316'
                            }
                        ]
                    },
                    pieChart: {
                        labels: ['Available', 'Redeemed', 'Expired'],
                        datasets: [{
                            data: [35, 60, 5],
                            backgroundColor: ['#10b981', '#f97316', '#ef4444']
                        }]
                    }
                }
            };
        }

        // Set current tab and period from UI
        this.reportsData.currentTab = this.reportsData.currentTab || 'payments';
        this.reportsData.period = this.reportsData.period || '6months';

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
        const isPayments = this.reportsData.currentTab === 'payments';

        let html = '';

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
                    <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">${currentData.overview.pointsEarnedThisMonth}</div>
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
        const isPayments = this.reportsData.currentTab === 'payments';

        // Update chart titles
        const mainChartTitle = document.getElementById("main-chart-title");
        const mainChartDescription = document.getElementById("main-chart-description");
        const pieChartTitle = document.getElementById("pie-chart-title");
        const pieChartDescription = document.getElementById("pie-chart-description");

        if (mainChartTitle) {
            mainChartTitle.textContent = isPayments ? 'Monthly Payment Breakdown' : 'Cash Points Activity';
        }
        if (mainChartDescription) {
            mainChartDescription.textContent = isPayments ? 'Your regular payments by category' : 'Points earned vs redeemed each month';
        }
        if (pieChartTitle) {
            pieChartTitle.textContent = isPayments ? 'Spending Distribution' : 'Cash Points Distribution';
        }
        if (pieChartDescription) {
            pieChartDescription.textContent = isPayments ? 'Percentage breakdown by category' : 'Available vs redeemed points';
        }

        // Update main chart
        this.renderChart('main-chart', 'bar', currentData.barChart);

        // Update pie chart
        this.renderChart('pie-chart', 'pie', currentData.pieChart);
    }

    renderChart(canvasId, type, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas element with id '${canvasId}' not found`);
            return;
        }

        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js library is not loaded');
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

        const ctx = canvas.getContext('2d');

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
                            position: type === 'pie' ? 'bottom' : 'top',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(17, 24, 39, 0.9)',
                            titleColor: '#f9fafb',
                            bodyColor: '#f3f4f6',
                            padding: 10,
                            cornerRadius: 6,
                            boxPadding: 4
                        }
                    },
                    scales: type === 'pie' ? {} : {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 11
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(203, 213, 225, 0.2)'
                            },
                            ticks: {
                                font: {
                                    size: 11
                                },
                                callback: function(value) {
                                    return type === 'bar' && value >= 1000 ? '₹' + (value/1000) + 'k' : value;
                                }
                            }
                        }
                    }
                }
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
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">Key takeaways from your ${this.reportsData.currentTab === 'payments' ? 'payment' : 'cash points'} data</p>
                </div>
                <div style="padding: 20px;">
                    ${this.reportsData.currentTab === 'payments' ? this.getPaymentInsights() : this.getCashPointsInsights()}
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
        const currentTab = this.reportsData?.currentTab || 'payments';
        const period = this.reportsData?.period || '6months';

        // Create mock CSV data
        const csvData = this.generateReportCSV(currentTab, period);

        // Create and download file
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentTab}_report_${period}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showNotification(`${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} report downloaded successfully!`, 'success');
    }

    generateReportCSV(type, period) {
        if (type === 'payments') {
            const headers = ['Month', 'Rent', 'Education', 'Society', 'Total'];
            const data = [
                ['Jan 2025', '25000', '0', '2500', '27500'],
                ['Feb 2025', '25000', '0', '2500', '27500'],
                ['Mar 2025', '25000', '45000', '2500', '72500'],
                ['Apr 2025', '25000', '0', '2500', '27500'],
                ['May 2025', '28800', '0', '0', '28800'],
                ['Jun 2025', '28800', '0', '0', '28800'],
                ['Jul 2025', '28800', '45000', '3000', '76800'],
                ['Aug 2025', '28800', '0', '0', '28800']
            ];
            return [headers, ...data].map(row => row.join(',')).join('\n');
        } else {
            const headers = ['Month', 'Points Earned', 'Points Redeemed', 'Net Change'];
            const data = [
                ['Jan 2025', '150', '100', '50'],
                ['Feb 2025', '200', '150', '50'],
                ['Mar 2025', '180', '120', '60'],
                ['Apr 2025', '220', '180', '40'],
                ['May 2025', '190', '140', '50'],
                ['Jun 2025', '250', '200', '50'],
                ['Jul 2025', '210', '160', '50'],
                ['Aug 2025', '288', '180', '108']
            ];
            return [headers, ...data].map(row => row.join(',')).join('\n');
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
                        rewardAmount: "500"
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
                        rewardAmount: "500"
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
                        rewardAmount: "500"
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
                        rewardAmount: "500"
                    }
                ]
            };
        }

        // Update stats in the HTML
        this.updateReferralStats();

        // Load the current tab (default to active)
        this.currentReferralTab = this.currentReferralTab || 'active';
        this.renderReferralTable(this.currentReferralTab);
    }

    updateReferralStats() {
        if (!this.referralsData) return;

        const referrals = this.referralsData.referrals;
        const totalReferrals = referrals.length;
        const completedReferrals = referrals.filter(ref => ref.status === "Completed");
        const pendingReferrals = referrals.filter(ref => ref.status === "Pending");
        const totalEarned = completedReferrals.length * 500;
        const completionRate = totalReferrals > 0 ? Math.round((completedReferrals.length / totalReferrals) * 100) : 0;

        // Update stats in the DOM
        const totalElement = document.getElementById("total-referrals");
        const completedElement = document.getElementById("completed-referrals");
        const pendingElement = document.getElementById("pending-referrals");
        const earnedElement = document.getElementById("total-earned");
        const rateElement = document.getElementById("completion-rate");

        if (totalElement) totalElement.textContent = totalReferrals;
        if (completedElement) completedElement.textContent = completedReferrals.length;
        if (pendingElement) pendingElement.textContent = pendingReferrals.length;
        if (earnedElement) earnedElement.textContent = `₹${totalEarned.toLocaleString()}`;
        if (rateElement) rateElement.textContent = `${completionRate}% completion rate`;
    }

    renderReferralTable(tab) {
        const container = document.getElementById("referrals-table-content");
        if (!container || !this.referralsData) return;

        const referrals = this.referralsData.referrals;
        const filteredReferrals = tab === 'active'
            ? referrals.filter(ref => ref.status === "Pending")
            : referrals.filter(ref => ref.status === "Completed");

        let html = '';

        if (filteredReferrals.length === 0) {
            const emptyMessage = tab === 'active'
                ? 'No active referrals yet'
                : 'No completed referrals yet';
            const emptyDescription = tab === 'active'
                ? 'Start sharing your referral link to invite friends'
                : 'Your completed referrals will appear here';

            html = `
                <div style="text-align: center; padding: 48px 24px;">
                    <div style="background: #f3f4f6; color: #9ca3af; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px;">
                        <i class="fas fa-${tab === 'active' ? 'user-plus' : 'check-circle'}"></i>
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
                                ${tab === 'active' ? '<th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Action</th>' : '<th style="padding: 12px 16px; text-align: left; font-weight: 600; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Earned</th>'}
                            </tr>
                        </thead>
                        <tbody>
            `;

            filteredReferrals.forEach((referral, index) => {
                const date = tab === 'completed' && referral.completedAt
                    ? new Date(referral.completedAt).toLocaleDateString()
                    : new Date(referral.invitedAt).toLocaleDateString();

                html += `
                    <tr style="border-bottom: 1px solid #f3f4f6; ${index % 2 === 0 ? 'background: #fafafa;' : ''}">
                        <td style="padding: 12px 16px; font-weight: 500; color: #111827;">${referral.referredName || "N/A"}</td>
                        <td style="padding: 12px 16px; color: #6b7280;">${referral.referredEmail}</td>
                        <td style="padding: 12px 16px; color: #6b7280;">${date}</td>
                        <td style="padding: 12px 16px;">
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-${referral.status === 'Completed' ? 'check-circle' : 'clock'}" style="color: ${referral.status === 'Completed' ? '#10b981' : '#f59e0b'}; font-size: 14px;"></i>
                                <span style="color: ${referral.status === 'Completed' ? '#10b981' : '#f59e0b'}; font-weight: 500;">${referral.status}</span>
                            </div>
                        </td>
                `;

                if (tab === 'active') {
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

                html += '</tr>';
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
                currentTab: 'account',
                user: {
                    fullName: "Piyush Kumar",
                    displayName: "Piyush",
                    email: "piyush.kumar@example.com",
                    phone: "+91 98765 43210",
                    address: "123 Main Street, New Delhi",
                    city: "New Delhi",
                    state: "Delhi",
                    pincode: "110001"
                },
                formData: {
                    displayName: "Piyush"
                }
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
        const accountCard = document.getElementById('account-settings-card');
        const pictureCard = document.getElementById('profile-picture-card');
        const passwordCard = document.getElementById('password-settings-card');

        if (tab === 'account') {
            if (accountCard) accountCard.style.display = 'block';
            if (pictureCard) pictureCard.style.display = 'block';
            if (passwordCard) passwordCard.style.display = 'none';
        } else if (tab === 'password') {
            if (accountCard) accountCard.style.display = 'none';
            if (pictureCard) pictureCard.style.display = 'none';
            if (passwordCard) passwordCard.style.display = 'block';
        }

        // Update form values if on account tab
        if (tab === 'account' && this.profileData) {
            this.populateAccountForm();
        }
    }

    populateAccountForm() {
        if (!this.profileData) return;

        const user = this.profileData.user;
        const formData = this.profileData.formData;

        // Populate form fields
        const fullNameInput = document.getElementById('fullName');
        const displayNameInput = document.getElementById('displayName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');
        const cityInput = document.getElementById('city');
        const stateInput = document.getElementById('state');
        const pincodeInput = document.getElementById('pincode');

        if (fullNameInput) fullNameInput.value = user.fullName;
        if (displayNameInput) displayNameInput.value = formData.displayName || user.displayName;
        if (emailInput) emailInput.value = user.email;
        if (phoneInput) phoneInput.value = user.phone;
        if (addressInput) addressInput.value = user.address;
        if (cityInput) cityInput.value = user.city;
        if (stateInput) stateInput.value = user.state;
        if (pincodeInput) pincodeInput.value = user.pincode;
    }

    // Account settings save functionality
    saveAccountSettings() {
        const saveBtn = document.getElementById('save-account-btn');
        const saveText = document.getElementById('save-account-text');
        const saveSpinner = document.getElementById('save-account-spinner');

        if (!saveBtn || !saveText || !saveSpinner) return;

        // Show loading state
        saveBtn.disabled = true;
        saveText.textContent = 'Saving...';
        saveSpinner.style.display = 'block';

        // Get form data
        const displayNameInput = document.getElementById('displayName');

        if (displayNameInput && this.profileData) {
            this.profileData.formData.displayName = displayNameInput.value;
        }

        // Simulate save operation
        setTimeout(() => {
            // Reset button state
            saveBtn.disabled = false;
            saveText.textContent = 'Save Changes';
            saveSpinner.style.display = 'none';

            // Show success notification
            this.showNotification('Account settings saved successfully!', 'success');
        }, 1000);
    }

    // Password update functionality
    updatePassword() {
        const updateBtn = document.getElementById('update-password-btn');
        const updateText = document.getElementById('update-password-text');
        const updateSpinner = document.getElementById('update-password-spinner');

        if (!updateBtn || !updateText || !updateSpinner) return;

        // Get form inputs
        const currentPasswordInput = document.getElementById('currentPassword');
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput) return;

        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validation
        if (!currentPassword) {
            this.showNotification('Please enter your current password', 'error');
            return;
        }

        if (!newPassword) {
            this.showNotification('Please enter a new password', 'error');
            return;
        }

        if (newPassword.length < 8) {
            this.showNotification('New password must be at least 8 characters long', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showNotification('New passwords do not match', 'error');
            return;
        }

        // Show loading state
        updateBtn.disabled = true;
        updateText.textContent = 'Updating...';
        updateSpinner.style.display = 'block';

        // Simulate password update
        setTimeout(() => {
            // Reset button state
            updateBtn.disabled = false;
            updateText.textContent = 'Update Password';
            updateSpinner.style.display = 'none';

            // Clear form
            currentPasswordInput.value = '';
            newPasswordInput.value = '';
            confirmPasswordInput.value = '';

            // Show success notification
            this.showNotification('Password updated successfully!', 'success');
        }, 1200);
    }

    // Profile picture functionality
    uploadProfilePicture() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    this.showNotification('File size must be less than 5MB', 'error');
                    return;
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    this.showNotification('Please select a valid image file', 'error');
                    return;
                }

                // Simulate upload
                this.showNotification('Profile picture uploaded successfully!', 'success');
            }
        };

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    removeProfilePicture() {
        // Show confirmation
        if (confirm('Are you sure you want to remove your profile picture?')) {
            this.showNotification('Profile picture removed successfully!', 'success');
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
    }

    updatePaymentChart() {
        const ctx = document.getElementById("paymentChart")?.getContext("2d");
        if (!ctx || !this.dashboardData) return;

        if (this.charts.payment) {
            this.charts.payment.destroy();
        }

        this.charts.payment = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Tenant", "Education", "Society", "Others"],
                datasets: [
                    {
                        data: [45, 25, 20, 10],
                        backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24"],
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
        if (!ctx || !this.dashboardData) return;

        if (this.charts.history) {
            this.charts.history.destroy();
        }

        this.charts.history = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        label: "Payments",
                        data: [12000, 19000, 15000, 25000, 22000, 30000],
                        borderColor: "#ff6b6b",
                        backgroundColor: "rgba(255, 107, 107, 0.1)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "#ff6b6b",
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2,
                        pointRadius: 6,
                    },
                ],
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
            this.showNotification(`Loading registration data for ${rgId}...`, 'info');
            const registrationData = await this.editRecordsService.getRegistrationByRgId(rgId);

            if (!registrationData) {
                throw new Error('Registration not found');
            }

            this.selectedRegistration = registrationData;
            this.activeEditForm = registrationType;
            this.showEditForm(registrationType, registrationData);
        } catch (error) {
            console.error('Error loading registration data:', error);
            this.showNotification('Failed to load registration data. Please try again.', 'error');
        }
    }

    showEditForm(registrationType, registrationData) {
        const modalHtml = this.generateEditFormModal(registrationType, registrationData);
        this.showModal(modalHtml);
    }

    generateEditFormModal(registrationType, registrationData) {
        const title = this.getEditFormTitle(registrationType);
        const formFields = this.getEditFormFields(registrationType, registrationData);

        return `
            <div style="background: white; border-radius: 12px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; position: relative;">
                <div style="padding: 24px; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; background: white; z-index: 10;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">${title}</h2>
                        <button onclick="dashboard.closeModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 4px;">×</button>
                    </div>
                </div>
                <div style="padding: 24px;">
                    <form id="edit-form" onsubmit="dashboard.handleSaveEdit(event, '${registrationType}')">
                        ${formFields}
                        <div style="display: flex; gap: 12px; margin-top: 24px;">
                            <button type="submit" style="flex: 1; background: #16a34a; color: white; padding: 12px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;">
                                Save Changes
                            </button>
                            <button type="button" onclick="dashboard.closeModal()" style="flex: 1; background: #6b7280; color: white; padding: 12px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;">
                                Cancel
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
            case 'tenant':
                return 'Edit Rent Registration';
            case 'education':
                return 'Edit Education Registration';
            case 'society':
                return 'Edit Society Registration';
            default:
                return 'Edit Registration';
        }
    }

    getEditFormFields(registrationType, registrationData) {
        switch (registrationType) {
            case 'tenant':
                return this.getTenantFormFields(registrationData);
            case 'education':
                return this.getEducationFormFields(registrationData);
            case 'society':
                return this.getSocietyFormFields(registrationData);
            default:
                return '';
        }
    }

    getTenantFormFields(registrationData) {
        const tenancyDetails = registrationData.tenancyDetails || {};
        return `
            <div style="display: grid; gap: 16px;">
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Rent Amount</label>
                    <input type="text" name="rentAmount" value="${tenancyDetails.rentAmount || ''}"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Frequency</label>
                    <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="Monthly" ${tenancyDetails.frequency === 'Monthly' ? 'selected' : ''}>Monthly</option>
                        <option value="Quarterly" ${tenancyDetails.frequency === 'Quarterly' ? 'selected' : ''}>Quarterly</option>
                        <option value="Half Yearly" ${tenancyDetails.frequency === 'Half Yearly' ? 'selected' : ''}>Half Yearly</option>
                        <option value="Yearly" ${tenancyDetails.frequency === 'Yearly' ? 'selected' : ''}>Yearly</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Due Date</label>
                    <input type="date" name="dueDate" value="${tenancyDetails.dueDate || ''}"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Tenancy End Date</label>
                    <input type="date" name="tenancyEndDate" value="${tenancyDetails.tenancyEndDate || ''}"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Card Issuing Bank</label>
                    <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="">Select Bank</option>
                        <option value="HDFC Bank" ${tenancyDetails.cardIssuingBank === 'HDFC Bank' ? 'selected' : ''}>HDFC Bank</option>
                        <option value="Axis Bank" ${tenancyDetails.cardIssuingBank === 'Axis Bank' ? 'selected' : ''}>Axis Bank</option>
                        <option value="ICICI Bank" ${tenancyDetails.cardIssuingBank === 'ICICI Bank' ? 'selected' : ''}>ICICI Bank</option>
                        <option value="SBI" ${tenancyDetails.cardIssuingBank === 'SBI' ? 'selected' : ''}>SBI</option>
                    </select>
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
                    <input type="text" name="feeAmount" value="${educationDetails.feeAmount || ''}"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Frequency</label>
                    <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="Monthly" ${educationDetails.frequency === 'Monthly' ? 'selected' : ''}>Monthly</option>
                        <option value="Quarterly" ${educationDetails.frequency === 'Quarterly' ? 'selected' : ''}>Quarterly</option>
                        <option value="Half Yearly" ${educationDetails.frequency === 'Half Yearly' ? 'selected' : ''}>Half Yearly</option>
                        <option value="Yearly" ${educationDetails.frequency === 'Yearly' ? 'selected' : ''}>Yearly</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Due Date</label>
                    <input type="date" name="dueDate" value="${educationDetails.dueDate || ''}"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Card Issuing Bank</label>
                    <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="">Select Bank</option>
                        <option value="HDFC Bank" ${educationDetails.cardIssuingBank === 'HDFC Bank' ? 'selected' : ''}>HDFC Bank</option>
                        <option value="Axis Bank" ${educationDetails.cardIssuingBank === 'Axis Bank' ? 'selected' : ''}>Axis Bank</option>
                        <option value="ICICI Bank" ${educationDetails.cardIssuingBank === 'ICICI Bank' ? 'selected' : ''}>ICICI Bank</option>
                        <option value="SBI" ${educationDetails.cardIssuingBank === 'SBI' ? 'selected' : ''}>SBI</option>
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
                    <input type="text" name="amount" value="${societyDetails.amount || ''}"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Frequency</label>
                    <select name="frequency" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="Monthly" ${societyDetails.frequency === 'Monthly' ? 'selected' : ''}>Monthly</option>
                        <option value="Quarterly" ${societyDetails.frequency === 'Quarterly' ? 'selected' : ''}>Quarterly</option>
                        <option value="Half Yearly" ${societyDetails.frequency === 'Half Yearly' ? 'selected' : ''}>Half Yearly</option>
                        <option value="Yearly" ${societyDetails.frequency === 'Yearly' ? 'selected' : ''}>Yearly</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Due Date</label>
                    <input type="date" name="dueDate" value="${societyDetails.dueDate || ''}"
                           style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                </div>
                <div>
                    <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 6px; font-family: 'Inter', sans-serif;">Card Issuing Bank</label>
                    <select name="cardIssuingBank" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;" required>
                        <option value="">Select Bank</option>
                        <option value="HDFC Bank" ${societyDetails.cardIssuingBank === 'HDFC Bank' ? 'selected' : ''}>HDFC Bank</option>
                        <option value="Axis Bank" ${societyDetails.cardIssuingBank === 'Axis Bank' ? 'selected' : ''}>Axis Bank</option>
                        <option value="ICICI Bank" ${societyDetails.cardIssuingBank === 'ICICI Bank' ? 'selected' : ''}>ICICI Bank</option>
                        <option value="SBI" ${societyDetails.cardIssuingBank === 'SBI' ? 'selected' : ''}>SBI</option>
                    </select>
                </div>
            </div>
        `;
    }

    async handleSaveEdit(event, registrationType) {
        event.preventDefault();

        if (!this.selectedRegistration) return;

        try {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            this.showNotification('Saving registration data...', 'info');

            await this.editRecordsService.saveRegistration(this.selectedRegistration.registration.rgId, data);

            this.showNotification('Registration updated successfully!', 'success');
            this.closeModal();
            this.activeEditForm = null;
            this.selectedRegistration = null;

            // Reload the edit records to show updated data
            this.loadEditRecords();
        } catch (error) {
            console.error('Error saving registration data:', error);
            this.showNotification('There was an error updating your registration. Please try again.', 'error');
        }
    }

    showModal(content) {
        const modalOverlay = document.getElementById('modal-overlay') || this.createModalOverlay();
        modalOverlay.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 16px; width: 100%;">
                ${content}
            </div>
        `;
        modalOverlay.style.display = 'flex';
        modalOverlay.style.opacity = '1';
        document.body.style.overflow = 'hidden';
    }

    createModalOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'modal-overlay';
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

    closeModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        if (modalOverlay) {
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                modalOverlay.innerHTML = '';
            }, 300);
        }
        document.body.style.overflow = 'auto';
        this.activeEditForm = null;
        this.selectedRegistration = null;
    }

    showUploadModal() {
        const modalHtml = `
            <div style="background: white; border-radius: 12px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; position: relative;">
                <div style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">Upload Documents</h2>
                        <button onclick="dashboard.closeModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 4px;">×</button>
                    </div>
                </div>
                <div style="padding: 24px;">
                    <form id="upload-form" onsubmit="dashboard.handleUploadDocuments(event)">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; color: #374151; font-size: 14px; font-weight: 500; margin-bottom: 8px; font-family: 'Inter', sans-serif;">Select Documents</label>
                            <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                   style="width: 100%; height: 200px; padding: 10px 12px; border: 2px dashed #d1d5db; border-radius: 6px; font-size: 14px; font-family: 'Inter', sans-serif;">
                            <p style="color: #6b7280; font-size: 12px; margin-top: 4px; font-family: 'Inter', sans-serif;">Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB each)</p>
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
                            <button type="submit" style="flex: 1; background: #dc2626; color: white; padding: 12px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;">
                                Upload Documents
                            </button>
                            <button type="button" onclick="dashboard.closeModal()" style="flex: 1; background: #6b7280; color: white; padding: 12px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        this.showModal(modalHtml);
    }

    handleUploadDocuments(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const files = event.target.querySelector('input[type="file"]').files;
        const remarks = formData.get('remarks');

        this.showNotification(`Successfully uploaded ${files.length} document(s).`, 'success');
        this.closeModal();
    }

    showAuditLog() {
        const auditData = this.editRecordsService.getAuditLog();
        const modalHtml = `
            <div style="background: white; border-radius: 12px; max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto; position: relative;">
                <div style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0; font-family: 'Inter', sans-serif;">Audit Log</h2>
                        <button onclick="dashboard.closeModal()" style="background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; padding: 4px;">×</button>
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
        this.showModal(modalHtml);
    }

    renderAuditLogEntries(entries) {
        if (entries.length === 0) {
            return '<p style="text-align: center; color: #6b7280; padding: 32px 0; font-family: \'Inter\', sans-serif;">No audit log entries found</p>';
        }

        return entries.map(entry => `
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
        `).join('');
    }

    filterAuditLog() {
        const typeFilter = document.getElementById('audit-type-filter')?.value || 'All';
        const idFilter = document.getElementById('audit-id-filter')?.value || '';

        const auditData = this.editRecordsService.getAuditLog({
            registrationType: typeFilter,
            registrationId: idFilter
        });

        const contentDiv = document.getElementById('audit-log-content');
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

    closeEditModal() {
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

    // Mobile Functions
    toggleMobileSidebar() {
        const sidebar = document.getElementById("mobile-sidebar");
        const overlay = document.getElementById("mobile-overlay");

        if (sidebar && overlay) {
            const isOpen = sidebar.classList.contains("open");

            if (isOpen) {
                this.closeMobileSidebar();
            } else {
                sidebar.classList.add("open");
                overlay.classList.add("show");
                document.body.style.overflow = "hidden";
            }
        }
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById("mobile-sidebar");
        const overlay = document.getElementById("mobile-overlay");

        if (sidebar && overlay) {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
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
        const rentRegistrations = registrations.filter(reg => reg.type === 'tenant') || [];
        const educationRegistrations = registrations.filter(reg => reg.type === 'education') || [];
        const societyRegistrations = registrations.filter(reg => reg.type === 'society') || [];

        const html = `
            <div style="padding: 0 16px;">
                <!-- Header with action buttons -->
                <div style="margin-bottom: 32px; ">
                    <div style=" width: 100%; display: flex; justify-content: end; align-items: center; margin-bottom: 16px;">
                        <div style="display: flex;  gap: 12px;">
                            <button onclick="dashboard.showUploadModal()"
                                    style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #dc2626; color: white; padding: 12px 16px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; font-family: 'Inter', sans-serif;"
                                    onmouseover="this.style.backgroundColor='#b91c1c'"
                                    onmouseout="this.style.backgroundColor='#dc2626'">
                                <i class="fas fa-upload" style="font-size: 14px;"></i>
                                <span>Upload Documents</span>
                            </button>
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
                        ${this.renderRegistrationCards(rentRegistrations, 'tenant')}
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
                        ${this.renderRegistrationCards(educationRegistrations, 'education')}
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
                        ${this.renderRegistrationCards(societyRegistrations, 'society')}
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById("edit-records-section");
        if (container) {
            const contentDiv = container.querySelector('.page-header').nextElementSibling;
            if (contentDiv) {
                contentDiv.innerHTML = html;
            } else {
                // Create content div if it doesn't exist
                const newContentDiv = document.createElement('div');
                newContentDiv.innerHTML = html;
                container.appendChild(newContentDiv);
            }
        }
    }

    renderRegistrationCards(registrations, type) {
        if (registrations.length === 0) {
            return `<p style="text-align: center; color: #6b7280; padding: 32px 0; font-family: 'Inter', sans-serif;">No ${type} registrations found</p>`;
        }

        return registrations.map(registration => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px; gap: 12px;">
                <div style="flex: 1;">
                    <h3 style="font-weight: 600; font-size: 16px; color: #111827; margin: 0 0 8px 0; font-family: 'Inter', sans-serif;">${registration.rgId}</h3>
                    <div style="display: flex; flex-direction: column; gap: 4px; font-size: 14px; color: #6b7280; font-family: 'Inter', sans-serif;">
                        <p style="margin: 0;">Status: ${registration.status}</p>
                        <p style="margin: 0;">Mode: ${registration.mode}</p>
                    </div>
                </div>
                <button onclick="dashboard.handleEditClick('${type}', '${registration.rgId}')"
                        style="height: 48px; background: #16a34a; color: white; padding: 8px 16px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px;"
                        onmouseover="this.style.backgroundColor='#15803d'"
                        onmouseout="this.style.backgroundColor='#16a34a'">
                    <i class="fas fa-edit" style="font-size: 14px;"></i>
                    EDIT
                </button>
            </div>
        `).join('');
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
            case "wallet":
                this.loadRewards();
                break;
            case "history":
                this.renderRewardsPurchaseHistory();
                break;
            case "giftcards":
                this.renderGiftCards();
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
        const referralLink = this.referralsData?.referralLink || "https://redgirraffe.com/ref/PIYUSH500";

        if (method === 'email') {
            const subject = encodeURIComponent("Join RedGirraffe - Get ₹500 Bonus!");
            const body = encodeURIComponent(`Hi there!\n\nI'd like to invite you to join RedGirraffe, an amazing payment platform.\n\nUse my referral code: ${referralCode}\nOr click this link: ${referralLink}\n\nYou'll get ₹500 bonus when you sign up and make your first payment!\n\nBest regards`);
            window.open(`mailto:?subject=${subject}&body=${body}`);
        } else if (method === 'whatsapp') {
            const message = encodeURIComponent(`Join RedGirraffe and get ₹500 bonus! Use my referral code: ${referralCode} or click: ${referralLink}`);
            window.open(`https://wa.me/?text=${message}`, '_blank');
        }

        this.showNotification(`Referral shared via ${method}!`, 'success');
    }

    copyReferralLink() {
        const referralLink = this.referralsData?.referralLink || "https://redgirraffe.com/ref/PIYUSH500";
        navigator.clipboard.writeText(referralLink)
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
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';
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
        const existingReferral = this.referralsData.referrals.find(ref => ref.referredEmail === email);
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
            rewardAmount: "500"
        };

        // Add to referrals data
        this.referralsData.referrals.push(newReferral);

        // Open email client
        const subject = encodeURIComponent("Join RedGirraffe - Get ₹500 Bonus!");
        const body = encodeURIComponent(`Hi there!\n\nI'd like to invite you to join RedGirraffe, an amazing payment platform.\n\nUse my referral code: ${this.referralsData.referralCode}\nOr click this link: ${this.referralsData.referralLink}\n\nYou'll get ₹500 bonus when you sign up and make your first payment!\n\nBest regards`);
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
            errorDiv.style.display = 'block';
        }
    }

    sendReminder(referralId) {
        const referral = this.referralsData.referrals.find(ref => ref.id === referralId);
        if (!referral) return;

        const subject = encodeURIComponent("Reminder: Join RedGirraffe - Get ₹500 Bonus!");
        const body = encodeURIComponent(`Hi there!\n\nThis is a friendly reminder about my invitation to join RedGirraffe.\n\nUse my referral code: ${this.referralsData.referralCode}\nOr click this link: ${this.referralsData.referralLink}\n\nYou'll get ₹500 bonus when you sign up and make your first payment!\n\nBest regards`);
        window.open(`mailto:${referral.referredEmail}?subject=${subject}&body=${body}`);

        this.showNotification(`Reminder email opened for ${referral.referredEmail}`, "success");
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
            return 'Display name is required';
        }
        if (value.trim().length < 2) {
            return 'Display name must be at least 2 characters';
        }
        if (value.trim().length > 50) {
            return 'Display name must be less than 50 characters';
        }
        return null;
    }

    validatePassword(password) {
        if (!password || password.length === 0) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number';
        }
        return null;
    }

    // Enhanced save with validation
    saveAccountSettingsWithValidation() {
        const displayNameInput = document.getElementById('displayName');

        if (!displayNameInput) return;

        const displayName = displayNameInput.value.trim();
        const validationError = this.validateDisplayName(displayName);

        if (validationError) {
            this.showNotification(validationError, 'error');
            displayNameInput.focus();
            return;
        }

        // Proceed with save
        this.saveAccountSettings();
    }

    // Enhanced password update with validation
    updatePasswordWithValidation() {
        const currentPasswordInput = document.getElementById('currentPassword');
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput) return;

        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validate current password
        if (!currentPassword) {
            this.showNotification('Please enter your current password', 'error');
            currentPasswordInput.focus();
            return;
        }

        // Validate new password
        const passwordError = this.validatePassword(newPassword);
        if (passwordError) {
            this.showNotification(passwordError, 'error');
            newPasswordInput.focus();
            return;
        }

        // Validate password confirmation
        if (newPassword !== confirmPassword) {
            this.showNotification('New passwords do not match', 'error');
            confirmPasswordInput.focus();
            return;
        }

        // Proceed with update
        this.updatePassword();
    }

    // Initialize form event listeners
    initializeSettingsEventListeners() {
        // Add real-time validation for display name
        const displayNameInput = document.getElementById('displayName');
        if (displayNameInput) {
            displayNameInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                const error = this.validateDisplayName(value);

                if (error) {
                    e.target.classList.add('error');
                    e.target.classList.remove('success');
                } else {
                    e.target.classList.remove('error');
                    e.target.classList.add('success');
                }
            });
        }

        // Add real-time validation for password fields
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', (e) => {
                const value = e.target.value;
                const error = this.validatePassword(value);

                if (error && value.length > 0) {
                    e.target.classList.add('error');
                    e.target.classList.remove('success');
                } else if (value.length > 0) {
                    e.target.classList.remove('error');
                    e.target.classList.add('success');
                }

                // Also validate confirm password if it has a value
                if (confirmPasswordInput && confirmPasswordInput.value) {
                    this.validateConfirmPassword();
                }
            });
        }

        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', () => {
                this.validateConfirmPassword();
            });
        }

        // Add form submission handlers
        const accountForm = document.getElementById('account-settings-form');
        if (accountForm) {
            accountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveAccountSettingsWithValidation();
            });
        }

        const passwordForm = document.getElementById('password-settings-form');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updatePasswordWithValidation();
            });
        }
    }

    validateConfirmPassword() {
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (!newPasswordInput || !confirmPasswordInput) return;

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword.length > 0) {
            if (newPassword === confirmPassword) {
                confirmPasswordInput.classList.remove('error');
                confirmPasswordInput.classList.add('success');
            } else {
                confirmPasswordInput.classList.add('error');
                confirmPasswordInput.classList.remove('success');
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

        let html = `
            <div class="chart-card">
                <div class="chart-header">
                    <div class="chart-title">Purchase History</div>
                </div>
                <div style="padding: 20px;">
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead style="background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Name</th>
                                    <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Order ID</th>
                                    <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Amount</th>
                                    <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Date</th>
                                    <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid #f3f4f6;">
                                    <td style="padding: 16px; font-weight: 500; color: #111827;">Amazon Gift Card</td>
                                    <td style="padding: 16px; color: #6b7280;">ORD-001</td>
                                    <td style="padding: 16px; font-weight: 600; color: #111827;">₹500</td>
                                    <td style="padding: 16px; color: #6b7280;">Nov 10, 2024</td>
                                    <td style="padding: 16px;">
                                        <span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">Active</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
    }

    renderGiftCards() {
        const container = document.getElementById("rewards-content");
        if (!container) return;

        let html = `
            <div style="margin-bottom: 20px;">
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
                    <input type="text" placeholder="Search gift cards..." style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
                    <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
                        <option>All Categories</option>
                        <option>Shopping</option>
                        <option>Food & Dining</option>
                        <option>Entertainment</option>
                    </select>
                    <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
                        <option>Sort by Discount</option>
                        <option>High to Low</option>
                        <option>Low to High</option>
                        <option>Popularity</option>
                    </select>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                <div class="chart-card">
                    <div style="padding: 20px;">
                        <div style="text-align: center; margin-bottom: 16px;">
                            <div style="width: 60px; height: 60px; background: #ff9500; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                                <i class="fab fa-amazon" style="color: white; font-size: 24px;"></i>
                            </div>
                            <h3 style="font-weight: 600; margin-bottom: 4px;">Amazon Gift Card</h3>
                            <p style="color: #6b7280; font-size: 14px;">Shopping</p>
                        </div>
                        <div style="text-align: center; margin-bottom: 16px;">
                            <div style="font-size: 24px; font-weight: 700; color: #111827;">₹500</div>
                            <div style="color: #10b981; font-size: 14px;">10% off</div>
                        </div>
                        <button style="width: 100%; background: #ef4444; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer;">Redeem Now</button>
                    </div>
                </div>

                <div class="chart-card">
                    <div style="padding: 20px;">
                        <div style="text-align: center; margin-bottom: 16px;">
                            <div style="width: 60px; height: 60px; background: #047bd6; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                                <i class="fas fa-shopping-cart" style="color: white; font-size: 24px;"></i>
                            </div>
                            <h3 style="font-weight: 600; margin-bottom: 4px;">Flipkart Gift Card</h3>
                            <p style="color: #6b7280; font-size: 14px;">Shopping</p>
                        </div>
                        <div style="text-align: center; margin-bottom: 16px;">
                            <div style="font-size: 24px; font-weight: 700; color: #111827;">₹1000</div>
                            <div style="color: #10b981; font-size: 14px;">15% off</div>
                        </div>
                        <button style="width: 100%; background: #ef4444; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer;">Redeem Now</button>
                    </div>
                </div>
            </div>`;

        container.innerHTML = html;
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
            const clickedTab = Array.from(dashboardTabs).find((item) =>
                item.textContent.toLowerCase().includes(tab.toLowerCase())
            );
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
        const dashboardReports = document.getElementById('dashboard-reports');

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
        const dashboardReports = document.getElementById('dashboard-reports');

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
        // Mock transaction data
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
        transactions.forEach((transaction) => {
            const transactionElement = document.createElement("div");
            transactionElement.style.cssText =
                "background: white; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; transition: box-shadow 0.2s;";

            transactionElement.addEventListener("mouseenter", function () {
                this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            });

            transactionElement.addEventListener("mouseleave", function () {
                this.style.boxShadow = "none";
            });

            transactionElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-grow: 1;">
        <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 48px; height: 48px; background: ${transaction.iconBg}; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <i
                class="${transaction.icon}"
                style="color: ${transaction.iconColor}; font-size: 20px;"
            ></i>
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
        <div class="flex items-center gap-4">
            <div style="text-align: right; margin-right: 16px;">
            <div style="font-weight: 700; color: #111827; font-size: 18px; margin-bottom: 4px; font-family: 'Inter', sans-serif;">
            ${transaction.amount}
            </div>
            <span style="background: ${transaction.statusBg}; color: ${transaction.statusColor}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; font-family: 'Inter', sans-serif;">
            ${transaction.status}
            </span>
        </div>
        <button
            style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 8px; border-radius: 6px; transition: background 0.2s;"
            onmouseover="this.style.background='#f3f4f6'"
            onmouseout="this.style.background='none'"
        >
            <i class="fas fa-chevron-down"></i>
        </button>
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

    renderTransactionHistoryContent(transactions, statusCounts) {
        const container = document.getElementById("transaction-history-content");
        if (!container) return;

        // This function is for the separate transactions section (not dashboard)
        // Implementation can be added if needed
        container.innerHTML = "<p>Transaction History Content</p>";
    }

    renderDashboardReports() {
        // Hide analytics cards, analytics charts, and Payment Methods section
        const analyticsSection = document.querySelector('.analytics-grid');
        const analyticsChartsSection = document.querySelector('.analytics-charts-grid');
        const paymentMethodsSection = document.getElementById('payment-methods-section');
        const dashboardTransactionHistory = document.getElementById('dashboard-transaction-history');

        if (analyticsSection) analyticsSection.style.display = 'none';
        if (analyticsChartsSection) analyticsChartsSection.style.display = 'none';
        if (paymentMethodsSection) paymentMethodsSection.style.display = 'none';
        if (dashboardTransactionHistory) dashboardTransactionHistory.style.display = 'none';

        // Show dashboard reports content
        const dashboardReports = document.getElementById('dashboard-reports');
        if (dashboardReports) {
            dashboardReports.style.display = 'block';
            // Initialize reports functionality
            this.initializeReportsForm();
        }
    }

    initializeReportsForm() {
        // Set default dates
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 3, 1); // April 1st (Indian Financial Year)
        const endDate = document.getElementById('end-date');
        const startDate = document.getElementById('start-date');

        if (endDate) {
            endDate.value = today.toISOString().split('T')[0];
        }
        if (startDate) {
            startDate.value = startOfYear.toISOString().split('T')[0];
        }

        // Add event listeners for radio buttons
        const radioButtons = document.querySelectorAll('input[name="reportType"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.handleReportTypeChange(e.target.value);
            });
        });
    }

    handleReportTypeChange(reportType) {
        const startDate = document.getElementById('start-date');
        const endDate = document.getElementById('end-date');
        const today = new Date();

        switch(reportType) {
            case 'current':
                // Current Financial Year (April 1st to March 31st)
                const currentYearStart = new Date(today.getFullYear(), 3, 1); // April 1st
                if (startDate) startDate.value = currentYearStart.toISOString().split('T')[0];
                if (endDate) endDate.value = today.toISOString().split('T')[0];
                break;

            case 'previous':
                // Previous Financial Year
                const prevYearStart = new Date(today.getFullYear() - 1, 3, 1); // April 1st previous year
                const prevYearEnd = new Date(today.getFullYear(), 2, 31); // March 31st current year
                if (startDate) startDate.value = prevYearStart.toISOString().split('T')[0];
                if (endDate) endDate.value = prevYearEnd.toISOString().split('T')[0];
                break;

            case 'custom':
                // Clear dates for custom selection
                if (startDate) startDate.value = '';
                if (endDate) endDate.value = '';
                break;
        }
    }

    downloadReport() {
        const reportType = document.querySelector('input[name="reportType"]:checked')?.value;
        const startDate = document.getElementById('start-date')?.value;
        const endDate = document.getElementById('end-date')?.value;

        if (!startDate || !endDate) {
            this.showNotification('Please select both start and end dates', 'error');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            this.showNotification('Start date cannot be later than end date', 'error');
            return;
        }

        // Show loading state
        const downloadBtn = document.getElementById('download-report-btn');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Report...';
        downloadBtn.disabled = true;

        // Simulate report generation
        setTimeout(() => {
            // Generate mock CSV data
            const csvData = this.generateMockReportData(startDate, endDate, reportType);
            this.downloadCSV(csvData, `RedGirraffe_Report_${reportType}_${startDate}_to_${endDate}.csv`);

            // Reset button
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;

            this.showNotification('Report downloaded successfully!', 'success');
        }, 2000);
    }

    generateMockReportData(startDate, endDate, reportType) {
        const headers = ['Date', 'RG ID', 'Type', 'Amount', 'Status', 'Payment Mode'];
        const mockData = [
            ['2024-11-14', 'RG-0000182568', 'Rent', '₹14,000.00', 'Upcoming', 'Credit Card'],
            ['2025-03-10', 'RG-6000182595', 'Education Fee', '₹10.00', 'Scheduled', 'UPI'],
            ['2025-03-12', 'RG-4000180380', 'Maintenance', '₹18,000.00', 'Scheduled', 'Net Banking'],
            ['2024-10-15', 'RG-6000180475', 'Fees', '₹5,000.00', 'Completed', 'Credit Card'],
            ['2024-09-20', 'RG-5000180123', 'Rent', '₹12,000.00', 'Completed', 'UPI'],
        ];

        // Convert to CSV format
        const csvContent = [headers, ...mockData]
            .map(row => row.join(','))
            .join('\n');

        return csvContent;
    }

    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
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
            dashboard.closeEditModal();
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
            console.error('Failed to load registrations:', error);
            this.showErrorState();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showLoadingState() {
        const loadingEl = document.getElementById('registrations-loading');
        const contentEl = document.getElementById('registrations-content');
        const errorEl = document.getElementById('registrations-error');

        if (loadingEl) loadingEl.style.display = 'block';
        if (contentEl) contentEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
    }

    showErrorState() {
        const loadingEl = document.getElementById('registrations-loading');
        const contentEl = document.getElementById('registrations-content');
        const errorEl = document.getElementById('registrations-error');

        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'block';
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
                endDate: "15/12/2025"
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
                endDate: "10/12/2025"
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
                endDate: "05/12/2025"
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
                endDate: "25/12/2025"
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
                endDate: "12/12/2025"
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
                endDate: "20/12/2025"
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
                endDate: "18/12/2025"
            },
            {
                id: 8,
                rgId: "RG-0000182575",
                userId: 1,
                type: "tenant",
                subtype: "Rent",
                mode: "Credit Card",
                status: "Approved",
                amount: "33000",
                dueDate: "22/01/2025",
                frequency: "Monthly",
                endDate: "22/12/2025"
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
                endDate: "15/06/2025"
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
                endDate: "20/06/2025"
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
                endDate: "25/06/2025"
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
                endDate: "28/06/2025"
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
                endDate: "05/07/2025"
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
                endDate: "10/07/2025"
            }
        ];
    }

    renderRegistrations() {
        const container = document.getElementById('registrations-container');

        // Group registrations by type
        const registrationsByType = this.registrations.reduce((acc, registration) => {
            const type = registration.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(registration);
            return acc;
        }, {});

        let html = '';
        const registrationTypes = Object.keys(registrationsByType);

        registrationTypes.forEach((type, index) => {
            const typeRegistrations = registrationsByType[type];
            const isShowingAll = this.showAllByType[type] || false;
            const visibleRegistrations = isShowingAll ? typeRegistrations : typeRegistrations.slice(0, 5);
            const hasMoreToShow = typeRegistrations.length > 5;

            // Category header
            const typeLabel = this.getTypeLabel(type);
            const typeColor = this.getTypeColor(type);

            html += `
                <div class="registration-category mb-2" data-category="${type}">
                    <div class="category-header" style="background: #f8fafc; border-left: 4px solid ${this.getTypeColorHex(type)}; padding: 16px 24px; border-bottom: 1px solid #e5e7eb;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-weight: 600; color: ${this.getTypeColorHex(type)}; font-size: 16px;">${typeLabel}</span>
                            <span style="background: ${this.getTypeBadgeColor(type)}; color: ${this.getTypeColorHex(type)}; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">${typeRegistrations.length} RG IDs</span>
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

            visibleRegistrations.forEach(registration => {
                const statusClass = this.getStatusClass(registration.status);
                const statusColor = this.getStatusColor(registration.status);
                html += `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 16px 24px; font-weight: 500; color: #111827; font-size: 14px;">${registration.rgId}</td>
                        <td style="padding: 16px 24px; color: #6b7280; font-size: 14px; text-transform: capitalize;">${registration.subtype || 'Maintenance'}</td>
                        <td style="padding: 16px 24px; color: #6b7280; font-size: 14px;">${registration.mode}</td>
                        <td style="padding: 16px 24px;">
                            <span style="background: ${statusColor.bg}; color: ${statusColor.text}; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">${registration.status}</span>
                        </td>
                        <td style="padding: 16px 24px; font-weight: 600; color: #111827; font-size: 14px;">₹${parseInt(registration.amount).toLocaleString()}</td>
                        <td style="padding: 16px 24px;">
                            <button onclick="registrations.handlePayNow('${registration.rgId}')" style="background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: 500;">
                                Pay Now
                            </button>
                        </td>
                    </tr>`;
            });

            html += `
                            </tbody>
                        </table>
                    </div>`;

            // Show All / Show Less Button
            if (hasMoreToShow) {
                const hiddenCount = typeRegistrations.length - 5;
                const buttonText = isShowingAll ? 'Show Less' : `Show All (${hiddenCount} more)`;
                const iconClass = isShowingAll ? 'eye-slash' : 'eye';

                html += `
                    <div style="text-align: center; padding: 16px; border-top: 1px solid #f3f4f6; background: ${isShowingAll ? '#f0f9ff' : '#fafafa'};">
                        <div style="margin-bottom: 8px;">
                        </div>
                        <button onclick="registrations.toggleShowAll('${type}')"
                            style="font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; margin: 0 auto; padding: 8px 16px; border-radius: 6px; transition: all 0.15s ease;"
                            onmouseover="this.style.background='${isShowingAll ? '#bfdbfe' : '#fef2f2'}'; this.style.transform='translateY(-1px)'"
                            onmouseout="this.style.background='${isShowingAll ? '#dbeafe' : 'none'}'; this.style.transform='translateY(0)'">
                            <i class="fas fa-${iconClass}" style="font-size: 12px;"></i>
                            <span>${buttonText}</span>
                            ${isShowingAll ? '<i class="fas fa-chevron-up" style="font-size: 10px; margin-left: 4px;"></i>' : '<i class="fas fa-chevron-down" style="font-size: 10px; margin-left: 4px;"></i>'}
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
        const loadingEl = document.getElementById('registrations-loading');
        const contentEl = document.getElementById('registrations-content');
        const errorEl = document.getElementById('registrations-error');

        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'block';
        if (errorEl) errorEl.style.display = 'none';
    }

    // Utility methods
    getTypeLabel(type) {
        const labels = {
            'tenant': 'Rent',
            'education': 'Education Fees',
            'society': 'Society Maintenance'
        };
        return labels[type] || type;
    }

    getTypeColor(type) {
        const colors = {
            'tenant': 'danger',
            'education': 'primary',
            'society': 'success'
        };
        return colors[type] || 'secondary';
    }

    getTypeColorHex(type) {
        const colors = {
            'tenant': '#ef4444',
            'education': '#3b82f6',
            'society': '#10b981'
        };
        return colors[type] || '#6b7280';
    }

    getTypeBadgeColor(type) {
        const colors = {
            'tenant': '#fee2e2',
            'education': '#dbeafe',
            'society': '#dcfce7'
        };
        return colors[type] || '#f3f4f6';
    }

    getStatusClass(status) {
        const classes = {
            'Approved': 'success',
            'Pending': 'warning',
            'Rejected': 'danger',
            'Active': 'success'
        };
        return classes[status] || 'secondary';
    }

    getStatusColor(status) {
        const colors = {
            'Approved': { bg: '#dcfce7', text: '#16a34a' },
            'Pending': { bg: '#fef3c7', text: '#d97706' },
            'Rejected': { bg: '#fee2e2', text: '#dc2626' },
            'Active': { bg: '#dcfce7', text: '#16a34a' }
        };
        return colors[status] || { bg: '#f3f4f6', text: '#6b7280' };
    }

    toggleShowAll(type) {
        // Store the current scroll position relative to the category
        const categoryElement = document.querySelector(`[data-category="${type}"]`);
        const scrollPosition = window.pageYOffset;

        // Toggle the state
        this.showAllByType[type] = !this.showAllByType[type];
        const isExpanding = this.showAllByType[type];

        // Add a subtle loading effect
        const container = document.getElementById('registrations-container');
        if (container) {
            container.style.opacity = '0.8';
            container.style.transition = 'opacity 0.2s ease';
        }

        // Re-render with a slight delay for smooth transition
        setTimeout(() => {
            this.renderRegistrations();

            // Restore opacity with animation
            if (container) {
                container.style.opacity = '1';
            }

            // Smooth scroll behavior when expanding
            if (isExpanding) {
                // Find the updated category element and scroll to it
                setTimeout(() => {
                    const updatedCategoryElement = document.querySelector(`[data-category="${type}"]`);
                    if (updatedCategoryElement) {
                        updatedCategoryElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });
                    }
                }, 50);
            }

            // Show notification for user feedback
            const action = isExpanding ? 'expanded' : 'collapsed';
            const typeLabel = this.getTypeLabel(type);
            const registrationCount = this.registrations.filter(r => r.type === type).length;

            if (window.dashboard && window.dashboard.showNotification) {
                const message = isExpanding
                    ? `Showing all ${registrationCount} ${typeLabel} registrations`
                    : `${typeLabel} section collapsed`;
                window.dashboard.showNotification(message, 'info');
            }
        }, 150);
    }

    handlePayNow(rgId) {
        // Open payment page in new window
        window.open('https://redgirraffe.com/in/app/paymentmode', '_blank');

        // Show success message
        if (window.dashboard && window.dashboard.showNotification) {
            window.dashboard.showNotification(`Payment initiated for ${rgId}`, 'success');
        } else {
            alert(`Payment initiated for ${rgId}`);
        }
    }

    // Modal functionality
    initializeModal() {
        // Handle registration type selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.registration-type-option')) {
                const option = e.target.closest('.registration-type-option');

                // Remove active state from all options
                document.querySelectorAll('.registration-type-option').forEach(opt => {
                    opt.style.borderColor = '#e5e7eb';
                    opt.style.background = 'white';
                    const arrow = opt.querySelector('.fa-arrow-right');
                    if (arrow) arrow.style.display = 'none';
                });

                // Add active state to selected option
                option.style.borderColor = '#ef4444';
                option.style.background = '#fef2f2';
                const arrow = option.querySelector('.fa-arrow-right');
                if (arrow) arrow.style.display = 'block';

                // Store selected type
                this.selectedRegistrationType = option.dataset.type;

                // Enable the button
                const btn = document.getElementById('openRegistrationBtn');
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }
            }
        });
    }

    openNewRegistrationModal() {
        const modal = document.getElementById('newRegistrationModal');
        if (modal) {
            modal.style.display = 'block';
            // Reset modal state
            this.resetModal();
        }
    }

    closeNewRegistrationModal() {
        const modal = document.getElementById('newRegistrationModal');
        if (modal) {
            modal.style.display = 'none';
            this.resetModal();
        }
    }

    handleRedirect() {
        if (this.selectedRegistrationType) {
            // Open the correct registration URL
            window.open('https://redgirraffe.com/in/app/paymentmode', '_blank');

            // Optionally open a second window for the registration form
            window.open(`https://redgirraffe.com/in/app/register/${this.selectedRegistrationType.toLowerCase()}`, '_blank');

            // Show success message
            if (window.dashboard && window.dashboard.showNotification) {
                window.dashboard.showNotification('Registration pages opened in new windows', 'success');
            } else {
                alert('Registration pages opened in new windows');
            }

            // Close the modal
            this.closeNewRegistrationModal();
        }
    }

    resetModal() {
        this.selectedRegistrationType = null;
        const btn = document.getElementById('openRegistrationBtn');
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
        document.querySelectorAll('.registration-type-option').forEach(opt => {
            opt.style.borderColor = '#e5e7eb';
            opt.style.background = 'white';
            const arrow = opt.querySelector('.fa-arrow-right');
            if (arrow) arrow.style.display = 'none';
        });
    }
}

// Global utility functions
function toggleMobileSidebar() {
    if (window.dashboard) {
        window.dashboard.toggleMobileSidebar();
    }
}

function closeMobileSidebar() {
    if (window.dashboard) {
        window.dashboard.closeMobileSidebar();
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
});

// Global function for transaction tab switching (called from HTML)
function switchTransactionTab(tab) {
    if (window.dashboard) {
        window.dashboard.switchTransactionTab(tab);
    }
}
