// performance-optimizer.js
class PerformanceOptimizer {
    constructor() {
        this.debounceTimeout = null;
        this.throttleTimeout = null;
        this.lastRun = 0;
        this.cache = new Map();
    }
    
    getCachedResult(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < 30000) { // Cache valid for 30s
            return cached.value;
        }
        return null;
    }
    
    setCacheResult(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
        
        // Maintain cache size
        if (this.cache.size > 100) {
            const oldestKey = Array.from(this.cache.keys())[0];
            this.cache.delete(oldestKey);
        }
    }

    // Debounce untuk password strength checking
    debounce(func, wait, key = null) {
        if (key) {
            const cached = this.getCachedResult(key);
            if (cached) return cached;
        }

        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            const result = func();
            if (key) this.setCacheResult(key, result);
        }, wait);
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