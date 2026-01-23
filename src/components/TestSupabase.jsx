import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function TestSupabase() {
  const [status, setStatus] = useState('Testing connection...');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  async function testConnection() {
    try {
      // Test 1: Basic connection
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(5);

      if (error) throw error;

      setStatus('✅ Connected to Supabase!');
      setProducts(data);
      setError(null);
      
      console.log('✅ Supabase connected successfully!');
      console.log('Products fetched:', data);
    } catch (err) {
      setStatus('❌ Connection failed');
      setError(err.message);
      console.error('❌ Supabase error:', err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Supabase Connection Test</h2>
      
      {/* Connection Status */}
      <div className={`p-4 rounded mb-4 ${
        status.includes('✅') ? 'bg-green-100 text-green-800' : 
        status.includes('❌') ? 'bg-red-100 text-red-800' : 
        'bg-blue-100 text-blue-800'
      }`}>
        <p className="font-semibold">{status}</p>
        {error && <p className="text-sm mt-2">Error: {error}</p>}
      </div>

      {/* Environment Variables Check */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Environment Check:</h3>
        <div className="space-y-1 text-sm">
          <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
          <p>Supabase Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
        </div>
      </div>

      {/* Products Display */}
      {products.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Sample Products ({products.length}):</h3>
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-sm font-semibold text-green-600">
                  ${product.price?.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Retry Button */}
      <button
        onClick={testConnection}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Test Again
      </button>
    </div>
  );
}