<template>
  <div>
    <FormInputHeader
      :label-for="name"
      :title="title"
      :subtitle="subtitle"
      :required="required"
    >
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #subtitle>
        <slot name="subtitle"></slot>
      </template>
    </FormInputHeader>
    <template v-if="mUrl">
      <EvidenceImagePreview
        :url="mUrl"
        :disabled="disabled"
        @delete="onDelete"
      />
    </template>
    <template v-else>
      <FileSelector
        :url="mUrl"
        v-bind="$props"
        @change="onSelectedFileChange"
      />
    </template>
  </div>
</template>

<script>
import { props, components } from './input-mixin'

export default {
  components: {
    ...components,
    EvidenceImagePreview: () => import('./EvidenceImagePreview'),
    FileSelector: () => import('./FileSelector')
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    ...props,
    path: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      mFile: null,
      mUrl: null,
      mBlob: null
    }
  },
  computed: {
    isSelectedFileChanged () {
      return this.mUrl && this.mUrl !== this.url
    }
  },
  watch: {
    url: {
      immediate: true,
      handler (v) {
        this.mUrl = v
      }
    }
  },
  methods: {
    onDelete () {
      this.mUrl = null
      this.mFile = null
    },
    onSelectedFileChange (url, file) {
      this.mUrl = url
      this.mFile = file
    },
    getSelectedFile () {
      return this.isSelectedFileChanged ? this.mFile : null
    }
  }
}
</script>

<style>
</style>
