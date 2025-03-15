// main.js
import PasswordGenerator from './modules/password-generator.js';
import PassphraseGenerator from './modules/passphrase-generator.js';
import { validateInput } from './utils/validation.js';
import { formatTime, calculateEntropy } from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi managers
    const passwordGenerator = new PasswordGenerator();
    const passphraseGenerator = new PassphraseGenerator();
    const strengthHandler = new PasswordStrengthHandler();
    const securityManager = new SecurityManager();
    const performanceOptimizer = new PerformanceOptimizer();
    
    // Register sensitive fields
    securityManager.registerSensitiveField(document.getElementById('password-input'));
    securityManager.registerSensitiveField(document.getElementById('generated-password'));
    securityManager.registerSensitiveField(document.getElementById('generated-passphrase'));
    
  
    function setupEventHandlers() {
        const handlers = {
            'copy-password': handleCopy,
            'generate-password': handleGenerate,
            'password-input': handleInput
        };
    
        Object.entries(handlers).forEach(([id, handler]) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', (e) => {
                    try {
                        handler(e);
                    } catch (error) {
                        console.error(`Error in ${id} handler:`, error);
                        handleError(error);
                    }
                });
            }
        });
    }
    
    function handleError(error) {
        // Centralized error handling
        const errorMessages = {
            ClipboardError: 'Failed to copy to clipboard. Please try manually.',
            ValidationError: 'Invalid input. Please check your input and try again.',
            GenerationError: 'Failed to generate password. Please try again.',
            default: 'An unexpected error occurred. Please try again.'
        };
    
        const message = errorMessages[error.name] || errorMessages.default;
        alert(message);
    }

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
    function handleCopy(targetId) {
        return async function(e) {
            e.preventDefault();
            const targetField = document.getElementById(`generated-${targetId}`);
            
            if (!targetField || !targetField.value) {
                console.log('No content to copy');
                return;
            }

            try {
                // Gunakan execCommand sebagai fallback jika Clipboard API tidak tersedia
                if (!navigator.clipboard) {
                    targetField.select();
                    document.execCommand('copy');
                    targetField.blur();
                } else {
                    await navigator.clipboard.writeText(targetField.value);
                }

                // Show success message
                const messageElement = document.getElementById(`copy-${targetId}-message`);
                if (messageElement) {
                    messageElement.style.opacity = '1';
                    setTimeout(() => {
                        messageElement.style.opacity = '0';
                    }, 2000);
                }

                // Clear after delay
                setTimeout(() => {
                    targetField.value = '';
                }, 30000);
            } catch (error) {
                console.error('Copy failed:', error);
                alert('Failed to copy to clipboard. Please try manually selecting and copying the text.');
            }
        };
    }

    // Attach copy handlers
    const copyPassword = document.getElementById('copy-password');
    const copyPassphrase = document.getElementById('copy-passphrase');

    if (copyPassword) {
        copyPassword.addEventListener('click', handleCopy('password'));
    }
    if (copyPassphrase) {
        copyPassphrase.addEventListener('click', handleCopy('passphrase'));
    }
});