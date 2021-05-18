<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--angry">
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

@keyframes angry-color {
  45%,
  60% {
    background-size: 250%;
  }
  85%,
  100%,
  0% {
    background-size: 100%;
  }
}

@keyframes angry-face {
  35%,
  60% {
    transform: translateX(0) translateY(10px) scale(0.9);
  }
  40%,
  50% {
    transform: translateX(-5px) translateY(10px) scale(0.9);
  }
  45%,
  55% {
    transform: translateX(5px) translateY(10px) scale(0.9);
  }
}

@keyframes angry-mouth {
  25%,
  50% {
    height: 6px;
    bottom: 25px;
  }
}

.emoji--angry {
  background: linear-gradient($emoji-angry-color -10%, $emoji-base-color);
  background-size: 100%;
  animation: angry-color 2s ease-in infinite;

  .emoji__face {
    animation: angry-face 2s ease-in infinite;
  }

  .emoji__eyebrows {
    left: calc(50% - 3px);
    top: 55px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: transparent;
    box-shadow: -44px 5px 0 0 $emoji-black-color,
      -7px 16px 0 0 $emoji-black-color, 7px 16px 0 0 $emoji-black-color,
      44px 5px 0 0 $emoji-black-color;

    &:before,
    &:after {
      width: 50px;
      height: 20px;
      border: 6px solid $emoji-black-color;
      box-sizing: border-box;
      border-radius: 50%;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      top: 0;
      left: calc(50% - 25px);
    }

    &:before {
      margin-left: -25px;
      transform: rotate(15deg);
    }

    &:after {
      margin-left: 25px;
      transform: rotate(-15deg);
    }
  }

  .emoji__eyes {
    width: 12px;
    height: 12px;
    left: calc(50% - 6px);
    top: 70px;
    border-radius: 50%;
    background: transparent;
    box-shadow: 25px 0 0 0 $emoji-black-color, -25px 0 0 0 $emoji-black-color;
  }

  .emoji__mouth {
    width: 36px;
    height: 18px;
    left: calc(50% - 18px);
    bottom: 15px;
    background: $emoji-black-color;
    border-radius: 50%;
    animation: angry-mouth 2s ease-in infinite;
  }
}
</style>
