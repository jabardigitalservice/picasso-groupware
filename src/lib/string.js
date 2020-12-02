export function replaceAll (string, from, to) {
  return string.replace(new RegExp(from, 'g'), to)
}

export function replaceNewLine (string) {
  return string.replace(new RegExp('\\n', 'g'), '\n')
}

export const googleDriveUrl = 'https://drive.google.com/uc?export=view&id='

export function getIdFromUrl (url) {
  let idImage = url.match(/[-\w]{25,}/)
  if (idImage.length > 0) {
    idImage = idImage[0]
  }
  return idImage
}
