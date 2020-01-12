<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="w-full pt-4">
        <div class="text-center">
          <i class="far fa-4x fa-check-circle mb-4 text-gray-600" />
          <p class="text-sm">Silahkan login untuk melakukan checkin.</p>
        </div>

        <div class="mx-2 my-2">
          <router-link to="/feedback/create" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { analytics } from '@/lib/firebase'

export default {
  components: {
    //
  },

  metaInfo: {
    title: 'Checkins'
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    this.fetchItems()

    // analytics.logEvent('underconstruction_list_view')
  },

  methods: {
    async fetchItems () {
      // await this.$store.dispatch('feedback-list/fetchItems')
    }
  }
}
</script>
