import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { BLUE_THEME } from '@/theme/LightTheme';
import { DARK_BLUE_THEME } from '@/theme/DarkTheme';

// Determine default theme from localStorage
const savedTheme = localStorage.getItem('theme');
const defaultTheme = savedTheme === 'dark' ? 'DARK_BLUE_THEME' : 'BLUE_THEME';

const vuetify = createVuetify({
    components,
    directives,

    theme: {
        defaultTheme,
        themes: {
            BLUE_THEME,
            DARK_BLUE_THEME,
        }
    },
    defaults: {
        VCard: {
            rounded: 'xl'
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
        },
        VListItem: {
            minHeight: '45px'
        },
        VTooltip: {
            location: 'top'
        }
    }
});

// Make Vuetify instance globally accessible for theme switching
if (typeof window !== 'undefined') {
    (window as any).$vuetify = vuetify;
}

export default vuetify;
