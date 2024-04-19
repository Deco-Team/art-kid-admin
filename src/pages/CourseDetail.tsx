import { Helmet } from 'react-helmet-async'
import { CourseDetailView } from '~/sections/course-detail/view'

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Courses Detail</title>
      </Helmet>

      <CourseDetailView />
    </>
  )
}
