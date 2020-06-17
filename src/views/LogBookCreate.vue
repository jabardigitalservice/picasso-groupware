<template>
    <div>
        <div class="text-center">
            <p class="text-sm">Buat Laporan</p>
        </div>
        <log-book-form />
    </div>
</template>
<script>
import LogBookForm from '../components/LogBookForm'
export default {
  name: 'LogBookCreate',
  components: {
    LogBookForm
  }
}
</script>
