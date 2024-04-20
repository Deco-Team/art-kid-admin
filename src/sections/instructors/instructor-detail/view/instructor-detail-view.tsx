import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Label from '~/components/label'
import useAuth from '~/hooks/use-auth'
import { IProvider } from '~/interface'

// ----------------------------------------------------------------------

export default function InstructorDetailView() {
  const [instructor, setInstructor] = useState<Partial<IProvider>>({})
  const params = useParams()
  const instructorId = params.instructorId
  const { idToken } = useAuth()

  const getInstructorDetailData = async () => {
    const instructorData = await axios.get(`https://art-kids-api.onrender.com/providers/admin/${instructorId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    })
    setInstructor(instructorData.data.data)
  }
  useEffect(() => {
    getInstructorDetailData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderImg = <Box component='img' alt={instructor.name} src={instructor.image} sx={{ borderRadius: '10px' }} />

  const renderStatus = (
    <Label variant='soft' color={(instructor.status === 'INACTIVE' && 'error') || 'success'}>
      {instructor.status}
    </Label>
  )

  return (
    <Container>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' sx={{ mb: 5 }}>
          {instructor.name}
        </Typography>
      </Box>

      <Box display='flex' sx={{ marginBottom: '24px' }}>
        <Box sx={{ width: '30%', marginRight: '24px' }}>{renderImg}</Box>
        <Box sx={{ width: '65%' }}>
          <Typography variant='h4'>General Information</Typography>
          <Typography>
            <strong> Email: </strong>
            {instructor.email}
          </Typography>

          <Typography>
            <strong> Phone: </strong>
            {instructor.phone}
          </Typography>

          <Typography>
            <strong> Gender: </strong>
            {instructor.gender}
          </Typography>

          <Typography>
            <strong> Education: </strong>
            {instructor.education}
          </Typography>

          <Typography>
            <strong> Introduction: </strong>
            {instructor.introduction}
          </Typography>

          <Typography>
            <strong> Status: </strong>
            {renderStatus}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
