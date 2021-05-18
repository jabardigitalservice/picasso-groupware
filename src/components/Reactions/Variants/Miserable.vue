<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--miserable">
      <div class="emoji__face">
        <div class="emoji__eyebrows"></div>
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

@keyframes miserable-color {
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

@keyframes miserable-face {
  35%,
  60% {
    transform: translateX(0) translateY(5px) scale(0.95);
  }
  40%,
  50% {
    transform: translateX(-2px) translateY(5px) scale(0.95);
  }
  45%,
  55% {
    transform: translateX(2px) translateY(5px) scale(0.95);
  }
}

@keyframes miserable-lines {
  35%,
  60% {
    transform: translateX(0) translateY(-5px) scale(1.05);
  }
  40%,
  50% {
    transform: translateX(2px) translateY(-5px) scale(1.05);
  }
  45%,
  55% {
    transform: translateX(-2px) translateY(-5px) scale(1.05);
  }
}

@keyframes miserable-mouth {
  25%,
  50% {
    height: 45px;
    bottom: -6px;
  }
}

.emoji--miserable {
  background: linear-gradient($emoji-miserable-color -10%, $emoji-base-color);
  background-size: 100%;
  animation: miserable-color 2s ease-in infinite;

  .emoji__face {
    animation: miserable-face 2s ease-in infinite;
  }

  .emoji__eyebrows {
    left: calc(50% - 3px);
    top: 25px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: transparent;
    box-shadow: -37px 43px 0 0 $emoji-black-color,
      -10px 30px 0 0 $emoji-black-color, 10px 30px 0 0 $emoji-black-color,
      37px 43px 0 0 $emoji-black-color;

    &:before,
    &:after {
      width: 50px;
      height: 50px;
      border: 6px solid $emoji-black-color;
      box-sizing: border-box;
      border-radius: 100%;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      top: 0;
      left: calc(50% - 25px);
    }

    &:before {
      margin-left: -30px;
      transform: rotate(-25deg);
    }

    &:after {
      margin-left: 30px;
      transform: rotate(25deg);
    }
  }

  .emoji__mouth {
    width: 48px;
    height: 50px;
    left: calc(50% - 24px);
    bottom: -16px;
    border: 6px solid $emoji-black-color;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    animation: miserable-mouth 2s ease-in infinite;

    &::after {
      content: '';
      top: 24px;
      left: calc(50% - 3px);
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: transparent;
      box-shadow: -14px -25px 0 0 $emoji-black-color,
        14px -25px 0 0 $emoji-black-color;
    }

  }
}
</style>
