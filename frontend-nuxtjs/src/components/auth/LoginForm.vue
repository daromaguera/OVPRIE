<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { apiService, type LoginCredentials } from '@/services/api';
import { FormValidator, type ValidationResult } from '@/utils/validation';
import { useAuthStore } from '@/stores/auth';

// Router for navigation after successful login
const router = useRouter();
const authStore = useAuthStore();

// Form data
const formData = reactive<LoginCredentials>({
  username: '',
  password: '',
  remember_device: false,
});

// Form state
const isLoading = ref(false);
const showPassword = ref(false);
const formErrors = reactive({
  username: '',
  password: '',
  general: '',
});

// Validation state
const touched = reactive({
  username: false,
  password: false,
  remember_device: false,
});

// Computed properties for validation
const isFormValid = computed(() => {
  const usernameValid = FormValidator.validateUsernameOrEmail(formData.username).isValid;
  const passwordValid = FormValidator.validatePassword(formData.password).isValid;
  return usernameValid && passwordValid;
});

// Validation functions
const validateField = (field: keyof LoginCredentials) => {
  if (field === 'username') {
    const result = FormValidator.validateUsernameOrEmail(formData.username);
    formErrors.username = result.errors[0] || '';
    return result.isValid;
  } else if (field === 'password') {
    const result = FormValidator.validatePassword(formData.password);
    formErrors.password = result.errors[0] || '';
    return result.isValid;
  }
  return true;
};

const validateForm = (): boolean => {
  const usernameValid = validateField('username');
  const passwordValid = validateField('password');
  return usernameValid && passwordValid;
};

// Handle field blur for validation
const handleBlur = (field: keyof LoginCredentials) => {
  touched[field] = true;
  validateField(field);
};

// Handle form submission
const handleSubmit = async () => {
  // Clear previous errors
  formErrors.general = '';
  
  // Validate form
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    const response = await apiService.login(formData);
    
    if (response.status === 'success' && response.data) {
      // Store authentication data in the store
      authStore.setAuth(response.data.token, response.data.user);
      
      console.log('Login successful:', response.data.user);
      
      // Navigate to dashboard or intended page
      router.push('/dashboard');
    } else {
      // Handle API error response
      formErrors.general = response.message || 'Login failed. Please try again.';
    }
  } catch (error) {
    console.error('Login error:', error);
    formErrors.general = 'Network error. Please check your connection and try again.';
  } finally {
    isLoading.value = false;
  }
};

// Handle input changes
const handleInput = (field: keyof LoginCredentials) => {
  if (touched[field]) {
    validateField(field);
  }
};
</script>

<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">The OVPRDIE Initiative</span>
        </div>
    </div>
    <form @submit.prevent="handleSubmit">
        <div>
            <v-row class="mb-3">
                <v-col cols="12">
                    <v-label class="font-weight-medium mb-1">Username / Email</v-label>
                    <v-text-field
                        v-model="formData.username"
                        variant="outlined"
                        class="pwdInput"
                        :error="!!formErrors.username"
                        :error-messages="formErrors.username"
                        hide-details="auto"
                        color="primary"
                        @blur="handleBlur('username')"
                        @input="handleInput('username')"
                        :disabled="isLoading"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-label class="font-weight-medium mb-1">Password</v-label>
                    <v-text-field
                        v-model="formData.password"
                        variant="outlined"
                        class="border-borderColor"
                        :type="showPassword ? 'text' : 'password'"
                        :error="!!formErrors.password"
                        :error-messages="formErrors.password"
                        hide-details="auto"
                        color="primary"
                        @blur="handleBlur('password')"
                        @input="handleInput('password')"
                        :disabled="isLoading"
                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword"
                    ></v-text-field>
                </v-col>
                <v-col cols="12 " class="py-0">
                    <div class="d-flex flex-wrap align-center w-100">
                        <v-checkbox
                            v-model="formData.remember_device"
                            hide-details
                            color="primary"
                            :disabled="isLoading"
                        >
                            <template v-slot:label class="">Remember this Device</template>
                        </v-checkbox>
                        <div class="ml-sm-auto">
                            <RouterLink
                                to="/forgot-password"
                                class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                                :class="{ 'pointer-events-none': isLoading }"
                            >
                                Forgot Password ?
                            </RouterLink>
                        </div>
                    </div>
                </v-col>
                <v-col v-if="formErrors.general" cols="12" class="py-0">
                    <v-alert
                        type="error"
                        variant="tonal"
                        density="compact"
                        class="mb-3"
                    >
                        {{ formErrors.general }}
                    </v-alert>
                </v-col>
                <v-col cols="12">
                    <v-btn
                        size="large"
                        rounded="pill"
                        color="primary"
                        class="rounded-pill"
                        block
                        type="submit"
                        flat
                        :loading="isLoading"
                        :disabled="!isFormValid || isLoading"
                    >
                        <v-icon v-if="isLoading" class="mr-2">mdi-loading mdi-spin</v-icon>
                        {{ isLoading ? 'Signing In...' : 'Sign In' }}
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </form>
</template>

<style scoped>
.pointer-events-none {
    pointer-events: none;
}
</style>
