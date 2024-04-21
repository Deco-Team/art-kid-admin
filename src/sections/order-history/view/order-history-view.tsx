import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Scrollbar from '~/components/scrollbar'
import useAuth from '~/hooks/use-auth'
import { OrderHistory } from '~/interface'
import HistoryTableHead from '../history-table-head'
import HistoryTableRow from '../history-table-row'
import TableEmptyRows from '../table-empty-row'
import { emptyRows } from '../utils'

export default function InstructorPage() {
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<string>('name')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [historyData, setHistoryData] = useState<OrderHistory[]>([])
  const { idToken } = useAuth()

  const handleSort = (_event: React.MouseEvent<unknown>, id: string) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const getOrderHistoryData = async () => {
    try {
      const orderHistory = await axios.get(
        `https://art-kids-api.onrender.com/orders/admin?page=${page + 1}&limit=10&sort=createdAt.asc%20or%20createdAt.desc_email.asc`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      setHistoryData(orderHistory.data.data.docs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrderHistoryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <Container>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h4'>Order History</Typography>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <HistoryTableHead
                order={order}
                orderBy={orderBy}
                rowCount={historyData.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'orderNumber', label: 'Order Number' },
                  { id: 'customer', label: 'Customer' },
                  { id: 'orderDate', label: 'Order Date' },
                  { id: 'totalAmount', label: 'Total Amount' },
                  { id: 'orderStatus', label: 'Order Status' },
                  { id: 'transactionStatus', label: 'Transaction Status' }
                ]}
              />
              <TableBody>
                {historyData.map((row) => (
                  <HistoryTableRow
                    id={row._id}
                    key={row._id}
                    orderNumber={row.orderNumber}
                    customer={row.customer.name}
                    orderStatus={row.orderStatus}
                    transactionStatus={row.transactionStatus}
                    orderDate={dayjs(row.orderDate).format('hh:mm DD/MM/YYYY')}
                    totalAmount={row.totalAmount}
                  />
                ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, historyData.length)} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component='div'
          count={historyData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  )
}
