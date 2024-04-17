/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, forwardRef, memo } from 'react'

import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { StyledRootScrollbar, StyledScrollbar } from './styles'

// ----------------------------------------------------------------------

interface ScrollbarProps {
  children: ReactNode
  sx?: SxProps
}

const Scrollbar = forwardRef<ScrollbarProps, any>(({ children, sx, ...other }, ref) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    )
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  )
})

export default memo(Scrollbar) as React.NamedExoticComponent<ScrollbarProps>
