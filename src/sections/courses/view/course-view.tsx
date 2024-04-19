import { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import axios from 'axios'
import useAuth from '~/hooks/use-auth'
import { Course } from '~/interface'
import CourseCard from '../course-card'
import Loading from '~/components/loading/Loading'

// ----------------------------------------------------------------------

export default function CoursesView() {
  const [courses, setCourses] = useState<Course[]>([])
  const { idToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const getCourseData = async () => {
    setIsLoading(true)
    try {
      const courseData = await axios.get(
        'https://art-kids-api.onrender.com/courses/admin?page=1&limit=10&sort=createdAt.asc%20or%20createdAt.desc_email.asc',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      setCourses(courseData.data.data.docs)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getCourseData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Typography variant='h4' sx={{ mb: 5 }}>
            Courses
          </Typography>

          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid key={course._id} xs={12} sm={6} md={3}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  )
}
