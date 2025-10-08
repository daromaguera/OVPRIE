import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref(false);

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    applyTheme();
  };

  // Apply theme to document
  const applyTheme = () => {
    const html = document.documentElement;
    if (isDark.value) {
      html.setAttribute('data-theme', 'dark');
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.setAttribute('data-theme', 'light');
      html.classList.add('light');
      html.classList.remove('dark');
    }
  };

  return {
    isDark,
    toggleTheme,
    applyTheme,
  };
}); 