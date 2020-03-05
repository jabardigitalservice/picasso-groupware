<template>
  <ValidationObserver tag="div">
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_name"
                  title="Nama Bank"
                  placeholder="Masukkan nama bank"
                  rules="required"
                  :custom-messages="{required: 'Nama bank harus diisi'}"
                  v-model="mData.bank_account_name" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_branch"
                  title="Cabang"
                  placeholder="Masukkan nama kantor cabang bank"
                  rules="required"
                  :custom-messages="{required: 'Nama cabang harus diisi'}"
                  v-model="mData.bank_account_branch" />
    </div>
    <div class="form-input-container">
      <FormInput type="number"
                  name="bank_account_number"
                  title="Nomor Rekening"
                  placeholder="Masukkan nomor rekening"
                  rules="required|numeric"
                  :custom-messages="{required: 'Nomor rekening harus diisi', numeric: 'Nomor rekening hanya terdiri dari angka'}"
                  v-model="mData.bank_account_number" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_holder"
                  title="Nama Pemilik Rekening"
                  subtitle="Sesuai buku tabungan"
                  placeholder="Masukkan nama pemilik rekening"
                  rules="required"
                  :custom-messages="{required: 'Nama pemilik rekening harus diisi'}"
                  v-model="mData.bank_account_holder" />
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
