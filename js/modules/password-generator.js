export class PasswordGenerator {
    constructor() {
        this.lengthSlider = document.getElementById('length-slider');
        this.lengthValue = document.getElementById('length-value');
        this.generatePasswordBtn = document.getElementById('generate-password');
        this.generatedPassword = document.getElementById('generated-password');
        this.copyPassword = document.getElementById('copy-password');
        this.copyMessage = document.getElementById('copy-message');
        
        // Checkboxes
        this.uppercaseCheckbox = document.getElementById('include-uppercase');
        this.lowercaseCheckbox = document.getElementById('include-lowercase');
        this.numbersCheckbox = document.getElementById('include-numbers');
        this.symbolsCheckbox = document.getElementById('include-symbols');
        
        this.initialize();
    }

    initialize() {
        // Length slider handler
        this.lengthSlider.addEventListener('input', () => {
            this.lengthValue.textContent = this.lengthSlider.value;
        });

        // Generate button handler
        this.generatePasswordBtn.addEventListener('click', () => {
            const options = {
                length: parseInt(this.lengthSlider.value),
                includeUpper: this.uppercaseCheckbox.checked,
                includeLower: this.lowercaseCheckbox.checked,
                includeNumbers: this.numbersCheckbox.checked,
                includeSymbols: this.symbolsCheckbox.checked
            };
            
            try {
                const password = this.generatePassword(options);
                this.generatedPassword.value = password;
            } catch (error) {
                console.error('Password generation error:', error);
                alert(error.message);
            }
        });

        // Copy button handler
        this.copyPassword.addEventListener('click', () => this.copyToClipboard());

        // Checkbox validation
        const checkboxes = [
            this.uppercaseCheckbox,
            this.lowercaseCheckbox,
            this.numbersCheckbox,
            this.symbolsCheckbox
        ];

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const anyChecked = checkboxes.some(cb => cb.checked);
                if (!anyChecked) {
                    checkbox.checked = true;
                }
            });
        });

        // Generate initial password
        this.generatePasswordBtn.click();
    }

    generatePassword(options) {
        const { length, includeUpper, includeLower, includeNumbers, includeSymbols } = options;
        this.validateOptions(length, includeUpper, includeLower, includeNumbers, includeSymbols);

        let password;
        do {
            let chars = '';
            if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
            if (includeNumbers) chars += '0123456789';
            if (includeSymbols) chars += '!@#$%^&*()_-+=<>?/{}~';
            
            // Ensure one character from each selected type
            password = '';
            if (includeUpper) password += this.getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            if (includeLower) password += this.getRandomChar('abcdefghijklmnopqrstuvwxyz');
            if (includeNumbers) password += this.getRandomChar('0123456789');
            if (includeSymbols) password += this.getRandomChar('!@#$%^&*()_-+=<>?/{}~');
            
            // Fill remaining length
            while (password.length < length) {
                password += this.getRandomChar(chars);
            }
            
            password = this.shuffleString(password);
        } while (this.hasCommonPatterns(password));
        
        return password;
    }

    validateOptions(length, includeUpper, includeLower, includeNumbers, includeSymbols) {
        if (length < 8 || length > 30) {
            throw new Error('Password length must be between 8 and 30 characters');
        }
        if (!(includeUpper || includeLower || includeNumbers || includeSymbols)) {
            throw new Error('At least one character type must be selected');
        }
    }

    hasCommonPatterns(password) {
        const patterns = [
            /^.*(?:qwerty|asdfgh|zxcvbn).*$/i,
            /^.*(?:123321|987789|456654).*$/,
            /(.)\\1{2,}/,
            /(?:abc|bcd|cde|def|efg|xyz).*$/i,
            /(?:321|432|543|654|765|876|987).*$/
        ];
        return patterns.some(pattern => pattern.test(password));
    }

    getRandomChar(characters) {
        try {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            return characters.charAt(array[0] % characters.length);
        } catch (error) {
            console.error('Failed to generate secure random number:', error);
            throw new Error('Could not generate secure random number');
        }
    }

    shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const randArray = new Uint32Array(1);
            crypto.getRandomValues(randArray);
            const j = randArray[0] % (i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    async copyToClipboard() {
        if (!this.generatedPassword.value) return;
        
        try {
            await navigator.clipboard.writeText(this.generatedPassword.value);
            this.copyMessage.style.opacity = '1';
            setTimeout(() => {
                this.copyMessage.style.opacity = '0';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        }
    }
}