<template>
  <div class="messages">
    <div class="container mx-auto p-4">
      <DataLoader :promise="fetchUserData">
        <template #pending>
          <div class="max-w-xl mx-auto p-4 pt-8 rounded-lg bg-white shadow">
            <content-loader :speed="2"
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb">
              <rect x="0"
                    y="15"
                    rx="0"
                    ry="0"
                    width="100%"
                    height="15" />
              <rect x="0"
                    y="45"
                    rx="0"
                    ry="0"
                    width="100%"
                    height="75" />
            </content-loader>
          </div>
        </template>
        <template #error="{error}">
          <div>
            {{error}}
          </div>
        </template>
        <template #default>
          <div class="overflow-visible lg:overflow-hidden max-w-5xl mx-auto rounded-none lg:rounded-lg lg:shadow lg:flex lg:flex-row lg:justify-start lg:items-stretch">
            <ProfileSectionList :sections="profileSections"
                                :active="activeProfileSectionName"
                                class="rounded-lg lg:rounded-none border-r border-solid border-gray-200 bg-gray-100 shadow lg:shadow-none"
                                style="flex: 1 1 25%;"
                                @click="setActiveSection"/>
            <br class="lg:hidden">
            <ProfileSectionDetail :data="userData"
                                  :name="activeProfileSectionName"
                                  class="overflow-hidden rounded-lg lg:rounded-none bg-white shadow lg:shadow-none"
                                  style="flex: 1 1 60%;"/>
          </div>
        </template>
      </DataLoader>
    </div>
  </div>
</template>

<script>
import _startCase from 'lodash/startCase'
import _snakeCase from 'lodash/snakeCase'
import { mapState } from 'vuex'
import { formatDateTimeShort, formatDateLong } from '@/lib/date'
import { ContentLoader } from 'vue-content-loader'
import { db } from '@/lib/firebase'
import { PROFILE_DETAIL_IS_DIRTY } from '../store/mutation-types'
import DataLoader from '../components/DataLoader'

export default {
  middleware: 'auth',
  components: {
    DataLoader,
    ContentLoader,
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
      ],
      fetchUserData: null
    }
  },

  computed: {
    activeProfileSectionName () {
      return _startCase(this.$route.params.id || '')
    },
    ...mapState('auth', {
      id: state => state.user ? state.user.id : null
    }),
    ...mapState('profile-detail', {
      userData: state => state.item
    })
  },

  watch: {
    id: {
      immediate: true,
      handler: function (v) {
        this.fetchUserData = null
        if (v) {
          this.fetchUserData = this.$store.dispatch('profile-detail/fetchItem', {
            id: v
          })
        }
      }
    }
  },

  methods: {
    formatDateTimeShort,
    formatDateLong,
    setActiveSection (name) {
      if (name === this.activeProfileSectionName) return
      this.$router.push({
        path: `/profile/edit/${_snakeCase(name)}`
      })
    },
    async submit () {
      await db
        .collection('users')
        .doc(this.id)
        .update({
          job_title: this.job_title,
          phone: this.phone
        })

      await this.$router.push('/profile')
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (this.$store.state['profile-detail'].hasUnsavedChanges) {
      this.$swal.fire({
        title: 'Apa kamu yakin?',
        text: 'Ada perubahan data yang belum kamu simpan di bagian ini',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Keluar',
        confirmButtonText: 'Ya, abaikan perubahan data'
      }).then(({ value }) => {
        if (value) {
          this.$store.commit(`profile-detail/${PROFILE_DETAIL_IS_DIRTY}`, false)
          next()
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
