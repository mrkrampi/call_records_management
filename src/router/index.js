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
    {path: '/users', component: UsersList, meta: {isManager: true, requireAuth: true}},
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
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'));
            if (to.matched.some(record => record.meta.isManager)) {
                if (user.isManager === 1) {
                    next()
                } else {
                    next('/profile')
                }
            } else {
                next();
            }
        }
    } else {
        if (to.path.indexOf('login') !== -1 && localStorage.getItem('jwt')) {
            next('/profile')
        } else {
            next();
        }
    }
});

export default router;
