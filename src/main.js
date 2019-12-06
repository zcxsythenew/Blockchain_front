import Vue from 'vue'
import VueRouter from "vue-router";
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "@/router/router";
import store from "@/store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
