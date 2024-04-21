/* eslint-disable @typescript-eslint/no-explicit-any */
export const visuallyHidden: React.CSSProperties = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)'
}

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number): number {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (a[orderBy] === null) {
    return 1
  }
  if (b[orderBy] === null) {
    return -1
  }
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<T>(order: 'asc' | 'desc', orderBy: keyof T): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function applyFilter<T>({
  inputData,
  comparator,
  filterName
}: {
  inputData: T[]
  comparator: (a: T, b: T) => number
  filterName: string | null
}): T[] {
  const stabilizedThis = inputData.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0] as T, b[0] as T)
    if (order !== 0) return order
    return (a[1] as number) - (b[1] as number)
  })

  inputData = stabilizedThis.map((el) => el[0]) as T[]

  if (filterName) {
    inputData = inputData.filter((user) => (user as any).name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
  }

  return inputData
}
