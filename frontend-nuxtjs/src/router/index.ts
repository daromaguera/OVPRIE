import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { requireAuth, requireGuest } from './guards';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
});

// Global route guards
router.beforeEach((to, from, next) => {
    // Check if route requires authentication
    if (to.meta.requiresAuth) {
        requireAuth(to, from, next);
    }
    // Check if route requires guest (not authenticated)
    else if (to.meta.requiresGuest) {
        requireGuest(to, from, next);
    }
    // Default: allow access
    else {
        next();
    }
});
