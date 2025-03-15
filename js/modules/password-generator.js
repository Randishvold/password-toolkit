// password-generator.js
class PasswordGenerator {
    constructor() {
        this.charset = {
            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lower: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*'
        };
    }

    generatePassword(options = {}) {
        const {
            length = 12,
            includeUpper = true,
            includeLower = true,
            includeNumbers = true,
            includeSymbols = true
        } = options;

        // Validate options
        this.validateOptions(length, includeUpper, includeLower, includeNumbers, includeSymbols);

        // Build character set
        let chars = '';
        if (includeUpper) chars += this.charset.upper;
        if (includeLower) chars += this.charset.lower;
        if (includeNumbers) chars += this.charset.numbers;
        if (includeSymbols) chars += this.charset.symbols;

        // Generate password
        let password = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            password += chars[array[i] % chars.length];
        }

        // Ensure all required character types are included
        if (!this.validatePasswordStrength(password, includeUpper, includeLower, includeNumbers, includeSymbols)) {
            return this.generatePassword(options);
        }

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

    validatePasswordStrength(password, upper, lower, numbers, symbols) {
        if (upper && !/[A-Z]/.test(password)) return false;
        if (lower && !/[a-z]/.test(password)) return false;
        if (numbers && !/\d/.test(password)) return false;
        if (symbols && !/[!@#$%^&*]/.test(password)) return false;
        return true;
    }
}

export default PasswordGenerator;