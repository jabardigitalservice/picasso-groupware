import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export function formatDateTimeShort (date, formatStr = 'eeee, PP p') {
  return format(date, formatStr, {
    locale: id
  })
}
