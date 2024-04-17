/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@iconify/react'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { forwardRef } from 'react'

interface IconifyProps {
  icon: string
  width?: number
  sx: SxProps
}

const Iconify = forwardRef<IconifyProps, any>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className='component-iconify'
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
))

export default Iconify
