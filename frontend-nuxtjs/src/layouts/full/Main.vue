<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import Logo from './logo/Logo.vue';
// Icon Imports
import { Menu2Icon, BellRingingIcon } from 'vue-tabler-icons';
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';
import NavCollapse from './vertical-sidebar/NavCollapse/NavCollapse.vue';
import { useAuthStore } from '@/stores/auth';
import ThemeToggle from '@/components/shared/ThemeToggle.vue';

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

const getUser = useAuthStore().getUser;
console.log(getUser)

</script>

<template>
    <v-navigation-drawer left v-model="sDrawer" app class="leftSidebar bg-containerBg" elevation="10" width="270" style="">
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar bg-containerBg">
            <v-list class="py-4 px-4">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />

                    <NavCollapse class="" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
                <!-- <Moreoption/> -->
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
    <div class="container verticalLayout">
        <div class="maxWidth">
            <v-app-bar elevation="0" height="70" class="top-header">
                <div class="d-flex align-center justify-space-between w-100">
                    <div class="d-flex align-center gap-2">
                        <v-btn class="hidden-lg-and-up text-muted" @click="sDrawer = !sDrawer" icon variant="flat" size="small">
                            <Menu2Icon size="20" stroke-width="1.5" />
                        </v-btn>
                        <!-- Theme Toggle -->
                        <ThemeToggle class="ml-2" />
                        <!-- Notification -->
                        <NotificationDD />
                    </div>
                    <div class="d-flex align-center justify-space-between w-100">
                        <!-- User Profile name and role -->
                        <div class="mr-2 flex justify-end text-right" style="width:100%;">
                            <div style="line-height: 0.9;">
                                <div class="text-body-1">{{ getUser?.full_name || 'User' }}</div>
                                <small>{{ getUser?.role || 'User' }}</small>
                            </div>
                        </div>
                        <!-- User Profile -->
                        <ProfileDD />
                    </div>
                </div>
            </v-app-bar>
        </div>
    </div>
</template>

<style scoped>
.scrollnavbar,
.perfect-scrollbar {
  overflow-x: hidden !important;
  overflow-y: auto !important;
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f5f5f5;
}
.scrollnavbar > * {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
