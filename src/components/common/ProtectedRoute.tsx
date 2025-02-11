import { Navigate, Outlet } from 'react-router-dom';
import { getActor, getToken } from '../auth/api/auth.types.ts';
export const ProtectedRoute = () => {
    const token = getToken()

    if (!token) {
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