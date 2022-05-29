<template>
  <AppDrawer :toggle="visible" @callbackSettings="handleSettings" />
  <a-layout id="components-layout">
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
        <slot-machine :appSetting="appSetting" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import AppDrawer from "@/components/AppDrawer.vue";
import SlotMachine from "@/components/SlotMachine.vue";
export default defineComponent({
  components: {
    SettingOutlined,
    AppDrawer,
    SlotMachine,
  },
  setup() {
    const visible = ref<boolean>(false);
    const appDrawer = ref();

    const appSetting = ref({
      prizes: {},
      players: [],
    });

    const showDrawer = () => {
      visible.value = !visible.value;
    };

    const handleSettings = (prizes: []) => {
      console.log(prizes);
      appSetting.value.prizes = prizes;
    };

    return {
      appSetting,
      visible,
      appDrawer,
      showDrawer,
      handleSettings,
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
