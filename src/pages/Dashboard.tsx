
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import CustomerDashboard from '@/components/Dashboard/CustomerDashboard';
import SellerDashboard from '@/components/Dashboard/SellerDashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';
import BusinessOwnerDashboard from '@/components/Dashboard/BusinessOwnerDashboard';

const Dashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'customer':
      return <CustomerDashboard />;
    case 'seller':
      return <SellerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'business_owner':
      return <BusinessOwnerDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default Dashboard;
