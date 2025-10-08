import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
//import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';

// Initialize theme store early
import { useThemeStore } from '@/stores/theme';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
//app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(VueApexCharts);
app.use(vuetify);

// Initialize theme before mounting
const themeStore = useThemeStore();
themeStore.applyTheme();

app.mount('#app');
