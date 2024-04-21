import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Toolbar from '@mui/material/Toolbar'
import Iconify from '~/components/iconify/iconify'

// ----------------------------------------------------------------------
interface InstructorTableToolbar {
  filterName: string
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function HistoryTableToolbar({ filterName, onFilterName }: InstructorTableToolbar) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder='Search order...'
        startAdornment={
          <InputAdornment position='start'>
            <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />
    </Toolbar>
  )
}
