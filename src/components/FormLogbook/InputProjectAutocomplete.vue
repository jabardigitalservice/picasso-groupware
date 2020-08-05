<template>
  <ValidationProvider
    :rules="rules"
    :custom-messages="customMessages"
    #default="{failed, errors}"
    tag="div"
  >
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
    <div class="relative">
      <input
        ref="input"
        :type="type"
        :name="name"
        :value="mValue"
        :disabled="disabled"
        :class="{'form-input__input': true, 'is-invalid': failed}"
        v-bind="$attrs"
        @input="onInput"
      >
      <div v-if="showResultsPopover" class="form-input-project__results">
        <ul>
          <template v-if="isSearching">
            <li key="isSearching" class="form-input-project__result-item text-center">
              <i class="fa fa-2x fa-circle-notch text-gray-300" />
            </li>
          </template>
          <template v-else-if="results && results.length">
            <li
              v-for="(r, index) in results"
              :key="index" class="form-input-project__result-item hover:bg-gray-200"
              @click.capture="onSelect(r)">
              <a href="javascript:void(0)">
                {{ r.name }}
              </a>
            </li>
          </template>
          <template v-else-if="!results.length">
            <li key="nodata" class="form-input-project__result-item text-center">
              <a class="text-gray-400 font-bold uppercase">
                Tidak ada data
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <p v-if="errors.length"
       class="form-input__error-hint">
      <slot name="error">
        {{errors[0]}}
      </slot>
    </p>
  </ValidationProvider>
</template>

<script>
import { props, components } from '../Form/input-mixin'
import debounce from 'lodash/debounce'

export default {
  components: {
    ...components
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    ...props,
    type: {
      type: [String],
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      mValue: null,
      results: null,
      isSearching: false,
      showResultsPopover: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.mValue = v
      }
    }
  },
  methods: {
    onInput (e) {
      this.showResultsPopover = true
      this.isSearching = true
      this.mValue = e.target.value
      if (!this.mValue) {
        this.isSearching = false
        this.results = null
        this.showResultsPopover = false
      } else {
        this.onSearch()
      }
    },
    onSearch: debounce(function () {
      this.results = this.$store.getters['organizations/listOfProjects']
        .filter(x => {
          return `${x.name}`.toLowerCase().includes(`${this.mValue}`.toLowerCase())
        })
      this.isSearching = false
    }, 600),
    onSelect (project) {
      this.showResultsPopover = false
      this.$emit('change', project)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input-project__results {
  @apply absolute z-10 left-0 right-0
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
