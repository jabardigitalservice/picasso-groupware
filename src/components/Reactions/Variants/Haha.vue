<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--haha">
      <div class="emoji__face">
        <div class="emoji__eyes"></div>
        <div class="emoji__mouth">
          <div class="emoji__tongue"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactionMixin } from './_mixin'
export default {
  mixins: [reactionMixin]
}
</script>

<style lang="scss" scoped>
@import "../_reaction-variables";
@import "../reaction";

@keyframes haha-face {
  10%,
  30%,
  50% {
    transform: translateY(25px);
  }
  20%,
  40% {
    transform: translateY(15px);
  }
  60%,
  80% {
    transform: translateY(0);
  }
  70%,
  90% {
    transform: translateY(-10px);
  }
}

@keyframes haha-mouth {
  10%,
  30%,
  50% {
    transform: scale(0.6);
    top: 45%;
  }
  20%,
  40% {
    transform: scale(0.8);
    top: 45%;
  }
  60%,
  80% {
    transform: scale(1);
    top: 50%;
  }
  70% {
    transform: scale(1.2);
    top: 50%;
  }
  90% {
    transform: scale(1.1);
    top: 50%;
  }
}

.emoji--haha {
  .emoji__face {
    animation: haha-face 2s linear infinite;
  }

  .emoji__eyes {
    width: 26px;
    height: 6px;
    border-radius: 2px;
    left: calc(50% - 13px);
    top: 35px;
    transform: rotate(20deg);
    background: transparent;
    box-shadow: -25px 5px 0 0 $emoji-black-color,
      25px -5px 0 0 $emoji-black-color;

    &:after {
      left: 0;
      top: 0;
      width: 26px;
      height: 6px;
      border-radius: 2px;
      transform: rotate(-40deg);
      background: transparent;
      box-shadow: -25px -5px 0 0 $emoji-black-color,
        25px 5px 0 0 $emoji-black-color;
    }
  }

  .emoji__mouth {
    width: 80px;
    height: 40px;
    left: calc(50% - 40px);
    top: 50%;
    background: $emoji-black-color;
    border-radius: 0 0 40px 40px;
    overflow: hidden;
    z-index: 1;
    animation: haha-mouth 2s linear infinite;
  }

  .emoji__tongue {
    width: 70px;
    height: 30px;
    background: $emoji-love-color;
    left: calc(50% - 35px);
    bottom: -10px;
    border-radius: 50%;
  }
}
</style>
