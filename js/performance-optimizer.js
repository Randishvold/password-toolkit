// performance-optimizer.js
class PerformanceOptimizer {
    constructor() {
        this.debounceTimeout = null;
        this.throttleTimeout = null;
        this.lastRun = 0;
    }

    // Debounce untuk password strength checking
    debounce(func, wait) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(func, wait);
    }

    // Throttle untuk operasi berat
    throttle(func, limit) {
        const now = Date.now();
        if (!this.lastRun) {
            func();
            this.lastRun = now;
        } else {
            clearTimeout(this.throttleTimeout);
            if (now - this.lastRun >= limit) {
                func();
                this.lastRun = now;
            } else {
                this.throttleTimeout = setTimeout(() => {
                    func();
                    this.lastRun = Date.now();
                }, limit);
            }
        }
    }
}