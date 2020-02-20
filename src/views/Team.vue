<template>
  <div class="checkins">
    <div class="container mx-auto">
      <teams-list class="mt-2" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { analytics } from '@/lib/firebase'

import TeamsList from '@/components/TeamsList'

export default {
  middleware: 'auth',

  components: {
    TeamsList
  },

  metaInfo: {
    title: 'Teams'
  },

  data () {
    return {
      //
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  mounted () {
    analytics.logEvent('teams_list_view')
  },

  methods: {
    //
  }
}
</script>
