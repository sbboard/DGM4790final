import Vue from "vue"
import Router from "vue-router"
import Home from "./components/App.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
    path: "/",
    name: "home",
    component: Home
    },
  ]
});