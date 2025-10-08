<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Register form */
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" class="d-flex justify-center align-center">
                    <div>
                        <v-card rounded="xl" elevation="10" class="px-sm-1 px-0 mx-auto index-2" width="900">
                            <v-card-item>
                                <div class="d-flex justify-center mb-5">
                                    <span style="width:250px">
                                        <Logo />
                                    </span>
                                </div>
                                <div class="d-flex align-center text-center mb-6">
                                    <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
                                        <span
                                            class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Researcher Registration</span>
                                    </div>
                                </div>
                                <div class="overflow-y-auto" style="height: 65vh;">
                                    <RegisterForm />
                                </div>
                            </v-card-item>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
.authentication {
    min-height: 100vh;
    position: relative;
    background: #f5f5f5; /* Light background color as fallback */
}

.authentication::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/images/backgrounds/csu-library-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0.5; /* 50% opacity for the background image */
    z-index: 1;
}

.authentication::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6); /* Dark overlay to make image darker */
    z-index: 1;
}

.v-container {
    position: relative;
    z-index: 2;
}

.boxed-auth-wrap {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

/* Ensure the card has good contrast against the background */
.v-card {
    background: white;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
