import Vue from "vue"
import Router from "vue-router"
import Home from "./components/viewer.vue"
import character from "./components/characterManager.vue"
import series from "./components/seriesManage.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
    path: "/",
    name: "home",
    component: Home
    },
    {
    path: "/charMan",
    name: "character manager",
    component: character
    },
    {
    path: "/seriesMan",
    name: "series manager",
    component: series
    },
  ]
});