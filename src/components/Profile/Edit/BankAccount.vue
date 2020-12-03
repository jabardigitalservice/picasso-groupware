<template>
  <ValidationObserver tag="fieldset" ref="validator">
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_name"
                  title="Nama Bank"
                  placeholder="Masukkan nama bank"
                  rules="required"
                  :custom-messages="{required: 'Nama bank harus diisi'}"
                  v-model="mData.bank_account.bank_name" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_branch"
                  title="Cabang"
                  placeholder="Masukkan nama kantor cabang bank"
                  rules="required"
                  :custom-messages="{required: 'Nama cabang harus diisi'}"
                  v-model="mData.bank_account.bank_branch" />
    </div>
    <div class="form-input-container">
      <FormInput type="number"
                  name="bank_account_number"
                  title="Nomor Rekening"
                  placeholder="Masukkan nomor rekening"
                  rules="required|numeric"
                  :custom-messages="{required: 'Nomor rekening harus diisi', numeric: 'Nomor rekening hanya terdiri dari angka'}"
                  v-model="mData.bank_account.account_number" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_holder"
                  title="Nama Pemilik Rekening"
                  subtitle="Sesuai buku tabungan"
                  placeholder="Masukkan nama pemilik rekening"
                  rules="required"
                  :custom-messages="{required: 'Nama pemilik rekening harus diisi'}"
                  v-model="mData.bank_account.account_holder" />
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
