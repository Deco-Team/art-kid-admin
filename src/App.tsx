import './App.css'
import AuthProvider from './contexts/auth-context'
import Router from './routes'
import ThemeProvider from './themes'

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
