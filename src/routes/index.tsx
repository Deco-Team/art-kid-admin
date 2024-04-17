import { Suspense, lazy } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import DashboardLayout from '~/layouts/dashboard'

export const LoginPage = lazy(() => import('~/pages/Login'))
export const IndexPage = lazy(() => import('~/pages/App'))
export const InstructorPage = lazy(() => import('~/pages/Instructors'))

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'instructors', element: <InstructorPage /> },
        // { path: 'new-instructor', element: <CreateInstructorPage />}
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> }
      ]
    },
    {
      path: 'login',
      element: <LoginPage />
    }
  ])

  return routes
}
