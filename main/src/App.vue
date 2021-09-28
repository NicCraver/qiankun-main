<template>
  <div>
    <div id="subapp-viewport" />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { start, setDefaultMountApp } from "qiankun";
export default {
  setup() {
    onMounted(() => {
      if (!window.qiankunStarted) {
        window.qiankunStarted = true;

        // 直接写不会跳转到dashboard
        // start();

        // 这样写会跳转到dashboard
        setTimeout(() => {
          start();
        }, 0);
      }
    });
  },
};
</script>
