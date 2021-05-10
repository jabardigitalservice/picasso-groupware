<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji-flat">
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

@keyframes flat-face {
  20%,
  50% {
    left: -5px;
  }
  70%,
  90% {
    left: 5px;
  }
  100%,
  0% {
    left: 0;
  }
}

.emoji-flat {

  .emoji__face {
    animation: flat-face 2s linear infinite;
  }

  .emoji__eyes {
    width: 14px;
    height: 16px;
    left: calc(50% - 7px);
    top: 45px;
    border-radius: 50%;
    background: transparent;
    box-shadow: 25px 0 0 0 $emoji-black-color, -25px 0 0 0 $emoji-black-color;
  }

  .emoji__mouth {
    width: 40px;
    height: 1px;
    left: calc(50% - 20px);
    top: 80px;
    box-sizing: border-box;
    border-top: 6px solid $emoji-black-color;
    background: transparent;

    &:after {
      width: 6px;
      height: 6px;
      background: transparent;
      top: -6px;
      left: calc(50% - 3px);
      box-shadow: -20px 0 0 0 $emoji-black-color, 20px 0 0 0 $emoji-black-color;
    }
  }
}

.emoji-animation-disabled .emoji__eyes::after {
  display: none;
}
</style>
