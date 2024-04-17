import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import Chart, { useChart } from '~/components/chart'

// ----------------------------------------------------------------------
interface AppWebsiteVisitsProps {
  chart: {
    labels: string[]
    colors?: string[]
    series: { name: string; type: string; fill: string; data: number[] }[]
    options?: []
  }
  subheader?: string
  title?: string
}

export default function AppWebsiteVisits({ title, subheader, chart, ...other }: AppWebsiteVisitsProps) {
  const { labels, colors, series, options } = chart

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%'
      }
    },
    labels,
    xaxis: {
      type: 'datetime'
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`
          }
          return value
        }
      }
    },
    ...options
  })

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart dir='ltr' type='line' series={series} options={chartOptions} width='100%' height={364} />
      </Box>
    </Card>
  )
}
