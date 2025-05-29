
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for pending approvals
  const pendingSellers = [
    { id: '5', name: 'New Seller 1', businessName: 'Tech Store PH', email: 'seller1@test.com' },
    { id: '6', name: 'New Seller 2', businessName: 'Fashion Hub', email: 'seller2@test.com' }
  ];

  const reportedItems = [
    { id: '10', name: 'Suspicious Product', reporter: 'customer@test.com', reason: 'Fake product' },
    { id: '11', name: 'Another Item', reporter: 'user@test.com', reason: 'Inappropriate content' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage users, approve sellers, and moderate content
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">2,547</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sellers</p>
                <p className="text-2xl font-bold text-gray-900">428</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{pendingSellers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reported Items</p>
                <p className="text-2xl font-bold text-gray-900">{reportedItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Seller Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
              Pending Seller Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingSellers.length > 0 ? (
              <div className="space-y-4">
                {pendingSellers.map(seller => (
                  <div key={seller.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{seller.name}</div>
                        <div className="text-sm text-gray-600">{seller.businessName}</div>
                        <div className="text-xs text-gray-500">{seller.email}</div>
                      </div>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                        Pending
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending approvals</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reported Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Reported Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reportedItems.length > 0 ? (
              <div className="space-y-4">
                {reportedItems.map(item => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="mb-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">Reported by: {item.reporter}</div>
                      <div className="text-xs text-gray-500">Reason: {item.reason}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        Remove Item
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reported items</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="w-6 h-6 mb-2" />
              Seller Settings
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="w-6 h-6 mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CheckCircle className="w-6 h-6 mb-2" />
              System Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
