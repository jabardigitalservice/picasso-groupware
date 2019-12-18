<template>
  <div class="messages">
    <div class="container mx-auto">
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
