<template>
  <a-layout id="components-layout">
    <a-drawer
      v-model:visible="visible"
      title="Basic Drawer"
      placement="right"
      ref="appDrawer"
      width="400px"
    >
      <a-affix
        :offset-top="120"
        :style="{ position: 'absolute', right: '400px' }"
      >
        <a-button type="primary" @click="showDrawer">
          <setting-outlined />
        </a-button>
      </a-affix>
    </a-drawer>
    <a-layout>
      <a-layout-content>
        <a-affix
          :offset-top="120"
          :style="{ position: 'absolute', right: '0px' }"
        >
          <a-button type="primary" @click="showDrawer">
            <setting-outlined />
          </a-button>
        </a-affix>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    SettingOutlined,
  },
  setup() {
    const visible = ref<boolean>(false);
    const appDrawer = ref();

    const showDrawer = () => {
      visible.value = !visible.value;
    };

    return {
      visible,
      appDrawer,
      showDrawer,
    };
  },
});
</script>
<style>
#components-layout {
  min-height: 100vh;
}
#components-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout .trigger:hover {
  color: #1890ff;
}

#components-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
