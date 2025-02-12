import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { I18nextProvider } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginForm } from './components/auth/LoginForm';
import { NotFound } from './components/common/NotFound';
import { ProtectedRoute, ProtectedStaffRoute, ProtectedVeterinaryRoute } from './components/common/ProtectedRoute';
import CreateClinic from './components/staff/clinic/CreateClinic';
import CreateClinicOwner from './components/staff/clinic/CreateClinicOwner';
import EditClinic from './components/staff/clinic/EditClinic';
import ViewClinic from './components/staff/clinic/ViewClinic';
import ViewClinics from './components/staff/clinic/ViewClinics';
import Settings from './components/staff/Settings';
import StaffLayout from './components/staff/StaffLayout';
import i18n from './i18n/i18n';
function App() {
  useAuthRedirect() // If Refresh Token Fails, redirect to login page
  return (
    <I18nextProvider i18n={i18n}>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/pet-owner/dashboard" element={<div>Dashboard Pet Owner</div>} />
        <Route element={<ProtectedVeterinaryRoute />}>
          <Route path="/clinic/dashboard" element={<div>Dashboard Veterinary</div>} />
        </Route>
          <Route element={<ProtectedStaffRoute />}>
            <Route element={<StaffLayout />}>
              <Route path="/staff/dashboard" element={<div>Dashboard Staff</div>} />
              <Route path="/staff/settings" element={<Settings />} />
              <Route path="/staff/clinics/" element={<ViewClinics />} />
              <Route path="/staff/clinics/:id" element={<ViewClinic />} />
              <Route path="/staff/clinics/create" element={<CreateClinic />} />
              <Route path="/staff/clinics/:id/edit" element={<EditClinic />} />

              <Route path="/staff/clinics/:id/owners/create" element={<CreateClinicOwner />} />

            </Route>
          </Route>
        </Route>
        <Route path="/" element={<div>Home</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </I18nextProvider>
  )
}

export default App
