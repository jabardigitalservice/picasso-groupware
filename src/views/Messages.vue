<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full">
          <template v-if="user">
            <messages-list />
          </template>
          <template v-else>
            Please login.
          </template>
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
    user: 'auth/user'
  }),

  mounted () {
    //
  },

  methods: {
    //
  }
}
</script>
