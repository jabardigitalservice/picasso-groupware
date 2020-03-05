<template>
  <ValidationObserver tag="div">
    <div class="form-input-container">
      <FormSelect name="has_previous_job"
                  title="Pernah bekerja sebelumnya?"
                  :options="['Ya', 'Tidak']"
                  rules="required"
                  prompt="Pilih salah satu opsi di bawah ini"
                  :custom-messages="{required: 'Informasi ini harus diisi'}"
                  v-model="mPreviousJobData.has_previous_job" />
    </div>
    <transition name="slide-y-fade-transition">
      <div v-if="mPreviousJobData.has_previous_job === 'Ya'">
        <div class="form-input-container">
          <FormInput :required="false"
                      type="text"
                      name="latest_job_company"
                      title="Nama Perusahaan Terakhir"
                      placeholder="Masukkan nama perusahaan tempat terakhir bekerja"
                      v-model="mPreviousJobData.company" />
        </div>
        <div class="form-input-container">
          <FormInput :required="false"
                      type="text"
                      name="latest_job_position"
                      title="Posisi di Perusahaan Terakhir"
                      placeholder="Masukkan nama posisi"
                      v-model="mPreviousJobData.position" />
        </div>
        <div class="form-input-container">
          <FormInput :required="false"
                      type="text"
                      name="latest_job_length"
                      title="Lama Bekerja di Perusahaan Terakhir"
                      subtitle="Contoh: X tahun Y bulan atau Z bulan"
                      placeholder="0 tahun 0 bulan"
                      v-model="mPreviousJobData.length" />
        </div>
        <div class="form-input-container">
          <FormInput :required="false"
                      type="number"
                      name="latest_job_salary"
                      title="Gaji di Perusahaan Terakhir"
                      placeholder="Masukkan gaji di perusahaan terakhir"
                      v-model="mPreviousJobData.salary" />
        </div>
      </div>
    </transition>
    <div class="flex flex-row justify-end items-center">
      <button class="button bg-brand-green text-white"
              @click="onSave">
        Save
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
import { PROFILE_DETAIL_TYPE } from '../../../api'
import { populateProfileDataFields } from './utils'

export default {
  components: {
    FormInput: () => import('@/components/Form/Input'),
    FormSelect: () => import('@/components/Form/Select')
  },
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      mPreviousJobData: {},

      hasSetRequiredFields: false
    }
  },
  methods: {
    onSave () {}
  },
  watch: {
    data: {
      immediate: true,
      handler: function (obj) {
        if (!this.hasSetRequiredFields) {
          const { PREVIOUS_JOB } = PROFILE_DETAIL_TYPE
          this.mPreviousJobData = populateProfileDataFields(PREVIOUS_JOB, obj[PREVIOUS_JOB])
          this.hasSetRequiredFields = true
        }
      }
    }
  }
}
</script>

<style>
</style>
