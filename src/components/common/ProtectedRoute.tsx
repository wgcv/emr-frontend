import { getActor, getRefreshToken } from '@/components/api/auth';
import { Navigate, Outlet } from 'react-router-dom';
export const ProtectedRoute = () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
};

export const ProtectedVeterinaryRoute = () => {
    const actor = getActor()
    if (!actor) {
        return <Navigate to="/login" replace />
    } else if (actor !== 'veterinary') {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
};

export const ProtectedStaffRoute = () => {
    const actor = getActor()
    if (!actor) {
        return <Navigate to="/login" replace />
    } else if (actor !== 'staff') {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
};

export const ProtectedPublicRoute = () => {
    const actor = getActor()
    if (!actor) {
        return <Navigate to="/login" replace />
    } else if (actor !== 'petOwner') {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}