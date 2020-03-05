<template>
  <ValidationObserver ref="validator" tag="div">
    <template v-if="hasSetRequiredFields">
      <div class="form-input-container">
        <FormInput type="text"
                    name="complete_name"
                    title="Nama Lengkap"
                    placeholder="Masukkan nama lengkap"
                    rules="required"
                    :custom-messages="{required: 'Nama harus diisi'}"
                    v-model="mPersonalData.name"/>
      </div>
      <div class="form-input-container">
        <FormInput type="text"
                    name="birth_city"
                    title="Tempat Lahir"
                    placeholder="Masukkan kota tempat kelahiran"
                    rules="required"
                    :custom-messages="{required: 'Kota kelahiran harus diisi'}"
                    v-model="mPersonalData.birth_city" />
      </div>
      <div class="form-input-container">
        <FormInput type="date"
                    name="birth_date"
                    title="Tanggal Lahir"
                    placeholder="Masukkan tanggal lahir"
                    rules="required"
                    :custom-messages="{required: 'Tanggal lahir harus diisi'}"
                    v-model="mPersonalData.birth_date" />
      </div>
      <div class="form-input-container">
        <FormSelect name="religion"
                    title="Agama"
                    :options="choices.religions"
                    rules="required"
                    prompt="Pilih salah satu opsi di bawah ini"
                    :custom-messages="{required: 'Agama harus diisi'}"
                    v-model="mPersonalData.religion" />
      </div>
      <div class="form-input-container">
        <FormRadioGroup name="marital_status"
                        title="Status Pernikahan"
                        :options="choices.maritalStatus"
                        rules="required"
                        :custom-messages="{required: 'Status pernikahan harus diisi'}"
                        :value="mPersonalData.marital_status || choices.maritalStatus[0]"
                        @change="$set(mPersonalData, 'marital_status', $event)" />
      </div>
      <hr class="-mx-8 mb-8">
      <div class="form-input-container">
        <FormTextarea name="ktp_address"
                      title="Alamat sesuai KTP"
                      placeholder="Masukkan alamat yang tertera di KTP"
                      rules="required"
                      rows="4"
                      :custom-messages="{required: 'Alamat harus diisi'}"
                      v-model="mPersonalData.ktp_address" />
      </div>
      <div class="form-input-container">
        <FormTextarea name="current_addresss"
                      title="Alamat saat ini"
                      placeholder="Masukkan alamat saat ini"
                      rules="required"
                      rows="4"
                      :custom-messages="{required: 'Alamat harus diisi'}"
                      v-model="mPersonalData.current_address">
          <template #title>
            <div class="mb-4 flex flex-row justify-between items-center">
              <label class="form-input__title is-required">
                Alamat Saat Ini
              </label>
              <button class="button bg-brand-green text-white"
                      @click="$set(mPersonalData, 'current_address', mPersonalData.ktp_address)">
                IDEM
              </button>
            </div>
          </template>
        </FormTextarea>
      </div>
      <div class="form-input-container">
        <FormInput type="text"
                    name="phone_number"
                    title="Nomor Telepon (seluler)"
                    placeholder="Masukkan nomor telepon seluler"
                    rules="required|min:10|max:20"
                    :custom-messages="{required: 'Nomor telepon harus diisi', min: 'Nomor telepon minimal terdiri dari 10 angka', max: 'Nomor telepon maksimal terdiri dari 20 angka'}"
                    v-model="mPersonalData.phone_number" />
      </div>
      <div class="form-input-container">
        <FormInput type="email"
                    name="email"
                    title="Email"
                    placeholder="Masukkan alamat email"
                    rules="required|email"
                    :custom-messages="{required: 'Alamat email harus diisi', email: 'Alamat email tidak valid'}"
                    v-model="mPersonalData.email" />
      </div>
      <hr class="-mx-8 mb-8">
      <div class="form-input-container">
        <FormInput type="text"
                    name="ktp_number"
                    title="Nomor KTP"
                    placeholder="Masukkan nomor KTP"
                    rules="required|numeric|length:16|ktp"
                    :custom-messages="{required: 'Nomor KTP harus diisi', numeric: 'Nomor KTP hanya terdiri dari angka', length: 'Nomor KTP terdiri dari 16 angka', ktp: 'Nomor KTP tidak valid'}"
                    v-model="mDocumentsData.ktp.number" />
      </div>
      <!-- <div class="form-input-container">
        <FormInputFile name="document_ktp"
                        title="Upload KTP"
                        subtitle="File dalam format JPEG/PNG/PDF"
                        rules="required|mimes:image/*,.pdf"
                        :custom-messages="{required: 'KTP harus di-upload dalam format JPEG/PNG/PDF', mimes: 'File harus dalam format JPEG/PNG/PDF'}"
                        accept="image/*,.pdf"
                        v-model="mDocumentsData.ktp.doc" />
      </div> -->
      <!-- <div class="form-input-container">
        <FormInputFile name="document_kk"
                        title="Upload KK"
                        subtitle="File dalam format JPEG/PNG/PDF"
                        rules="required|mimes:image/*,.pdf"
                        :custom-messages="{required: 'KK harus di-upload dalam format JPEG/PNG/PDF', mimes: 'File harus dalam format JPEG/PNG/PDF'}"
                        accept="image/*,.pdf"
                        v-model="mDocumentsData.kartu_keluarga.doc" />
      </div> -->
      <div class="form-input-container">
        <FormInput type="text"
                    name="npwp_number"
                    title="Nomor NPWP"
                    placeholder="Masukkan nomor NPWP"
                    rules="required|numeric|length:15"
                    :custom-messages="{required: 'Nomor NPWP harus diisi', numeric: 'Nomor NPWP hanya terdiri dari angka', length: 'Nomor NPWP terdiri dari 15 angka'}"
                    v-model="mDocumentsData.npwp.number" />
      </div>
      <!-- <div class="form-input-container">
        <FormInputFile name="document_npwp"
                        title="Upload NPWP"
                        subtitle="File dalam format JPEG/PNG/PDF"
                        rules="required|mimes:image/*,.pdf"
                        :custom-messages="{required: 'NPWP harus di-upload dalam format JPEG/PNG/PDF', mimes: 'File harus dalam format JPEG/PNG/PDF'}"
                        accept="image/*,.pdf"
                        v-model="mDocumentsData.npwp.doc" />
      </div> -->
      <hr class="-mx-8 mb-8">
      <div class="form-input-container">
        <FormSelect name="job"
                    title="Posisi saat ini"
                    :options="choices.jobs"
                    rules="required"
                    prompt="Pilih salah satu opsi di bawah ini"
                    :custom-messages="{required: 'Posisi harus diisi'}"
                    v-model="mAssignmentData.job" />
      </div>
      <div class="form-input-container">
        <FormInput type="date"
                    name="working_start_date"
                    title="Tanggal Mulai Kerja"
                    placeholder="Masukkan tanggal mulai kerja"
                    rules="required"
                    :custom-messages="{required: 'Tanggal mulai kerja harus diisi'}"
                    v-model="mAssignmentData.start_date" />
      </div>
      <div class="flex flex-row justify-end items-center">
        <button class="button bg-brand-green text-white"
                :disabled="$attrs.unsaved"
                @click="onSave">
          Simpan
        </button>
      </div>
    </template>
  </ValidationObserver>
