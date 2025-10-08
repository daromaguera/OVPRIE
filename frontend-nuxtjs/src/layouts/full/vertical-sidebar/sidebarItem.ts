import {
    LayoutDashboardIcon,
    BorderAllIcon,
    AlertCircleIcon,
    CircleDotIcon,
    BoxMultiple1Icon,
    LoginIcon,
    MoodHappyIcon,
    ApertureIcon,
    UserPlusIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    BgColor?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
    external?: boolean;
}

const sidebarItem: menu[] = [
    { header: 'Main' },
    {
        title: 'Dashboard',
        icon: 'graph-new-linear',
        to: '/'
    },
    {
        title: 'Publication',
        icon: 'bill-list-linear',
        to: '/publication'
    },
    {
        title: 'Patents',
        icon: 'ferris-wheel-broken',
        to: '/patents',
        children: [
            {
                title: 'Submissions',
                to: '/patents/submissions',
                chip: 'New',
            },
            {
                title: 'Requirements',
                to: '/patents/requirements',
            },
            {
                title: 'Guidelines',
                to: '/patents/guidelines',
            },
            {
                title: 'CSU Copyright Policies',
                to: '/patents/copyright-policies',
            },
        ]
    },
    { header: 'Settings' },
    {
        title: 'Profile',
        icon: 'user-circle-outline',
        to: '/profile'
    },
    {
        title: 'Accounts',
        icon: 'settings-linear',
        to: '/accounts'
    },
];

export default sidebarItem;
