import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Label from '~/components/label'
import useAuth from '~/hooks/use-auth'
import { OrderHistory } from '~/interface'
import { formatCurrency } from '~/utils/format-number'
import ItemsCard from '../item-card'
import dayjs from 'dayjs'

// ----------------------------------------------------------------------

export default function CourseDetailView() {
  const [order, setOrder] = useState<Partial<OrderHistory>>({})
  const params = useParams()
  const orderId = params.orderId
  const { idToken } = useAuth()

  const getCourseDetailData = async () => {
    const orderData = await axios.get(`https://art-kids-api.onrender.com/orders/admin/${orderId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    })
    setOrder(orderData.data.data)
  }
  useEffect(() => {
    getCourseDetailData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderImg = (
    <Box
      component='img'
      alt={order.orderNumber}
      src={order.items?.[0].course.thumbnail}
      sx={{ borderRadius: '10px' }}
    />
  )

  const renderOrderStatus = (
    <Label variant='soft' color={(order.orderStatus === 'DRAFT' && 'info') || 'success'}>
      {order.orderStatus}
    </Label>
  )

  const renderTransactionStatus = (
    <Label
      variant='soft'
      color={
        (order.transactionStatus === 'DRAFT' && 'info') || (order.transactionStatus === 'ERROR' && 'error') || 'success'
      }
    >
      {order.transactionStatus}
    </Label>
  )

  return (
    <Container>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' sx={{ mb: 5 }}>
          {order.orderNumber}
        </Typography>
      </Box>

      <Box display='flex' sx={{ marginBottom: '24px' }}>
        <Box sx={{ width: '30%', marginRight: '24px' }}>{renderImg}</Box>
        <Box sx={{ width: '65%' }}>
          <Typography variant='h4'>Information</Typography>
          <Typography>
            <strong> Customer: </strong>
            {order.customer?.name}
          </Typography>

          <Typography>
            <strong> Order Date: </strong>
            {dayjs(order.orderDate).format('hh:mm DD/MM/YYYY')}
          </Typography>

          <Typography>
            <strong> Total Amount: </strong>
            {formatCurrency(order.totalAmount || 0)}
          </Typography>

          <Typography>
            <strong> Order Status: </strong>
            {renderOrderStatus}
          </Typography>
          <Typography>
            <strong> Transaction Status: </strong>
            {renderTransactionStatus}
          </Typography>
        </Box>
      </Box>
      <Typography variant='h6'>Items</Typography>
      <Box display='flex' sx={{ marginTop: '16px', flexWrap: 'wrap' }}>
        {order.items?.map((item) => (
          <ItemsCard
            key={item.course._id}
            title={item.course.title}
            description={item.course.description}
            type={item.course.type}
            image={item.course.thumbnail || ''}
            price={formatCurrency(item.price || 0)}
          />
        ))}
      </Box>
    </Container>
  )
}
