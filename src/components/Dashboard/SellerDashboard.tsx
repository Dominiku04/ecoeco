
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockProducts, mockOrders, formatCurrency } from '@/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, Users, AlertCircle } from 'lucide-react';

const SellerDashboard = () => {
  const { user } = useAuth();

  const sellerProducts = mockProducts.filter(product => product.sellerId === user?.id);
  const sellerOrders = mockOrders.filter(order => 
    order.items.some(item => item.sellerId === user?.id)
  );

  const totalRevenue = sellerOrders.reduce((sum, order) => {
    const sellerItems = order.items.filter(item => item.sellerId === user?.id);
    return sum + sellerItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
  }, 0);

  if (!user?.isApproved) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Account Pending Approval
            </h2>
            <p className="text-gray-600 mb-6">
              Your seller account is currently being reviewed by our admin team. 
              You'll be able to start listing products once your account is approved.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">While you wait, you can:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Prepare your product photos and descriptions</li>
                <li>• Read our seller guidelines</li>
                <li>• Set up your business profile</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Seller Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.businessName} • Manage your products and orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{sellerProducts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{sellerOrders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sellerOrders.filter(o => o.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Products</CardTitle>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Add Product
            </Button>
          </CardHeader>
          <CardContent>
            {sellerProducts.length > 0 ? (
              <div className="space-y-4">
                {sellerProducts.slice(0, 5).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{formatCurrency(product.price)}</div>
                      <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                    </div>
                    <Badge variant="outline">
                      {product.category}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No products yet</p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Add Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {sellerOrders.length > 0 ? (
              <div className="space-y-4">
                {sellerOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Order #{order.id}</div>
                      <Badge className={`${
                        order.status === 'pending' ? 'bg-yellow-500' :
                        order.status === 'approved' ? 'bg-blue-500' :
                        order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-500'
                      } text-white`}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Customer: {order.customerName}
                    </div>
                    <div className="text-sm text-gray-600">
                      Items: {order.items.filter(item => item.sellerId === user?.id).length}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No orders yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
