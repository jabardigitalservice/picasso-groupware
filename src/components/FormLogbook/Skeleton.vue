<template>
  <div>
    <div v-for="i in 5" :key="i">
      <i aria-hidden="true" class="block w-24 h-6 mb-2 rounded-sm bg-shimmering" />
      <i aria-hidden="true" class="block w-full h-10 mb-8 rounded-sm bg-shimmering" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
