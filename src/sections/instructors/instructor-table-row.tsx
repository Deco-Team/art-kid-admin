import { Link } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Iconify from '~/components/iconify/iconify'
import Label from '~/components/label'

interface InstructorTableRowProps {
  id: string
  selected: boolean
  name: string
  avatarUrl: string
  email: string
  expertise: string
  status: string
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InstructorTableRow: React.FC<InstructorTableRowProps> = ({
  selected,
  name,
  avatarUrl,
  email,
  expertise,
  status,
  id
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOnClick = (instructorId: string) => {
    navigate(`/instructors/${instructorId}`)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
        <TableCell component='th' scope='row' padding='none'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Link color='inherit' underline='hover' variant='subtitle2' noWrap onClick={() => handleOnClick(id)}>
              {name}
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{expertise}</TableCell>

        <TableCell>
          <Label color={(status === 'inactived' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align='right'>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 }
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon='eva:trash-2-outline' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  )
}

export default InstructorTableRow
