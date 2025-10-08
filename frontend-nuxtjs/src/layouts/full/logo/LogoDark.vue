<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logo from '@/assets/images/logos/csuresearchlogo.png';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="logo" width="100%" alt="home" />
        </RouterLink>
    </div>
</template>
