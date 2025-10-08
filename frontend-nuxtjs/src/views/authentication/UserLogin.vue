<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" class="d-flex align-center">
                    <div class="boxed-auth-wrap">
                        <v-card rounded="xl" elevation="10" class="px-sm-1 px-0  mx-auto index-2" max-width="450">
                            <v-card-item class="pa-sm-8">
                                <div class="d-flex justify-center mb-5">
                                    <span style="width:250px">
                                        <Logo />
                                    </span>
                                </div>
                                <!-- <div class="text-h6 text-medium-emphasis text-center mb-6">Your Social Campaigns</div> -->
                                <LoginForm />
                                <h6 class="text-subtitle-1  text-grey100 d-flex justify-center align-center mt-3">
                                    New to CUS-Research?
                                    <v-btn class="pl-0 text-primary text-body-1 font-weight-medium  opacity-1 pl-2" height="auto"
                                        to="/auth/register" variant="plain">Create an account</v-btn>
                                </h6>
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
}

/* Ensure the card has good contrast against the background */
.v-card {
    background: white;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
