import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Label from '~/components/label'
import { ItemCardProps } from '~/interface'

export default function ItemsCard({ title, type, image, price }: ItemCardProps) {
  return (
    <Card sx={{ display: 'flex', height: '100px', width: '370px', marginRight: '12px', marginBottom: '12px' }}>
      <CardMedia
        component='img'
        sx={{ width: 80, objectFit: 'scale-down', borderRadius: '5px' }}
        image={image}
        alt={title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '52px' }}>
        <CardContent
          sx={{
            height: '52px',
            padding: '5px 0px 0px 15px'
          }}
        >
          <Typography variant='h6'>{title}</Typography>
          <Box display='flex' justifyContent='space-between' sx={{ marginTop: 2 }}>
            <Label variant='filled' color={(type === 'PAID' && 'error') || (type === 'FREE' && 'success')}>
              {type}
            </Label>
            <Typography>{price}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}
