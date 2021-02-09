<template>
  <FormInput
    v-if="!showAsReadonlyLink"
    ref="formInputDocumentLink"
    type="text"
    :name="inputName"
    :title="inputTitle"
    placeholder="https://"
    :disabled="showAsReadonlyLink"
    :rules="{ required: true, regex: /^https?:\/\//}"
    :custom-messages="{
      required: 'Lampiran hasil kerja harus diisi',
      regex: 'Lampiran hasil kerja harus dalam bentuk URL yang valid'
    }"
    v-model="syncedValue"
  >
    <template #subtitle>
      <p class="text-gray-700">
        Jika file hasil kerja berbentuk <i>offline</i> ataupun <i>private</i>, silakan terlebih dahulu
        di <i>screenshot</i> hasil kerja lalu diupload ke
        <a class="underline text-brand-blue"
          :href="jdsGoogleDriveLink"
          target="_blank">
          <i>cloud storage JDS</i>
        </a>
        , dan simpan <i>link</i>-nya dibawah ini:
      </p>
    </template>
  </FormInput>
  <div v-else>
    <FormInputHeader
      :label-for="inputName"
      :title="inputTitle"
      :required="true"
    >
    </FormInputHeader>
    <div class="form-input-link__wrapper">
      <input
        readonly
        disabled
        class="form-input__input"
        :value="syncedValue || '-'"
      >
      <button
        :disabled="isEmptyURL"
        title="Kunjungi link"
        class="form-input-link__btn-open"
        @click="onVisitLink">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          width="100%" height="100%" viewBox="0 0 512 512">
          <g>
            <g>
              <path d="M488.727,0H302.545c-12.853,0-23.273,10.42-23.273,23.273c0,12.853,10.42,23.273,23.273,23.273h129.997L192.999,286.09
                c-9.087,9.087-9.087,23.823,0,32.912c4.543,4.543,10.499,6.816,16.455,6.816c5.956,0,11.913-2.273,16.455-6.817L465.455,79.458
                v129.997c0,12.853,10.42,23.273,23.273,23.273c12.853,0,23.273-10.42,23.273-23.273V23.273C512,10.42,501.58,0,488.727,0z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M395.636,232.727c-12.853,0-23.273,10.42-23.273,23.273v209.455H46.545V139.636H256c12.853,0,23.273-10.42,23.273-23.273
                S268.853,93.091,256,93.091H23.273C10.42,93.091,0,103.511,0,116.364v372.364C0,501.58,10.42,512,23.273,512h372.364
                c12.853,0,23.273-10.42,23.273-23.273V256C418.909,243.147,408.489,232.727,395.636,232.727z"/>
            </g>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import FormInput from '../Form/Input'
import FormInputHeader from '../Form/InputHeader'
export default {
  components: {
    FormInput,
    FormInputHeader
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    showAsReadonlyLink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const {
      VUE_APP_JDS_PUBLIC_DRIVE: jdsGoogleDriveLink
    } = process.env
    return {
      inputName: 'documentTask',
      inputTitle: 'Lampiran Link Hasil Kerja',
      jdsGoogleDriveLink
    }
  },
  computed: {
    syncedValue: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('change', newVal)
        this.$emit('update', newVal)
      }
    },
    isEmptyURL () {
      return typeof this.syncedValue !== 'string' || !this.syncedValue.length
    }
  },
  methods: {
    onVisitLink () {
      if (this.isEmptyURL) {
        return
      }
      window.open(this.syncedValue, '_blank')
    }
  }
}
</script>
