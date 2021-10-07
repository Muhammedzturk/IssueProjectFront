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
        path: '/users',
        name: 'users',component: Dashboard,
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

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach(function(to, from, next) {
    window.scrollTo(0, 0);
    next();
});
export default router;
