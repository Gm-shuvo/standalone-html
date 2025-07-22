// Enhanced Dashboard Implementation - Matching React Version
class EnhancedDashboard {
    constructor() {
        this.activeTab = 'analytics';
        this.charts = {};
        this.mockData = this.generateMockData();
        this.transactions = [];
        this.filteredTransactions = [];
        
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.loadDashboardData();
        this.setupEventListeners();
        this.initializeCharts();
    }

    generateMockData() {
        return {
            analytics: {
                totalSpent: 42890,
                activeRegistrations: 3,
                rewardPoints: 1240,
                expiringPoints: 850,
                expirationDays: 45
            },
            paymentDistribution: [
                { label: 'Rent', value: 28000 },
                { label: 'Education Fees', value: 20000 },
                { label: 'Society Maintenance', value: 36000 },
                { label: 'Others', value: 8000 }
            ],
            monthlyTrends: [
                { month: 'Jul', value: 42000 },
                { month: 'Aug', value: 38500 },
                { month: 'Sep', value: 44200 },
                { month: 'Oct', value: 41800 },
                { month: 'Nov', value: 46300 },
                { month: 'Dec', value: 42000 }
            ],
            paymentMethods: [
                { method: 'Credit Card', percentage: 65 },
                { method: 'UPI', percentage: 20 },
                { method: 'Debit Card', percentage: 10 },
                { method: 'Net Banking', percentage: 5 }
            ],
            upcomingPayments: [
                { rgId: 'RG-0000182568', type: 'Rent', amount: 14000, date: '2024-11-14', status: 'Upcoming' },
                { rgId: 'RG-6000182595', type: 'Education Fee', amount: 10, date: '2025-03-10', status: 'Scheduled' },
                { rgId: 'RG-4000180380', type: 'Maintenance', amount: 100000, date: '2025-03-12', status: 'Scheduled' }
            ],
            transactions: [
                { id: 1, rgId: 'RG-0000182568', type: 'Rent', amount: 14000, date: '2024-11-14', status: 'Upcoming' },
                { id: 2, rgId: 'RG-6000182595', type: 'Education Fee', amount: 10, date: '2025-03-10', status: 'Scheduled' },
                { id: 3, rgId: 'RG-4000180380', type: 'Maintenance', amount: 100000, date: '2025-03-12', status: 'Scheduled' },
                { id: 4, rgId: 'RG-0000182568', type: 'Rent', amount: 25000, date: '2024-10-14', status: 'Completed' },
                { id: 5, rgId: 'RG-6000182595', type: 'Education Fee', amount: 15000, date: '2024-09-10', status: 'Completed' },
                { id: 6, rgId: 'RG-4000180380', type: 'Maintenance', amount: 8000, date: '2024-08-12', status: 'Completed' }
            ]
        };
    }

