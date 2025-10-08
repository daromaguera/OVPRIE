<script setup lang="ts">
import { RouterView } from 'vue-router';
import FirstView from './Main.vue';
import Topbar from './Topbar.vue';
</script>

<template>
    <v-locale-provider>
        <Topbar />
        <v-app>
            <v-main>
                <FirstView />
                <v-container fluid class="page-wrapper bg-background px-sm-5 px-4 pt-12 rounded-xl">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
