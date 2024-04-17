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
