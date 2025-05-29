
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductList from '@/components/Products/ProductList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Users, Shield, TrendingUp } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to QuickBuy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100">
              Your trusted marketplace for Filipino products and services
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Start Shopping
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  Become a Seller
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose QuickBuy?
            </h2>
            <p className="text-lg text-gray-600">
              The best platform for buying and selling in the Philippines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <ShoppingBag className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Easy Shopping</h3>
                <p className="text-gray-600">Browse thousands of products with secure checkout</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trusted Sellers</h3>
                <p className="text-gray-600">All sellers are verified for your safety</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">Safe transactions with buyer protection</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Grow Your Business</h3>
                <p className="text-gray-600">Powerful tools to help sellers succeed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <ProductList />

      {/* CTA Section */}
      {!user && (
        <div className="bg-emerald-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Join thousands of satisfied customers and sellers on QuickBuy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/register')}
                className="text-emerald-600 hover:text-emerald-700"
              >
                Create Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
