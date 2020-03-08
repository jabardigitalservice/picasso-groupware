// import _cloneDeep from 'lodash/cloneDeep'
import _set from 'lodash/set'
import Swal from 'sweetalert2'

/**
 *  Sub-item of profile detail
 *  @enum {string} - types of profile detail
*/
export const PROFILE_DETAIL_TYPE = Object.freeze({
  PERSONAL: 'personal',
  DOCUMENTS: 'docs',
  ASSIGNMENT: 'assignment',
  EDUCATION: 'education',
  PREVIOUS_JOB: 'previous_job',
  BANK_ACCOUNT: 'bank_account',
  EMERGENCY_CONTACT: 'emergency_contact',
  ENNEAGRAM: 'enneagram'
})

/**
 *  Types of user documents
 *  @enum {string} - user document type
*/
export const DOCUMENT_TYPE = Object.freeze({
  KTP: 'ktp',
  NPWP: 'npwp',
  KARTU_KELUARGA: 'kartu_keluarga',
  ENNEAGRAM: 'enneagram'
})

/**
 * Document-related namespace
 */
export const DOCUMENT_NAMESPACE = (function () {
  const obj = Object.entries(DOCUMENT_TYPE).reduce((obj, [key, value]) => {
    const documentNamespace = PROFILE_DETAIL_TYPE.DOCUMENTS
    Object.assign(obj, {
      [value]: {
        file: `${documentNamespace}.${value}.document_blob`,
        name: `${documentNamespace}.${value}.document_name`,
        url: `${documentNamespace}.${value}.document_url`
      }
    })
    return obj
  }, {})
  return Object.freeze(obj)
}())

/**
 *  Required fields for each profile detail data type.
 *  Used to perform deep equal comparison in determining whether saving data should be enabled or not (minimizing firestore read/write)
 *  NOTE: Do not export this object to prevent unwanted mutation
 */
export const PROFILE_DATA_SCHEMA = Object.freeze({
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
    'ktp.document_url',
    'ktp.document_name',
    'kartu_keluarga.document_url',
    'kartu_keluarga.document_name',
    'npwp.number',
    'npwp.document_url',
    'npwp.document_name'
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
    'document_url',
    'document_name'
  ]
})

/**
 *  Default profile data object
 */
export const PROFILE_DATA_DEFAULT = (function () {
  const obj = Object.entries(PROFILE_DATA_SCHEMA).reduce((obj, [datatype, fields]) => {
    fields.forEach(field => {
      _set(obj, `${datatype}.${field}`, null)
    })
    return obj
  }, {})
  return Object.freeze(obj)
}())

/**
 * Check if file is type of image
 * @param {string} mimetype
 */
export function isMimeTypeImage (mimetype) {
  return typeof mimetype === 'string' && /(jpe?g)|(gif)|(png)|(bmp)/.test(mimetype)
}

/**
 *  Invalid data alert before save
 */
export function invalidDataAlert () {
  return Swal.fire({
    title: 'Oops!',
    text: 'Pastikan data yang kamu isikan sudah lengkap dan sesuai',
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
    allowEnterKey: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    onBeforeOpen: () => Swal.showLoading()
  })
}

/**
 * Success alert on data save
 */
export function successAlert () {
  return Swal.fire({
    title: 'Berhasil',
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
