export const ATTENDANCE = {
  PRESENT: 'HADIR',
  LEAVE: 'IZIN',
  OTHER: 'OTHER',
  SICK_LEAVE: 'SAKIT',
  PAID_LEAVE: 'CUTI'
}

export const PERMIT = {
  SICK: 'Sakit',
  LEAVE: 'Izin',
  PAID_LEAVE: 'Cuti'
}

export const STAKEHOLDER = {
  STRUCTURAL: 'Struktural',
  HR: 'HR',
  COORDINATOR: 'Koor',
  WORK_PARTNER: 'Rekan Kerja'
}

export const listMonths = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const currentYear = new Date().getFullYear()
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
export const listYear = range(currentYear, currentYear - 2, -1)

export const ASSETS = {
  AVATAR_PLACEHOLDER: '/img/user.svg'
}
