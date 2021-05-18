<template>
  <div class="emoji-responsive-wrapper">
    <div class="emoji  emoji--love">
      <div class="emoji__heart"></div>
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

@keyframes heart-beat {
  25% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.6);
  }
}

.emoji--love {
  background: $emoji-love-color;

  .emoji__heart {
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    width: 80px;
    height: 80px;
    animation: heart-beat 1s linear infinite alternate;

    &:before,
    &:after {
      left: calc(50% - 20px);
      top: calc(50% - 32px);
      width: 40px;
      height: 64px;
      background: $emoji-white-color;
      border-radius: 20px 20px 0 0;
    }

    &:before {
      transform: translate(20px) rotate(-45deg);
      transform-origin: 0 100%;
    }

    &:after {
      transform: translate(-20px) rotate(45deg);
      transform-origin: 100% 100%;
    }
  }
}
</style>
