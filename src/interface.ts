import { ReactNode } from 'react'

export interface LoginProps {
  email: string
  password: string
}

export interface IUser {
  name: string
  sub: string
  role: string
  iat: number
  exp: number
}

export interface IAuthProviderProps {
  children: ReactNode
}

export interface IAuthContextProps {
  user: IUser | undefined
  idToken: string | null
  login: ({ email, password }: LoginProps) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

export interface CourseProvider {
  _id: string
  name: string
  image: string
}

export interface Course {
  _id: string
  title: string
  description: string
  objective: string
  thumbnail: string
  duration: number
  price: number
  level: string
  status: string
  lessons: Lesson[]
  createdAt: string
  updatedAt: string
  slug: string
  provider: CourseProvider
  type: string
  rejectReason: string
}

interface Lesson {
  title: string
  description: string
  objective: string
  video: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface CourseCardProps {
  course: Course
}

export interface OrderModalProps {
  open: boolean
  handleClose: () => void
  courseId: string
}

export interface ICancelOrderProps {
  rejectReason: string
}

export interface LessonCardProps {
  title: string
  description: string
  url: string
  type: string
  image: string
}

export interface IProvider {
  _id: string
  name: string
  email: string
  phone: string
  gender: string
  status: string
  image: string
  introduction: string
  education: string
  expertise: string
  createdAt: string
  updatedAt: string
}
