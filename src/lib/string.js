export function replaceAll (string, from, to) {
  return string.replace(new RegExp(from, 'g'), to)
}

export function replaceNewLine (string) {
  return string.replace(new RegExp('\\n', 'g'), '\n')
}

export const googleDriveUrl = 'https://drive.google.com/thumbnail?&id='

export function getIdFromUrl (url) {
  // ensure that url is string, so `match` is a valid property
  if (typeof url === 'string' && url.length) {
    let idImage = url.match(/[-\w]{25,}/)
    if (idImage.length > 0) {
      idImage = idImage[0]
    }
    return idImage
  }
  return null
}
