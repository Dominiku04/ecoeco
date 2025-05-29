
import React from 'react';
import { Product, formatCurrency } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user || user.role !== 'customer') {
      toast.error('Please log in as a customer to add items to cart');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      image: product.image
    });
    
    toast.success('Added to cart!');
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.stock < 10 && (
            <Badge className="absolute top-2 left-2 bg-orange-500">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="text-2xl font-bold text-emerald-600 mb-2">
            {formatCurrency(product.price)}
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Seller */}
          <p className="text-sm text-gray-600 mb-3">
            by <span className="font-medium">{product.sellerName}</span>
          </p>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails?.(product)}
            >
              View Details
            </Button>
            
            {(!user || user.role === 'customer') && (
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
