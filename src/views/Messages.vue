<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full">
          <messages-list />
        </div>
      </div>
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
