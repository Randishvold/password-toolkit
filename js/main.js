// main.js
// main.js
import { SecurityManager } from './security-manager.js';
import { PasswordStrengthHandler } from './strength-handler.js';
import { PerformanceOptimizer } from './performance-optimizer.js';
import { PasswordGenerator } from './modules/password-generator.js';
import { PassphraseGenerator } from './modules/passphrase-generator.js';
import { helpers } from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi managers
    const strengthHandler = new PasswordStrengthHandler();
    const securityManager = new SecurityManager();
    const performanceOptimizer = new PerformanceOptimizer();
    const passwordGenerator = new PasswordGenerator();
    const passphraseGenerator = new PassphraseGenerator();
    
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
    
    // Event handlers untuk generate password
    const generatePasswordBtn = document.getElementById('generate-password');
    generatePasswordBtn.addEventListener('click', () => {
      const options = {
        length: parseInt(document.getElementById('password-length').value),
        includeUpper: document.getElementById('include-uppercase').checked,
        includeLower: document.getElementById('include-lowercase').checked,
        includeNumbers: document.getElementById('include-numbers').checked,
        includeSymbols: document.getElementById('include-symbols').checked
      };
      
      try {
        const newPassword = passwordGenerator.generatePassword(options);
        document.getElementById('generated-password').value = newPassword;
      } catch (error) {
        console.error('Password generation error:', error);
        alert(error.message);
      }
    });
    
    // Event handlers untuk copy
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
          }, 30000);
        } catch (error) {
          console.error('Copy failed:', error);
          alert('Failed to copy to clipboard');
        }
      });
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