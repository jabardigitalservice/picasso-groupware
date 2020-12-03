<template>
  <div class="form-input__file-preview">
    <figcaption class="mr-4">
      <img v-if="isImage && url"
           :src="url"
           class="form-input__file-preview__image"
           @click.prevent="onPreviewDocument">
      <a v-else
         class="form-input__file-preview__icon"
         title="Lihat Dokumen"
         @click.prevent="onPreviewDocument">
        {{mFileExtension}}
      </a>
    </figcaption>
    <div class="mt-4 md:mt-0 self-stretch md:flex-auto flex flex-col justify-between">
      <ul>
        <ValidationProvider v-if="renameable"
                            tag="li"
                            ref="validator"
                            rules="required"
                            :custom-messages="{required: 'Nama file harus diisi'}"
                            #default="{errors}">
          <label class="inline-block align-middle text-gray-700">
            Nama File
            <i class="relative fa fa-pen float-right ml-2 text-gray-400" style="transform: translateY(2px);"></i>
          </label>
          <div class="mb-2 relative flex flex-row justify-start items-stretch border-b border-solid border-brand-blue">
              <input  class="block flex-auto text-gray-700 font-bold"
                      style="min-width: 0;"
                      type="text"
                      :value="mName"
                      :disabled="disabled"
                      :readonly="disabled"
                      @input="onNameChanged">
            <span class="flex-none block w-24 px-2 py-1 text-gray-600 bg-gray-200 text-center rounded-tr rounded-br">
              <code>{{mFileExtension}}</code>
            </span>
          </div>
          <p  v-if="errors.length"
              class="form-input__error-hint mb-4">
            <slot name="error">
              {{errors[0]}}
            </slot>
          </p>
        </ValidationProvider>
        <li v-for="(value, key) in metadata" :key="key">
          <label class="inline-block w-16 text-gray-700">
            {{key}}
          </label>
          <p class="block mb-2 text-gray-700 font-bold">
            {{value}}
          </p>
        </li>
      </ul>
      <p v-if="!disabled" class="mt-2 inline-block self-end text-sm">
        <button class="w-auto py-2 px-4 mr-4 rounded border border-solid border-blue-500 text-blue-500 hover:opacity-50 hover:bg-blue-100"
                @click="$emit('view')">
          Tampilkan
        </button>
        <button class="w-24 py-2 px-4 rounded border border-solid border-red-600 text-red-500 hover:opacity-50 hover:bg-red-100"
                @click="$emit('delete')">
          Hapus
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { isMimeTypeImage } from '../Profile/Edit/utils'
import { saveAs } from 'file-saver'

export default {
  props: {
    file: {
      type: File
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    renameable: {
      type: Boolean,
      default: true
    },
    downloadOnClick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mName: '',
      mFileExtension: ''
    }
  },
  computed: {
    isImage () {
      return isMimeTypeImage(this.type)
    },
    metadata () {
      return {
        Ukuran: Math.ceil(this.size / 1000) + ' KB',
        Tipe: this.type
      }
    }
  },
  methods: {
    onNameChanged (e) {
      this.mName = e.target.value
      const str = e.target.value + this.mFileExtension
      this.$emit('update:name', str)
    },
    onPreviewDocument (e) {
      if (this.downloadOnClick && this.file) {
        saveAs(this.file, this.name)
        return
      }
      window.open(this.url, '_blank')
    }
  },
  watch: {
    name: {
      immediate: true,
      handler: function (v) {
        if (typeof v === 'string') {
          this.mName = v.substring(0, v.lastIndexOf('.'))
          this.mFileExtension = v.substring(v.lastIndexOf('.'))
        } else {
          this.mName = ''
          this.mFileExtension = ''
        }
      }
    }
  }
}
</script>
