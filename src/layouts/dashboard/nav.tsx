import { useEffect } from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'

import { account } from '~/_mock/account'
import Scrollbar from '~/components/scrollbar'
import { useResponsive } from '~/hooks/use-responsive'
import { usePathname } from '~/routes/hooks/use-pathname'
import RouterLink from '~/routes/router-link'
import { NAV } from './config-layout'
import navConfig from './config-navigation'

// ----------------------------------------------------------------------

interface NavProps {
  openNav: boolean
  onCloseNav: () => void
}

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname()

  const upLg = useResponsive('up', 'lg')

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
      }}
    >
      <Avatar src={account.photoURL} alt='photoURL' />

      <Box sx={{ ml: 2 }}>
        <Typography variant='subtitle2'>{account.displayName}</Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  )

  const renderMenu = (
    <Stack component='nav' spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  )

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH }
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}

// ----------------------------------------------------------------------

interface NavItemProps {
  item: {
    path: string
    icon: React.ReactNode
    title: string
  }
}

function NavItem({ item }: NavItemProps) {
  const pathname = usePathname()

  const active = item.path === pathname

  return (
    <ListItemButton
      component={RouterLink}
      to={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16)
          }
        })
      }}
    >
      <Box component='span' sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component='span'>{item.title} </Box>
    </ListItemButton>
  )
}
