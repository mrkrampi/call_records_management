import Vue from "vue";
import Router from "vue-router";
import Profile from "@/views/Profile";
import Login from "@/views/Login";
import WorkersList from "@/views/WorkersList";
import UsersList from "@/views/UsersList";
import CallsList from "@/views/CallsList";

Vue.use(Router);

const routes = [
    {path: '/profile', component: Profile, meta: {requireAuth: true}},
    {path: '/workers', component: WorkersList, meta: {isManager: true, requireAuth: true}},
    {path: '/users', component: UsersList, meta: {requireAuth: true}},
    {path: '/portfolio/:id', component: Profile, meta: {requireAuth: true}},
    {path: '/my-calls', component: CallsList, props: {currentOnly: true}, meta: {requireAuth: true}},
    {path: '/calls', component: CallsList, meta: {isManager: true, requireAuth: true}},
    {path: '/login', component: Login},
    {path: '*', redirect: '/profile'}
];

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!localStorage.getItem('jwt')) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            const isManager = localStorage.getItem('role') === 'ROLE_MANAGER';
            if (to.matched.some(record => record.meta.isManager)) {
                isManager ?
                    next() :
                    next('/profile');
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

export default router;
