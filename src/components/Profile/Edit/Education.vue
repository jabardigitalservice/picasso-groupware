<template>
  <ValidationObserver tag="fieldset" ref="validator">
    <div class="form-input-container">
      <FormSelect name="latest_education_level"
                  title="Pendidikan Terakhir (Gelar)"
                  :options="choices.educations"
                  rules="required"
                  prompt="Pilih salah satu opsi di bawah ini"
                  :custom-messages="{required: 'Gelar pendidikan terakhir harus diisi'}"
                  v-model="mData.education.level" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="latest_education_institution"
                  title="Pendidikan Terakhir (Institusi)"
                  placeholder="Masukkan nama institusi pendidikan"
                  rules="required"
                  :custom-messages="{required: 'Nama institusi pendidikan harus diisi'}"
                  v-model="mData.education.institution" />
    </div>
    <div class="form-input-container">
      <FormInput type="text"
                  name="latest_education_major"
                  title="Pendidikan Terakhir (Jurusan)"
                  placeholder="Masukkan nama jurusan"
                  rules="required"
                  :custom-messages="{required: 'Nama jurusan harus diisi'}"
                  v-model="mData.education.major" />
    </div>
    <div class="form-input-container">
      <FormInput type="number"
                  name="latest_education_end_date"
                  title="Tahun Lulus"
                  placeholder="Masukkan tahun kelulusan"
                  :min="4"
                  :max="4"
                  :rules="`required|length:4|max_value:${currentYear}`"
                  :custom-messages="{required: 'Tahun lulus harus diisi', length: 'Tahun terdiri dari 4 angka', max_value: 'Tahun lulus tidak dapat melebihi tahun ini'}"
                  v-model="mData.education.end_date" />
    </div>
  </ValidationObserver>
</template>

<script>
import { getCurrentYear } from '../../../lib/date'

export default {
  components: {
    FormInput: () => import('@/components/Form/Input'),
    FormSelect: () => import('@/components/Form/Select')
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      choices: {
        educations: []
      },
      currentYear: getCurrentYear()
    }
  },
  created () {
    this.$store.dispatch('organizations/fetchEducations')
      .then(educations => {
        this.$set(this.choices, 'educations', JSON.parse(JSON.stringify(educations)))
      })
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
