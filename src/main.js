import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import Bootstrap from 'bootstrap-vue'
// import Paginate from 'vuejs-paginate'
import pagination from './components/Pagination.vue'

import VueRouter from 'vue-router'
import AppMovies from './components/AppMovies.vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(Bootstrap);
Vue.use(VueRouter);
// Vue.use(Paginate);
// Vue.component('paginate', Paginate);
Vue.use(pagination);
Vue.component('pagination', pagination);

const routes = [
  { path: "/", redirect: "/movies" },
  { path: "/movies", component: AppMovies },
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
