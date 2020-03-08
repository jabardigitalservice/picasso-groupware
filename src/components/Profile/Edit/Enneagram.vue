<template>
  <ValidationObserver tag="fieldset" ref="validator">
    <div class="form-input-container">
      <FormInputFile name="document_enneagram"
                    title="Lampiran Hasil Enneagram (screenshot/file PDF)"
                    placeholder="Masukkan nomor kontak"
                    rules="required|mimes:image/*,.pdf"
                    :custom-messages="{required: 'Hasil enneagram harus dilampirkan', mimes: 'File harus dalam format JPEG/PNG/PDF'}"
                    :value.sync="mData.enneagram.document_url"
                    :filename.sync="mData.enneagram.document_name"
                    :file.sync="mData.enneagram.document_blob">
        <template #subtitle>
          <p>Masuk ke <a v-bind="anchorProps">{{enneagramTestSiteURL}}</a>,<br>
          lalu screenshot atau unduh hasil test dan lampirkan file tersebut disini.
          </p>
        </template>
      </FormInputFile>
    </div>
  </ValidationObserver>
</template>

<script>
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
      enneagramTestSiteURL: `https://www.eclecticenergies.com/enneagram/test`
    }
  },
  computed: {
    mData: {
      get () {
        return this.data
      },
      set (obj) {
        this.$emit('change:data', obj)
      }
    },
    anchorProps () {
      return {
        href: this.enneagramTestSiteURL,
        target: '_blank',
        class: 'text-brand-blue hover:text-brand-blue-darkest'
      }
    }
  }
}
</script>

<style>
</style>
