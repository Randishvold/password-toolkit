// theme-manager.js
export class ThemeManager {
    constructor() {
        this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.initialize();
    }

    initialize() {
        // Set initial theme
        this.setTheme(this.darkModeMediaQuery.matches);

        // Listen for system theme changes
        this.darkModeMediaQuery.addEventListener('change', (e) => {
            this.setTheme(e.matches);
        });
    }

    setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}