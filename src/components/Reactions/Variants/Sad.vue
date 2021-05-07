<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--sad">
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

@keyframes sad-face {
  25%,
  35% {
    top: -15px;
  }
  55%,
  95% {
    top: 10px;
  }
  100%,
  0% {
    top: 0;
  }
}

@keyframes sad-mouth {
  25%,
  35% {
    transform: scale(0.85);
    top: 70px;
  }
  55%,
  100%,
  0% {
    transform: scale(1);
    top: 80px;
  }
}

@keyframes tear-drop {
  0%,
  100% {
    display: block;
    left: 35px;
    top: 15px;
    transform: rotate(45deg) scale(0);
  }
  25% {
    display: block;
    left: 35px;
    transform: rotate(45deg) scale(2);
  }
  49.9% {
    display: block;
    left: 35px;
    top: 65px;
    transform: rotate(45deg) scale(0);
  }
  50% {
    display: block;
    left: -35px;
    top: 15px;
    transform: rotate(45deg) scale(0);
  }
  75% {
    display: block;
    left: -35px;
    transform: rotate(45deg) scale(2);
  }
  99.9% {
    display: block;
    left: -35px;
    top: 65px;
    transform: rotate(45deg) scale(0);
  }
}

.emoji--sad {

  .emoji__face {
    animation: sad-face 2s ease-in infinite;
  }

  .emoji__eyebrows {
    left: calc(50% - 3px);
    top: 35px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: transparent;
    box-shadow: -40px 9px 0 0 $emoji-black-color, -25px 0 0 0 $emoji-black-color,
      25px 0 0 0 $emoji-black-color, 40px 9px 0 0 $emoji-black-color;

    &:before,
    &:after {
      width: 30px;
      height: 20px;
      border: 6px solid $emoji-black-color;
      box-sizing: border-box;
      border-radius: 50%;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      top: 2px;
      left: calc(50% - 15px);
    }

    &:before {
      margin-left: -30px;
      transform: rotate(-30deg);
    }

    &:after {
      margin-left: 30px;
      transform: rotate(30deg);
    }
  }

  .emoji__eyes {
    width: 14px;
    height: 16px;
    left: calc(50% - 7px);
    top: 50px;
    border-radius: 50%;
    background: transparent;
    box-shadow: 25px 0 0 0 $emoji-black-color, -25px 0 0 0 $emoji-black-color;

    &:after {
      background: $emoji-like-color;
      width: 12px;
      height: 12px;
      margin-left: 6px;
      border-radius: 0 100% 40% 50% / 0 50% 40% 100%;
      transform-origin: 0% 0%;
      animation: tear-drop 2s ease-in infinite;
    }
  }

  .emoji__mouth {
    width: 60px;
    height: 80px;
    left: calc(50% - 30px);
    top: 80px;
    box-sizing: border-box;
    border: 6px solid $emoji-black-color;
    border-radius: 50%;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    background: transparent;
    animation: sad-mouth 2s ease-in infinite;

    &:after {
      width: 6px;
      height: 6px;
      background: transparent;
      border-radius: 50%;
      top: 4px;
      left: calc(50% - 3px);
      box-shadow: -18px 0 0 0 $emoji-black-color, 18px 0 0 0 $emoji-black-color;
    }
  }
}

.emoji-animation-disabled .emoji__eyes::after {
  display: none;
}
</style>