</template>

<script>
import { PROFILE_DETAIL_TYPE, populateProfileDataFields, watchDataChanges, validateAndSave } from './utils'

export default {
  name: 'EditPersonalData',
  components: {
    FormInput: () => import('@/components/Form/Input'),
    // FormInputFile: () => import('@/components/Form/InputFile'),
    FormTextarea: () => import('@/components/Form/Textarea'),
    FormRadioGroup: () => import('@/components/Form/RadioGroup'),
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
        maritalStatus: [
          'Sudah Menikah',
          'Belum Menikah'
        ],
        religions: [
          'Islam',
          'Kristen',
          'Buddha',
          'Hindu',
          'Khonghucu'
        ],
        jobs: []
      },
      hasSetRequiredFields: false,
      mPersonalData: {},
      mAssignmentData: {},
      mDocumentsData: {}
    }
  },
  created () {
    watchDataChanges(
      this,
      this.data,
      {
        [PROFILE_DETAIL_TYPE.PERSONAL]: this.mPersonalData,
        [PROFILE_DETAIL_TYPE.ASSIGNMENT]: this.mAssignmentData,
        [PROFILE_DETAIL_TYPE.DOCUMENTS]: this.mDocumentsData
      }
    )
    this.$store.dispatch('organizations/fetchJobs')
      .then(jobs => {
        this.$set(this.choices, 'jobs', JSON.parse(JSON.stringify(jobs)))
      })
  },
  methods: {
    onSave () {
      const { PERSONAL, ASSIGNMENT, DOCUMENTS } = PROFILE_DETAIL_TYPE
      return validateAndSave(this.$refs.validator, this.data.id, {
        [PERSONAL]: this.mPersonalData,
        [ASSIGNMENT]: this.mAssignmentData,
        [DOCUMENTS]: this.mDocumentsData
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
          const { PERSONAL, ASSIGNMENT, DOCUMENTS } = PROFILE_DETAIL_TYPE
          this.mPersonalData = populateProfileDataFields(PERSONAL, obj[PERSONAL])
          this.mAssignmentData = populateProfileDataFields(ASSIGNMENT, obj[ASSIGNMENT])
          this.mDocumentsData = populateProfileDataFields(DOCUMENTS, obj[DOCUMENTS])
          this.hasSetRequiredFields = true
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
hr {
  @apply border-gray-500;
}
</style>
