<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="w-full pt-4">
        <div class="text-center">
          <i class="far fa-4x fa-sad-tear mb-4 text-gray-600" />
          <p class="text-sm">Fitur ini belum ada yang coding. Bantu dong. <br />Tulis feedback dan fitur dibutuhkan + vote gan.</p>
        </div>

        <div class="mx-2 my-2">
          <router-link to="/feedback/create" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Feedback atau Usul Fitur</router-link>
        </div>

        <feedback-list class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FeedbackList from '@/components/FeedbackList'
import { analytics } from '@/lib/firebase'

export default {
  components: {
    FeedbackList
  },

  metaInfo: {
    title: 'Under Construction'
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    this.fetchItems()

    analytics.logEvent('underconstruction_list_view')
  },

  methods: {
    async fetchItems () {
      await this.$store.dispatch('feedback-list/fetchItems')
    }
  }
}
</script>
