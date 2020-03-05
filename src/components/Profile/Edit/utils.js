import Swal from 'sweetalert2'
import _get from 'lodash/get'
import _set from 'lodash/set'

import { PROFILE_DETAIL_TYPE, getEnumeratedValues } from '../../../api'

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
  const allowed = getEnumeratedValues(PROFILE_DETAIL_TYPE)
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
 * Incomplete data alert before save
 */
export function incompleteDataAlert () {
  return Swal.fire({
    title: 'Oops!',
    text: 'Ada isian yang belum dilengkapi',
    icon: 'info'
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
export function errorAlert () {
  return Swal.fire({
    title: 'Oops! Terjadi Kesalahan',
    text: 'Data kamu tidak berhasil disimpan',
    icon: 'error',
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Tutup'
  })
}
