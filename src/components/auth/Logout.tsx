import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Logout function from API
const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('actor');
};

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Call the logout function
        logout();

        // Redirect to home page
        navigate('/');
    }, [navigate]);

    // Return null as this component doesn't render anything
    return null;
};

export default Logout;