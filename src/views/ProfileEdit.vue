<template>
  <div class="messages">
    <div class="container mx-auto md:p-4">
      <div class="overflow-visible lg:overflow-hidden max-w-5xl mx-auto rounded-none lg:rounded-lg lg:shadow lg:flex lg:flex-row lg:justify-start lg:items-stretch">
        <ProfileSectionList :sections="profileSections"
                            :active="activeProfileSectionName"
                            class="rounded-lg lg:rounded-none border-r border-solid border-gray-200 bg-gray-100 shadow lg:shadow-none"
                            style="flex: 1 1 25%;"
                            @click="setActiveSection"/>
        <br class="lg:hidden">
        <ProfileSectionDetail ref="profileDetail"
                              :name="activeProfileSectionName"
                              class="overflow-hidden rounded-lg lg:rounded-none bg-white shadow lg:shadow-none"
                              style="flex: 1 1 60%;"/>
      </div>
    </div>
  </div>
</template>

<script>
import _startCase from 'lodash/startCase'
import _snakeCase from 'lodash/snakeCase'
import { mapState } from 'vuex'
import { formatDateTimeShort, formatDateLong } from '@/lib/date'
import { PROFILE_DETAIL_IS_PRISTINE } from '../store/mutation-types'

export default {
  middleware: 'auth',
  components: {
    ProfileSectionList: () => import('../components/Profile/Edit/ProfileSectionList'),
    ProfileSectionDetail: () => import('../components/Profile/Edit/ProfileSectionDetail')
  },

  metaInfo: {
    title: 'My Profile'
  },

  data () {
    return {
      profileSections: [
        'Personal',
        'Education',
        'Experience',
        'Bank Account',
        'Emergency Contact',
        'Enneagram'
      ]
    }
  },

  computed: {
    activeProfileSectionName () {
      return _startCase(this.$route.params.id || '')
    },
    ...mapState('profile-detail', {
      isPristine: state => state.isPristine
    })
  },

  methods: {
    formatDateTimeShort,
    formatDateLong,
    setActiveSection (name) {
      if (name === this.activeProfileSectionName) return
      this.$router.push({
        path: `/profile/edit/${_snakeCase(name)}`
      })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!this.isPristine) {
      this.$swal.fire({
        title: 'Apa kamu yakin?',
        text: 'Ada perubahan data yang belum kamu simpan di bagian ini',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Keluar',
        confirmButtonText: 'Ya, abaikan perubahan data'
      }).then(({ value }) => {
        if (value) {
          this.$refs.profileDetail.onCancel()
            .then(() => {
              this.$store.commit(`profile-detail/${PROFILE_DETAIL_IS_PRISTINE}`, true)
              next()
            })
        }
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  @apply mb-8;
}
</style>
