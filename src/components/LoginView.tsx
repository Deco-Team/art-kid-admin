import { ReactNode, useEffect, useState } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import useAuth from '~/hooks/use-auth'
import { bgGradient } from '~/themes/css'
import Iconify from './iconify/iconify'
import { useNavigate } from 'react-router-dom'
// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme()
  const { login, idToken } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitLogin = (data: any) => {
    login(data)
  }

  useEffect(() => {
    if (idToken) {
      navigate('/')
    }
  })

  const renderForm = (
    <>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <Stack spacing={3} sx={{ my: 3 }}>
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
            {...register('password', {
              required: 'Password is required'
            })}
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(errors.password)}
            helperText={errors.password?.message as ReactNode}
          />
        </Stack>

        <LoadingButton fullWidth size='large' type='submit' variant='contained' color='inherit'>
          Login
        </LoadingButton>
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
      <Stack alignItems='center' justifyContent='center' sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420
          }}
        >
          <Typography variant='h4' paddingBottom={2}>
            Sign in to Art Kids
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  )
}
