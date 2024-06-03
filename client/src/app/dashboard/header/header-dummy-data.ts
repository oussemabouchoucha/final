import { RouterLink } from "@angular/router";

export const notifications = [
    {
        icon: 'far fa-cloud-download',
        subject: 'Download complete',
        description: 'loram ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
        icon: 'far fa-cloud-upload',
        subject: 'upload complete',
        description: 'loram ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
        icon: 'far fa-trash',
        subject: '350 MB trash files',
        description: 'loram ipsum dolor sit amet, consectetur adipiscing elit'
    }
];

export const userItems = [
    {
        icon: 'far fa-user',
        label: 'Profile',
        routerLink: 'profile'
    },
    {
        icon: 'far fa-users',
        label: 'Manage users',
        routerLink: 'table'
    },
    {
        icon: 'far fa-cog',
        label: 'Settings',
        link: '/settings'
    },
    {
        icon: 'far fa-sign-out-alt',
        label: 'Logout',
        action: 'logout'

    },
];