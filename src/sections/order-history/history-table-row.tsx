import { Link } from '@mui/material'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Label from '~/components/label'
import { formatCurrency } from '~/utils/format-number'

interface HistoryTableRowProps {
  id: string
  orderNumber: string
  customer: string
  orderDate: string
  orderStatus: string
  transactionStatus: string
  totalAmount: number
}

const HistoryTableRow: React.FC<HistoryTableRowProps> = ({
  id,
  orderNumber,
  customer,
  orderDate,
  orderStatus,
  transactionStatus,
  totalAmount
}) => {
  const navigate = useNavigate()

  const handleOnClick = (orderId: string) => {
    navigate(`/history/${orderId}`)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role='checkbox'>
        <TableCell component='th' scope='row' padding='none'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Link color='inherit' underline='hover' variant='subtitle2' noWrap onClick={() => handleOnClick(id)}>
              {orderNumber}
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{customer}</TableCell>

        <TableCell>{orderDate}</TableCell>

        <TableCell>{formatCurrency(totalAmount || 0)}</TableCell>

        <TableCell>
          <Label color={(orderStatus === 'PENDING' && 'info') || 'success'}>{orderStatus}</Label>
        </TableCell>

        <TableCell>
          <Label
            color={(transactionStatus === 'DRAFT' && 'info') || (transactionStatus === 'ERROR' && 'error') || 'success'}
          >
            {transactionStatus}
          </Label>
        </TableCell>
      </TableRow>
    </>
  )
}

export default HistoryTableRow
