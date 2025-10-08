<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/auth');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<template>
  <v-btn
    color="error"
    variant="text"
    @click="handleLogout"
    prepend-icon="mdi-logout"
  >
    Logout
  </v-btn>
</template> 