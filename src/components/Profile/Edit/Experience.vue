<template>
  <ValidationObserver tag="div"
                      >
    <div class="form-input-container">
      <FormInput type="text"
                  name="latest_job_company"
                  title="Nama Perusahaan Terakhir"
                  placeholder="Masukkan nama perusahaan tempat terakhir bekerja"
                  rules="required"
                  :custom-messages="{required: 'Nama perusahaan harus diisi'}"
                  v-model="mData.latest_job_company" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="latest_job_position"
                  title="Posisi Terakhir"
                  placeholder="Masukkan nama posisi"
                  rules="required"
                  :custom-messages="{required: 'Nama posisi harus diisi'}"
                  v-model="mData.latest_job_position" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="latest_job_length"
                  title="Lama Bekerja di Perusahaan Terakhir"
                  subtitle="Contoh: X tahun Y bulan atau Z bulan"
                  placeholder="0 tahun 0 bulan"
                  rules="required"
                  :custom-messages="{required: 'Kolom ini harus diisi'}"
                  v-model="mData.latest_job_length" />
    </div>
    <div class="form-input-container">
      <FormInput type="number"
                  name="latest_job_salary"
                  title="Gaji Terakhir"
                  placeholder="Masukkan gaji terakhir"
                  rules="required"
                  :custom-messages="{required: 'Gaji terakhir harus diisi'}"
                  v-model="mData.latest_job_salary" />
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
