// validation.js
export function validateInput(input, type = 'password') {
    const validators = {
        password: {
            minLength: 8,
            maxLength: 128,
            pattern: /^[^\s]{8,}$/,
            errorMessages: {
                tooShort: 'Password must be at least 8 characters',
                tooLong: 'Password must not exceed 128 characters',
                hasSpaces: 'Password must not contain spaces'
            }
        },
        passphrase: {
            minWords: 3,
            maxWords: 7,
            pattern: /^[\w\s-_.#*]+$/,
            errorMessages: {
                invalidChars: 'Passphrase contains invalid characters'
            }
        }
    };

    const rules = validators[type];
    const errors = [];

    if (input.length < rules.minLength) errors.push(rules.errorMessages.tooShort);
    if (input.length > rules.maxLength) errors.push(rules.errorMessages.tooLong);
    if (!rules.pattern.test(input)) errors.push(rules.errorMessages.hasSpaces);

    return {
        isValid: errors.length === 0,
        errors
    };
}