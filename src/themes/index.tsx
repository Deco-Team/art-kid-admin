/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from 'prop-types'
import { ReactNode, useMemo } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

import { customShadows } from './custom-shadows'
import { overrides } from './overrides'
import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 }
    }),
    []
  ) as any

  const theme = createTheme(memoizedValue) as any

  theme.components = overrides(theme)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}
