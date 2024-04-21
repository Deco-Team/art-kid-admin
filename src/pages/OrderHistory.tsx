import { Helmet } from 'react-helmet-async'
import { OrderHistoryView } from '~/sections/order-history/view'

// ----------------------------------------------------------------------

export default function OrderHistoryPage() {
  return (
    <>
      <Helmet>
        <title> Order History </title>
      </Helmet>

      <OrderHistoryView />
    </>
  )
}
