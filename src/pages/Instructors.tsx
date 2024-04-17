import { Helmet } from 'react-helmet-async'
import InstructorPage from '~/sections/instructors/view/instructor-view'

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title>Instructor </title>
      </Helmet>

      <InstructorPage />
    </>
  )
}
