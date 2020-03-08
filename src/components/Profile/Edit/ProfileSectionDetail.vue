<template>
  <div>
    <DataLoader :promise="promisedUserData">
      <template #pending>
        <div class="w-full h-full flex justify-center items-center">
          <i class="app-logo is-rounded is-beating"></i>
        </div>
      </template>
      <template #error="{error}">
        <div class="w-full h-full flex flex-col justify-center items-center">
          <h5 class="text-2xl text-gray-500 font-bold">Oops! Terjadi Kesalahan</h5>
          <p class="text-red-500">
            <code>
              {{error}}
            </code>
          </p>
        </div>
      </template>
      <template #default>
        <div>
          <h3 class="px-4 py-8 md:px-8 font-bold text-2xl text-white bg-brand-blue">
            <transition name="slide-y-fade-transition"
                        mode="out-in">
              <span :key="name" :class="['profile-section-detail__title', !isPristine && 'has-unsaved-changes']">
                {{name}}
              </span>
            </transition>
          </h3>
          <ValidationObserver tag="div" class="px-4 py-8 md:px-8" #default="{validate}">
            <transition name="slide-y-fade-transition"
                      mode="out-in">
              <component ref="profileData"
                        :key="existingData.updated_at ? existingData.updated_at.seconds : existingData.created_at.seconds"
                        :is="sectionComponent"
                        :data="editedData"
                        @change:data="onDataChanged"/>
            </transition>
            <div  v-if="sectionComponent"
                  class="flex flex-row justify-end items-center">
              <button class="button bg-brand-green text-white mr-4"
                      :disabled="isPristine"
                      @click="onSave(validate)">
                Simpan
              </button>
                <button class="button bg-gray-500 text-white"
                      :disabled="isPristine"
                      @click="onCancel">
                Batal
              </button>
            </div>
          </ValidationObserver>
        </div>
      </template>
    </DataLoader>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _set from 'lodash/set'
import _unset from 'lodash/unset'
import _debounce from 'lodash/debounce'
import _isMatch from 'lodash/isMatch'

import DataLoader from '../../DataLoader'

import { upsertUserDocument, deleteUserDocument, upsertUserProfileDetail } from '../../../api'
import { PROFILE_DETAIL_IS_PRISTINE } from '../../../store/mutation-types'
import { DOCUMENT_NAMESPACE, invalidDataAlert, savingAlert, successAlert, errorAlert } from './utils'

export default {
  components: {
    DataLoader
  },
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      promisedUserData: null,
      existingData: {},
      editedData: {}
    }
  },
  computed: {
    sectionComponent () {
      if (this.name) {
        return () => import(`./${this.name.replace(' ', '')}.vue`)
      }
      return null
    },
    userId () {
      const { user } = this.$store.state.auth
      return user ? user.id : null
    },
    isPristine: {
      get () {
        return this.$store.state['profile-detail'].isPristine
      },
      set (truthy) {
        this.$store.commit(`profile-detail/${PROFILE_DETAIL_IS_PRISTINE}`, !!truthy)
      }
    }
  },
  methods: {
    async loadUserData () {
      this.promisedUserData = null
      if (this.userId) {
        this.promisedUserData = new Promise((resolve, reject) => {
          this.$store.dispatch('profile-detail/fetchItem', {
            id: this.userId
          }).then(data => {
            this.existingData = data
            this.editedData = _cloneDeep(data)
            setTimeout(() => {
              resolve()
            }, 2000)
          })
        })
      }
      return this.promisedUserData
    },
    onDataChanged (editedData) {
      this.editedData = editedData
    },
    async onSave (validateFn) {
      try {
        const isValid = await validateFn()
        if (!isValid) {
          return invalidDataAlert()
        } else {
          savingAlert()
          await this.handleFiles()
          await this.handleData()
          await this.$store.dispatch('profile-detail/fetchItem', {
            id: this.existingData.id,
            fresh: true,
            silent: true
          })
          this.isPristine = true
          return successAlert()
        }
      } catch (e) {
        return errorAlert(e)
      }
    },
    async handleFiles () {
      const namespaces = Object.entries(DOCUMENT_NAMESPACE)
      try {
        // eslint-disable-next-line
        for (let [documentType, ns] of namespaces) {
          const savedURL = _get(this.existingData, ns.url)
          const newURL = _get(this.editedData, ns.url)
          const newFile = _get(this.editedData, ns.file)

          if (savedURL === newURL) {
            continue
          } else if (savedURL && !newURL) {
            await deleteUserDocument(savedURL)
          } else if (newFile) {
            await upsertUserDocument(this.editedData.id, documentType, newFile)
              .then(url => {
                _unset(this.editedData, ns.file)
                _set(this.editedData, ns.url, url)
              })
          }
        }
        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async handleData () {
      return upsertUserProfileDetail(this.editedData.id, this.editedData)
    },
    async onCancel () {
      this.editedData = _cloneDeep(this.existingData)
      return this.$nextTick()
    }
  },
  watch: {
    userId: {
      immediate: true,
      handler: 'loadUserData'
    },
    editedData: {
      immediate: true,
      deep: true,
      handler: _debounce(function (editedData) {
        this.isPristine = _isMatch(this.existingData, editedData)
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-section-detail__title {
  @apply relative;
  &::after {
    content: '';
    transform: scale(0);
    transform-origin: center;
    left: calc(100% + #{0.5rem});
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    @apply block absolute top-0 w-4 h-4 rounded-full bg-yellow-400;
  }
}
.has-unsaved-changes {
  &::after {
    transform: scale(1);
  }
}
</style>
