<template>
  <div
    :style="giftStyle"
    :class="['gift-container', displayType, { 'autoTurn': isRunning }]"
    ref="giftContainer"
  >
    <div
      :class="['gift', config.style]"
      v-for="(gift, index) in config.gifts"
      :key="index"
      :style="`transform: rotateX(${
        rotate * index
      }deg) translateZ(${translateZ}px)`"
    >
      <template v-if="gift.type === 'text'">{{ gift.name }}</template>
      <template v-if="gift.type === 'image'">
        <img :src="gift.path" :height="config.height" />
      </template>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, watchEffect } from "vue";
export default defineComponent({
  props: {
    trigger: {
      type: Date,
      default: false,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.logGiftsDeg();
    this.setting();
  },
  setup(props, { emit }) {
    const isRunning = ref(false);
    const currentDeg = ref(0);
    const targetDeg = ref(0);
    const giftsDeg = ref([]);
    const randomRollBackDeg = ref({});
    const giftContainer = ref();
    const giftStyle = ref({});

    const displayType = computed(() => {
      return props.config.run3D ? "three-dimension" : "flat";
    });

    const rotate = computed(() => {
      return 360 / props.config.gifts.length;
    });

    const translateZ = computed(() => {
      return (
        props.config.height / 2 / Math.tan((rotate.value / 2 / 180) * Math.PI)
      );
    });

    const setting = () => {
      giftStyle.value = {
        "--duration": `${props.config.duration}ms`,
        "--fontSize": `${props.config.fontSize}px`,
        "--width": `${props.config.width}px`,
        "--height": `${props.config.height}px`,
        "--currentDeg": `${currentDeg.value}deg`,
      };
    };

    const logGiftsDeg = () => {
      props.config.gifts.forEach((gift, index) => {
        giftsDeg.value[index] = {
          from: index === 0 ? 0 : giftsDeg.value[index - 1].to,
          to:
            index === 0
              ? rotate.value
              : giftsDeg.value[index - 1].to + rotate.value,
          name: gift.name,
        };
      });
    };

    const autoTurn = () => {
      let randomDeg = Math.random() * 360 + 360 * 5; // Harcode result here
      randomDeg -= randomDeg % rotate.value;
      targetDeg.value = randomDeg;
      randomRollBackDeg.value = props.config.rollback
        ? Math.random() * props.config.rollback + 1
        : 1;
      giftStyle.value = {
        "--duration": `${props.config.duration}ms`,
        "--fontSize": `${props.config.fontSize}px`,
        "--width": `${props.config.width}px`,
        "--height": `${props.config.height}px`,
        "--currentDeg": `${currentDeg.value}deg`,
        "--targetDeg": `${targetDeg.value}deg`,
        "--rollBackDeg": `${randomRollBackDeg.value}deg`,
      };
      isRunning.value = true;
    };

    const autoTurnStop = () => {
      currentDeg.value = targetDeg.value % 360;
      giftStyle.value = {
        "--duration": `${props.config.duration}ms`,
        "--fontSize": `${props.config.fontSize}px`,
        "--width": `${props.config.width}px`,
        "--height": `${props.config.height}px`,
        "--currentDeg": `${currentDeg.value}deg`,
        "--targetDeg": `${targetDeg.value}deg`,
        "--rollBackDeg": `${randomRollBackDeg.value}deg`,
      };
      
      let giftName = null;
      const endDeg = currentDeg.value + rotate.value / 2;
      giftsDeg.value.forEach((gift) => {
        if (endDeg >= gift.from && endDeg <= gift.to) {
          giftName = gift.name;
        }
      });
      isRunning.value = false;
      emit("finished", giftName);
    };
    
    watch(() => props.config, () => {
      setting();
    });

    watch(() => props.trigger, () => {
      autoTurn();
    });

    watch(isRunning, () => {
      if (isRunning.value) {
        setTimeout(() => {
          autoTurnStop();
        }, props.config.duration + 200);
      }
    });

    return {
      giftContainer,
      giftStyle,
      currentDeg,
      targetDeg,
      randomRollBackDeg,
      giftsDeg,
      displayType,
      translateZ,
      rotate,
      isRunning,
      setting,
      logGiftsDeg,
      autoTurn,
      autoTurnStop,
    };
  },
});
</script>

<style lang="scss">
.gift-container {
  /* START*/
  $width: var(--width);
  $height: var(--height);
  $fontSize: var(--fontSize);
  //
  $duration: var(--duration);
  $rotateY: var(--rotateY);
  $targetDeg: var(--targetDeg);
  $currentDeg: var(--currentDeg);
  $rollBackDeg: var(--rollBackDeg);
  /* END*/
  * {
    box-sizing: border-box;
  }
  perspective: 999999px;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: $width;
  transform-style: preserve-3d;
  .gift {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $width;
    height: $height;
    border: 1px solid #333;
    background-color: #fff;
    font-size: $fontSize;
    img {
      padding: 1px;
    }
  }

  &.flat {
    transform: rotateX($currentDeg);
    &.autoTurn {
      transition: $duration ease-in-out;
      transform: rotateX($targetDeg);
    }
  }

  &.three-dimension {
    transform: rotateY($rotateY) rotateX($currentDeg);
    &.autoTurn {
      transition: $duration cubic-bezier(0.1, 0, 0, $rollBackDeg);
      transform: rotateY($rotateY) rotateX($targetDeg);
    }
  }
}
</style>
