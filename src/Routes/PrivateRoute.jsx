import React from 'react';
import useAuth from '../hooks/useAuth';

import { Navigate, useLocation,  } from 'react-router';
import LoadingSpinner from '../Layout/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const {user, loading } = useAuth();
    const location = useLocation();
    
    

    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
};

export default PrivateRoute;