    setupTabNavigation() {
        const tabs = document.querySelectorAll('.dashboard-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = tab.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        if (this.activeTab === tabId) return;

        // Update tab buttons
        document.querySelectorAll('.dashboard-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.dashboard-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-content`).classList.add('active');

        this.activeTab = tabId;

        // Load specific tab data
        if (tabId === 'transactions') {
            this.loadTransactionHistory();
        } else if (tabId === 'reports') {
            this.setupReportsTab();
        }
    }

    setupEventListeners() {
        // Chart dropdown listeners
        const paymentPeriod = document.getElementById('payment-period');
        if (paymentPeriod) {
            paymentPeriod.addEventListener('change', () => this.updatePaymentChart());
        }

        const historyType = document.getElementById('history-type');
        if (historyType) {
            historyType.addEventListener('change', () => this.updateHistoryChart());
        }

        // Transaction filters
        const searchInput = document.getElementById('transaction-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterTransactions());
        }

        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterTransactions());
        }

        const typeFilter = document.getElementById('type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.filterTransactions());
        }

        const refreshBtn = document.getElementById('refresh-transactions');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadTransactionHistory());
        }

        // Reports listeners
        const reportTypeRadios = document.querySelectorAll('input[name="report-type"]');
        reportTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => this.updateDateRange());
        });

        const generateReportBtn = document.getElementById('generate-report');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', () => this.generateReport());
        }

        const downloadReportBtn = document.getElementById('download-report');
        if (downloadReportBtn) {
            downloadReportBtn.addEventListener('click', () => this.downloadReport());
        }
    }

    loadDashboardData() {
        this.updateAnalyticsCards();
        this.updateUpcomingPayments();
        this.transactions = this.mockData.transactions;
        this.filteredTransactions = [...this.transactions];
    }

    updateAnalyticsCards() {
        const { analytics } = this.mockData;
        
        // Update card values
        document.getElementById('total-spent').textContent = this.formatCurrency(analytics.totalSpent);
        document.getElementById('active-registrations').textContent = analytics.activeRegistrations;
        document.getElementById('reward-points').textContent = analytics.rewardPoints.toLocaleString();
        
        // Update expiring points
        document.getElementById('expiring-points').textContent = analytics.expiringPoints;
        document.getElementById('expiring-points-detail').textContent = analytics.expiringPoints;
        document.getElementById('expiring-points-large').textContent = analytics.expiringPoints;
        document.getElementById('expiration-days').textContent = analytics.expirationDays;
    }

    updateUpcomingPayments() {
        const tbody = document.getElementById('upcoming-payments-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        this.mockData.upcomingPayments.forEach(payment => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-100 hover:bg-gray-50';
            
            const statusClass = payment.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800';
            
            row.innerHTML = `
                <td class="p-2">${payment.rgId}</td>
                <td class="p-2">${payment.type}</td>
                <td class="p-2">${this.formatCurrency(payment.amount)}</td>
                <td class="p-2">${this.formatDate(payment.date)}</td>
                <td class="p-2">
                    <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${payment.status}</span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    initializeCharts() {
        // Wait for DOM to be ready and Chart.js to be loaded
        setTimeout(() => {
            this.updatePaymentChart();
            this.updateHistoryChart();
            this.updatePaymentMethodsChart();
        }, 100);
    }

    updatePaymentChart() {
        const canvas = document.getElementById('paymentChart');
        if (!canvas) {
            console.warn('Payment chart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.warn('Could not get 2D context for payment chart');
            return;
        }

        if (this.charts.payment) {
            this.charts.payment.destroy();
        }

        const data = this.mockData.paymentDistribution;
        
        this.charts.payment = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: [
                        '#FF453A',
                        '#30D158', 
                        '#0A84FF',
                        '#FF9F0A'
                    ],
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    hoverOffset: 18,
                    borderRadius: 8,
                    hoverBorderColor: '#FFFFFF',
                    hoverBorderWidth: 5,
                    spacing: 4
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
                            font: { size: 12 },
                            usePointStyle: true
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    updateHistoryChart() {
        const canvas = document.getElementById('historyChart');
        if (!canvas) {
            console.warn('History chart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.warn('Could not get 2D context for history chart');
            return;
        }

        if (this.charts.history) {
            this.charts.history.destroy();
        }

        const historyType = document.getElementById('history-type')?.value || 'payments';
        const data = this.mockData.monthlyTrends;
        
        let chartData, chartTitle;
        
        if (historyType === 'payments') {
            chartData = {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'On-time Payments (₹)',
                    data: data.map(item => item.value * 0.8),
                    borderColor: '#30D158',
                    backgroundColor: 'rgba(48, 209, 88, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }]
            };
            chartTitle = 'Payment History';
        } else if (historyType === 'activity') {
            chartData = {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'Transaction Count',
                    data: data.map(item => Math.round(item.value / 10000)),
                    borderColor: '#0A84FF',
                    backgroundColor: 'rgba(10, 132, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }]
            };
            chartTitle = 'Transaction Activity';
        } else {
            chartData = {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'Cash Points Earned',
                    data: data.map(item => Math.round(item.value * 0.05)),
                    borderColor: '#FF453A',
                    backgroundColor: 'rgba(255, 69, 58, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }]
            };
            chartTitle = 'Cash Points Earned';
        }

        document.getElementById('history-chart-title').textContent = chartTitle;

        this.charts.history = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutCubic'
                }
            }
        });
    }

    updatePaymentMethodsChart() {
        const canvas = document.getElementById('paymentMethodsChart');
        if (!canvas) {
            console.warn('Payment methods chart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.warn('Could not get 2D context for payment methods chart');
            return;
        }

        if (this.charts.paymentMethods) {
            this.charts.paymentMethods.destroy();
        }

        const data = this.mockData.paymentMethods;
        
        this.charts.paymentMethods = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(item => item.method),
                datasets: [{
                    data: data.map(item => item.percentage),
                    backgroundColor: [
                        '#0A84FF',
                        '#30D158',
                        '#FF9F0A',
                        '#FF453A'
                    ],
                    borderWidth: 3,
                    borderColor: '#FFFFFF',
                    hoverOffset: 18,
                    borderRadius: 8,
                    hoverBorderColor: '#FFFFFF',
                    hoverBorderWidth: 5
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
                            font: { size: 12 },
                            usePointStyle: true
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    usePointsNow() {
        // Navigate to rewards section
        if (window.dashboard && window.dashboard.showSection) {
            window.dashboard.showSection('rewards');
        }
    }

    // Transaction History Methods
    loadTransactionHistory() {
        this.transactions = this.mockData.transactions;
        this.filteredTransactions = [...this.transactions];
        this.updateTransactionSummary();
        this.renderTransactions();
    }

    updateTransactionSummary() {
        const completed = this.transactions.filter(t => t.status === 'Completed').length;
        const upcoming = this.transactions.filter(t => t.status === 'Upcoming').length;
        const pending = this.transactions.filter(t => t.status === 'Pending').length;
        const totalAmount = this.transactions.reduce((sum, t) => sum + t.amount, 0);

        document.getElementById('completed-count').textContent = completed;
        document.getElementById('upcoming-count').textContent = upcoming;
        document.getElementById('pending-count').textContent = pending || 0;
        document.getElementById('total-amount').textContent = this.formatCurrency(totalAmount);
    }

    filterTransactions() {
        const searchTerm = document.getElementById('transaction-search')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('status-filter')?.value || '';
        const typeFilter = document.getElementById('type-filter')?.value || '';

        this.filteredTransactions = this.transactions.filter(transaction => {
            const matchesSearch = transaction.rgId.toLowerCase().includes(searchTerm) ||
                                transaction.type.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || transaction.status.toLowerCase() === statusFilter;
            const matchesType = !typeFilter || transaction.type.toLowerCase().includes(typeFilter);

            return matchesSearch && matchesStatus && matchesType;
        });

        this.renderTransactions();
    }

    renderTransactions() {
        const tbody = document.getElementById('transactions-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.filteredTransactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';

            const statusClass = this.getStatusClass(transaction.status);

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${transaction.rgId}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.type}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${this.formatCurrency(transaction.amount)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${this.formatDate(transaction.date)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                        ${transaction.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-red-600 hover:text-red-900" onclick="enhancedDashboard.viewTransaction('${transaction.id}')">
                        View
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    getStatusClass(status) {
        const statusClasses = {
            'Completed': 'bg-green-100 text-green-800',
            'Upcoming': 'bg-yellow-100 text-yellow-800',
            'Scheduled': 'bg-blue-100 text-blue-800',
            'Pending': 'bg-gray-100 text-gray-800'
        };
        return statusClasses[status] || 'bg-gray-100 text-gray-800';
    }

    viewTransaction(transactionId) {
        const transaction = this.transactions.find(t => t.id == transactionId);
        if (transaction) {
            alert(`Transaction Details:\nRG ID: ${transaction.rgId}\nType: ${transaction.type}\nAmount: ${this.formatCurrency(transaction.amount)}\nDate: ${this.formatDate(transaction.date)}\nStatus: ${transaction.status}`);
        }
    }

    // Reports Methods
    setupReportsTab() {
        this.updateDateRange();
    }

    updateDateRange() {
        const reportType = document.querySelector('input[name="report-type"]:checked')?.value || 'current';
        const fromDate = document.getElementById('from-date');
        const toDate = document.getElementById('to-date');

        if (!fromDate || !toDate) return;

        const currentDate = new Date();
        let startDate, endDate;

        if (reportType === 'current') {
            // Current financial year (April to March)
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();

            if (currentMonth >= 3) { // April onwards
                startDate = new Date(currentYear, 3, 1); // April 1st
                endDate = new Date(currentYear + 1, 2, 31); // March 31st next year
            } else { // January to March
                startDate = new Date(currentYear - 1, 3, 1); // April 1st previous year
                endDate = new Date(currentYear, 2, 31); // March 31st current year
            }
        } else if (reportType === 'previous') {
            // Previous financial year
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();

            if (currentMonth >= 3) { // April onwards
                startDate = new Date(currentYear - 1, 3, 1);
                endDate = new Date(currentYear, 2, 31);
            } else { // January to March
                startDate = new Date(currentYear - 2, 3, 1);
                endDate = new Date(currentYear - 1, 2, 31);
            }
        } else {
            // Custom range - don't auto-set dates
            return;
        }

        fromDate.value = startDate.toISOString().split('T')[0];
        toDate.value = endDate.toISOString().split('T')[0];
    }

    generateReport() {
        const reportType = document.querySelector('input[name="report-type"]:checked')?.value || 'current';
        const fromDate = document.getElementById('from-date')?.value;
        const toDate = document.getElementById('to-date')?.value;

        if (!fromDate || !toDate) {
            alert('Please select valid date range');
            return;
        }

        // Filter transactions based on date range
        const filteredTransactions = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const start = new Date(fromDate);
            const end = new Date(toDate);
            return transactionDate >= start && transactionDate <= end;
        });

        // Generate report summary
        const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
        const completedTransactions = filteredTransactions.filter(t => t.status === 'Completed');
        const completedAmount = completedTransactions.reduce((sum, t) => sum + t.amount, 0);

        alert(`Report Generated Successfully!\n\nPeriod: ${this.formatDate(fromDate)} to ${this.formatDate(toDate)}\nTotal Transactions: ${filteredTransactions.length}\nTotal Amount: ${this.formatCurrency(totalAmount)}\nCompleted Transactions: ${completedTransactions.length}\nCompleted Amount: ${this.formatCurrency(completedAmount)}`);
    }

    downloadReport() {
        const reportType = document.querySelector('input[name="report-type"]:checked')?.value || 'current';
        const fromDate = document.getElementById('from-date')?.value;
        const toDate = document.getElementById('to-date')?.value;

        if (!fromDate || !toDate) {
            alert('Please generate a report first');
            return;
        }

        // Simulate PDF download
        alert('PDF report download started...\n\nNote: This is a demo implementation. In a real application, this would generate and download a PDF report.');
    }
}

// Initialize enhanced dashboard
let enhancedDashboard;

document.addEventListener('DOMContentLoaded', function() {
    enhancedDashboard = new EnhancedDashboard();
});
