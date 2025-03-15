// security-manager.js
export class SecurityManager {
    constructor(maxHistorySize = 10) {
        this.maxHistorySize = maxHistorySize;
        this.passwordHistory = new Set();
        this.sensitiveFields = new Set();
    }

    // Password history management
    isPasswordReused(password) {
        return this.passwordHistory.has(this.hashPassword(password));
    }

    addToHistory(password) {
        const hashedPassword = this.hashPassword(password);
        this.passwordHistory.add(hashedPassword);
        
        // Maintain history size
        if (this.passwordHistory.size > this.maxHistorySize) {
            const [firstItem] = this.passwordHistory;
            this.passwordHistory.delete(firstItem);
        }
    }

    // Simple hash function untuk password history
    hashPassword(password) {
        return Array.from(password)
            .reduce((hash, char) => 
                ((hash << 5) - hash) + char.charCodeAt(0), 0)
            .toString(36);
    }

    // Memory management
    registerSensitiveField(element) {
        this.sensitiveFields.add(element);
    }

    clearSensitiveData() {
        this.sensitiveFields.forEach(field => {
            if (field && typeof field.value !== 'undefined') {
                field.value = '';
                // Tambahan: memastikan garbage collection
                if (field.dataset) {
                    field.dataset.lastValue = '';
                }
            }
        });
        // Clear history juga saat clear data
        this.passwordHistory.clear();
    }
}