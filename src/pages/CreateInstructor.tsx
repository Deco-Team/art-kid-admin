import { Helmet } from 'react-helmet-async'
import CreateInstructorView from '~/sections/new-instructor/view/new-instructor-view'

// ----------------------------------------------------------------------

export default function CreateInstructorPage() {
  return (
    <>
      <Helmet>
        <title> New Instructor </title>
      </Helmet>

      <CreateInstructorView />
    </>
  )
}
