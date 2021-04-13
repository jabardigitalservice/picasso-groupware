<template>
  <div>
    <FormLogbookSkeleton v-if="isLoadingLogbook" />
    <ValidationObserver v-if="!isLoadingLogbook" ref="validationObserver">
      <FormInputProject
        name="projectId"
        title="Nama Project"
        type="text"
        :disabled="!isEditable"
        rules="required"
        :custom-messages="{
          required: 'Nama project harus diisi'
        }"
        :value="payload.projectName"
        @change="onSelectedProjectChanged"
      >
        <template
          v-if="!isViewingOnly"
          #subtitle
        >
          <p>
            <i aria-hidden="true" class="text-gray-600">
              Nama project Anda tidak ada? Kontak admin via
            </i>
            <a
              class="cursor-pointer hover:underline"
              :href="adminWhatsappBacklink"
              target="_blank"
            >
              <strong class="text-green-500">Whatsapp</strong>
            </a>
          </p>
        </template>
      </FormInputProject>
      <br />
      <FormInput
        name="nameTask"
        title="Nama Task"
        type="text"
        :disabled="!isEditable"
        rules="required"
        :custom-messages="{
          required: 'Nama task harus diisi'
        }"
        v-model="payload.nameTask"
      />
      <br />
      <FormInputTupoksi
        name="tupoksiJabatanId"
        :show-as-readonly-input="isViewingOnly"
        v-model="payload.tupoksiJabatanId" />
      <br />
      <FormInputDateTime
        name="dateTask"
        title="Tanggal Pengerjaan"
        type="date"
        :disabled="!isEditable"
        :max-datetime="maxDateTime"
        rules="required"
        :custom-messages="{
          required: 'Tanggal pengerjaan harus diisi'
        }"
        v-model="payload.dateTask"
      />
      <br />
      <FormInputEvidence
        ref="formInputEvidence"
        name="evidenceTask"
        title="Foto Hasil Kerja/Foto Kegiatan*"
        :url.sync="payload.evidenceTaskURL"
        :path="payload.evidenceTaskPath"
        :disabled="!isEditable"
        rules="required|mimes:image/*|size:5120"
        accept="image/*"
        :custom-messages="{
          required: 'Foto harus diisi',
          mimes: 'File harus berupa gambar',
          size: 'Gambar tidak boleh lebih dari 5MB'
        }"
      >
        <template
          v-if="!isViewingOnly"
          #subtitle>
          <span class="text-gray-700">
            File tidak boleh lebih dari 5MB
          </span>
        </template>
      </FormInputEvidence>
      <br />
      <FormInputLink
        ref="formInputDocumentLink"
        :show-as-readonly-link="!isEditable"
        :tupoksi-id="payload.tupoksiJabatanId"
        :value="documentTaskLink"
        @change="onDocumentTaskLinkChanged"
      />
      <br />
      <FormInput
        name="workPlace"
        title="Tempat Pengerjaan"
        type="text"
        placeholder="Tempat pengerjaan"
        :disabled="!isEditable"
        rules="required"
        :custom-messages="{
          required: 'Tempat pengerjaan harus diisi'
        }"
        v-model="payload.workPlace"
      />
      <br />
      <FormInput
        type="text"
        name="organizerTask"
        title="Penyelenggara"
        :disabled="!isEditable"
        rules="required"
        :custom-messages="{
          required: 'Penyelenggara harus diisi'
        }"
        v-model="payload.organizerTask"
      />
      <br />
      <div
        v-if="isEditable"
        class="flex justify-end"
      >
        <button
          class="mr-4 button focus:outline-none
                 bg-gray-200 hover:bg-gray-300 text-gray-500"
          @click="onCancel"
        >
          Cancel
        </button>
        <button
          class="button focus:outline-none
                 bg-brand-blue hover:bg-brand-blue-lighter text-white"
          @click="beforeSave"
        >
          Save
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import FormLogbookSkeleton from './Skeleton'
import FormInputTupoksi from './InputTupoksi'
import FormInputLink from './InputLink'
import FormInputProject from './InputProjectAutocomplete'
import FormInput from '../Form/Input'
import FormInputEvidence from '../Form/EvidenceImageInput'
import FormInputDateTime from '../Form/InputDateTime'
import _cloneDeep from 'lodash/cloneDeep'

