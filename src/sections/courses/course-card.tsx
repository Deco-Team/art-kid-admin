import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { formatCurrency } from '~/utils/format-number'

import { CourseCardProps } from '~/interface'
import { useNavigate } from 'react-router-dom'
import Label from '~/components/label'

// ----------------------------------------------------------------------

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate()

  const renderStatus = (
    <Label
      variant='filled'
      color={(course.status === 'REJECTED' && 'error') || (course.status === 'PUBLISHED' && 'success') || 'info'}
    >
      {course.status}
    </Label>
  )

  const renderImg = (
    <Box
      component='img'
      alt={course.title}
      src={course.thumbnail}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute'
      }}
    />
  )

  const renderPrice = <Typography variant='subtitle1'>{formatCurrency(course.price)}</Typography>

  const handleOnClick = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color='inherit' underline='hover' variant='subtitle2' noWrap onClick={() => handleOnClick(course._id)}>
          {course.title}
        </Link>

        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          {renderPrice}
          {course.status && renderStatus}
        </Stack>
      </Stack>
    </Card>
  )
}
