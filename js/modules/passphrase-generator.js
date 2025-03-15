export class PassphraseGenerator {
    constructor() {
        this.wordsSlider = document.getElementById('words-slider');
        this.wordsValue = document.getElementById('words-value');
        this.separatorSelect = document.getElementById('separator-select');
        this.includeNumbersCheckbox = document.getElementById('include-numbers-passphrase');
        this.capitalizeCheckbox = document.getElementById('capitalize');
        this.generatePassphraseBtn = document.getElementById('generate-passphrase');
        this.generatedPassphrase = document.getElementById('generated-passphrase');
        this.copyPassphrase = document.getElementById('copy-passphrase');
        this.copyPassphraseMessage = document.getElementById('copy-passphrase-message');
        
        this.sundaneseWords = [
            "abah", "acan", "aceuk", "acuy", "ada", "aduh", "ahli", "aing",
            // ... tambahkan kata-kata Sunda lainnya ...
        ];
        
        this.initialize();
    }

    initialize() {
        // Words slider handler
        this.wordsSlider.addEventListener('input', () => {
            this.wordsValue.textContent = this.wordsSlider.value;
        });

        // Generate button handler
        this.generatePassphraseBtn.addEventListener('click', () => {
            const result = this.generatePassphrase();
            this.generatedPassphrase.value = result.passphrase;
        });

        // Copy button handler
        this.copyPassphrase.addEventListener('click', () => this.copyToClipboard());
    }

    generatePassphrase() {
        const wordCount = parseInt(this.wordsSlider.value);
        const separator = this.separatorSelect.value;
        const includeNumbers = this.includeNumbersCheckbox.checked;
        const capitalize = this.capitalizeCheckbox.checked;
        
        // Generate words
        const shuffledWords = [...this.sundaneseWords];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            const j = array[0] % (i + 1);
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }
        
        let selectedWords = shuffledWords.slice(0, wordCount);
        
        // Apply capitalization
        if (capitalize) {
            selectedWords = selectedWords.map(word => {
                const array = new Uint32Array(1);
                crypto.getRandomValues(array);
                return array[0] % 2 === 0 ? 
                    word.charAt(0).toUpperCase() + word.slice(1) : word;
            });
        }
        
        // Add numbers if selected
        if (includeNumbers) {
            const numPositions = Math.min(wordCount, 2);
            const usedPositions = new Set();
            
            for (let i = 0; i < numPositions; i++) {
                let pos;
                do {
                    const array = new Uint32Array(1);
                    crypto.getRandomValues(array);
                    pos = array[0] % wordCount;
                } while (usedPositions.has(pos));
                
                usedPositions.add(pos);
                
                const array = new Uint32Array(1);
                crypto.getRandomValues(array);
                const num = array[0] % 1000;
                
                const array2 = new Uint32Array(1);
                crypto.getRandomValues(array2);
                selectedWords[pos] = array2[0] % 2 === 0 ? 
                    `${selectedWords[pos]}${num}` : 
                    `${num}${selectedWords[pos]}`;
            }
        }
        
        const passphrase = selectedWords.join(separator);
        const entropy = this.calculateEntropy(wordCount, includeNumbers, capitalize);
        
        return { passphrase, entropy };
    }

    calculateEntropy(wordCount, hasNumbers, hasCapitalization) {
        let entropy = wordCount * Math.log2(this.sundaneseWords.length);
        
        if (hasNumbers) {
            entropy += Math.log2(2) + Math.log2(1000);
        }
        
        if (hasCapitalization) {
            entropy += wordCount;
        }
        
        return entropy;
    }

    async copyToClipboard() {
        if (!this.generatedPassphrase.value) return;
        
        try {
            await navigator.clipboard.writeText(this.generatedPassphrase.value);
            this.copyPassphraseMessage.style.opacity = '1';
            setTimeout(() => {
                this.copyPassphraseMessage.style.opacity = '0';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        }
    }
}