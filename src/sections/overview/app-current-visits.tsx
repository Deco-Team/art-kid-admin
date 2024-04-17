import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { styled, useTheme } from '@mui/material/styles'

import { fNumber } from '~/utils/format-number'

import Chart, { useChart } from '~/components/chart'

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400

const LEGEND_HEIGHT = 72

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}))

// ----------------------------------------------------------------------
interface AppCurrentVisitsProps {
  chart: {
    colors?: string
    series: {
      value: number
      label: string
    }[]
    options?: []
  }
  subheader?: string
  title: string
}

export default function AppCurrentVisits({ title, subheader, chart, ...other }: AppCurrentVisitsProps) {
  const theme = useTheme()

  const { colors, series, options } = chart

  const chartSeries = series.map((i) => i.value)

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true
      }
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper]
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center'
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false
          }
        }
      }
    },
    ...options
  })

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

      <StyledChart dir='ltr' type='pie' series={chartSeries} options={chartOptions} width='100%' height={280} />
    </Card>
  )
}
