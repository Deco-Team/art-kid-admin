import { useEffect, useState } from 'react'

import { Box, Button } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '~/hooks/use-auth'
import { Course } from '~/interface'
import { formatCurrency } from '~/utils/format-number'
import Label from '~/components/label'
import { notifyError, notifyLoading, notifySuccess } from '~/toastify'
import CancelCourseModal from '../modal-reject'

// ----------------------------------------------------------------------

export default function CourseDetailView() {
  const [course, setCourse] = useState<Partial<Course>>({})
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.courseId
  const { idToken } = useAuth()
  const [isOpened, setIsOpened] = useState(false)

  const getCourseDetailData = async () => {
    const courseData = await axios.get(`https://art-kids-api.onrender.com/courses/admin/${courseId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    })
    setCourse(courseData.data.data)
  }
  useEffect(() => {
    getCourseDetailData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderImg = <Box component='img' alt={course.title} src={course.thumbnail} sx={{ borderRadius: '10px' }} />

  const renderStatus = (
    <Label
      variant='soft'
      color={(course.status === 'REJECTED' && 'error') || (course.status === 'PUBLISHED' && 'success') || 'info'}
    >
      {course.status}
    </Label>
  )

  const handleApproveCourse = async (courseId: string) => {
    try {
      notifyLoading()
      await axios.patch(
        `https://art-kids-api.onrender.com/courses/admin/${courseId}/approve`,
        {},
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      notifySuccess('Approved course successfully')
      navigate('/courses')
    } catch (error) {
      notifyError('Something went wrong')
    }
  }

  const handleRejectCourse = () => {
    setIsOpened(true)
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  return (
    <Container>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' sx={{ mb: 5 }}>
          {course.title}
        </Typography>
        {course.status === 'PENDING' && courseId && (
          <Box display='flex'>
            <Button
              variant='contained'
              color='success'
              sx={{ marginRight: '24px', height: 'fit-content' }}
              onClick={() => handleApproveCourse(courseId)}
            >
              Approve
            </Button>
            <Button variant='contained' color='error' sx={{ height: 'fit-content' }} onClick={handleRejectCourse}>
              Reject
            </Button>
            <CancelCourseModal open={isOpened} courseId={courseId} handleClose={handleClose} />
          </Box>
        )}
      </Box>

      <Box display='flex'>
        <Box sx={{ width: '30%', marginRight: '24px' }}>{renderImg}</Box>
        <Box sx={{ width: '65%' }}>
          <Typography variant='h4'>General Information</Typography>
          <Typography>
            <strong> Description: </strong>
            {course.description}
          </Typography>

          <Typography>
            <strong> Duration: </strong>
            {course.duration}
          </Typography>

          <Typography>
            <strong> Price: </strong>
            {formatCurrency(course.price || 0)}
          </Typography>

          <Typography>
            <strong> Level: </strong>
            {course.level}
          </Typography>

          <Typography>
            <strong> Status: </strong>
            {renderStatus}
          </Typography>
          {course.rejectReason && (
            <Typography>
              <strong> Reason: </strong>
              {course.rejectReason}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  )
}
