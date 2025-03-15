// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi managers
    const strengthHandler = new PasswordStrengthHandler();
    const securityManager = new SecurityManager();
    const performanceOptimizer = new PerformanceOptimizer();

    // Register sensitive fields
    securityManager.registerSensitiveField(document.getElementById('password-input'));
    securityManager.registerSensitiveField(document.getElementById('generated-password'));
    securityManager.registerSensitiveField(document.getElementById('generated-passphrase'));

    // Password input handler dengan debounce
    const passwordInput = document.getElementById('password-input');
    passwordInput.addEventListener('input', () => {
        performanceOptimizer.debounce(() => {
            strengthHandler.updateStrengthIndicator(passwordInput.value);
        }, 300);
    });

    // Generate password dengan password history check
    const generatePasswordBtn = document.getElementById('generate-password');
    generatePasswordBtn.addEventListener('click', () => {
        performanceOptimizer.throttle(() => {
            try {
                const newPassword = generatePassword(/* ... params ... */);
                
                if (securityManager.isPasswordReused(newPassword)) {
                    // Generate ulang jika password sudah pernah digunakan
                    generatePasswordBtn.click();
                    return;
                }

                securityManager.addToHistory(newPassword);
                document.getElementById('generated-password').value = newPassword;
                
            } catch (error) {
                console.error('Password generation error:', error);
                alert('Failed to generate password. Please try again.');
            }
        }, 1000);
    });

    // Clear sensitive data saat tab/window ditutup
    window.addEventListener('beforeunload', () => {
        securityManager.clearSensitiveData();
    });

    // Clear password setelah disalin
    const copyButtons = document.querySelectorAll('[id^="copy-"]');
    copyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const targetId = e.target.id.replace('copy-', '');
            const targetField = document.getElementById(`generated-${targetId}`);
            
            try {
                await navigator.clipboard.writeText(targetField.value);
                // Clear setelah delay
                setTimeout(() => {
                    targetField.value = '';
                }, 30000); // Clear after 30 seconds
            } catch (error) {
                console.error('Copy failed:', error);
                alert('Failed to copy to clipboard');
            }
        });
    });
});