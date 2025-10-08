<script setup lang="ts">
import { Icon } from '@iconify/vue';

import icon1 from '@/assets/images/technology/vue-cat-icon.svg';
import icon2 from '@/assets/images/technology/angular-cat-icon.svg';
import icon3 from '@/assets/images/technology/next-cat-icon.svg';
import icon4 from '@/assets/images/technology/tailwind-icon.svg';
import icon5 from '@/assets/images/technology/nuxt-cat-icon.svg';
import icon6 from '@/assets/images/technology/bt-cat-icon.svg';

const items = [
    { text: 'Templates', icon: 'window-frame-linear', url: 'https://www.wrappixel.com/templates/category/vuejs-templates/' },
    { text: 'Help', icon: 'question-circle-linear', url: 'https://support.wrappixel.com/' },
    { text: 'Hire Us', icon: 'case-round-linear', url: 'https://www.wrappixel.com/hire-us/' }
];

const preview_link = [
    { title: 'VueJs Version', img: icon1, url: 'https://www.wrappixel.com/templates/spike-vuejs-admin-dashboard/?ref=376#demos' },
    { title: 'Angular Preview', img: icon2, url: 'https://www.wrappixel.com/templates/spike-angular-admin-template/?ref=376#demos' },
    { title: 'Nextjs Preview', img: icon3, url: 'https://www.wrappixel.com/templates/spike-nextjs-admin-template/?ref=376#demos' },
    {
        title: 'Tailwind Preview',
        img: icon4,
        url: 'https://www.wrappixel.com/templates/spike-tailwind-admin-template/?ref=376#demos'
    },
    {
        title: 'Nuxtjs Preview',
        img: icon5,
        url: 'https://www.wrappixel.com/templates/spike-nuxtjs-admin-template/?ref=376#demos'
    },
    { title: 'Bootstrap Preview', img: icon6, url: 'https://www.wrappixel.com/templates/spike-nuxtjs-admin-template/?ref=376#demos' }
];
</script>
<template>
    <div class="feature-topbar w-full py-4 px-6 w-100">
        <div class="d-flex flex-lg-row flex-column gap-3 justify-space-between align-center">
            <div class="d-flex align-center ga-6">
                <img src="@/assets/images/logos/csulogo.png" alt="logo" style="width: 25px;">
                <div target="_blank" class="lh-0 text-h6 ml-n3 font-weight-bold" style="color:white;font-family: felix titling;">
                    CSU - OVPRDIE
                </div>
                <div class="d-lg-flex d-none items-center ga-4 topbar-links border-s border-opacity-25 ps-6">
                    <span style="color:white;">
                        <span class="text-h6 font-weight-bold" style="color:white;">Announcements: &nbsp;</span>
                        We are inviting you to Artificial Intelligence Conference that aims...
                    </span>
                </div>
            </div>
            <div class="d-flex flex-md-row flex-column align-center ga-4">
                <h5 class="text-subtitle-1 font-weight-bold text-linear-gradient text-uppercase">Quick Access: </h5>
                <div class="d-flex flex-md-row flex-wrap justify-md-end justify-center ga-3">
                    <v-btn
                        class="purple-btn text-surface text-h6 font-weight-medium"
                        href="#"
                    >
                        <span class="d-flex ga-2"> <Icon icon="solar:notebook-minimalistic-outline" height="18" width="18" /> My Research</span>
                    </v-btn>
                    <v-btn class="green-btn text-h6 font-weight-medium" href="#">
                        <span class="d-flex ga-2"> <Icon icon="solar:people-nearby-broken" height="18" width="18" /> Conferences</span>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>
