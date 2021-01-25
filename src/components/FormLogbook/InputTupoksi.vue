<template>
  <ValidationProvider
    rules="required"
    :custom-messages="{
      required: 'Uraian tugas harus diisi'
    }"
    #default="{errors}"
    tag="div"
  >
    <FormInputHeader
      :label-for="name"
      :title="inputTitle"
      :required="isRequired"
    />
    <FormInputRadioGroup
      :name="name"
      :options="listOfTupoksi"
      value-key="id"
      label-key="name_tupoksi"
      :value="inputValue"
      :show-as-readonly-input="showAsReadonlyInput"
      @change="onValueChanged"
    >
    </FormInputRadioGroup>
    <p v-if="errors.length"
       class="form-input__error-hint">
      <slot name="error">
        {{errors[0]}}
      </slot>
    </p>
  </ValidationProvider>
</template>

<script>
import { mapState } from 'vuex'
import FormInputHeader from '../Form//InputHeader'
import FormInputRadioGroup from '../Form/RadioGroup.vue'
export default {
  components: {
    FormInputHeader,
    FormInputRadioGroup
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    showAsReadonlyInput: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isRequired: true,
      inputTitle: 'Uraian Tugas',
      inputValue: null
    }
  },
  computed: {
    ...mapState('organizations', [
      'listOfTupoksi'
    ])
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.inputValue = newVal
        }
      }
    }
  },
  created () {
    this.$store.dispatch('organizations/fetchListOfTupoksi')
  },
  methods: {
    onValueChanged (newVal) {
      this.$emit('change', newVal)
    }
  }
}
</script>
