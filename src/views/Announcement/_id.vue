<template>
  <div class="messages">
    <div class="container mx-auto max-w-2xl">
      <h1 class="text-xl font-bold leading-loose m-4">
        Pengumuman Penting
      </h1>
      <div class="bg-white shadow p-4">
        <AnnouncementDetail :id="itemId" />
      </div>
    </div>
  </div>
</template>

<script>
import AnnouncementDetail from '../../components/Announcement/AnnouncementDetail'
export default {
  components: {
    AnnouncementDetail
  },
  metaInfo: {
    title: 'Pengumuman Penting'
  },
  computed: {
    itemId () {
      return this.$route.params.id
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.itemId) {
        vm.$router.replace({
          path: '/'
        })
      }
    })
  }
}
</script>
