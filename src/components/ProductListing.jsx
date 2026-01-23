import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ShoppingCart, Star, Filter } from 'lucide-react';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      setProducts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious dishes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading products</p>
          <p>{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-red-600">EXOTIC</h1>
              <p className="text-sm text-gray-600">Authentic Nigerian Cuisine</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">⭐ 4.8 Rating</p>
                <p className="text-sm text-gray-600">2,500+ Orders</p>
              </div>
              <button className="relative bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-4xl font-bold mb-2">Exotic Flavors</h2>
          <p className="text-xl mb-4">Authentic Nigerian Cuisine</p>
          <div className="flex gap-4 text-sm">
            <span>⭐ 4.8 Rating</span>
            <span>• 2,500+ Orders</span>
            <span>• Fast Delivery</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'dish' : 'dishes'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26';
                    }}
                  />
                  {product.in_stock ? (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Out of Stock
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {product.category}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        ₦{product.price?.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.in_stock}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        product.in_stock
                          ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.in_stock ? 'Order Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-600">
          <p>🚀 Fast Delivery • 💯 100% Authentic • ⭐ Top Rated</p>
        </div>
      </div>
    </div>
  );
}