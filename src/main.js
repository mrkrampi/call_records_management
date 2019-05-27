import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import {store} from "@/store";
import router from "./router";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuex);

// router.beforeEach((to, from, next) =>
//     Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
// );

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
