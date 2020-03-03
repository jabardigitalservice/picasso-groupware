<template>
  <ValidationObserver tag="div">
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_name"
                  title="Nama Kontak Darurat"
                  placeholder="Masukkan nama kontak"
                  rules="required"
                  :custom-messages="{required: 'Nama kontak harus diisi'}"
                  v-model="mData.emergency_contact_name" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_relation"
                  title="Hubungan dengan Kontak Darurat"
                  subtitle="Contoh: suami, istri, atau kerabat"
                  placeholder="Masukkan hubungan dengan kontak darurat"
                  rules="required"
                  :custom-messages="{required: 'Hubungan dengan kontak darurat harus diisi'}"
                  v-model="mData.emergency_contact_relation" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="emergency_contact_number"
                  title="Nomor Kontak Darurat"
                  placeholder="Masukkan nomor kontak"
                  rules="required"
                  :custom-messages="{required: 'Nomor kontak harus diisi'}"
                  v-model="mData.emergency_contact_number" />
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
    FormInput: () => import('@/components/Form/Input')
  },
  methods: {
    onSave () {}
  }
}
</script>

<style>
</style>
