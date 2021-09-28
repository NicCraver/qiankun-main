import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { registerMicroApps, setDefaultMountApp } from "qiankun";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

registerMicroApps(
  [
    {
      name: "dashboard",
      entry: "//localhost:8881",
      container: "#subapp-viewport",
      activeRule: "/dashboard",
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log("[LifeCycle] before load %c%s", "color: green;", app.name);
        return Promise.resolve();
      },
    ],
    beforeMount: [
      (app) => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
        return Promise.resolve();
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          "[LifeCycle] after unmount %c%s",
          "color: green;",
          app.name
        );
        return Promise.resolve();
      },
    ],
  }
);

setDefaultMountApp("/dashboard");
