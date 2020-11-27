<template>
  <ValidationObserver tag="fieldset" ref="validator">
    <div class="form-input-container">
      <FormSelect name="has_previous_job"
                  title="Pernah bekerja sebelumnya?"
                  :options="['Ya', 'Tidak']"
                  rules="required"
                  prompt="Pilih salah satu opsi di bawah ini"
                  :custom-messages="{required: 'Informasi ini harus diisi'}"
                  :value="mData.previous_job.has_previous_job"
                  @change="onChangePreviousJobStatus"/>
    </div>
    <transition name="slide-y-fade-transition">
      <div v-if="mData.previous_job.has_previous_job === 'Ya'">
        <div class="form-input-container">
          <FormInput :required="isPreviousJobExist"
                      :rules="requiredIfPreviousJobExist"
                      :custom-messages="{required: 'Nama perusahaan harus diisi'}"
                      type="text"
                      name="latest_job_company"
                      title="Nama Perusahaan Terakhir"
                      placeholder="Masukkan nama perusahaan tempat terakhir bekerja"
                      v-model="mData.previous_job.company" />
        </div>
        <div class="form-input-container">
          <FormInput :required="isPreviousJobExist"
                      :rules="requiredIfPreviousJobExist"
                      :custom-messages="{required: 'Nama posisi harus diisi'}"
                      type="text"
                      name="latest_job_position"
                      title="Posisi di Perusahaan Terakhir"
                      placeholder="Masukkan nama posisi"
                      v-model="mData.previous_job.position" />
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
                      v-model="mData.previous_job.length" />
        </div>
        <div class="form-input-container">
          <FormInput :required="isPreviousJobExist"
                      :rules="requiredIfPreviousJobExist"
                      :custom-messages="{required: 'Informasi ini harus diisi'}"
                      type="number"
                      name="latest_job_salary"
                      title="Gaji di Perusahaan Terakhir"
                      placeholder="Masukkan gaji di perusahaan terakhir"
                      v-model="mData.previous_job.salary" />
        </div>
      </div>
    </transition>
  </ValidationObserver>
</template>

<script>
import { PROFILE_DETAIL_TYPE, PROFILE_DATA_SCHEMA } from './utils'

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
  computed: {
    mData: {
      get () {
        return this.data
      },
      set (obj) {
        this.$emit('change:data', obj)
      }
    },
    isPreviousJobExist () {
      return this.mData.previous_job.has_previous_job === 'Ya'
    },
    requiredIfPreviousJobExist () {
      return {
        required: this.isPreviousJobExist
      }
    }
  },
  methods: {
    onChangePreviousJobStatus (newValue) {
      const oldValue = this.mData.previous_job.has_previous_job
      if (newValue === 'Tidak') {
        const keys = PROFILE_DATA_SCHEMA[PROFILE_DETAIL_TYPE.PREVIOUS_JOB]
        const hasSomeValues = keys.some(key => {
          if (key === 'has_previous_job') return false
          return this.mData.previous_job[key] !== null
        })
        if (oldValue === 'Ya' && hasSomeValues) {
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
                this.$set(this.mData.previous_job, key, '')
              })
              this.$set(this.mData.previous_job, 'has_previous_job', newValue)
            }
          })
        } else {
          this.$set(this.mData.previous_job, 'has_previous_job', newValue);
          ['company', 'salary', 'length', 'position'].forEach(key => {
            this.$set(this.mData.previous_job, key, '')
          })
        }
      } else {
        this.$set(this.mData.previous_job, 'has_previous_job', newValue)
      }
    }
  }
}
</script>
