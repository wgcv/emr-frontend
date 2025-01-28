import { Navigate, Outlet } from 'react-router-dom';
import { getRole, getToken } from '../auth/api/auth.ts';
import { CLINIC_ROLES, PET_OWNER_ROLES, STAFF_ROLE } from '../types/User.ts';
export const ProtectedRoute = () => {
    const token = getToken()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
};

export const ProtectedVeterinaryRoute = () => {
    const role = getRole()
    if (!role) {
        return <Navigate to="/login" replace />
    } else if (!CLINIC_ROLES.includes(role)) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
};

export const ProtectedStaffRoute = () => {
    const role = getRole()
    if (!role) {
        return <Navigate to="/login" replace />
    } else if (!STAFF_ROLE.includes(role)) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
};

export const ProtectedPublicRoute = () => {
    const role = getRole()
    if (!role) {
        return <Navigate to="/login" replace />
    } else if (!PET_OWNER_ROLES.includes(role)) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}