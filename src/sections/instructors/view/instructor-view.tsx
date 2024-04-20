import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Iconify from '~/components/iconify/iconify'
import Scrollbar from '~/components/scrollbar'
import useAuth from '~/hooks/use-auth'
import InstructorTableHead from '../instructor-table-head'
import InstructorTableRow from '../instructor-table-row'
import InstructorTableToolbar from '../intructor-table-toolbar'
import TableEmptyRows from '../table-empty-row'
import TableNoData from '../table-no-data'
import { applyFilter, emptyRows, getComparator } from '../utils'
import { useNavigate } from 'react-router-dom'

interface Instructor {
  _id: string
  name: string
  email: string
  phone: string
  gender: string
  status: string
  image: string
  expertise: string
}

export default function InstructorPage() {
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<string[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [filterName, setFilterName] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [instructorsData, setInstructorsData] = useState<Instructor[]>([])
  const { idToken } = useAuth()
  const navigate = useNavigate()

  const handleSort = (_event: React.MouseEvent<unknown>, id: string) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = instructorsData.map((n) => n.name)
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
    setPage(1)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setFilterName(event.target.value)
  }

  const dataFiltered = applyFilter<Instructor>({
    inputData: instructorsData,
    comparator: getComparator<Instructor>(order, orderBy as keyof Instructor),
    filterName
  })

  const notFound = !dataFiltered.length && !!filterName

  const getInstructorsData = async () => {
    try {
      const instructorData = await axios.get(
        `https://art-kids-api.onrender.com/providers/admin?page=${page + 1}&limit=10&sort=createdAt.asc%20or%20createdAt.desc_email.asc`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      setInstructorsData(instructorData.data.data.docs)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewInstructorButton = () => {
    navigate('/new-instructor')
  }
  useEffect(() => {
    getInstructorsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <Container>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h4'>Instructors</Typography>
        <Button
          variant='contained'
          color='inherit'
          startIcon={<Iconify icon='eva:plus-fill' />}
          onClick={handleNewInstructorButton}
        >
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
                rowCount={instructorsData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'expertise', label: 'Expertise' },
                  { id: 'status', label: 'Status' },
                  { id: '', label: '' }
                ]}
              />
              <TableBody>
                {dataFiltered.map((row) => (
                  <InstructorTableRow
                    id={row._id}
                    key={row._id}
                    name={row.name}
                    expertise={row.expertise}
                    status={row.status}
                    email={row.email}
                    avatarUrl={row.image}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event as unknown as React.MouseEvent<unknown>, row.name)}
                  />
                ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, instructorsData.length)} />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component='div'
          count={instructorsData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  )
}
