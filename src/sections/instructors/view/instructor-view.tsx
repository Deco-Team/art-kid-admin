import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

import { instructors } from '~/_mock/instructors'

import Iconify from '~/components/iconify/iconify'
import Scrollbar from '~/components/scrollbar'
import InstructorTableHead from '../instructor-table-head'
import InstructorTableRow from '../instructor-table-row'
import InstructorTableToolbar from '../intructor-table-toolbar'
import TableEmptyRows from '../table-empty-row'
import TableNoData from '../table-no-data'
import { applyFilter, emptyRows, getComparator } from '../utils'

interface Instructor {
  id: string
  name: string
  expertise: string
  status: string
  email: string
  avatarUrl: string
  isVerified: boolean
}

export default function InstructorPage() {
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<string[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [filterName, setFilterName] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  const handleSort = (_event: React.MouseEvent<unknown>, id: string) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = instructors.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const dataFiltered = applyFilter<Instructor>({
    inputData: instructors,
    comparator: getComparator<Instructor>(order, orderBy as keyof Instructor),
    filterName
  })

  const notFound = !dataFiltered.length && !!filterName

  return (
    <Container>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h4'>Instructors</Typography>
        <Button variant='contained' color='inherit' startIcon={<Iconify icon='eva:plus-fill' />}>
          New Instructor
        </Button>
      </Stack>
      <Card>
        <InstructorTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <InstructorTableHead
                order={order}
                orderBy={orderBy}
                rowCount={instructors.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'expertise', label: 'Expertise' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '', label: '' }
                ]}
              />
              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <InstructorTableRow
                    key={row.id}
                    name={row.name}
                    expertise={row.expertise}
                    status={row.status}
                    email={row.email}
                    avatarUrl={row.avatarUrl}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event as unknown as React.MouseEvent<unknown>, row.name)}
                  />
                ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, instructors.length)} />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component='div'
          count={instructors.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  )
}
