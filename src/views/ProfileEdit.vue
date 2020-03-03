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
          <div class="lg:flex lg:flex-row lg:justify-start lg:items-start">
            <div class="rounded-lg bg-white shadow"
                style="flex: 1 1 30%;">
              <ProfileSectionList :sections="profileSections.map(x => x.name)"
                                  :active="activeProfileSectionName"
                                  @click="setActiveSection"/>
            </div>
            <i class="inline-block h-6" style="flex: 0 0 1.5rem;"></i>
            <transition name="slide-y-fade-transition" mode="out-in">
              <div class="p-8 rounded-lg bg-white shadow"
                  style="flex: 1 1 60%;"
                  :key="activeProfileSectionName">
                <h3 class="mb-8 md:p-4 font-black text-2xl md:text-4xl text-brand-green text-center tracking-tight">
                  {{activeProfileSectionName}}
                </h3>
                <component :is="sectionComponent"
                            :data="userData"
                            class="md:p-4"/>
              </div>
            </transition>
          </div>
        </template>
      </DataLoader>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatDateTimeShort, formatDateLong } from '@/lib/date'
import { ContentLoader } from 'vue-content-loader'
import { db } from '@/lib/firebase'
import DataLoader from '../components/DataLoader'

export default {
  middleware: 'auth',
  components: {
    DataLoader,
    ContentLoader,
    EditPersonal: () => import('../components/Profile/Edit/Personal'),
    EditEducation: () => import('../components/Profile/Edit/Education'),
    EditExperience: () => import('../components/Profile/Edit/Experience'),
    EditBankAccount: () => import('../components/Profile/Edit/BankAccount'),
    EditEmergencyContact: () => import('../components/Profile/Edit/EmergencyContact'),
    EditEnneagram: () => import('../components/Profile/Edit/Enneagram'),
    ProfileSectionList: () => import('../components/Profile/Edit/ProfileSectionList')
  },

  metaInfo: {
    title: 'My Profile'
  },

  data () {
    return {
      profileSections: [
        {
          name: 'Personal',
          component: () => import('../components/Profile/Edit/Personal')
        },
        {
          name: 'Education',
          component: () => import('../components/Profile/Edit/Education')
        },
        {
          name: 'Experience',
          component: () => import('../components/Profile/Edit/Experience')
        },
        {
          name: 'Bank Account',
          component: () => import('../components/Profile/Edit/BankAccount')
        },
        {
          name: 'Emergency Contact',
          component: () => import('../components/Profile/Edit/EmergencyContact')
        },
        {
          name: 'Enneagram',
          component: () => import('../components/Profile/Edit/Enneagram')
        }
      ],
      activeProfileSectionName: 'Personal',
      fetchUserData: null,
      userData: {}
    }
  },

  computed: {
    ...mapState('auth', {
      id: state => state.user ? state.user.id : null
    }),
    sectionComponent () {
      if (this.activeProfileSectionName) {
        const { component } = this.profileSections.find(x => x.name === this.activeProfileSectionName) || {}
        return component
      }
      return null
    }
  },

  watch: {
    id: {
      immediate: true,
      handler: function (v) {
        this.fetchUserData = null
        if (v) {
          this.fetchUserData = this.$store.dispatch('profile-detail/fetchItem')
            .then(userData => {
              this.userData = userData ? JSON.parse(JSON.stringify(userData)) : {}
              return userData
            })
        }
      }
    }
  },

  methods: {
    formatDateTimeShort,
    formatDateLong,
    setActiveSection (name) {
      this.activeProfileSectionName = name
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
  }
}
</script>

<style lang="scss" scoped>
hr {
  @apply mb-8;
}
</style>
