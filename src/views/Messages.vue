<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="w-full lg:flex mx-4 mb-4">
        <p class="text-leading text-grey-darker">Messages</p>
      </div>

      <messages-list class="mt-2" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MessagesList from '@/components/MessagesList'

export default {
  components: {
    MessagesList
  },

  metaInfo: {
    title: 'Messages'
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    //
  },

  methods: {
    //
  }
}
</script>
