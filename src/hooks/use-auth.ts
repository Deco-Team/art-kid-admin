import React from 'react'
import { AuthContext } from '~/contexts/auth-context'
import { IAuthContextProps } from '~/interface'

const useAuth = () => {
  return React.useContext(AuthContext) as IAuthContextProps
}

export default useAuth
