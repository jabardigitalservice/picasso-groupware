<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="w-full lg:flex pt-4">
        <div class="text-center">
          <i class="far fa-4x fa-sad-tear mb-4 text-gray-600" />
          <p class="text-sm">Fitur ini belum ada yang coding. Bantu dong. <br />Tulis feedback dan fitur dibutuhkan + vote gan.</p>
        </div>

        <feedback-list class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FeedbackList from '@/components/FeedbackList'

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
  },

  methods: {
    async fetchItems () {
      await this.$store.dispatch('feedback-list/fetchItems')
    }
  }
}
</script>
