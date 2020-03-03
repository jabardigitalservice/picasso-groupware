<template>
  <div class="">
    <ul class="py-8">
      <li v-for="(sect, index) in sections"
          :key="index"
          class="cursor-pointer px-8 py-4 border-b border-solid border-gray-200 hover:bg-gray-100"
          @click.capture="$emit('click', sect)">
        <!-- <i :class="['align-middle icon font-black text-lg mr-4', `text-brand-${getRandomBrandColor()}`]"
          style="font-style: normal;">
          {{s.title.substring(0, 1)}}
        </i> -->
        <span :class="['align-middle uppercase tracking-widest font-bold text-sm', sect === active ? 'text-brand-blue' : 'text-gray-500']">
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
    getRandomBrandColor () {
      const colors = ['blue', 'green', 'yellow']
      const index = Math.floor(Math.random() * colors.length)
      return colors[index]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
