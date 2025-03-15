export class PasswordStrengthChecker {
    constructor() {
        this.passwordInput = document.getElementById('password-input');
        this.strengthMeter = document.getElementById('strength-meter');
        this.strengthLabel = document.getElementById('strength-label');
        this.feedback = document.getElementById('feedback');
        this.crackTime = document.getElementById('crack-time');
        
        this.initialize();
    }

    initialize() {
        this.passwordInput.addEventListener('input', () => this.checkPasswordStrength());
    }

    checkPasswordStrength() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.updateStrengthMeter(0, 'Enter a password', []);
            this.crackTime.textContent = '-';
            return;
        }
        
        const { score, feedbackMessages, timeToGuess } = this.calculatePasswordStrength(password);
        
        // Set strength meter properties based on score
        let strengthText = '';
        let colorClass = '';
        
        switch(score) {
            case 0:
                strengthText = 'Very Weak';
                colorClass = 'bg-red-500';
                break;
            case 1:
                strengthText = 'Weak';
                colorClass = 'bg-orange-500';
                break;
            case 2:
                strengthText = 'Moderate';
                colorClass = 'bg-yellow-500';
                break;
            case 3:
                strengthText = 'Strong';
                colorClass = 'bg-green-500';
                break;
            case 4:
                strengthText = 'Very Strong';
                colorClass = 'bg-green-600';
                break;
        }
        
        this.updateStrengthMeter(score, strengthText, feedbackMessages, colorClass);
        this.crackTime.textContent = timeToGuess;
    }

    calculatePasswordStrength(password) {
        let score = 0;
        const feedbackMessages = [];
        
        // Length check
        if (password.length < 6) {
            feedbackMessages.push('Password is too short');
        } else if (password.length >= 12) {
            score += 2;
        } else if (password.length >= 8) {
            score += 1;
        }
        
        // Character variety checks
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        
        let charTypeCount = 0;
        if (hasLower) charTypeCount++;
        if (hasUpper) charTypeCount++;
        if (hasDigit) charTypeCount++;
        if (hasSpecial) charTypeCount++;
        
        if (charTypeCount >= 3) score += 1;
        if (charTypeCount === 4) score += 1;
        
        // Feedback messages
        if (!hasLower) feedbackMessages.push('Add lowercase letters');
        if (!hasUpper) feedbackMessages.push('Add uppercase letters');
        if (!hasDigit) feedbackMessages.push('Add numbers');
        if (!hasSpecial) feedbackMessages.push('Add special characters');
        
        // Check patterns
        if (/(.)\\1{2,}/.test(password)) {
            feedbackMessages.push('Avoid repeated characters');
            score = Math.max(0, score - 1);
        }
        
        if (/^(?:password|123456|qwerty|admin|welcome|letmein)$/i.test(password)) {
            feedbackMessages.push('This is a commonly used password');
            score = 0;
        }
        
        const timeToGuess = this.calculateCrackTime(password, hasLower, hasUpper, hasDigit, hasSpecial);
        
        score = Math.max(0, Math.min(4, score));
        
        return { score, feedbackMessages, timeToGuess };
    }

    calculateCrackTime(password, hasLower, hasUpper, hasDigit, hasSpecial) {
        let charSetSize = 0;
        if (hasLower) charSetSize += 26;
        if (hasUpper) charSetSize += 26;
        if (hasDigit) charSetSize += 10;
        if (hasSpecial) charSetSize += 33;
        
        if (charSetSize === 0) charSetSize = 26;
        
        const guessesPerSecond = 10000000000;
        const possibleCombinations = Math.pow(charSetSize, password.length);
        const secondsToGuess = possibleCombinations / guessesPerSecond;
        
        return this.formatCrackTime(secondsToGuess);
    }

    formatCrackTime(seconds) {
        if (seconds < 60) return 'Instantly';
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
        if (seconds < 315360000) return `${Math.round(seconds / 31536000)} years`;
        if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} centuries`;
        return 'Millions of years';
    }

    updateStrengthMeter(score, labelText, feedbackMessages, colorClass) {
        this.strengthMeter.className = 'h-2.5 rounded-full transition-all duration-300';
        this.strengthMeter.style.width = `${(score + 1) * 20}%`;
        
        if (colorClass) {
            this.strengthMeter.classList.add(colorClass);
        }
        
        this.strengthLabel.textContent = labelText;
        
        if (feedbackMessages && feedbackMessages.length > 0) {
            this.feedback.innerHTML = feedbackMessages.map(msg => `<p>• ${msg}</p>`).join('');
        } else {
            this.feedback.innerHTML = '';
        }
    }
}