<template>
  <div class="forums">
    <div class="container mx-auto">
      <div class="w-full bg-white shadow p-4">
        <div class="flex flex-wrap">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-feedback">
              Beri Feedback atau Usulan Aplikasi
            </label>
            <textarea v-model="title" id="input-feedback" rows="5" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
            <button @click="submitFeedback" class="w-full bg-brand-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { analytics, db } from '@/lib/firebase'

export default {
  components: {
    //
  },

  metaInfo: {
    title: 'Give Feedback'
  },

  data () {
    return {
      title: ''
    }
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    analytics.logEvent('feedback_create_view')
  },

  methods: {
    async submitFeedback () {
      const title = this.title

      if (title === '') {
        return false
      }

      const collectionRef = await db.collection('features_requests')

      await collectionRef.add({
        title: title,
        votes_count: 0
      })

      this.title = ''
      await this.$router.push('/underconstruction')
      await this.$store.dispatch('feedback-list/fetchItems')
    }
  }
}
</script>
