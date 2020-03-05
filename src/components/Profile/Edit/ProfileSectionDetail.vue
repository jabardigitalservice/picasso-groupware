<template>
  <div>
    <h3 class="p-8 font-bold text-2xl text-white bg-brand-blue">
      <transition name="slide-y-fade-transition"
                  mode="out-in">
        <span :key="name" :class="['profile-section-detail__title', hasUnsavedChanges && 'has-unsaved-changes']">
          {{name}}
        </span>
      </transition>
    </h3>
    <transition name="slide-y-fade-transition"
                mode="out-in">
      <component ref="profileData"
                 :key="name"
                 :is="sectionComponent"
                 :data="data"
                 :unsaved="!hasUnsavedChanges"
                 class="p-8"
                 @reload:profile="onReloadProfile" />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    sectionComponent () {
      if (this.name) {
        return () => import(`./${this.name.replace(' ', '')}.vue`)
      }
      return null
    },
    hasUnsavedChanges () {
      return this.$store.state['profile-detail'].hasUnsavedChanges
    }
  },
  methods: {
    onReloadProfile () {
      this.$store.dispatch('profile-detail/fetchItem', {
        id: this.data.id,
        fresh: true,
        silent: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-section-detail__title {
  @apply relative;
  &::after {
    content: '';
    transform: scale(0);
    transform-origin: center;
    left: calc(100% + #{0.5rem});
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    @apply block absolute top-0 w-4 h-4 rounded-full bg-yellow-400;
  }
}
.has-unsaved-changes {
  &::after {
    transform: scale(1);
  }
}
</style>
