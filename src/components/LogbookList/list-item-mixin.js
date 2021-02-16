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
        return typeof this.logbook.evidenceTaskURL === 'string' && !!this.logbook.evidenceTaskURL.length
      } catch (e) {
        return false
      }
    },
    hasDocumentFile () {
      try {
        return typeof this.logbook.documentTaskURL === 'string' &&
          !!this.logbook.documentTaskURL.length &&
          this.logbook.documentTaskURL !== 'null'
      } catch (e) {
        return false
      }
    },
    hasTupoksi () {
      try {
        const { tupoksiJabatanName } = this.logbook
        return typeof tupoksiJabatanName === 'string' &&
          tupoksiJabatanName.length
      } catch (e) {
        return false
      }
    }
  },
  methods: {
    formatDateLong (value, format = 'eeee, PP') {
      return __formatDateLong(new Date(value), format)
    },
    formatTime (value) {
      return __formatTime(new Date(value))
    },
    onClickEvidence () {
      window.open(this.logbook.evidenceTaskURL, '_blank')
    },
    onClickDocument () {
      window.open(this.logbook.documentTaskURL, '_blank')
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
    onOpenLogbookDetail () {
      this.$store.commit('logbook-list/setLogbookInView', this.logbook)
      this.$router.push({
        path: `/report/detail?id=${this.logbook._id}`
      })
    },
    onEditLogbook () {
      this.$store.commit('logbook-list/setLogbookInView', this.logbook)
      this.$router.push({
        path: `/report/edit?id=${this.logbook._id}`
      })
    },
    async beforeDeleteLogbook () {
      const { value: confirm } = await this.$swal.fire({
        title: 'Hapus laporan?',
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
        this.$emit('delete:success')
        return this.onSuccess('Laporan berhasil dihapus')
      } catch (e) {
        this.$emit('delete:error')
        return this.onError('Gagal menghapus laporan')
      }
    }
  }
}
