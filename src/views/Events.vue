<template>
  <div class="events">
    <div class="container mx-auto">
      <div class="w-full lg:flex px-4 mb-4">
        <p class="text-leading text-grey-darker">Events</p>
      </div>

      <events-list class="mt-2" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventsList from '@/components/EventsList'

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
    //
  },

  methods: {
    //
  }
}
</script>
