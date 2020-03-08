import _values from 'lodash/values'

import { db, storage, Timestamp } from '@/lib/firebase'

import { DOCUMENT_TYPE } from '../components/Profile/Edit/utils'

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
 * Get stored file metadata
 * @param {string} publicURL - public URL of stored file in Firebase Storage, the one that starts with https:// instead of gs://
 * @returns {Promise} a promise that resolves metadata in typeof object
 */
export function getStoredFileMetadata (publicURL) {
  return storage.refFromURL(publicURL).getMetadata()
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

  return db
    .collection(COLLECTION.USERS)
    .doc(userId)
    .update({
      updated_at: Timestamp.now(),
      ...data
    })
}

/**
 * Insert or update user document to firebase storage
 * @param {string|number} userId
 * @param {string} documentType
 * @param {File} file
 * @param {Function} onProgress - a function that receives (progress: number, snapshot: UploadTask.snapshot) as arguments
 * @returns {Promise>} the resolved URL of stored file
 */
export function upsertUserDocument (userId, documentType, file, onProgress) {
  if (!userId) return handleNoUserId('upsertUserDocument')
  if (!file) return Promise.resolve('noop')

  const allowedTypes = _values(DOCUMENT_TYPE)
  const shouldProceed = allowedTypes.includes(documentType)
  if (!shouldProceed) {
    return Promise.reject(new ReferenceError(`upsertUserDocument: document type must be one of ${allowedTypes.join(', ')}`))
  }

  const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
  const storageRef = storage.ref().child(`${STORAGE.EMPLOYEE_DOCUMENTS}/${userId}/${documentType}-${userId}.${ext}`)
  const uploadTask = storageRef.put(file)
  if (typeof onProgress === 'function') {
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      onProgress(progress, snapshot)
    })
  }
  return uploadTask
    .then(snapshot => {
      return snapshot.ref.getDownloadURL()
    })
}

export function deleteUserDocument (userId, filePublicURL) {
  if (!userId) return handleNoUserId('deleteUserDocument')
  if (!filePublicURL) return Promise.reject(new ReferenceError('deleteUserDocument: filePublicURL must be supplied'))

  const storageRef = storage.refFromURL(filePublicURL)
  return storageRef.delete()
}
