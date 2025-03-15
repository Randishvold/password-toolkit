// tab-manager.js
export class TabManager {
  constructor() {
    // Initialize tab elements
    this.checkerTab = document.getElementById('checker-tab');
    this.generatorTab = document.getElementById('generator-tab');
    this.passphraseTab = document.getElementById('passphrase-tab');
    
    this.checkerSection = document.getElementById('checker-section');
    this.generatorSection = document.getElementById('generator-section');
    this.passphraseSection = document.getElementById('passphrase-section');
    
    this.initialize();
  }
  
  initialize() {
    // Setup click handlers
    this.checkerTab.addEventListener('click', () => {
      this.resetAllTabs();
      this.checkerTab.classList.add('border-primary', 'text-primary');
      this.checkerTab.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
      this.checkerSection.classList.remove('hidden');
    });
    
    this.generatorTab.addEventListener('click', () => {
      this.resetAllTabs();
      this.generatorTab.classList.add('border-primary', 'text-primary');
      this.generatorTab.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
      this.generatorSection.classList.remove('hidden');
    });
    
    this.passphraseTab.addEventListener('click', () => {
      this.resetAllTabs();
      this.passphraseTab.classList.add('border-primary', 'text-primary');
      this.passphraseTab.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
      this.passphraseSection.classList.remove('hidden');
    });
  }
  
  resetAllTabs() {
    [this.checkerTab, this.generatorTab, this.passphraseTab].forEach(tab => {
      tab.classList.remove('border-primary', 'text-primary');
      tab.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400');
    });
    
    [this.checkerSection, this.generatorSection, this.passphraseSection].forEach(section => {
      section.classList.add('hidden');
    });
  }
}