<template>
  <div class="messages">
    <div class="container mx-auto py-8 md:px-4">
      <div class="overflow-visible lg:overflow-hidden max-w-5xl mx-auto rounded-none lg:rounded-lg lg:shadow lg:flex lg:flex-row lg:justify-start lg:items-stretch">
        <ProfileSectionList @hook:mounted="keepSectionListRef"
                            ref="sectionList"
                            :sections="profileSections"
                            :active="activeProfileSectionName"
                            class="rounded-none sm:rounded-lg lg:rounded-none border-r border-solid border-gray-200 bg-gray-100 shadow lg:shadow-none"
                            style="flex: 1 1 25%;"
                            @click="setActiveSection"/>
        <br class="lg:hidden">
        <ProfileSectionDetail ref="profileDetail"
                              :name="activeProfileSectionName"
                              class="overflow-hidden rounded-none sm:rounded-lg lg:rounded-none bg-white shadow lg:shadow-none"
                              style="flex: 1 1 60%;"/>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import _throttle from 'lodash/throttle'
import _startCase from 'lodash/startCase'
import _snakeCase from 'lodash/snakeCase'
import { mapState } from 'vuex'
import { PROFILE_DETAIL_IS_PRISTINE } from '../store/mutation-types'

export default {
  middleware: 'check-auth',
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
      ],
      sectionListEl: null,
      sectionListElOffsetTop: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.removeEventListener('resize', this.onWindowResize)
      window.removeEventListener('scroll', this.onWindowScroll)
      setTimeout(() => {
        window.addEventListener('resize', this.onWindowResize)
        this.onWindowResize()
      }, 50)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('scroll', this.onWindowScroll)
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
    keepSectionListRef () {
      const { $el } = this.$refs.sectionList
      this.sectionListEl = $el
      this.sectionListElOffsetTop = $el.offsetTop
      $el.style.setProperty('will-change', 'transform')
    },
    stickifySectionList () {
      window.removeEventListener('scroll', this.onWindowScroll)
      setTimeout(() => {
        window.addEventListener('scroll', this.onWindowScroll)
        this.onWindowScroll()
      }, 50)
    },
    unstickifySectionList () {
      window.removeEventListener('scroll', this.onWindowScroll)
      window.requestAnimationFrame(() => {
        this.sectionListEl.style.setProperty(`transform`, `translateY(0px)`)
      })
    },
    onWindowScroll: _throttle(function () {
      if (!this.sectionListEl) return
      if (window.scrollY > this.sectionListElOffsetTop) {
        const y = Math.abs(window.scrollY - this.sectionListElOffsetTop)
        window.requestAnimationFrame(() => {
          this.sectionListEl.style.setProperty(`transform`, `translateY(${y}px)`)
        })
      } else {
        window.requestAnimationFrame(() => {
          this.sectionListEl.style.setProperty(`transform`, `translateY(0px)`)
        })
      }
    }, Math.ceil(1000 / 144), { leading: true, trailing: false }),
    onWindowResize: _debounce(function () {
      const { innerWidth } = window
      if (innerWidth >= 1024) {
        this.stickifySectionList()
      } else {
        this.unstickifySectionList()
      }
    }, Math.ceil(1000 / 144)),
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
