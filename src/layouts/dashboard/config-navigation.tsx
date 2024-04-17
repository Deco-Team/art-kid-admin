import SvgColor from '~/components/svg-color/svg-color'

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics')
  },
  {
    title: 'Instructors',
    path: '/instructors',
    icon: icon('ic_user')
  }
]

export default navConfig
