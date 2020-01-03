<template>
  <div class="forums">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full mx-2 my-2">
          <router-link to="/thankyou/create" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Kirim Terimakasih <i class="ml-2 fas fa-heart text-red-500 text-lg" /></router-link>
        </div>
      </div>
      <thank-you-list class="mt-2" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThankYouList from '@/components/ThankYouList'
import { analytics } from '@/lib/firebase'

export default {
  components: {
    ThankYouList
  },

  metaInfo: {
    title: 'Thank You'
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    analytics.logEvent('thankyou_list_view')
  },

  methods: {
    //
  }
}
</script>
