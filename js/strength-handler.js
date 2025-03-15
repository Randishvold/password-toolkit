// strength-handler.js
class PasswordStrengthHandler {
    constructor() {
        this.strengthMeter = document.getElementById('strength-meter');
        this.strengthLabel = document.getElementById('strength-label');
        this.feedback = document.getElementById('feedback');
        this.crackTime = document.getElementById('crack-time');
        
        // Color mapping untuk strength levels
        this.strengthColors = {
            0: 'bg-red-500',
            1: 'bg-orange-500',
            2: 'bg-yellow-500',
            3: 'bg-green-500',
            4: 'bg-green-600'
        };
        
        // Text mapping untuk strength levels
        this.strengthText = {
            0: 'Very Weak',
            1: 'Weak',
            2: 'Moderate',
            3: 'Strong',
            4: 'Very Strong'
        };
    }

    updateStrengthIndicator(password) {
        try {
            if (!password) {
                this.resetIndicators();
                return;
            }

            // Gunakan zxcvbn untuk analisis
            const result = zxcvbn(password);
            
            // Update visual indicators
            this.updateVisualStrength(result.score);
            this.updateFeedback(result.feedback);
            this.updateCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);

            return result;

        } catch (error) {
            console.error('Error in strength calculation:', error);
            this.handleError(error);
        }
    }

    updateVisualStrength(score) {
        // Hapus semua kelas warna sebelumnya
        Object.values(this.strengthColors).forEach(color => {
            this.strengthMeter.classList.remove(color);
        });

        // Set width dan warna baru
        this.strengthMeter.style.width = `${(score + 1) * 20}%`;
        this.strengthMeter.classList.add(this.strengthColors[score]);
        this.strengthLabel.textContent = this.strengthText[score];
    }

    updateFeedback(feedback) {
        const warnings = feedback.warning ? `<p class="text-yellow-600">⚠️ ${feedback.warning}</p>` : '';
        const suggestions = feedback.suggestions
            .map(suggestion => `<p class="text-blue-600">💡 ${suggestion}</p>`)
            .join('');
        
        this.feedback.innerHTML = warnings + suggestions;
    }

    updateCrackTime(crackTime) {
        this.crackTime.textContent = crackTime;
    }

    resetIndicators() {
        this.strengthMeter.style.width = '0%';
        this.strengthLabel.textContent = 'Enter a password';
        this.feedback.innerHTML = '';
        this.crackTime.textContent = '-';
    }

    handleError(error) {
        this.feedback.innerHTML = `
            <p class="text-red-600">
                ❌ An error occurred during password analysis. 
                Please try again or contact support if the problem persists.
            </p>
        `;
        // Log error untuk debugging
        console.error('Password analysis error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
    }
}