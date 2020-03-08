<template>
  <ValidationObserver tag="fieldset" ref="validator">
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_name"
                  title="Nama Kontak Darurat"
                  placeholder="Masukkan nama kontak"
                  rules="required"
                  :custom-messages="{required: 'Nama kontak harus diisi'}"
                  v-model="mData.emergency_contact.name" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_relation"
                  title="Hubungan dengan Kontak Darurat"
                  subtitle="Contoh: suami, istri, atau kerabat"
                  placeholder="Masukkan hubungan dengan kontak darurat"
                  rules="required"
                  :custom-messages="{required: 'Hubungan dengan kontak darurat harus diisi'}"
                  v-model="mData.emergency_contact.relationship" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_number"
                  title="Nomor Kontak Darurat"
                  placeholder="Masukkan nomor kontak"
                  rules="required"
                  :custom-messages="{required: 'Nomor kontak harus diisi'}"
                  v-model="mData.emergency_contact.number" />
    </div>
  </ValidationObserver>
</template>

<script>
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
  computed: {
    mData: {
      get () {
        return this.data
      },
      set (obj) {
        this.$emit('change:data', obj)
      }
    }
  }
}
</script>

<style>
</style>
