<template>
  <div>
    <h3 class="p-8 font-bold text-2xl text-white bg-brand-blue">
      <transition name="slide-y-fade-transition"
                  mode="out-in">
        <span :key="name">
          {{name}}
        </span>
      </transition>
    </h3>
    <transition name="slide-y-fade-transition"
                mode="out-in">
      <component :key="name"
                 :is="sectionComponent"
                 :data="{}"
                 class="p-8" />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  computed: {
    sectionComponent () {
      if (this.name) {
        return () => import(`./${this.name.replace(' ', '')}.vue`)
      }
      return null
    }
  }
}
</script>

<style>
</style>
