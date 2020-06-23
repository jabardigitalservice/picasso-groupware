import {
  formatDateLong as __formatDateLong,
  formatTime as __formatTime
} from '../../lib/date'
import { GroupwareAPI } from '../../lib/axios'

export default {
  props: {
    logbook: {
      type: Object,
      required: true
    },
    index: {
      type: [String, Number]
    }
  },
  data () {
    return {}
  },
  computed: {
    hasEvidenceFile () {
      try {
        return typeof this.logbook.evidenceTask.fileURL === 'string' && !!this.logbook.evidenceTask.fileURL.length
      } catch (e) {
        return false
      }
    },
    hasDocumentFile () {
      try {
        return typeof this.logbook.documentTask.fileURL === 'string' && !!this.logbook.documentTask.fileURL.length
      } catch (e) {
        return false
      }
    }
  },
  methods: {
    formatDateLong (value) {
      return __formatDateLong(new Date(value))
    },
    formatTime (value) {
      return __formatTime(new Date(value))
    },
    onClickEvidence () {
      alert('on development')
    },
    onClickDocument () {
      alert('on development')
    },
    onSuccess (title, message) {
      return this.$swal.fire({
        type: 'success',
        title: title,
        text: message,
        showCancelButton: false,
        confirmButtonText: 'Tutup'
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
    onEditLogbook () {
      alert('on development')
    },
    async beforeDeleteLogbook () {
      const { value: confirm } = await this.$swal.fire({
        title: 'Hapus logbook?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Ya, hapus',
        cancelButtonText: 'Tidak'
      })

      if (!confirm) {
        return
      }
      return this.onDeleteLogbook(this.logbook._id)
    },
    async onDeleteLogbook () {
      this.$swal.fire({
        title: 'Harap tunggu sebentar...',
        onBeforeOpen: () => this.$swal.showLoading()
      })

      try {
        await this.$promiseMinDelay(GroupwareAPI.delete(`/logbook/${this.logbook._id}`), 1000)
        this.$store.dispatch('logbook-list/getLogbookList')
        return this.onSuccess('Logbook berhasil dihapus')
      } catch (e) {
        return this.onError('Gagal menghapus logbook')
      }
    }
  }
}
