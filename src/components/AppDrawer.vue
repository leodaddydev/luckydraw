<template>
  <a-drawer
    v-model:visible="visible"
    title="App Settings"
    placement="right"
    ref="appDrawer"
    width="400px"
  >
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item
        :name="['prizes', 'diamonds']"
        label="Diamond prizes"
        :rules="[{ required: true, type: 'number', min: 0, max: 99 }]"
      >
        <a-input-number v-model:value="formState.prizes.diamonds" />
      </a-form-item>
      <a-form-item
        :name="['prizes', 'golds']"
        label="Gold prizes"
        :rules="[{ type: 'number', required: true, min: 0, max: 99 }]"
      >
        <a-input-number v-model:value="formState.prizes.golds" />
      </a-form-item>
      <a-form-item
        :name="['prizes', 'silvers']"
        label="Silver prizes"
        :rules="[{ type: 'number', required: true, min: 0, max: 99 }]"
      >
        <a-input-number v-model:value="formState.prizes.silvers" />
      </a-form-item>
      <a-form-item
        :name="['prizes', 'bronzes']"
        label="Bronze prizes"
        for="bronzes"
        :rules="[{ type: 'number', required: true, min: 0, max: 99 }]"
      >
        <a-input-number v-model:value="formState.prizes.bronzes" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Done</a-button>
      </a-form-item>
    </a-form>
    <a-affix
      :offset-top="120"
      :style="{ position: 'absolute', right: '400px' }"
    >
      <a-button type="primary" @click="showDrawer">
        <setting-outlined />
      </a-button>
    </a-affix>
  </a-drawer>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    SettingOutlined,
  },
  props: {
    toggle: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const visible = ref(false);
    const appDrawer = ref();
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };
    const formState = reactive({
      prizes: {
        diamonds: 0,
        golds: 0,
        silvers: 0,
        bronzes: 0,
      },
    });

    const showDrawer = () => {
      visible.value = !visible.value;
    };

    watch(
      () => props.toggle,
      () => {
        visible.value = props.toggle;
      }
    );

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const onFinish = () => {
      context.emit("callbackSettings", formState.prizes);
    };

    return {
      layout,
      formState,
      validateMessages,
      visible,
      appDrawer,
      showDrawer,
      onFinish,
    };
  },
});
</script>

<style></style>
