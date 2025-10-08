<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<template>
  <v-btn
    @click="themeStore.toggleTheme"
    icon
    variant="text"
    size="small"
    class="theme-toggle-btn"
    :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <v-icon v-if="themeStore.isDark" class="theme-icon">
      mdi-weather-sunny
    </v-icon>
    <v-icon v-else class="theme-icon">
      mdi-weather-night
    </v-icon>
  </v-btn>
</template>

<style scoped>
.theme-toggle-btn {
  transition: all 0.3s ease;
  border-radius: 50%;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.theme-icon {
  transition: transform 0.3s ease;
}

.theme-toggle-btn:hover .theme-icon {
  transform: rotate(180deg);
}

/* Dark mode specific styles */
:global(.dark) .theme-toggle-btn {
  color: #ffffff;
}

:global(.dark) .theme-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
