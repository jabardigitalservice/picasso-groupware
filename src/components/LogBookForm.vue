<template>
  <div class="forums">
    <div class="container mx-auto">
      <div class="w-full bg-white shadow p-4">
        <ValidationObserver ref="validator" tag="div">
            Coba
            <button class="w-full bg-brand-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Buat Laporan
            </button>
            <router-link to="/" class="w-full text-center shadow block bg-white text-gray-700 font-bold py-2 px-4 rounded mt-2">
                Cancel
            </router-link>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LogBookForm'
}
</script>
