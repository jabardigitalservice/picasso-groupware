import Swal from 'sweetalert2'
import _get from 'lodash/get'
import _set from 'lodash/set'
import _values from 'lodash/values'

import { upsertUserProfileDetail } from '../../../api'

/**
 *  @enum {string} - types of profile detail
*/
export const PROFILE_DETAIL_TYPE = {
  PERSONAL: 'personal',
  DOCUMENTS: 'docs',
  ASSIGNMENT: 'assignment',
  EDUCATION: 'education',
  PREVIOUS_JOB: 'previous_job',
  BANK_ACCOUNT: 'bank_account',
  EMERGENCY_CONTACT: 'emergency_contact',
  ENNEAGRAM: 'enneagram'
}

/**
 *  @enum {string} - user document type
*/
export const DOCUMENT_TYPE = {
  KTP: 'ktp',
  NPWP: 'npwp',
  KARTU_KELUARGA: 'kartu_keluarga'
}

/**
 *  Required fields for each profile detail data type.
 *  Used to perform deep equal comparison in determining whether saving data should be enabled or not (minimizing firestore read/write)
 */
export const profileObjectReference = {
  [PROFILE_DETAIL_TYPE.PERSONAL]: [
    'name',
    'birth_city',
    'birth_date',
    'religion',
    'marital_status',
    'ktp_address',
    'current_address',
    'phone_number',
    'email'
  ],
  [PROFILE_DETAIL_TYPE.PREVIOUS_JOB]: [
    'has_previous_job',
    'company',
    'position',
    'length',
    'salary'
  ],
  [PROFILE_DETAIL_TYPE.EDUCATION]: [
    'level',
    'major',
    'institution',
    'end_date'
  ],
  [PROFILE_DETAIL_TYPE.DOCUMENTS]: [
    'ktp.number',
    'ktp.doc',
    'kartu_keluarga.doc',
    'npwp.number',
    'npwp.doc'
  ],
  [PROFILE_DETAIL_TYPE.ASSIGNMENT]: [
    'job',
    'start_date'
  ],
  [PROFILE_DETAIL_TYPE.EMERGENCY_CONTACT]: [
    'name',
    'number',
    'relationship'
  ],
  [PROFILE_DETAIL_TYPE.BANK_ACCOUNT]: [
    'account_holder',
    'account_number',
    'bank_name',
    'bank_branch'
  ],
  [PROFILE_DETAIL_TYPE.ENNEAGRAM]: [
    'doc'
  ]
}

/**
 *  Populate required profile data fields, since a change in schema could result in incomplete data fields
 */
export function populateProfileDataFields (datatype, currentData = {}) {
  if (!datatype) throw new ReferenceError(`populateProfileDataFields: datatype must be supplied`)
  const allowed = _values(PROFILE_DETAIL_TYPE)
  if (!allowed.includes(datatype)) throw new ReferenceError(`populateProfileDataFields: datatype must be one of ${allowed.join(', ')}`)

  if (!currentData || typeof currentData !== 'object') throw new TypeError(`populateProfileDataFields: either currentData is null or not typeof object`)

  const refs = profileObjectReference[datatype]
  const mCurrentData = JSON.parse(JSON.stringify(currentData))
  refs.forEach(field => {
    const isFieldExist = _get(mCurrentData, field)
    if (!isFieldExist) {
      _set(mCurrentData, field, null)
    }
  })
  return mCurrentData
}

/**
 *  Invalid data alert before save
 */
export function invalidDataAlert () {
  return Swal.fire({
    title: 'Oops!',
    text: 'Pastikan data yang kamu diisikan sudah lengkap dan sesuai',
    icon: 'info'
  })
}

/**
 *  Saving alert before save
 */
export function savingAlert () {
  return Swal.fire({
    title: 'Tunggu sebentar ya',
    showConfirmButton: false,
    showCancelButton: false,
    onBeforeOpen: () => Swal.showLoading()
  })
}

/**
 * Success alert on data save
 */
export function successAlert () {
  return Swal.fire({
    title: 'Behasil',
    text: 'Data kamu berhasil disimpan',
    icon: 'success',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Okay!'
  })
}

/**
 * Error alert on data save
 */
export function errorAlert (e) {
  return Swal.fire({
    title: 'Oops! Terjadi Kesalahan',
    text: e || 'Data kamu tidak berhasil disimpan',
    icon: 'error',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Tutup'
  })
}

/**
 * On development alert
 */
export function onDevelopmentAlert () {
  return Swal.fire({
    title: 'Fitur ini masih dalam tahap pengembangan',
    icon: 'info',
    showConfirmButton: true,
    confirmButtonText: 'Okay'
  })
}

/**
 * Common save method for all profile data editing
 * @param {object} validator - instance of VeeValidate.ValidationObserver
 * @param {string|number} userId
 * @param {object} data
 */
export function validateAndSave (validator, userId, data) {
  if (!validator || typeof validator.validate !== 'function') {
    throw new ReferenceError('validateAndSave: validator must be an instance of VeeValidate.ValidationObserver')
  }
  savingAlert()
  return validator.validate()
    .then(async valid => {
      if (valid) {
        await upsertUserProfileDetail(userId, data)
        await successAlert()
        return true
      }
      throw new ReferenceError('validation_failed')
    }).catch(async e => {
      if (e === 'validation_failed') {
        await invalidDataAlert()
      } else {
        await errorAlert(e)
      }
      return false
    }).finally(() => {
      Swal.close()
    })
}
