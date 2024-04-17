/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, getTime, formatDistanceToNow } from 'date-fns'

// ----------------------------------------------------------------------

export function fDate({ date, newFormat }: { date: Date; newFormat: string }) {
  const fm = newFormat || 'dd MMM yyyy'

  return date ? format(new Date(date), fm) : ''
}

export function fDateTime({ date, newFormat }: any) {
  const fm = newFormat || 'dd MMM yyyy p'

  return date ? format(new Date(date), fm) : ''
}

export function fTimestamp(date: Date) {
  return date ? getTime(new Date(date)) : ''
}

export function fToNow(date: Date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true
      })
    : ''
}
