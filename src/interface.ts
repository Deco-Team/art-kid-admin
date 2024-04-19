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
  duration: string
  price: number
  level: string
  status: string
  createdAt: string
  updatedAt: string
  slug: string
  provider: CourseProvider
  rejectReason: string
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
