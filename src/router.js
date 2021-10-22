import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './view/Dashboard.vue';
import OfferCreate from "./view/pages/Offer/OfferCreate";
import OffersList from "./view/pages/Offer/OffersList";
import CompanyCreate from "./view/pages/Company/CompanyCreate";
import CompanyList from "./view/pages/Company/CompanyList";
import Users from "./view/pages/Users/Users";

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/companyCreate',
        name: 'companyCreate',component: CompanyCreate,
    },
    {
        path: '/companyList',
        name: 'companyList',component: CompanyList,
    },
    {
        path: '/offerCreate',
        name: 'offerCreate',component: OfferCreate,
    },
    {
        path: '/offersList',
        name: 'OffersList',component: OffersList,
    },
    {
        path: '/users',
        name: 'users',component: Users,
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
