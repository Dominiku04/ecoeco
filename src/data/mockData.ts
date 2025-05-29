
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
  sellerName: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    sellerId: string;
  }>;
  total: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy A54 5G',
    description: 'Latest smartphone with amazing camera and 5G connectivity',
    price: 25990,
    image: '/placeholder.svg',
    category: 'Electronics',
    sellerId: '2',
    sellerName: 'TechHub Philippines',
    stock: 15,
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with premium design',
    price: 7995,
    image: '/placeholder.svg',
    category: 'Fashion',
    sellerId: '2',
    sellerName: 'SportZone Manila',
    stock: 25,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Instax Mini 11 Camera',
    description: 'Instant camera perfect for capturing memories',
    price: 4990,
    image: '/placeholder.svg',
    category: 'Electronics',
    sellerId: '2',
    sellerName: 'PhotoWorld PH',
    stock: 8,
    rating: 4.3,
    reviews: 45
  },
  {
    id: '4',
    name: 'Barong Tagalog',
    description: 'Traditional Filipino formal wear for special occasions',
    price: 3500,
    image: '/placeholder.svg',
    category: 'Fashion',
    sellerId: '2',
    sellerName: 'Pinoy Threads',
    stock: 12,
    rating: 4.8,
    reviews: 67
  },
  {
    id: '5',
    name: 'Adobo Seasoning Mix',
    description: 'Authentic Filipino adobo spice blend',
    price: 120,
    image: '/placeholder.svg',
    category: 'Food',
    sellerId: '2',
    sellerName: 'Lola\'s Kitchen',
    stock: 50,
    rating: 4.6,
    reviews: 234
  },
  {
    id: '6',
    name: 'Banig (Traditional Mat)',
    description: 'Handwoven traditional Filipino mat',
    price: 890,
    image: '/placeholder.svg',
    category: 'Home & Living',
    sellerId: '2',
    sellerName: 'Handicrafts PH',
    stock: 20,
    rating: 4.4,
    reviews: 56
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '1',
    customerName: 'Juan Dela Cruz',
    items: [
      {
        productId: '1',
        productName: 'Samsung Galaxy A54 5G',
        quantity: 1,
        price: 25990,
        sellerId: '2'
      }
    ],
    total: 25990,
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'ORD-002',
    customerId: '1',
    customerName: 'Juan Dela Cruz',
    items: [
      {
        productId: '2',
        productName: 'Nike Air Max 270',
        quantity: 2,
        price: 7995,
        sellerId: '2'
      }
    ],
    total: 15990,
    status: 'approved',
    createdAt: '2024-01-14T15:45:00Z'
  }
];

export const categories = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Food',
  'Sports',
  'Beauty',
  'Books',
  'Toys'
];

export const formatCurrency = (amount: number): string => {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
