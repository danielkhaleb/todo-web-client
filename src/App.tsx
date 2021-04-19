import React from 'react'
import Routes from './routes'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/auth'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
        <ToastContainer />
      </AuthProvider>
    </div>
  )
}

export default App
