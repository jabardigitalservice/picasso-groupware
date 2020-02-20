<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="w-full pt-4">
        <div class="text-center">
          <i class="far fa-4x fa-building mb-4 text-gray-600" />
          <p class="text-sm">Reservasi Ruangan Rapat</p>
        </div>

        <div class="mx-2 my-2">
          <a href="http://bit.ly/Formreservasiruanganrapat" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 mt-4 mb-3 rounded">Form Reservasi</a>
          <a href="http://bit.ly/Informasireservasiruangrapat" class="w-full text-center shadow block bg-brand-green text-white font-bold py-2 px-4 rounded">Informasi Reservasi</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { analytics } from '@/lib/firebase'

export default {
  components: {
    //
  },

  metaInfo: {
    title: 'Reservasi Ruangan'
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    analytics.logEvent('booking_list_view')
  },

  methods: {
    //
  }
}
</script>
