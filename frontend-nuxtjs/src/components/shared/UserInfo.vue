<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div v-if="authStore.getIsAuthenticated" class="d-flex align-center">
    <v-avatar size="32" class="mr-2">
      <v-icon>mdi-account</v-icon>
    </v-avatar>
    <div class="d-flex flex-column">
      <span class="text-body-2 font-weight-medium">{{ authStore.getUser?.username }}</span>
      <span class="text-caption text-grey">{{ authStore.getUser?.role }}</span>
    </div>
  </div>
</template> 