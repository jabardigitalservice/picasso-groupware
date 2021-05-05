<template>
  <ProfilePicture
    :size="size"
    :url="user ? user.photo : null"
    :is-loading="isLoading" />
</template>

<script>
import { mapGetters } from 'vuex'
import ProfilePicture from './ProfilePicture.vue'

export default {
  components: {
    ProfilePicture
  },
  props: {
    size: {
      type: Number,
      default: 64
    }
  },
  computed: mapGetters({
    isLoading: 'auth/loading',
    user: 'auth/user'
  })
}
</script>
