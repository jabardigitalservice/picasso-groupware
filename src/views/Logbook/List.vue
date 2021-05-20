<template>
  <div class="max-w-6xl mx-auto my-16 p-6 md:p-8 bg-white rounded-lg shadow-lg">
    <div v-if="false" class="mb-4 p-4 rounded-md border border-solid border-orange-500 bg-orange-100 text-gray-700">
      <strong>
        <span class="text-orange-700">Perhatian</span>
        <br>
        YUK ISI LAPORAN, SEBELUM WAKTU PENGISIAN BERAKHIR.
      </strong>
      <p v-show="showDetail" class="text-sm mt-4">
        Untuk rekan-rekan yang belum mengisi laporan bulan JULI, batas pengisian laporan adalah
        tanggal 25 agustus 2020 dikarenakan kami melakukan pembatasan aktifitas generated laporan
        per 2 bulan untuk optimalisasi kinerja server.
        <br>
        Jadi jika rekan-rekan tidak mengisi laporan
        bulan JULI melalui aplikasi sapaJDS sampai tanggal 25 agustus 2020 ini, maka data dalam
        server tidak akan bisa ditambah/diubah/dihapus lagi. Semangat mengisi laporan rekan-rekan semuanya :)
      </p>
      <div class="mt-8 flex justify-end md:justify-start">
        <a class="cursor-pointer text-xs text-orange-700 uppercase font-bold" @click.prevent="showDetail = !showDetail">
          {{ showDetail ? 'Tutup' : 'Selengkapnya' }}
        </a>
      </div>
    </div>
    <LogbookList
      :query="logbookListQuery"
      @update:query="onLogbookListQueryUpdated" />
  </div>
</template>

<script>
import _omitBy from 'lodash/omitBy'
import _isNil from 'lodash/isNil'
import { parseQuery } from '../../lib/querystring-parser'

export default {
  components: {
    LogbookList: () => import('../../components/LogbookList')
  },
  data () {
    return {
      showDetail: true,
      logbookListQuery: null
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      deep: true,
      handler (newObject) {
        this.logbookListQuery = parseQuery(newObject, {
          page: Number,
          startDate: String,
          endDate: String
        })
      }
    }
  },
  methods: {
    onLogbookListQueryUpdated (newQuery) {
      this.$router.push({
        query: _omitBy(newQuery, _isNil)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('organizations/fetchProjects')
    })
  }
}
</script>
