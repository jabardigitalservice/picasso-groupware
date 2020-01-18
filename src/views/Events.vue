<template>
  <div class="events">
    <div class="container mx-auto">
      <div class="w-full lg:flex px-4 mb-4">
        <p class="text-leading text-grey-darker">Events</p>
      </div>

      <div class="bg-red-800 text-center py-4 lg:px-4">
        <div class="p-2 items-center text-white lg:rounded-full flex lg:inline-flex" role="alert">
          <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
          <span class="mr-2 text-left text-sm flex-auto">Request ke Koordinator untuk akses ke Shared Google Calendar JDS</span>
        </div>
      </div>

      <events-list />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventsList from '@/components/EventsList'
import { analytics } from '@/lib/firebase'

export default {
  components: {
    EventsList
  },

  metaInfo: {
    title: 'Events'
  },

  computed: mapGetters({
    //
  }),

  mounted () {
    analytics.logEvent('events_list_view')
  },

  methods: {
    //
  }
}
</script>
