import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/sorting",
    name: "sorting",
    component: () => import("../views/Sorting"),
  },
  {
    path: "*",
    beforeEnter: (to, from, next) => {
      next("/sorting");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
