// tab-manager.js
export class TabManager {
    constructor() {
        this.tabs = document.querySelectorAll('[role="tab"]');
        this.panels = document.querySelectorAll('[role="tabpanel"]');
        this.initialize();
    }

    initialize() {
        // Add click handlers to tabs
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });

        // Set initial active tab
        const initialTab = this.tabs[0];
        if (initialTab) this.switchTab(initialTab);
    }

    switchTab(selectedTab) {
        // Update tab states
        this.tabs.forEach(tab => {
            const isSelected = tab === selectedTab;
            tab.setAttribute('aria-selected', isSelected);
            tab.classList.toggle('border-blue-500', isSelected);
            tab.classList.toggle('border-transparent', !isSelected);
        });

        // Show selected panel
        const targetId = selectedTab.getAttribute('aria-controls');
        this.panels.forEach(panel => {
            const isVisible = panel.id === targetId;
            panel.classList.toggle('hidden', !isVisible);
            panel.setAttribute('aria-hidden', !isVisible);
        });
    }
}