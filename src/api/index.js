import _values from 'lodash/values'

import { db, storage } from '@/lib/firebase'

import { PROFILE_DETAIL_TYPE, DOCUMENT_TYPE } from '../components/Profile/Edit/utils'

/**
 *  @enum {string} - firebase storage folder
*/
export const STORAGE = {
  EMPLOYEE_DOCUMENTS: 'employee_documents'
}

/**
 *  @enum {string} - firebase storage collection
*/
export const COLLECTION = {
  USERS: 'users'
}

/**
 * Get employee storage folder
 * @param {string|number} userId
 * @returns {StorageRef}
 */
function getEmployeeStorageFolder (userId) {
  return storage.child(`${STORAGE.EMPLOYEE_DOCUMENTS}/${userId}`)
}

// =================================================================================
/**
 * Basic handler when userId is not defined as function param
 * @param {string} caller - function name
 * @returns {Promise}
 */
function handleNoUserId (caller) {
  return Promise.reject(new ReferenceError(`${caller}: id must be supplied'`))
}

/**
 * Get user account data
 * @param {string|number} id - user id
 * @returns {object|null} user data if exists
 */
export function getUserById (id) {
  if (!id) return handleNoUserId('getUserById')
  return db
    .collection(COLLECTION.USERS)
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      }
      return null
    })
}

/**
 * Insert or update user profile detail
 * @param {string|number} userId
 * @param {object} data
 * @returns {Promise}
 */
export function upsertUserProfileDetail (userId, data) {
  if (!userId) return handleNoUserId(`updateUserPersonalData`)
  if (!data) return Promise.resolve('noop')

  const allowedFields = _values(PROFILE_DETAIL_TYPE)
  const shouldProceed = Object.keys(data).every(key => allowedFields.includes(key))
  if (!shouldProceed) {
    return Promise.reject(new ReferenceError(`updateUserProfileDetail: updating is only allowed for these keys -> ${allowedFields.join(', ')}`))
  }
  return db
    .collection(COLLECTION.USERS)
    .doc(userId)
    .update(data)
}

/**
 * Insert or update user document to firebase storage
 * @param {string|number} userId
 * @param {string} documentType
 * @param {File} file
 * @param {Function} onProgress - a function that receives (progress: number, snapshot: UploadTask.snapshot) as arguments
 */
export function upsertUserDocument (userId, documentType, file, onProgress) {
  if (!userId) return handleNoUserId('upsertUserDocument')
  if (!file) return Promise.resolve('noop')

  const allowedTypes = _values(DOCUMENT_TYPE)
  const shouldProceed = allowedTypes.includes(documentType)
  if (!shouldProceed) {
    return Promise.reject(new ReferenceError(`upsertUserDocument: document type must be one of ${allowedTypes.join(', ')}`))
  }

  const folder = getEmployeeStorageFolder(userId)
  const ext = file.name.substring(file.name.lastIndexOf('.'))
  const path = folder.child(`${documentType}-${userId}.${ext}`)
  const uploadTask = path.put(file)
  if (typeof onProgress === 'function') {
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      onProgress(progress, snapshot)
    })
  }
  return uploadTask
    .then(snapshot => {
      return snapshot.ref.getDownloadURL()
    })
}
