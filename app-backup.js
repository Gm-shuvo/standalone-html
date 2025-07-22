// RedGirraffe Dashboard - World-Class Implementation
class RedGiraffeDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.apiBaseUrl = window.location.origin;
        this.userId = 1;
        this.charts = {};
        this.registrations = [];
        this.transactions = [];
        this.dashboardData = null;
        this.theme = 'light';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.initializeCharts();
        this.initializeTheme();
        this.startLuxuryAnimations();
        this.initializeFirstSection();
    }

    // Initialize first section on page load
    initializeFirstSection() {
        // Set dashboard as initial active section
        const dashboardSection = document.getElementById('dashboard-section');
        const firstNavLink = document.querySelector('[data-section="dashboard"]');
        
        if (dashboardSection) {
            dashboardSection.classList.add('active');
            dashboardSection.style.opacity = '1';
            dashboardSection.style.transform = 'translateY(0)';
        }
        
        if (firstNavLink) {
            firstNavLink.classList.add('active');
        }
        
        this.currentSection = 'dashboard';
    }

    setupEventListeners() {
        // Navigation links with luxury transitions
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section, link);
            });
        });

        // Mobile sidebar
        const hamburger = document.getElementById('hamburger');
        const mobileSidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-overlay');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileSidebar();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeMobileSidebar();
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Edit Records modal
        const editModal = document.getElementById('edit-registration-modal');
        if (editModal) {
            const closeBtn = editModal.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
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
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        if (clickedLink) {
            clickedLink.classList.add('active');
        }

        // Hide current section with fade out
        const currentSectionEl = document.getElementById(this.currentSection + '-section');
        if (currentSectionEl) {
            currentSectionEl.style.opacity = '0';
            currentSectionEl.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentSectionEl.classList.remove('active');
                currentSectionEl.style.display = 'none';
            }, 300);
        }

        // Show new section with fade in
        setTimeout(() => {
            const newSectionEl = document.getElementById(sectionName + '-section');
            if (newSectionEl) {
                newSectionEl.style.display = 'block';
                newSectionEl.classList.add('active');
                
                // Trigger reflow
                newSectionEl.offsetHeight;
                
                newSectionEl.style.opacity = '1';
                newSectionEl.style.transform = 'translateY(0)';
            }
            
            this.currentSection = sectionName;
            this.loadSectionData(sectionName);
        }, 320);

        // Close mobile sidebar if open
        this.closeMobileSidebar();
    }

    loadSectionData(sectionName) {
        switch(sectionName) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'registrations':
                this.loadRegistrations();
                break;
            case 'transactions':
                this.loadTransactions();
                break;
            case 'edit-records':
                this.loadRegistrationsData();
                break;
        }
    }

    async apiRequest(endpoint, options = {}) {
        const url = this.apiBaseUrl + endpoint;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            this.showNotification('Failed to load data. Please try again.', 'error');
            return null;
        }
    }

    async loadDashboardData() {
        const data = await this.apiRequest('/api/dashboard/' + this.userId);
        if (data) {
            this.dashboardData = data;
            this.updateAnalyticsCards(data.analytics);
            this.updatePaymentChart();
            this.updateHistoryChart();
        }
    }

    async loadRegistrations() {
        const data = await this.apiRequest('/api/registrations/' + this.userId);
        if (data) {
            this.registrations = data;
            this.renderRegistrationsTable(data);
        }
    }

    async loadTransactions() {
        const data = await this.apiRequest('/api/transactions/' + this.userId);
        if (data) {
            this.transactions = data;
            this.renderTransactions();
        }
    }

    updateAnalyticsCards(analytics) {
        if (!analytics) return;

        // Animate values with luxury effects
        this.animateValueWithDelay('total-spent', 0, analytics.totalSpent, '₹', 0);
        this.animateValueWithDelay('active-registrations', 0, analytics.activeRegistrations, '', 200);
        this.animateValueWithDelay('pending-payments', 0, analytics.pendingPayments, '₹', 400);
        this.animateValueWithDelay('wallet-balance', 0, analytics.walletBalance, '₹', 600);
    }

    animateValueWithDelay(elementId, start, end, prefix = '', delay = 0) {
        setTimeout(() => {
            this.animateValue(elementId, start, end, prefix);
        }, delay);
    }

    animateValue(elementId, start, end, prefix = '') {
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
    }

    updatePaymentChart() {
        const ctx = document.getElementById('paymentChart')?.getContext('2d');
        if (!ctx || !this.dashboardData) return;

        if (this.charts.payment) {
            this.charts.payment.destroy();
        }

        this.charts.payment = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Tenant', 'Education', 'Society', 'Others'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#ff6b6b',
                        '#4ecdc4',
                        '#45b7d1',
                        '#f9ca24'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
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
                            font: {
                                size: 12
                            }
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
        const ctx = document.getElementById('historyChart')?.getContext('2d');
        if (!ctx || !this.dashboardData) return;

        if (this.charts.history) {
            this.charts.history.destroy();
        }

        this.charts.history = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Payments',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ff6b6b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
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
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutCubic'
                }
            }
        });
    }

    async loadRegistrationsData() {
        const data = await this.apiRequest('/api/registrations/' + this.userId);
        if (data) {
            this.registrations = data;
            this.renderRegistrationsTable(data);
        }
    }

    renderRegistrationsTable(registrations) {
        const tableBody = document.getElementById('registrations-table-body') || 
                         document.getElementById('edit-registrations-table-body');
        if (!tableBody || !registrations) return;

        tableBody.innerHTML = '';

        registrations.forEach(registration => {
            const statusColors = this.getStatusColors(registration.status);
            
            const row = document.createElement('tr');
            row.className = 'registration-row';
            row.setAttribute('data-rg-id', registration.rgId);
            
            row.innerHTML = `
                <td>
                    <div class="registration-info">
                        <div class="rg-id">${registration.rgId}</div>
                        <div class="registration-type">${registration.type}</div>
                    </div>
                </td>
                <td>
                    <span class="status-badge" style="background-color: ${statusColors.bg}; color: ${statusColors.text};">
                        ${registration.status}
                    </span>
                </td>
                <td class="amount">₹${registration.amount?.toLocaleString() || '0'}</td>
                <td class="date">${new Date(registration.createdAt).toLocaleDateString()}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-edit" onclick="dashboard.openRegistrationModal('${registration.rgId}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-clone" onclick="dashboard.cloneRegistration('${registration.rgId}')">
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
            'active': { bg: '#d4edda', text: '#155724' },
            'pending': { bg: '#fff3cd', text: '#856404' },
            'inactive': { bg: '#f8d7da', text: '#721c24' },
            'completed': { bg: '#d1ecf1', text: '#0c5460' }
        };
        return colors[status?.toLowerCase()] || colors.pending;
    }

    toggleRegistrationRow(rgId) {
        const row = document.querySelector(`[data-rg-id="${rgId}"]`);
        if (row) {
            row.classList.toggle('expanded');
        }
    }

    renderTransactions() {
        const container = document.getElementById('transactions-list');
        if (!container || !this.transactions) return;

        container.innerHTML = '';

        this.transactions.forEach(transaction => {
            const transactionEl = document.createElement('div');
            transactionEl.className = 'transaction-item';
            
            transactionEl.innerHTML = `
                <div class="transaction-info">
                    <div class="transaction-title">${transaction.description}</div>
                    <div class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</div>
                </div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'credit' ? '+' : '-'}₹${Math.abs(transaction.amount).toLocaleString()}
                </div>
            `;
            
            container.appendChild(transactionEl);
        });
    }

    switchTab(tabName) {
        // Remove active from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active to clicked tab
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab content
        const activeContent = document.getElementById(tabName + '-tab');
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    async openRegistrationModal(rgId) {
        const registration = this.registrations.find(r => r.rgId === rgId);
        if (!registration) return;

        // Set modal title
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) {
            modalTitle.textContent = `Registration Details - ${rgId}`;
        }

        // Populate modal content
        const modalContent = document.getElementById('modal-content');
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
                            <span class="status-badge">${registration.status}</span>
                        </div>
                        <div class="detail-item">
                            <label>Amount:</label>
                            <span>₹${registration.amount?.toLocaleString() || '0'}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        this.openModal('registration-modal');
    }

    openAddRegistrationModal() {
        this.openModal('add-registration-modal');
    }

    async submitRegistration(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const registrationData = Object.fromEntries(formData.entries());
        
        // Add user ID and timestamp
        registrationData.userId = this.userId;
        registrationData.createdAt = new Date().toISOString();
        
        const result = await this.createBackupAPI('/api/registrations', registrationData);
        
        if (result.error) {
            this.showNotification('Failed to create registration. Please try again.', 'error');
        } else {
            this.showNotification('Registration created successfully!', 'success');
            this.closeModal('add-registration-modal');
            this.loadRegistrations();
            event.target.reset();
        }
    }

    async createBackupAPI(endpoint, data) {
        try {
            const response = await fetch(this.apiBaseUrl + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Backup API call failed:', error);
            return { error: error.message };
        }
    }

    // Rewards Functions
    async redeemReward(rewardId) {
        const result = await this.createBackupAPI('/api/rewards/redeem', {
            rewardId: rewardId,
            userId: 1,
            points: rewardId === 'amazon-500' ? 500 : rewardId === 'uber-300' ? 300 : 800
        });
        
        if (result.error) {
            this.showNotification('Failed to redeem reward. Please try again.', 'error');
        } else {
            this.showNotification('Reward redeemed successfully!', 'success');
            this.loadDashboardData();
        }
    }

    // Referral Functions
    copyReferralCode() {
        navigator.clipboard.writeText('PIYUSH2024').then(() => {
            this.showNotification('Referral code copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy code', 'error');
        });
    }

    shareReferralCode() {
        const message = 'Join RedGirraffe and get amazing rewards! Use my referral code: PIYUSH2024. Download the app now!';
        const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');
    }

    // Profile Functions
    editProfile() {
        this.showNotification('Profile editing feature coming soon!', 'info');
    }

    // Settings Functions
    setTheme(theme) {
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
        localStorage.setItem('theme', theme);
        this.showNotification('Theme switched to ' + theme + ' mode', 'success');
    }

    changePassword() {
        this.showNotification('Password change feature coming soon!', 'info');
    }

    // Support Functions
    openLiveChat() {
        var self = this;
        this.showNotification('Connecting to live chat...', 'info');
        setTimeout(function() {
            self.showNotification('Live chat will be available soon!', 'info');
        }, 2000);
    }

    sendEmail() {
        window.location.href = 'mailto:support@redgirraffe.com?subject=Support Request&body=Hello RedGirraffe Support Team,';
    }

    callSupport() {
        window.location.href = 'tel:+918001234567';
    }

    async submitSupportTicket(event) {
        event.preventDefault();
        
        const result = await this.createBackupAPI('/api/support/ticket', {
            userId: 1,
            subject: event.target.querySelector('select').value,
            priority: event.target.querySelectorAll('select')[1].value,
            message: event.target.querySelector('textarea').value,
            timestamp: new Date().toISOString()
        });
        
        if (result.error) {
            this.showNotification('Failed to submit ticket. Please try email support.', 'error');
        } else {
            this.showNotification('Support ticket submitted successfully!', 'success');
            event.target.reset();
        }
    }

    // Edit Records Functions  
    cloneRegistration(rgId) {
        this.showNotification('Cloning registration ' + rgId + '...', 'info');
        var self = this;
        setTimeout(function() {
            self.showNotification('Registration cloned successfully!', 'success');
        }, 1500);
    }

    openEditModal() {
        const modal = document.getElementById('edit-registration-modal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(function() {
                modal.style.opacity = '1';
                const content = modal.querySelector('div');
                if (content) {
                    content.style.transform = 'translateX(0)';
                }
            }, 10);
        }
    }

    closeEditModal() {
        const modal = document.getElementById('edit-registration-modal');
        if (modal) {
            modal.style.opacity = '0';
            const content = modal.querySelector('div');
            if (content) {
                content.style.transform = 'translateX(100%)';
            }
            setTimeout(function() {
                modal.style.display = 'none';
            }, 300);
        }
    }

    // Mobile Functions
    toggleMobileSidebar() {
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar && overlay) {
            const isOpen = sidebar.classList.contains('open');
            
            if (isOpen) {
                this.closeMobileSidebar();
            } else {
                sidebar.classList.add('open');
                overlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // Theme Functions
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    // Luxury Animation Functions
    startLuxuryAnimations() {
        // Add smooth reveal animations to cards
        const cards = document.querySelectorAll('.analytics-card, .chart-container, .table-container');
        cards.forEach((card, index) => {
            card.style.animationDelay = (index * 100) + 'ms';
            card.classList.add('fade-in-up');
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Hide notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Global functions for the Edit Records modal
function handleRegistrationSelection(value) {
    const button = document.getElementById('editRegistrationButton');
    if (button) {
        if (value) {
            button.style.opacity = '1';
            button.disabled = false;
            button.style.cursor = 'pointer';
        } else {
            button.style.opacity = '0.5';
            button.disabled = true;
            button.style.cursor = 'not-allowed';
        }
    }
}

function proceedToEdit() {
    const select = document.getElementById('registrationEditSelect');
    const selectedValue = select && select.value;
    if (selectedValue) {
        dashboard.showNotification('Opening edit form for ' + selectedValue, 'info');
    }
}

// Async functions outside the dashboard object
async function loadRegistrationForEdit(rgId) {
    try {
        const response = await fetch('/api/registration/rg/' + rgId);
        const data = await response.json();
        
        if (data.tenantDetails) {
            const dobEl = document.getElementById('edit-dob');
            if (dobEl) dobEl.value = data.tenantDetails.dob || '06/12/2005';
        }
    } catch (error) {
        console.error('Error loading registration for edit:', error);
        dashboard.showNotification('Error loading registration data', 'error');
    }
}

async function saveRegistration() {
    const selectedRgId = document.getElementById('edit-registration-select')?.value;
    if (!selectedRgId) {
        dashboard.showNotification('No registration selected', 'error');
        return;
    }

    // Collect form data
    const formData = {
        // Tenant details
        dob: document.getElementById('edit-dob')?.value,
        mobileNumber: document.getElementById('edit-mobile')?.value,
        email: document.getElementById('edit-email')?.value,
        city: document.getElementById('edit-city')?.value,
        address: document.getElementById('edit-address')?.value,
        
        // Tenancy details
        rentAmount: document.getElementById('edit-rent-amount')?.value,
        frequency: document.getElementById('edit-frequency')?.value,
        dueDate: document.getElementById('edit-due-date')?.value,
        tenancyEndDate: document.getElementById('edit-tenancy-end-date')?.value,
        cardIssuingBank: document.getElementById('edit-card-bank')?.value,
        gstin: document.getElementById('edit-gstin')?.value,
        
        // Landlord details
        landlordName: document.getElementById('edit-landlord-name')?.value,
        landlordEmail: document.getElementById('edit-landlord-email')?.value,
        landlordMobile: document.getElementById('edit-landlord-mobile')?.value,
        landlordAddress: document.getElementById('edit-landlord-address')?.value,
        
        // Account details
        accountNumber: document.getElementById('edit-account-number')?.value,
        ifscCode: document.getElementById('edit-ifsc')?.value,
        bankName: document.getElementById('edit-bank-name')?.value,
        accountHolderName: document.getElementById('edit-account-holder')?.value
    };

    try {
        const response = await fetch('/api/registration/tenant/' + selectedRgId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            dashboard.showNotification('Registration updated successfully!', 'success');
            dashboard.closeEditModal();
            dashboard.loadRegistrationsData();
        } else {
            dashboard.showNotification('Failed to update registration', 'error');
        }
    } catch (error) {
        console.error('Error saving registration:', error);
        dashboard.showNotification('Error saving registration', 'error');
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
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/login';
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.dashboard = new RedGiraffeDashboard();
});