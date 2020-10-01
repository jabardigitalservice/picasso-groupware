<template>
  <ValidationObserver #default="{ handleSubmit }">
    <div class="dayoff-form">

      <!-- START: PERMIT TYPE INPUT -->
      <div class="dayoff-form__input-segment">
        <RadioButtonGroup
          name="permitsType"
          title="Jenis Izin"
          required
          rules="required"
          :custom-messages="{
            required: 'Jenis izin harus diisi'
          }"
          :options="permitTypeOptions"
          v-model="payload.permitsType"
        />
      </div>
      <!-- END: PERMIT TYPE INPUT -->

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
            value-zone="local"
            @change="onStartDateChanged"
          />
          <InputDateTime
            name="endDate"
            type="date"
            :min-datetime="startDateISOString"
            rules="required"
            :custom-messages="{
              required: 'Tanggal harus diisi'
            }"
            placeholder="Tanggal Akhir"
            :value="endDateISOString"
            value-zone="local"
            @change="onEndDateChanged"
          />
        </div>
      </div>
      <!-- END: START & END DATE INPUT -->

      <!-- START: REASON INPUT -->
      <ValidationObserver tag="div" class="dayoff-form__input-segment" #default="{ errors }">
        <InputHeader
          label-for="startDate_endDate"
          title="Yuk kasih tau dulu"
          required/>
        <ValidationProvider tag="p"
          class="dayoff-form__stakeholder-checkbox"
          :rules="{ required: { allowFalse: false }}"
          v-for="(ack, index) in permitAcknowledgmentOptions" :key="index"
          @click.native.capture="onAcknowledgementOptionChecked(ack)">
          <input
            multiple
            type="checkbox"
            :name="`permitAcknowledge[${index}]`"
            :value="isAcknowledgementOptionChecked(ack)"
            :checked="isAcknowledgementOptionChecked(ack)"/>
          <label>
            {{ ack }}
          </label>
        </ValidationProvider>
        <p v-if="isSomePermitAcknowledgementEmpty(errors)"
          class="form-input__error-hint mt-2">
          Oops, kamu belum ngasih tahu kesemua stakeholder.
          <br>
          Yuk kasih tahu dulu, lalu checklist formnya.
        </p>
      </ValidationObserver>
      <div class="dayoff-form__input-segment">
        <InputTextarea
          name="reason"
          rows="5"
          :placeholder="notePlaceholder"
          title="Alasan Izin"
          required
          rules="required"
          :custom-messages="{
            required: 'Alasan harus diisi'
          }"
          v-model="payload.note"
        />
      </div>
      <!-- END: REASON INPUT -->

      <!-- START: EVIDENCE INPUT -->
      <div class="dayoff-form__input-segment">
        <EvidenceImageInput
          ref="evidenceImageInput"
          name="evidence"
          title="Upload Evidence"
          rules="required|mimes:image/*|size:5120"
          accept="image/*"
          :custom-messages="{
            required: 'Evidence harus diisi',
            mimes: 'File harus berupa gambar',
            size: 'Gambar tidak boleh lebih dari 5MB'
          }"
          @change:url="onEvidenceImageURLChanged"
          @change:file="onEvidenceImageFileChanged"
        >
          <template #subtitle>
            <span class=" text-gray-600">
              Misal: Foto/file surat dokter, chat izin ke koor/HR/rekan
            </span>
          </template>
        </EvidenceImageInput>
      </div>
      <!-- END: EVIDENCE INPUT -->

      <button class="dayoff-form__btn-submit" @click="handleSubmit(beforeSubmit)">
        Kirim
      </button>
    </div>
    <Dialog :show="showSubmissionDialog" max-width="480px">
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
  permitsType: null,
  permitAcknowledged: [],
  startDate: null,
  endDate: null,
  note: null,
  file: null,
  imageFile: null,
  imageURL: null
}

const PERMIT = {
  SICK: 'Sakit',
  LEAVE: 'Izin',
  PAID_LEAVE: 'Cuti'
}

const permitTypeOptions = [
  PERMIT.SICK,
  PERMIT.LEAVE,
  PERMIT.PAID_LEAVE
]

const STAKEHOLDER = {
  STRUCTURAL: 'Struktural',
  HR: 'HR',
  COORDINATOR: 'Koor',
  WORK_PARTNER: 'Rekan Kerja'
}

const permitAcknowledgmentOptions = [
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
      permitAcknowledgmentOptions: Object.freeze(permitAcknowledgmentOptions),
      permitTypeOptions: Object.freeze(permitTypeOptions),
      notePlaceholder: 'Ketikkan alasan izin kamu disini',

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
    isAcknowledgementOptionChecked (opt) {
      return this.payload.permitAcknowledged.includes(opt)
    },
    onAcknowledgementOptionChecked (opt) {
      let { permitAcknowledged } = this.payload
      if (!Array.isArray(permitAcknowledged)) {
        permitAcknowledged = []
      }
      if (this.isAcknowledgementOptionChecked(opt)) {
        permitAcknowledged = permitAcknowledged.filter((ack) => ack !== opt)
      } else {
        permitAcknowledged.push(opt)
      }
      this.$set(this.payload, 'permitAcknowledged', permitAcknowledged)
    },

    isSomePermitAcknowledgementEmpty (validationObserverErrors) {
      return validationObserverErrors && typeof validationObserverErrors === 'object' &&
        Object.values(validationObserverErrors).some((arr) => Array.isArray(arr) && arr.length)
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

    onEvidenceImageURLChanged (url) {
      this.$set(this.payload, 'imageURL', url)
    },
    onEvidenceImageFileChanged (file) {
      this.$set(this.payload, 'imageFile', file)
    },

    beforeSubmit () {
      this.showSubmissionDialog = true
    },

    onSubmissionSuccess () {
      this.onCloseConfirmationDialog()
      this.$router.replace('/')
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
