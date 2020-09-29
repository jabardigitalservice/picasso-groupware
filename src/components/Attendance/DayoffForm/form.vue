<template>
  <ValidationObserver #default="{ handleSubmit }">
    <div class="dayoff-form">

      <!-- START: DAYOFF TYPE INPUT -->
      <div class="dayoff-form__input-segment">
        <RadioButtonGroup
          name="type"
          title="Jenis Izin"
          required
          rules="required"
          :custom-messages="{
            required: 'Jenis izin harus diisi'
          }"
          :options="dayoffOptions"
          v-model="payload.type"
        />
      </div>
      <!-- END: DAYOFF TYPE INPUT -->

      <!-- START: START & END DATE INPUT -->
      <div class="dayoff-form__input-segment">
        <InputHeader
          label-for="startDate_endDate"
          title="Kapan izinnya"
          required/>
        <div class="dayoff-form__start-end-date">
          <InputDateTime
            name="startDate"
            type="date"
            :min-datetime="minimumStartDate"
            rules="required"
            :custom-messages="{
              required: 'Tanggal harus diisi'
            }"
            placeholder="Tanggal Mulai"
            :value="startDateISOString"
            @change="onStartDateChanged"
          />
          <InputDateTime
            name="endDate"
            type="date"
            :min-datetime="minimumStartDate"
            rules="required"
            :custom-messages="{
              required: 'Tanggal harus diisi'
            }"
            placeholder="Tanggal Akhir"
            :value="endDateISOString"
            @change="onEndDateChanged"
          />
        </div>
      </div>
      <!-- END: START & END DATE INPUT -->

      <!-- START: REASON INPUT -->
      <div class="dayoff-form__input-segment">
        <InputHeader
          label-for="startDate_endDate"
          title="Yuk kasih tau dulu"
          required/>
        <p
          class="dayoff-form__stakeholder-checkbox"
          v-for="(sh, index) in stakeholderOptions" :key="index"
          @click.capture="onStakeholderOptionChecked(sh)">
          <input
            multiple
            type="checkbox"
            :checked="isStakeholderOptionChecked(sh)"/>
          <label>
            {{ sh }}
          </label>
        </p>
      </div>
      <div class="dayoff-form__input-segment">
        <InputTextarea
          name="reason"
          rows="5"
          :placeholder="reasonPlaceholder"
          title="Alasan Izin"
          required
          rules="required"
          :custom-messages="{
            required: 'Alasan harus diisi'
          }"
          v-model="payload.reason"
        />
      </div>
      <!-- END: REASON INPUT -->

      <!-- START: EVIDENCE INPUT -->
      <div class="dayoff-form__input-segment">
        <EvidenceImageInput
          ref="evidenceImageInput"
          name="evidence"
          title="Upload Evidence"
          :url.sync="payload.evidenceURL"
          :path="payload.evidencePath"
          rules="required|mimes:image/*|size:5120"
          accept="image/*"
          :custom-messages="{
            required: 'Evidence harus diisi',
            mimes: 'File harus berupa gambar',
            size: 'Gambar tidak boleh lebih dari 5MB'
          }"
        >
          <template #subtitle>
            <span class="italic text-gray-500">
              File tidak boleh lebih dari 5MB
            </span>
          </template>
        </EvidenceImageInput>
      </div>
      <!-- END: EVIDENCE INPUT -->

      <button class="dayoff-form__btn-submit" @click="handleSubmit(beforeSubmit)">
        Kirim
      </button>
    </div>
    <Dialog :show="showSubmissionDialog">
      <Submission
        v-bind="{ payload }"
        @success="onSubmissionSuccess"
        @error="onSubmissionError"
        @cancel="onCloseConfirmationDialog"
        @close="onCloseConfirmationDialog"/>
    </Dialog>
  </ValidationObserver>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
import setHours from 'date-fns/setHours'

const emptyPayload = {
  type: null,
  startDate: null,
  endDate: null,
  reason: '',
  evidenceURL: '',
  evidencePath: '',
  stakeholders: []
}

const DAYOFF = {
  SICK: 'Sakit',
  LEAVE: 'Izin',
  PAID_LEAVE: 'Cuti Tahunan'
}

const dayoffOptions = [
  DAYOFF.SICK,
  DAYOFF.LEAVE,
  DAYOFF.PAID_LEAVE
]

const STAKEHOLDER = {
  STRUCTURAL: 'Struktural',
  HR: 'HR',
  COORDINATOR: 'Koor',
  WORK_PARTNER: 'Rekan Kerja'
}

const stakeholderOptions = [
  STAKEHOLDER.STRUCTURAL,
  STAKEHOLDER.HR,
  STAKEHOLDER.COORDINATOR,
  STAKEHOLDER.WORK_PARTNER
]

export default {
  components: {
    Submission: () => import('./form-submission'),
    Dialog: () => import('../../Dialog'),
    InputHeader: () => import('../../Form/InputHeader'),
    InputDateTime: () => import('../../Form/InputDateTime'),
    InputTextarea: () => import('../../Form/Textarea'),
    RadioButtonGroup: () => import('../../Form/RadioButtonGroup'),
    EvidenceImageInput: () => import('../../Form/EvidenceImageInput')
  },
  data () {
    return {
      minimumStartDate: setHours(new Date(), 0).toISOString(),
      stakeholderOptions: Object.freeze(stakeholderOptions),
      dayoffOptions: Object.freeze(dayoffOptions),
      reasonPlaceholder: 'Ketikkan alasan izin kamu disini',

      payload: _cloneDeep(emptyPayload),

      showSubmissionDialog: false
    }
  },
  computed: {
    startDateISOString () {
      const { startDate } = this.payload
      return startDate instanceof Date ? startDate.toISOString() : null
    },
    endDateISOString () {
      const { endDate } = this.payload
      return endDate instanceof Date ? endDate.toISOString() : null
    }
  },
  methods: {
    isStakeholderOptionChecked (opt) {
      return this.payload.stakeholders.includes(opt)
    },
    onStakeholderOptionChecked (opt) {
      let { stakeholders } = this.payload
      if (!Array.isArray(stakeholders)) {
        stakeholders = []
      }
      if (this.isStakeholderOptionChecked(opt)) {
        stakeholders = stakeholders.filter((sh) => sh !== opt)
      } else {
        stakeholders.push(opt)
      }
      this.$set(this.payload, 'stakeholders', stakeholders)
    },

    onStartDateChanged (date) {
      if (date) {
        this.$set(this.payload, 'startDate', new Date(date))
      }
    },
    onEndDateChanged (date) {
      if (date) {
        this.$set(this.payload, 'endDate', new Date(date))
      }
    },

    beforeSubmit () {
      this.showSubmissionDialog = true
    },

    onSubmissionSuccess () {
      this.onCloseConfirmationDialog()
    },
    onSubmissionError (/* err */) {
      this.onCloseConfirmationDialog()
    },
    onCloseConfirmationDialog () {
      this.showSubmissionDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dayoff-form {

  &__input-segment {
    & + & {
      margin-top: 1.5rem;
    }
  }

  &__start-end-date {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  &__stakeholder-checkbox {
    > input {
      @apply mr-2;
    }
  }

  &__btn-submit {
    @apply w-full mt-12
    px-4 py-2
    rounded
    bg-blue-600
    text-white;

    &:hover {
      @apply bg-blue-700;
    }
  }
}
</style>
