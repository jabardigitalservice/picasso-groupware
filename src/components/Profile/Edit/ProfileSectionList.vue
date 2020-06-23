<template>
  <div class="">
    <h3 class="px-4 py-8 sm:p-8 font-black text-gray-900 text-2xl bg-white rounded-tr-lg rounded-tl-lg lg:bg-transparent">
      Lengkapi Profil
    </h3>
    <ul class="profile-section-list">
      <li v-for="(sect, index) in sections"
          :key="index"
          :class="['profile-section-list__item', isSectionActive(sect) && 'is-active']"
          @click.capture="$emit('click', sect)">
        <i v-if="isSectionActive(sect)"
           class="inline-block align-baseline w-3 h-3 mr-2 rounded-full bg-brand-yellow-darkest"></i>
        <span class="inline align-baseline font-bold"
              style="color: currentColor">
          {{sect}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    active: {
      type: [String]
    }
  },
  methods: {
    isSectionActive (name) {
      return name === this.active
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-section-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 5rem;

  &__item {
    outline: 1px solid #eee;
    @apply cursor-pointer
    px-8 py-4
    flex flex-row justify-center items-center
    text-center text-gray-500;
    &:hover {
      @apply bg-white;
    }
    > i {
      @apply hidden;
    }
    &.is-active {
      @apply bg-brand-blue text-white;
    }
  }
}

@screen sm {
  .profile-section-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@screen lg {
  .profile-section-list {
    display: block;
    &__item {
      outline: none;
      @apply cursor-pointer
      block px-8 py-4
      text-left;
      &.is-active {
        @apply bg-white text-brand-blue;
      }
      &:hover {
        @apply bg-white;
      }
      > i {
        @apply inline-block;
      }
    }

  }
}
</style>
