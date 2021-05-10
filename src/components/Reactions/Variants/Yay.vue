<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--yay">
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

@keyframes yay {
  25% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
}

.emoji--yay {
  .emoji__face {
    animation: yay 1s linear infinite alternate;
  }

  .emoji__eyebrows {
    left: calc(50% - 3px);
    top: 30px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: transparent;
    box-shadow: -6px 0 0 0 $emoji-black-color, -36px 0 0 0px $emoji-black-color,
      6px 0 0 0 $emoji-black-color, 36px 0 0 0px $emoji-black-color;

    &:before,
    &:after {
      width: 36px;
      height: 18px;
      border-radius: 60px 60px 0 0;
      background: transparent;
      border: 6px solid black;
      box-sizing: border-box;
      border-bottom: 0;
      bottom: 3px;
      left: calc(50% - 18px);
    }

    &:before {
      margin-left: -21px;
    }

    &:after {
      margin-left: 21px;
    }
  }

  .emoji__mouth {
    top: 60px;
    background: transparent;
    left: 50%;

    &:after {
      width: 80px;
      height: 80px;
      left: calc(50% - 40px);
      top: -75px;
      border-radius: 50%;
      background: transparent;
      border: 6px solid $emoji-black-color;
      box-sizing: border-box;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      z-index: 1;
    }

    &:before {
      width: 6px;
      height: 6px;
      background: transparent;
      border-radius: 50%;
      bottom: 5px;
      left: calc(50% - 3px);
      box-shadow: -25px 0 0 0 $emoji-black-color, 25px 0 0 0 $emoji-black-color,
        -35px -2px 30px 10px $emoji-angry-color,
        35px -2px 30px 10px $emoji-angry-color;
    }
  }
}
</style>
