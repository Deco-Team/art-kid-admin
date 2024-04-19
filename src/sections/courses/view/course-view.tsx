import { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import axios from 'axios'
import useAuth from '~/hooks/use-auth'
import { Course } from '~/interface'
import CourseCard from '../course-card'
import Loading from '~/components/loading/Loading'
import { DEFAULT_PER_PAGE } from '~/constants'
import usePagination from '~/hooks/use-pagination'
import { Pagination } from '@mui/material'

// ----------------------------------------------------------------------

export default function CoursesView() {
  const [courses, setCourses] = useState<Course[]>([])
  const { idToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const getCourseData = async () => {
    setIsLoading(true)
    try {
      const courseData = await axios.get(
        `https://art-kids-api.onrender.com/courses/admin?page=${page}&limit=${DEFAULT_PER_PAGE}&sort=createdAt.asc%20or%20createdAt.desc_email.asc`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      setCourses(courseData.data.data.docs)
      setTotalPages(Math.ceil(totalPages / DEFAULT_PER_PAGE))
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

  const _DATA = usePagination(courses, DEFAULT_PER_PAGE)
  const count = totalPages

  const handleChange = (_e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
    _DATA.jump(pageNumber)
  }

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
            {_DATA.currentData().map((course) => (
              <Grid key={course._id} xs={12} sm={6} md={3}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={count}
            size='medium'
            page={page}
            variant='outlined'
            shape='rounded'
            onChange={handleChange}
            sx={{ marginTop: '16px' }}
          />
        </Container>
      )}
    </>
  )
}
