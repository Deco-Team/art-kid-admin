import { Suspense, lazy } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import DashboardLayout from '~/layouts/dashboard'
import { CourseDetailView } from '~/sections/course-detail/view'

export const LoginPage = lazy(() => import('~/pages/Login'))
export const IndexPage = lazy(() => import('~/pages/App'))
export const InstructorPage = lazy(() => import('~/pages/Instructors'))
export const CoursePage = lazy(() => import('~/pages/Courses'))
export const CourseDetailPage = lazy(() => import('~/pages/CourseDetail'))
export const InstructorDetailPage = lazy(() => import('~/pages/InstructorDetail'))
export const NewInstructorPage = lazy(() => import('~/pages/CreateInstructor'))
export const OrderHistoryPage = lazy(() => import('~/pages/OrderHistory'))
export const OrderDetailPage = lazy(() => import('~/pages/OrderDetail'))

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
        { path: 'instructors/:instructorId', element: <InstructorDetailPage /> },
        { path: 'courses', element: <CoursePage /> },
        { path: 'courses/:courseId', element: <CourseDetailView /> },
        { path: 'new-instructor', element: <NewInstructorPage /> },
        { path: 'history', element: <OrderHistoryPage /> },
        { path: 'history/:orderId', element: <OrderDetailPage /> }
      ]
    },
    {
      path: 'login',
      element: <LoginPage />
    }
  ])

  return routes
}
