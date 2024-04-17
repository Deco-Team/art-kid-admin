/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

// ----------------------------------------------------------------------
interface SvgColorProps {
  src: string
  sx?: SxProps
}

const SvgColor = forwardRef<SvgColorProps, any>(({ src, sx, ...other }, ref) => (
  <Box
    component='span'
    className='svg-color'
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx
    }}
    {...other}
  />
))

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object
}

export default SvgColor
