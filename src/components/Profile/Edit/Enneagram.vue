<template>
  <ValidationObserver tag="div" ref="validator">
    <div class="form-input-container">
      <FormInputFile name="document_enneagram"
                    title="Lampiran Hasil Enneagram (screenshot/file PDF)"
                    placeholder="Masukkan nomor kontak"
                    rules="required|mimes:image/*,.pdf"
                    :custom-messages="{required: 'Hasil enneagram harus dilampirkan', mimes: 'File harus dalam format JPEG/PNG/PDF'}"
                    v-model="mEnneagramData.doc">
        <template #subtitle>
          <p>Masuk ke <a v-bind="anchorProps">{{enneagramTestSiteURL}}</a>,<br>
          lalu screenshot atau unduh hasil test dan lampirkan file tersebut disini.
          </p>
        </template>
      </FormInputFile>
    </div>
    <div class="flex flex-row justify-end items-center">
      <button class="button bg-brand-green text-white"
              @click="onSave">
        Save
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
import { populateProfileDataFields, onDevelopmentAlert } from './utils'
import { PROFILE_DETAIL_TYPE } from '../../../api'
export default {
  components: {
    FormInputFile: () => import('@/components/Form/InputFile')
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      enneagramTestSiteURL: `https://www.eclecticenergies.com/enneagram/test`,

      hasSetRequiredFields: false,
      mEnneagramData: {}
    }
  },
  computed: {
    anchorProps () {
      return {
        href: this.enneagramTestSiteURL,
        target: '_blank',
        class: 'text-brand-blue hover:text-brand-blue-darkest'
      }
    }
  },
  methods: {
    onSave () {
      onDevelopmentAlert()
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function (obj) {
        if (!this.hasSetRequiredFields) {
          const { ENNEAGRAM } = PROFILE_DETAIL_TYPE
          this.mEnneagramData = populateProfileDataFields(ENNEAGRAM, obj[ENNEAGRAM])
          this.hasSetRequiredFields = true
        }
      }
    }
  }
}
</script>

<style>
</style>
