import { Helmet } from 'react-helmet-async'
import { InstructorDetailView } from '~/sections/instructors/instructor-detail/view'

// ----------------------------------------------------------------------

export default function InstructorDetailPage() {
  return (
    <>
      <Helmet>
        <title> Instructor Detail</title>
      </Helmet>

      <InstructorDetailView />
    </>
  )
}
