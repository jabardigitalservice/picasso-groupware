<template>
  <div>
    <ValidationObserver #default="{handleSubmit}">
      <FormSelect
        name="projectId"
        title="Nama Proyek"
        value-key="id"
        label-key="name"
        :disabled="!isEditable"
        :options="projectOptions"
        :value="payload.projectId"
        rules="required"
        :required="true"
        :custom-messages="{
          required: 'Nama proyek harus diisi'
        }"
        @change="onSelectedProjectChanged">
        <template v-if="!isViewingOnly" #subtitle>
          <p>
            <i class="text-gray-600">
              Nama proyek/produk tidak ada? Kontak admin via
            </i>
            <a
              class="cursor-pointer hover:underline"
              :href="adminWhatsappBacklink">
              <b class="text-green-500">Whatsapp</b>
            </a>
          </p>
        </template>
      </FormSelect>
      <br/>
      <FormInput
        name="nameTask"
        title="Nama Tugas"
        type="text"
        :disabled="!isEditable"
        rules="required"
        :custom-messages="{
          required: 'Nama tugas harus diisi'
        }"
        v-model="payload.nameTask"/>
      <br/>
      <FormInputDateTime
        name="dateTask"
        title="Tanggal"
        type="date"
        :disabled="!isEditable"
        :max-datetime="maxDateTime"
        rules="required"
        :custom-messages="{
          required: 'Tanggal harus diisi'
        }"
        v-model="payload.dateTask"
      />
      <br/>
      <FormInput
        name="workPlace"
        title="Tempat"
        type="text"
        :disabled="!isEditable"
        rules="required"
        :custom-messages="{
          required: 'Tempat harus diisi'
        }"
        v-model="payload.workPlace"/>
      <br/>
      <div class="relative">
        <FormRadioButtonGroup
          name="difficultyTask"
          title="Tingkat Kesulitan"
          :options="[1,2,3,4,5]"
          :disabled="!isEditable"
          rules="required"
          :custom-messages="{
            required: 'Tingkat kesulitan harus diisi'
          }"
          v-model="payload.difficultyTask"
        >
          <template #subtitle>
            <div class="flex justify-between font-bold text-gray-500">
              <small>
                Sangat Mudah
              </small>
              <small>
                Sangat Sulit
              </small>
            </div>
          </template>
        </FormRadioButtonGroup>
      </div>
      <br/>
      <FormRadioButtonGroup
        class="mb-2"
        name="isMainTask"
        title="Jenis Tugas"
        :block="true"
        :options="mainTaskOptions"
        :disabled="!isEditable"
        :required="true"
        rules="required"
        :custom-messages="{
          required: 'Jenis tugas harus diisi'
        }"
        v-model="payload.isMainTask"
      />
      <br/>
      <FormInputFile
          name="evidenceTask"
          title="Screenshot / Foto Hasil Kerja"
          :value.sync="evidenceTaskFileURL"
          :file.sync="evidenceTaskFileBlob"
          :filename.sync="evidenceTaskFilename"
          :disabled="!isEditable"
          :renameable="false"
          :download-on-click="true"
          rules="required|mimes:image/*"
          accept="image/*"
          :custom-messages="{
            required: 'Evidence harus diisi'
          }"
          />
      <br/>
      <FormRadioButtonGroup
        class="mb-2"
        name="selectedDocumentType"
        title="Dokumen"
        :disabled="!isEditable"
        :block="false"
        :options="documentTypeOptions"
        :required="false"
        :value="selectedDocumentType"
        @change="onDocumentTypeSelectionChanged"
      >
        <template #subtitle>
          <span v-if="!isViewingOnly" class="font-bold text-gray-500">
            *Pilih salah satu
          </span>
        </template>
      </FormRadioButtonGroup>
      <FormInputFile
        v-if="isUsingFileAsDocument"
        name="documentTask"
        title="File Dokumen"
        placeholder="Choose file..."
        :disabled="!isEditable"
        :value.sync="documentTaskFileURL"
        :file.sync="documentTaskFileBlob"
        :filename.sync="documentTaskFilename"
        :required="false"
        :renameable="false"
        :download-on-click="true"
      >
        <template #title>
          <span></span>
        </template>
      </FormInputFile>
      <FormInput
        v-if="isUsingLinkAsDocument"
        type="text"
        name="documentTask"
        title="Link Dokumen"
        placeholder="https://"
        :disabled="!isEditable"
        :rules="{regex: /^https?:\/\//}"
        :custom-messages="{
          regex: 'Link harus dalam bentuk URL yang valid'
        }"
        :required="false"
        v-model="documentTaskLink">
        <template #title>
          <span></span>
        </template>
      </FormInput>
      <br/>
      <FormInput
        type="text"
        name="organizerTask"
        title="Penyelenggara"
        :disabled="!isEditable"
        rules="required"
        :custom-messages="{
          required: 'Penyelenggara harus diisi'
        }"
        v-model="payload.organizerTask"/>
      <br/>
      <div v-if="isEditable" class="flex justify-end">
        <button
          class="mr-4 button focus:outline-none
                 bg-gray-200 hover:bg-gray-300 text-gray-500"
          @click="onCancel">
          Cancel
        </button>
        <button
          class="button focus:outline-none
                 bg-brand-blue hover:bg-brand-blue-lighter text-white"
          @click="handleSubmit(beforeSave)">
          Save
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import FormSelect from '../Form/Select'
import FormInput from '../Form/Input'
import FormInputFile from '../Form/InputFile'
import FormInputDateTime from '../Form/InputDateTime'
import FormRadioButtonGroup from '../Form/RadioButtonGroup'
import { GroupwareAPI } from '../../lib/axios'
import _cloneDeep from 'lodash/cloneDeep'

