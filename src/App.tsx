import React from 'react'
import Routes from './routes'
import { AuthProvider } from './context/auth'

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  )
}

export default App
