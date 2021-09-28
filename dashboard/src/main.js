import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
let router = null;
let instance = null;
const routes = [
  // {
  //   path: "/",
  //   name: "dashboard",
  //   meta: {
  //     title: "dashboard",
  //   },
  //   component: () => import("@/views/Home.vue"),
  // },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "dashboard",
    },
    component: Home,
  },
];
function render(props = {}) {
  console.log(`111`, 111);
  const { container } = props;
  router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/" : "/"),
    routes,
  });
  instance = createApp(App);
  instance.use(router);
  instance.use(store);

  instance?.mount(container ? container.querySelector("#app") : "#app");
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("%c ", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props) {
  console.log(`props`, props);
  render(props);
  // instance!.config.globalProperties.$onGlobalStateChange =
  //   props.onGlobalStateChange
  // instance!.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  if (instance._container === null) {
    throw Error("instance._container is null");
  }
  instance?.unmount("#app");
  instance._container.innerHTML = "";
  instance = null;
  router = null;
}
