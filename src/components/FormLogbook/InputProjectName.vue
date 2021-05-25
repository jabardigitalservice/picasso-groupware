<template>
  <FormInputAutocomplete
    name="projectId"
    title="Nama Project"
    type="text"
    :disabled="disabled"
    rules="required"
    :custom-messages="{
      required: 'Nama project harus diisi'
    }"
    :value="value"
    :search-callback="onSearch"
    @change="$emit('change', $event)"
  >
    <template
      v-if="!disabled"
      #subtitle
    >
      <p>
        <i aria-hidden="true" class="text-gray-600">
          Nama project Anda tidak ada? Kontak admin via
        </i>
        <a
          class="cursor-pointer hover:underline"
          :href="adminWhatsappBacklink"
          target="_blank"
        >
          <strong class="text-green-500">Whatsapp</strong>
        </a>
      </p>
    </template>
  </FormInputAutocomplete>
</template>

<script>
import { props } from '../Form/input-mixin'
export default {
  components: {
    FormInputAutocomplete: () => import('../Form/InputAutocomplete')
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...props,
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    const {
      VUE_APP_ADMIN_WHATSAPP_NUMBER: adminWhatsappNumber
    } = process.env
    const adminWhatsappBacklink = `https://api.whatsapp.com/send?phone=${adminWhatsappNumber}&text=Usulan nama project/product anda`
    return {
      adminWhatsappBacklink
    }
  },
  methods: {
    onSearch (str) {
      return this.$store
        .getters['organizations/listOfProjects']
        .filter(x => {
          return `${x.name}`.toLowerCase().includes(str.toLowerCase())
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input-project__results {
  max-height: 50vh;
  @apply absolute z-10 left-0 right-0
  overflow-x-hidden overflow-y-scroll
  p-4
  border border-solid border-gray-400
  bg-white
  rounded
  shadow-lg;
}

.form-input-project__result-item {
  @apply cursor-pointer p-2
  text-sm;

  & + & {
    @apply mt-2;
  }
}
</style>

<style lang="scss">

@keyframes is-rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(320deg);
  }
}
.fa-circle-notch {
  animation: is-rotating 1s infinite linear;
}
</style>
