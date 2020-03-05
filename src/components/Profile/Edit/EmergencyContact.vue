<template>
  <ValidationObserver tag="div" ref="validator">
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_name"
                  title="Nama Kontak Darurat"
                  placeholder="Masukkan nama kontak"
                  rules="required"
                  :custom-messages="{required: 'Nama kontak harus diisi'}"
                  v-model="mEmergencyContactData.name" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_relation"
                  title="Hubungan dengan Kontak Darurat"
                  subtitle="Contoh: suami, istri, atau kerabat"
                  placeholder="Masukkan hubungan dengan kontak darurat"
                  rules="required"
                  :custom-messages="{required: 'Hubungan dengan kontak darurat harus diisi'}"
                  v-model="mEmergencyContactData.relationship" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_number"
                  title="Nomor Kontak Darurat"
                  placeholder="Masukkan nomor kontak"
                  rules="required"
                  :custom-messages="{required: 'Nomor kontak harus diisi'}"
                  v-model="mEmergencyContactData.number" />
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
import { PROFILE_DETAIL_TYPE, populateProfileDataFields, validateAndSave } from './utils'

export default {
  components: {
    FormInput: () => import('@/components/Form/Input')
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hasSetRequiredFields: false,
      mEmergencyContactData: {}
    }
  },
  methods: {
    onSave () {
      return validateAndSave(this.$refs.validator, this.data.id, {
        [PROFILE_DETAIL_TYPE.EMERGENCY_CONTACT]: this.mEmergencyContactData
      }).then(() => {
        this.$emit('reload:profile')
      })
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function (obj) {
        if (!this.hasSetRequiredFields) {
          const { EMERGENCY_CONTACT } = PROFILE_DETAIL_TYPE
          this.mEmergencyContactData = populateProfileDataFields(EMERGENCY_CONTACT, obj[EMERGENCY_CONTACT])
          this.hasSetRequiredFields = true
        }
      }
    }
  }
}
</script>

<style>
</style>
