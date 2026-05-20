import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Layout/LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    // ১. অথেন্টিকেশন চেক এবং রোল ফেচিং চেক
    if (authLoading || roleLoading) {
        return <LoadingSpinner />;
    }

    // ২. লগইন না থাকলে লগইন পেজে পাঠান
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // ৩. শুধুমাত্র admin এবং developer এক্সেস পাবে
    if (role === 'admin' || role === 'developer') {
        return children;
    }

    // ৪. অন্য সাধারণ ইউজার হলে তাকে ড্যাশবোর্ডের মূল পেজে বা হোম পেজে রিডাইরেক্ট করুন
    return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;