import { Helmet } from 'react-helmet-async'
import { OrderDetailView } from '~/sections/order-detail/view'

// ----------------------------------------------------------------------

export default function OrderDetailPage() {
  return (
    <>
      <Helmet>
        <title> Order Detail</title>
      </Helmet>

      <OrderDetailView />
    </>
  )
}
