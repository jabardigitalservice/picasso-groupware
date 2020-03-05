<template>
  <ValidationObserver tag="div">
    <div class="form-input-container">
      <FormInputFile name="document_enneagram"
                    title="Lampiran Hasil Enneagram (screenshot/file PDF)"
                    placeholder="Masukkan nomor kontak"
                    rules="required|mimes:image/*,.pdf"
                    :custom-messages="{required: 'Hasil enneagram harus dilampirkan', mimes: 'File harus dalam format JPEG/PNG/PDF'}"
                    v-model="mData.document_enneagram">
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
import editMixin from './edit-mixin'

export default {
  mixins: [editMixin],
  components: {
    FormInputFile: () => import('@/components/Form/InputFile')
  },
  data () {
    return {
      enneagramTestSiteURL: `https://www.eclecticenergies.com/enneagram/test`
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
    onSave () {}
  }
}
</script>

<style>
</style>
