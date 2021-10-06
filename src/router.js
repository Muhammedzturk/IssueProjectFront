import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './view/Dashboard.vue';
import OfferCreate from "./view/pages/Offer/OfferCreate";

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/offerCreate',
        name: 'offerCreate',component: OfferCreate,
    },
    {
        path: '/input',
        name: 'input',component: Dashboard,
    },
    {
        path: '/floatlabel',
        name: 'floatlabel',component: Dashboard,
    },
    {
        path: '/invalidstate',
        name: 'invalidstate',component: Dashboard,
    },
    {
        path: '/button',
        name: 'button',component: Dashboard,
    },
    {
        path: '/table',
        name: 'table',component: Dashboard,
    },
    {
        path: '/list',
        name: 'list',component: Dashboard,
    },
    {
        path: '/tree',
        name: 'tree',component: Dashboard,
    },
    {
        path: '/panel',
        name: 'panel',component: Dashboard,
    },
    {
        path: '/overlay',
        name: 'overlay',component: Dashboard,
    },
    {
        path: '/menu',component: Dashboard,
        children: [
            {
                path: '',component: Dashboard,
            },
            {
                path: '/menu/seat',component: Dashboard,
            },
            {
                path: '/menu/payment',component: Dashboard,
            },
            {
                path: '/menu/confirmation',component: Dashboard,
            },
        ],
    },
    {
        path: '/messages',
        name: 'messages',component: Dashboard,
    },
    {
        path: '/file',
        name: 'file',component: Dashboard,
    },
    {
        path: '/chart',
        name: 'chart',component: Dashboard,
    },
    {
        path: '/misc',
        name: 'misc',component: Dashboard,
    },
    {
        path: '/crud',
        name: 'crud',component: Dashboard,
    },
    {
        path: '/timeline',
        name: 'timeline',component: Dashboard,
    },
    {
        path: '/empty',
        name: 'empty',component: Dashboard,
    },
    {
        path: '/documentation',
        name: 'documentation',component: Dashboard,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