const modelData = {
  'dateTask': new Date().toISOString(), // timestamptz '2020-06-11T06:55:24.698Z'
  'projectId': null, // ?
  'projectName': null, // ?
  'nameTask': null, // ?
  'difficultyTask': '', // must be empty string!
  'organizerTask': null, // ?,
  'isMainTask': null,
  'isDocumentLink': true,
  'workPlace': null,
  'tupoksiJabatanId': null
}

const ACTION = {
  CREATE: 'create',
  EDIT: 'edit',
  VIEW: 'view'
}

const ACTIONS = [
  ACTION.CREATE,
  ACTION.EDIT,
  ACTION.VIEW
]

export default {
  components: {
    FormInputTupoksi,
    FormInputLink,
    FormInputProject,
    FormInput,
    FormInputEvidence,
    FormInputDateTime,
    FormLogbookSkeleton
  },
  props: {
    action: {
      required: true,
      validator (v) {
        return ACTIONS.includes(v)
      }
    },
    id: {
      required: false,
      type: [String, Number]
    },
    onCancelCallback: {
      type: Function,
      default: null
    }
  },
  data () {
    const {
      VUE_APP_ADMIN_WHATSAPP_NUMBER: adminWhatsappNumber
    } = process.env
    const adminWhatsappBacklink = `https://api.whatsapp.com/send?phone=${adminWhatsappNumber}&text=Usulan nama project/product anda`
    return {
      adminWhatsappBacklink,
      isLoadingLogbook: true,
      originalData: null,
      payload: Object.assign({}, modelData),
      documentTaskLink: null,

      maxDateTime: new Date().toISOString()
    }
  },
  computed: {
    isViewingOnly () {
      return this.action === ACTION.VIEW
    },
    isEditable () {
      return [
        ACTION.CREATE,
        ACTION.EDIT
      ].includes(this.action)
    },
    projectOptions () {
      return this.$store.getters['organizations/listOfProjects']
    }
  },
  watch: {
    id: {
      immediate: true,
      async handler (id) {
        if (!id) {
          return
        }
        const logbook = await this.getLogbook(id)
        if (!logbook) {
          this.$emit('logbook:not-found', id)
          return
        }
        const { documentTaskURL } = logbook
        this.originalData = _cloneDeep(logbook)
        this.payload = logbook
        this.onDocumentTaskLinkChanged(documentTaskURL)
      }
    }
  },
  methods: {
    async getLogbook (id) {
      let logbook = null
      this.isLoadingLogbook = true
      try {
        logbook = await this.getLogbookFromVuex(id)
        if (!logbook) {
          logbook = await this.getLogbookFromDatabase(id)
        }
      } catch (e) {
        logbook = null
      } finally {
        this.isLoadingLogbook = false
      }
      return logbook
    },
    getLogbookFromVuex (id) {
      const logbook = this.$store.state['logbook-list'].logbookInView
      if (logbook && logbook._id === id) {
        return Promise.resolve(logbook)
      }
      return Promise.resolve(null)
    },
    getLogbookFromDatabase (id) {
      return this.$store.dispatch('logbook-list/getLogbookById', { id })
    },
    resetPayload () {
      this.payload = Object.assign({}, modelData)
    },
    onSelectedProjectChanged (opt) {
      if (opt) {
        this.$set(this.payload, 'projectId', opt.id)
        this.$set(this.payload, 'projectName', opt.name)
      }
    },
    onDocumentTaskLinkChanged (link) {
      this.documentTaskLink = link
      if (typeof link !== 'string' || !link.length) {
        this.payload.isDocumentLink = false
        this.documentTaskLink = null
      } else {
        this.payload.isDocumentLink = /^https?:\/\//.test(link)
        this.documentTaskLink = link
      }
    },
    onCancel () {
      if (typeof this.onCancelCallback === 'function') {
        return this.onCancelCallback()
      }
      return this.resetPayload()
    },
    createFormDataToPost () {
      const {
        evidenceTaskURL,
        evidenceTaskPath,
        documentTaskURL,
        documentTaskPath,
        ...rest
      } = this.payload

      const formData = new FormData()
      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, value)
      })

      try {
        const evidenceFile = this.$refs.formInputEvidence.getSelectedFile()
        formData.append('evidenceTask', evidenceFile)
        formData.append('documentTask', this.documentTaskLink || '')
        return formData
      } catch (e) {
        return null
      }
    },
    async post () {
      const formData = this.createFormDataToPost()
      return this.$store.dispatch('logbook-list/insertLogbook', formData)
    },
    createFormDataToPut () {
      const {
        evidenceTaskPath,
        evidenceTaskURL,
        documentTaskPath,
        documentTaskURL,
        difficultyTask,
        ...rest
      } = this.payload

      const formData = new FormData()
      formData.append('difficultyTask', '')
      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, value)
      })

      try {
        const evidenceFile = this.$refs.formInputEvidence.getSelectedFile()
        formData.append('evidenceTask', evidenceFile)
        formData.append('documentTask', this.documentTaskLink || '')
        return formData
      } catch (e) {
        return null
      }
    },
    async put () {
      const formData = this.createFormDataToPut()
      return this.$store.dispatch('logbook-list/updateLogbook', {
        id: this.id,
        payload: formData
      })
    },
    onSuccess (title, message) {
      return this.$swal.fire({
        type: 'success',
        title: title,
        text: message,
        showCancelButton: false,
        confirmButtonText: 'Tutup'
      }).then(() => {
        this.$router.push({
          path: '/report'
        })
      })
    },
    onError (msg) {
      return this.$swal.fire({
        type: 'error',
        title: 'Terjadi Kesalahan',
        text: msg || '',
        showCancelButton: false,
        confirmButtonText: 'Tutup'
      })
    },
    async validateAllInputFields () {
      const observer = this.$refs.validationObserver
      if (!observer) {
        throw new Error('validation observer not found')
      }
      const isValid = await observer.validate()
      if (!isValid) {
        // scroll viewport onto first error field
        this.$nextTick(() => {
          try {
            const firstError = this.$el.querySelector('.form-input__error-hint')
            if (firstError) {
              const { y } = firstError.parentElement.getBoundingClientRect()
              window.scrollTo({
                // scroll to error field, with 64px margin top
                top: window.scrollY + y - 64,
                behavior: 'smooth'
              })
            }
          } catch (e) {
            // silent error
          }
        })
      }
      return isValid
    },
    async beforeSave (handler) {
      const canProceed = await this.validateAllInputFields()
      if (!canProceed) {
        return Promise.resolve()
      }
      const { value: confirm } = await this.$swal.fire({
        title: 'Simpan data?',
        type: 'question',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        showConfirmButton: true,
        confirmButtonText: 'Ya, simpan'
      })

      if (!confirm) {
        return Promise.resolve()
      }
      return this.onSave()
    },
    async onSave () {
      this.$swal.fire({
        title: 'Harap tunggu sebentar...',
        onBeforeOpen: () => this.$swal.showLoading()
      })

      try {
        if (this.action === ACTION.CREATE) {
          await this.$promiseMinDelay(this.post(), 1000)
        } else if (this.action === ACTION.EDIT) {
          await this.$promiseMinDelay(this.put(), 1000)
        }
        return this.onSuccess('Berhasil menyimpan data')
      } catch (e) {
        return this.onError('Gagal menyimpan data')
      }
    }
  }
}
</script>
