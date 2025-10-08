const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresGuest: true
    },
    children: [
        {
            name: 'Login',
            path: '/',
            component: () => import('@/views/authentication/UserLogin.vue')
        },
        {
            name: 'Register',
            path: '/auth/register',
            component: () => import('@/views/authentication/Registration.vue')
        }
    ]
};

export default AuthRoutes;
