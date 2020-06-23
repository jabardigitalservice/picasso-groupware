<template>
  <div class="max-w-xl mx-auto p-8 bg-white rounded shadow-xl">
    <ValidationObserver #default="{handleSubmit}">
      <FormInput
        name="nameTask"
        title="Task Name"
        type="text"
        rules="required"
        :custom-messages="{
          required: 'Task name must be filled'
        }"
        v-model="payload.nameTask"/>
      <br/>
      <div class="relative">
        <FormRadioButtonGroup
          name="difficultyTask"
          title="Task Difficulty"
          :options="[1,2,3,4,5]"
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
      <div class="relative">
        <FormRadioButtonGroup
          name="urgencyTask"
          title="Task Urgency"
          :options="[1,2,3,4,5]"
          v-model="payload.urgencyTask"
        >
          <template #subtitle>
            <div class="flex justify-between font-bold text-gray-500">
              <small>
                Tidak Penting
              </small>
              <small>
                Penting
              </small>
            </div>
          </template>
        </FormRadioButtonGroup>
      </div>
      <br/>
      <FormInputFile
        name="evidenceTask"
        title="Task Evidence"
        :value.sync="payload.evidenceTask"
        :filename.sync="payload.evidenceTaskFilename"
        :file.sync="payload.evidenceTaskFileBlob"/>
      <br/>
      <FormInputFile
        name="documentTask"
        title="Task Document"
        :value.sync="payload.documentTask"
        :filename.sync="payload.documentTaskFilename"
        :file.sync="payload.documentTaskFileBlob"/>
      <br/>
      <FormInput
        type="text"
        name="organizerTask"
        title="Organizer"
        v-model="payload.organizerTask"/>
      <br/>
      <FormTextarea
        name="otherInformation"
        title="Other Information"/>
      <br/>
      <br/>
      <div class="flex justify-end">
        <button
          class="mr-4 button focus:outline-none
                 bg-gray-200 hover:bg-gray-300 text-gray-500"
          @click="onCancel">
          Cancel
        </button>
        <button
          class="button focus:outline-none
                 bg-brand-blue hover:bg-brand-blue-lighter text-white"
          @click="handleSubmit(onSave)">
          Save
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
const modelData = Object.freeze({
  'dateTask': null, // timestamptz '2020-06-11T06:55:24.698Z'
  'projectId': '5ee3aef4d1beda00113e4337', // ?
  'projectName': 'Sapawarga', // ?
  'nameTask': null, // ?
  'startTimeTask': null, // timestamptz '2020-06-11T06:55:24.698Z'
  'endTimeTask': null, // timestamptz '2020-06-11T06:55:24.698Z'
  'urgencyTask': null, // number in range of [1,5]
  'difficultyTask': null, // number in range of [1, 5]
  'evidenceTask': null, // URI 'http://'
  'documentTask': null, // URI 'http://'
  'organizerTask': null, // ?
  'otherInformation': null // ?
})

export default {
  components: {
    FormInput: () => import('../Form/Input'),
    FormInputFile: () => import('../Form/InputFile'),
    FormTextarea: () => import('../Form/Textarea'),
    FormRadioButtonGroup: () => import('../Form/RadioButtonGroup')
  },
  data () {
    return {
      payload: Object.assign({}, modelData),
      difficultyOptions: Object.freeze(new Array(5).fill(null).map((_, index) => ({
        value: index + 1,
        label: index + 1
      })))
    }
  },
  methods: {
    resetPayload () {
      this.payload = Object.assign({}, modelData)
    },
    onCancel () {
      this.resetPayload()
    },
    onSave () {
      //
    }
  }
}
</script>

<style>

</style>
