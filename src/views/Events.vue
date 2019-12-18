<template>
  <div class="events">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full">
          <events-list />
        </div>
      </div>
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
