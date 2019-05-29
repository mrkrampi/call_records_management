import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isAuth: localStorage.getItem('jwt'),
        user: JSON.parse(localStorage.getItem('user')),
        isManager: localStorage.getItem('role') === 'ROLE_MANAGER'
    },
    getters: {
        isAuth: state => state.isAuth,

        user: state => state.user
    },
    actions: {
        login({commit}) {
            commit('login');
        },
        logout({commit}) {
            commit('logout');
        }
    },
    mutations: {
        login(state) {
            state.isAuth = true;
            state.user = JSON.parse(localStorage.getItem('user'));
        },
        logout(state) {
            state.isAuth = false;
            state.user = {};
        }
    }
});
