<template>
  <ValidationObserver tag="div" ref="validator">
    <div class="form-input-container">
      <FormSelect name="has_previous_job"
                  title="Pernah bekerja sebelumnya?"
                  :options="['Ya', 'Tidak']"
                  rules="required"
                  prompt="Pilih salah satu opsi di bawah ini"
                  :custom-messages="{required: 'Informasi ini harus diisi'}"
                  :value="mPreviousJobData.has_previous_job"
                  @change="onChangePreviousJobStatus"/>
    </div>
    <transition name="slide-y-fade-transition">
      <div v-if="mPreviousJobData.has_previous_job === 'Ya'">
        <div class="form-input-container">
          <FormInput :required="isPreviousJobExist"
                      :rules="requiredIfPreviousJobExist"
                      :custom-messages="{required: 'Nama perusahaan harus diisi'}"
                      type="text"
                      name="latest_job_company"
                      title="Nama Perusahaan Terakhir"
                      placeholder="Masukkan nama perusahaan tempat terakhir bekerja"
                      v-model="mPreviousJobData.company" />
        </div>
        <div class="form-input-container">
          <FormInput :required="isPreviousJobExist"
                      :rules="requiredIfPreviousJobExist"
                      :custom-messages="{required: 'Nama posisi harus diisi'}"
                      type="text"
                      name="latest_job_position"
                      title="Posisi di Perusahaan Terakhir"
                      placeholder="Masukkan nama posisi"
                      v-model="mPreviousJobData.position" />
        </div>
        <div class="form-input-container">
          <FormInput :required="isPreviousJobExist"
                      :rules="requiredIfPreviousJobExist"
                      :custom-messages="{required: 'Lama di posisi harus diisi'}"
                      type="text"
                      name="latest_job_length"
                      title="Lama Bekerja di Perusahaan Terakhir"
                      subtitle="Contoh: X tahun Y bulan atau Z bulan"
                      placeholder="0 tahun 0 bulan"
                      v-model="mPreviousJobData.length" />
        </div>
        <div class="form-input-container">
          <FormInput :required="isPreviousJobExist"
                      :rules="requiredIfPreviousJobExist"
                      :custom-messages="{required: 'Informasi ini harus diisi'}"
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
import { PROFILE_DETAIL_TYPE, profileObjectReference, populateProfileDataFields, validateAndSave } from './utils'

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
  computed: {
    isPreviousJobExist () {
      return this.mPreviousJobData.has_previous_job === 'Ya'
    },
    requiredIfPreviousJobExist () {
      return {
        required: this.isPreviousJobExist
      }
    }
  },
  methods: {
    onChangePreviousJobStatus (newValue) {
      const oldValue = this.mPreviousJobData.has_previous_job
      const keys = profileObjectReference[PROFILE_DETAIL_TYPE.PREVIOUS_JOB]
      const hasSomeValues = keys.some(key => {
        if (key === 'has_previous_job') return false
        return this.mPreviousJobData[key] !== null
      })

      if (newValue === 'Tidak' && oldValue === 'Ya' && hasSomeValues) {
        this.$swal.fire({
          title: 'Apa kamu yakin?',
          text: 'Mengganti opsi ini akan menghapus data yang sudah kamu isikan sebelumnya',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, hapus saja datanya',
          cancelButtonText: 'Keluar'
        }).then(({ value }) => {
          if (value) {
            keys.forEach(key => {
              if (key === 'has_previous_job') return
              this.$set(this.mPreviousJobData, key, null)
            })
            this.$set(this.mPreviousJobData, 'has_previous_job', newValue)
          }
        })
      } else {
        this.$set(this.mPreviousJobData, 'has_previous_job', newValue)
      }
    },
    onSave () {
      return validateAndSave(this.$refs.validator, this.data.id, {
        [PROFILE_DETAIL_TYPE.PREVIOUS_JOB]: this.mPreviousJobData
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
