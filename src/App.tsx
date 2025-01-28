import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginForm } from './components/auth/components/LoginForm'
import { NotFound } from './components/common/NotFound'
import { ProtectedRoute, ProtectedVeterinaryRoute } from './components/common/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/pet-owner/dashboard" element={<div>Dashboard Pet Owner</div>} />
        <Route element={<ProtectedVeterinaryRoute />}>
          <Route path="/clinic/dashboard" element={<div>Dashboard Veterinary</div>} />
        </Route>
        <Route path="/staff/dashboard" element={<div>Dashboard Staff</div>} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
