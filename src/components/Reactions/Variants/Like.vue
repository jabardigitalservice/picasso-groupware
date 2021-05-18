<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--like">
      <div class="emoji__hand">
        <div class="emoji__thumb"></div>
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

@keyframes hands-up {
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-15deg) translateY(-10px);
  }
  75%,
  100% {
    transform: rotate(0deg);
  }
}

@keyframes thumbs-up {
  25% {
    transform: rotate(20deg);
  }
  50%,
  100% {
    transform: rotate(5deg);
  }
}

.emoji--like {
  background: $emoji-like-color;

  .emoji__hand {
    left: 25px;
    bottom: 30px;
    width: 20px;
    height: 40px;
    background: $emoji-white-color;
    border-radius: 5px;
    z-index: 0;
    animation: hands-up 2s linear infinite;

    &:before {
      left: 25px;
      bottom: 5px;
      width: 40px;
      background: inherit;
      height: 10px;
      border-radius: 2px 10px 10px 2px;
      box-shadow: 1px -9px 0 1px $emoji-white-color,
        2px -19px 0 2px $emoji-white-color, 3px -29px 0 3px $emoji-white-color;
    }
  }

  .emoji__thumb {
    border-bottom: 20px solid $emoji-white-color;
    border-left: 20px solid transparent;
    top: -25px;
    right: -25px;
    z-index: 2;
    transform: rotate(5deg);
    transform-origin: 0% 100%;
    animation: thumbs-up 2s linear infinite;

    &:before {
      border-radius: 50% 50% 0 0;
      background: $emoji-white-color;
      width: 10px;
      height: 12px;
      left: -10px;
      top: -8px;
      transform: rotate(-15deg);
      transform-origin: 100% 100%;
      box-shadow: -1px 4px 0 -1px $emoji-white-color;
    }
  }
}
</style>
