<template>
  <ValidationObserver tag="div" ref="validator">
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_name"
                  title="Nama Bank"
                  placeholder="Masukkan nama bank"
                  rules="required"
                  :custom-messages="{required: 'Nama bank harus diisi'}"
                  v-model="mBankAccountData.bank_name" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_branch"
                  title="Cabang"
                  placeholder="Masukkan nama kantor cabang bank"
                  rules="required"
                  :custom-messages="{required: 'Nama cabang harus diisi'}"
                  v-model="mBankAccountData.bank_branch" />
    </div>
    <div class="form-input-container">
      <FormInput type="number"
                  name="bank_account_number"
                  title="Nomor Rekening"
                  placeholder="Masukkan nomor rekening"
                  rules="required|numeric"
                  :custom-messages="{required: 'Nomor rekening harus diisi', numeric: 'Nomor rekening hanya terdiri dari angka'}"
                  v-model="mBankAccountData.account_number" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="bank_account_holder"
                  title="Nama Pemilik Rekening"
                  subtitle="Sesuai buku tabungan"
                  placeholder="Masukkan nama pemilik rekening"
                  rules="required"
                  :custom-messages="{required: 'Nama pemilik rekening harus diisi'}"
                  v-model="mBankAccountData.account_holder" />
    </div>
    <div class="flex flex-row justify-end items-center">
      <button class="button bg-brand-green text-white"
              :disabled="$attrs.unsaved"
              @click="onSave">
        Save
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
import { PROFILE_DETAIL_TYPE, populateProfileDataFields, watchDataChanges, validateAndSave } from './utils'

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
      mBankAccountData: {}
    }
  },
  created () {
    watchDataChanges(
      this,
      this.data,
      {
        [PROFILE_DETAIL_TYPE.BANK_ACCOUNT]: this.mBankAccountData
      }
    )
  },
  methods: {
    onSave () {
      return validateAndSave(this.$refs.validator, this.data.id, {
        [PROFILE_DETAIL_TYPE.BANK_ACCOUNT]: this.mBankAccountData
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
          const { BANK_ACCOUNT } = PROFILE_DETAIL_TYPE
          this.mBankAccountData = populateProfileDataFields(BANK_ACCOUNT, obj[BANK_ACCOUNT])
          this.hasSetRequiredFields = true
        }
      }
    }
  }
}
</script>

<style>
</style>
