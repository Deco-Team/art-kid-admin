import { Helmet } from 'react-helmet-async'
import LoginView from '~/components/LoginView'

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <LoginView />
    </>
  )
}
