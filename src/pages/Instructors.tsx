import { Helmet } from 'react-helmet-async'
import InstructorPage from '~/sections/instructors/view/instructor-view'

// ----------------------------------------------------------------------

export default function InstructorsPage() {
  return (
    <>
      <Helmet>
        <title>Instructor </title>
      </Helmet>

      <InstructorPage />
    </>
  )
}
