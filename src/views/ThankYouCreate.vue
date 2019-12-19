<template>
  <div class="forums">
    <div class="container mx-auto">
      <div class="w-full bg-white shadow p-4">
        <div class="flex flex-wrap">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-feedback">
              Ucapkan Terimakasih
            </label>
            <p class="text-gray-600 text-xs italic mb-2">Pesan dikirim secara Anonim. Ucapan Terimakasih terbaik adalah yang memberikan energi positif untuk banyak orang.</p>
            <textarea v-model="message" id="input-feedback" rows="5" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
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
import { db, FieldValue } from '@/lib/firebase'

export default {
  components: {
    //
  },

  metaInfo: {
    title: 'Give Kudos'
  },

  data () {
    return {
      message: ''
    }
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    //
  },

  methods: {
    async submitFeedback () {
      const message = this.message

      if (message === '') {
        return false
      }

      const collectionRef = await db.collection('kudos')

      await collectionRef.add({
        message: message,
        feedback_at: FieldValue.serverTimestamp()
      })

      this.message = ''
      await this.$store.dispatch('thankyou-list/fetchItems')

      await this.$router.push('/thankyou')
    }
  }
}
</script>
