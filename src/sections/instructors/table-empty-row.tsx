import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

// ----------------------------------------------------------------------
interface TableEmptyRows {
  emptyRows: number
  height: number
}

export default function TableEmptyRows({ emptyRows, height }: TableEmptyRows) {
  if (!emptyRows) {
    return null
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows
        })
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  )
}
