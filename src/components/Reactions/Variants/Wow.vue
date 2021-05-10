<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--wow">
      <div class="emoji__face">
        <div class="emoji__eyebrows"></div>
        <div class="emoji__eyes"></div>
        <div class="emoji__mouth"></div>
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

@keyframes wow-face {
  15%,
  25% {
    transform: rotate(20deg) translateX(-25px);
  }
  45%,
  65% {
    transform: rotate(-20deg) translateX(25px);
  }
  75%,
  100% {
    transform: rotate(0deg) translateX(0);
  }
}

@keyframes wow-brow {
  15%,
  65% {
    top: 25px;
  }
  75%,
  100%,
  0% {
    top: 15px;
  }
}

@keyframes wow-mouth {
  10%,
  30% {
    width: 20px;
    height: 20px;
    left: calc(50% - 10px);
  }
  50%,
  70% {
    width: 30px;
    height: 40px;
    left: calc(50% - 15px);
  }
  75%,
  100% {
    height: 50px;
  }
}

.emoji--wow {
  .emoji__face {
    animation: wow-face 3s linear infinite;
  }

  .emoji__eyebrows {
    left: calc(50% - 3px);
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: transparent;
    box-shadow: -18px 0 0 0 $emoji-black-color, -33px 0 0 0 $emoji-black-color,
      18px 0 0 0 $emoji-black-color, 33px 0 0 0 $emoji-black-color;
    animation: wow-brow 3s linear infinite;

    &:before,
    &:after {
      width: 24px;
      height: 20px;
      border: 6px solid $emoji-black-color;
      box-sizing: border-box;
      border-radius: 50%;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      top: -3px;
      left: calc(50% - 12px);
    }

    &:before {
      margin-left: -25px;
    }

    &:after {
      margin-left: 25px;
    }
  }

  .emoji__eyes {
    width: 16px;
    height: 24px;
    left: calc(50% - 8px);
    top: 35px;
    border-radius: 50%;
    background: transparent;
    box-shadow: 25px 0 0 0 $emoji-black-color, -25px 0 0 0 $emoji-black-color;
  }

  .emoji__mouth {
    width: 30px;
    height: 45px;
    left: calc(50% - 15px);
    top: 50%;
    border-radius: 50%;
    background: $emoji-black-color;
    animation: wow-mouth 3s linear infinite;
  }
}
</style>