const DOCUMENT_TYPE = {
  FILE: 'FILE',
  LINK: 'LINK'
}

const modelData = {
  'dateTask': null, // timestamptz '2020-06-11T06:55:24.698Z'
  'projectId': null, // ?
  'projectName': null, // ?
  'nameTask': null, // ?
  'difficultyTask': null, // number in range of [1, 5],
  'evidenceTask': null, // URI 'http://'
  'documentTask': null, // URI 'http://'
  'organizerTask': null, // ?,
  'isMainTask': null,
  'isDocumentLink': true,
  'workPlace': null
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
    FormSelect,
    FormInput,
    FormInputFile,
    FormInputDateTime,
    FormRadioButtonGroup
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
    return {
      adminWhatsappBacklink: `https://api.whatsapp.com/send?phone=+6283822344237&text=Usulan nama project/product anda`,
      originalData: null,
      payload: Object.assign({}, modelData),
      mainTaskOptions: [
        {
          value: true,
          label: 'Tugas Pokok'
        },
        {
          value: false,
          label: 'Tugas Tambahan'
        }
      ],
      documentTypeOptions: [
        {
          value: DOCUMENT_TYPE.LINK,
          label: 'Link'
        },
        {
          value: DOCUMENT_TYPE.FILE,
          label: 'File'
        }
      ],
      selectedDocumentType: DOCUMENT_TYPE.LINK,
      documentTaskFileURL: null,
      documentTaskFileBlob: null,
      documentTaskFilename: null,
      documentTaskLink: null,

      evidenceTaskFileURL: null,
      evidenceTaskFileBlob: null,
      evidenceTaskFilename: null,

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
    },
    isUsingFileAsDocument () {
      return this.selectedDocumentType === DOCUMENT_TYPE.FILE
    },
    isUsingLinkAsDocument () {
      return this.selectedDocumentType === DOCUMENT_TYPE.LINK
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
        const { evidenceTask, documentTask, isDocumentLink } = logbook
        this.originalData = _cloneDeep(logbook)
        this.payload = logbook
        this.selectedDocumentType = logbook.isDocumentLink === true ? DOCUMENT_TYPE.LINK : DOCUMENT_TYPE.FILE
        await this.getEvidenceTaskFile(evidenceTask.filePath)
          .then(({ name, url, file }) => {
            this.evidenceTaskFilename = name
            this.evidenceTaskFileURL = url
            this.evidenceTaskFileBlob = file
          })
        if (isDocumentLink === false) {
          await this.getDocumentTaskFile(documentTask.filePath)
            .then(({ name, url, file }) => {
              this.documentTaskFilename = name
              this.documentTaskFileURL = url
              this.documentTaskFileBlob = file
            })
        } else if (isDocumentLink === true) {
          this.documentTaskLink = documentTask.fileURL
        }
      }
    }
  },
  methods: {
    async getLogbook (id) {
      let logbook = await this.getLogbookFromVuex(id)
      if (!logbook) {
        logbook = await this.getLogbookFromDatabase(id)
      }
      return logbook
    },
    getLogbookFromVuex (id) {
      const arr = this.$store.getters['logbook-list/logbookListData']
      const logbook = arr.find(x => x._id === id)
      return Promise.resolve(logbook)
    },
    getLogbookFromDatabase (id) {
      return Promise.resolve(null)
    },
    async getEvidenceTaskFile (filePath) {
      if (typeof filePath !== 'string' || !filePath.length) {
        return Promise.resolve({})
      }
      const __filePath = filePath.replace('image/', 'image-blob/')
      const mimetype = filePath.substring(filePath.lastIndexOf('.') + 1)
      const blob = await GroupwareAPI.get(`file/${__filePath}`)
        .then(r => {
          return fetch(r.data).then(r => r.blob())
        })
      const file = new File([blob], `${new Date().getTime()}`, {
        type: `image/${mimetype}`
      })
      const url = window.URL.createObjectURL(file)
      return {
        name: filePath,
        url,
        file
      }
    },
    async getDocumentTaskFile (filePath) {
      if (typeof filePath !== 'string' || !filePath.length) {
        return Promise.resolve({})
      }
      const __filePath = filePath.replace('image/', 'image-blob/')
      const blob = await GroupwareAPI.get(`file/${__filePath}`, {
        responseType: 'blob'
      })
        .then(r => {
          return r.data
        })
      const file = new File([blob], `${new Date().getTime()}`)
      const url = window.URL.createObjectURL(file)
      return {
        name: filePath,
        url,
        file
      }
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
    onDocumentTypeSelectionChanged (type) {
      this.selectedDocumentType = type
      this.$set(this.payload, 'isDocumentLink', type === DOCUMENT_TYPE.LINK)
    },
    onCancel () {
      if (typeof this.onCancelCallback === 'function') {
        return this.onCancelCallback()
      }
      this.resetPayload()
    },
    createFormDataToPost () {
      const {
        evidenceTask,
        documentTask,
        ...rest
      } = this.payload

      const formData = new FormData()
      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, value)
      })
      formData.append('evidenceTask', this.evidenceTaskFileBlob)
      if (this.isUsingFileAsDocument) {
        formData.append('documentTask', this.documentTaskFileBlob)
      } else if (this.isUsingLinkAsDocument) {
        formData.append('documentTask', this.documentTaskLink)
      }

      return formData
    },
    post () {
      const formData = this.createFormDataToPost()
      return this.$store.dispatch('logbook-list/insertLogbook', formData)
    },
    createFormDataToPut () {
      const {
        evidenceTask,
        documentTask,
        isDocumentLink,
        ...rest
      } = this.payload

      const formData = new FormData()
      Object.entries(rest).forEach(([key, value]) => {
        formData.append(key, value)
      })
      if (this.payload.evidenceTask.filePath === this.evidenceTaskFilename) {
        formData.append('evidenceTask', null)
      } else {
        formData.append('evidenceTask', this.evidenceTaskFileBlob)
      }
      if (this.isUsingFileAsDocument) {
        formData.append('isDocumentLink', false)
        if (this.payload.documentTask.filePath !== this.documentTaskFilename) {
          formData.append('documentTask', this.documentTaskFileBlob)
        } else {
          formData.append('documentTask', null)
        }
      } else {
        formData.append('isDocumentLink', true)
        formData.append('documentTask', this.documentTaskLink)
      }
      return formData
    },
    put () {
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
    async beforeSave () {
      const { value: confirm } = await this.$swal.fire({
        title: 'Simpan data?',
        type: 'question',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        showConfirmButton: true,
        confirmButtonText: 'Ya, simpan'
      })

      if (!confirm) {
        return
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

<style>

</style>
