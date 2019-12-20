export function replaceAll (string, from, to) {
  return string.replace(new RegExp(from, 'g'), to)
}

export function replaceNewLine (string) {
  return string.replace(new RegExp('\\n', 'g'), '\n')
}
