import { ChangeEvent, ReactNode, useState } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/use-auth'
import { bgGradient } from '~/themes/css'
import FileUpload from 'react-material-file-upload'

import { MAX_CATEGORY_IMAGE_FILES, MAX_CATEGORY_IMAGE_FILES_SIZE } from '~/constants'
import { notifyError, notifyLoading, notifySuccess } from '~/toastify'
import useCloudinaryApi from '~/hooks/use-cloudinary-api'
import { v4 } from 'uuid'
import { cloudinaryURLConvert } from '~/utils/common'
import axios from 'axios'

// ----------------------------------------------------------------------

export default function CreateInstructorView() {
  const theme = useTheme()
  const { idToken } = useAuth()
  const navigate = useNavigate()
  const { uploadCloudinary } = useCloudinaryApi()
  const [selectedValue, setSelectedValue] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors }
  } = useForm()

  const uploadImage = async (publicId: string) => {
    try {
      await uploadCloudinary(files, [publicId])
    } catch (error) {
      notifyError('Something went wrong')
    }
  }

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitCreate = async (data: any) => {
    if (files.length <= 0) {
      notifyError('Please upload your image')
      return
    } else {
      const publicId = v4()
      try {
        notifyLoading()
        await axios.post(
          'https://art-kids-api.onrender.com/providers/admin',
          {
            ...data,
            gender: selectedValue,
            image: cloudinaryURLConvert(publicId)
          },
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${idToken}`
            }
          }
        )
      } catch (error) {
        notifyError('Something went wrong')
      } finally {
        await uploadImage(publicId)
        reset()
        setFiles([])
        notifySuccess('Created instructor successfully')
        navigate('/instructors')
      }
    }
  }

  const onBackButton = () => {
    navigate('/instructors')
  }

  const renderForm = (
    <>
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            {...register('name', {
              required: 'Instructor name is required'
            })}
            name='name'
            label='Instructor name'
            error={Boolean(errors.name)}
            helperText={errors.name?.message as ReactNode}
          />
          <TextField
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address'
              }
            })}
            name='email'
            label='Email'
            error={Boolean(errors.email)}
            helperText={errors.email?.message as ReactNode}
          />
          <TextField
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^0\d{9}$/,
                message: 'Invalid phone number'
              }
            })}
            name='phone'
            label='Phone number'
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message as ReactNode}
          />
          <TextField
            {...register('education', {
              required: 'Education is required'
            })}
            name='education'
            label='Education'
            error={Boolean(errors.education)}
            helperText={errors.education?.message as ReactNode}
          />
          <TextField
            {...register('expertise', {
              required: 'Expertise is required'
            })}
            name='expertise'
            label='Expertise'
            error={Boolean(errors.expertise)}
            helperText={errors.expertise?.message as ReactNode}
          />
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Gender</FormLabel>
            <RadioGroup sx={{ flexDirection: 'row' }} onChange={handleRadioChange} defaultValue='MALE'>
              <FormControlLabel value='MALE' control={<Radio />} label='Male' />
              <FormControlLabel value='FEMALE' control={<Radio />} label='Female' />
              <FormControlLabel value='OTHER' control={<Radio />} label='Other' />
            </RadioGroup>
          </FormControl>
          <TextField
            {...register('introduction', {
              required: 'Introduction is required'
            })}
            multiline
            rows={3}
            name='introduction'
            label='Introduction'
            error={Boolean(errors.introduction)}
            helperText={errors.introduction?.message as ReactNode}
          />

          <FileUpload
            sx={{
              border: '1px dashed',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            value={files}
            onChange={setFiles}
            maxFiles={MAX_CATEGORY_IMAGE_FILES}
            maxSize={MAX_CATEGORY_IMAGE_FILES_SIZE}
            accept='image/png, image/jpeg'
            title='Drag image or Click button to upload your Image'
            buttonText='Upload'
          />
        </Stack>

        <Box display='flex' justifyContent='flex-end'>
          <LoadingButton size='large' variant='outlined' color='inherit' onClick={onBackButton} sx={{ px: 4, mx: 2 }}>
            Back
          </LoadingButton>
          <LoadingButton size='large' type='submit' variant='contained' color='inherit' sx={{ px: 4 }}>
            Create
          </LoadingButton>
        </Box>
      </form>
    </>
  )

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg'
        }),
        height: 1
      }}
    >
      <Typography variant='h4' paddingBottom={2}>
        Create New Instructor
      </Typography>

      {renderForm}
    </Box>
  )
}
