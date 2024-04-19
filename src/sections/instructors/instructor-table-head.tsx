import Box from '@mui/material/Box'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import React from 'react'
import { visuallyHidden } from './utils'

interface HeadCell {
  id: string
  label: string
  align?: TableCellProps['align']
  width?: string
  minWidth?: string
}

interface InstructorTableHeadProps {
  order: 'asc' | 'desc'
  orderBy: string
  rowCount: number
  headLabel: HeadCell[]
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InstructorTableHead({ order, orderBy, headLabel, onRequestSort }: InstructorTableHeadProps) {
  const onSort = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
