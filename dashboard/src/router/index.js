import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  // {
  //   path: "/",
  //   redirect: "/dashboard",
  // },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "dashboard",
    },
    component: () => import("@/views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
