// passphrase-generator.js
class PassphraseGenerator {
    constructor() {
        this.words = [
            "abah", "acan", "aceuk", "acuy", "ada", "aduh", "ahli", "aing",
            // ... tambahkan kata-kata Sunda lainnya ...
        ];
        this.separators = ['-', '_', '.', '#', '*'];
    }

    generatePassphrase(options = {}) {
        const {
            wordCount = 4,
            addNumbers = true,
            capitalize = true,
            separator = '-'
        } = options;

        this.validateOptions(wordCount, separator);

        // Generate passphrase
        let words = this.getRandomWords(wordCount);
        
        // Apply capitalization if needed
        if (capitalize) {
            words = words.map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            );
        }

        // Add numbers if needed
        if (addNumbers) {
            const number = Math.floor(Math.random() * 100);
            words.push(number.toString());
        }

        return words.join(separator);
    }

    getRandomWords(count) {
        const array = new Uint32Array(count);
        crypto.getRandomValues(array);
        return Array.from(array).map(n => 
            this.words[n % this.words.length]
        );
    }

    validateOptions(wordCount, separator) {
        if (wordCount < 3 || wordCount > 7) {
            throw new Error('Word count must be between 3 and 7');
        }
        if (!this.separators.includes(separator)) {
            throw new Error('Invalid separator');
        }
    }

    calculateEntropy(options) {
        const { wordCount = 4, addNumbers = true } = options;
        let entropy = Math.log2(Math.pow(this.words.length, wordCount));
        if (addNumbers) entropy += Math.log2(100); // For numbers 0-99
        return entropy;
    }
}

export default PassphraseGenerator;