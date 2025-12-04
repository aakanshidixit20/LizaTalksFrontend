import config from '../config';



/**
 * Product Service - Handles all product-related API calls
 */
const productService = {
  /**
   * Get products for a client or specific store
   * @param {string} clientId - Client ID (gets products from all their stores)
   * @param {string} clientStoreId - Specific store ID (gets products from that store only)
   * @param {number} limit - Maximum number of products to return (default: 100)
   * @param {number} offset - Number of products to skip for pagination (default: 0)
   * @returns {Promise} Response with products data and pagination info
   */
  getProducts: async (clientId = null, clientStoreId = null, limit = 100, offset = 0) => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (clientId) {
        params.append('client_id', clientId);
      }
      if (clientStoreId) {
        params.append('client_store_id', clientStoreId);
      }
      params.append('limit', limit);
      params.append('offset', offset);

      const url = `${config.API_BASE_URL}/client/product/products?${params.toString()}`;
      
      console.log('🔍 Fetching products from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.getHeaders()
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Products fetched successfully:', data);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      return {
        success: false,
        message: `Failed to fetch products: ${error.message}`,
        error: {
          code: 'FETCH_ERROR',
          details: error.message
        }
      };
    }
  },

  /**
   * Get a single product by ID
   * @param {string} productId - Product ID
   * @returns {Promise} Response with product details
   */
  getProductById: async (productId) => {
    try {
      const url = `${config.API_BASE_URL}/client/product/products/${productId}`;
      
      console.log('🔍 Fetching product details from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.getHeaders()
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Product details fetched successfully:', data);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching product details:', error);
      return {
        success: false,
        message: `Failed to fetch product details: ${error.message}`,
        error: {
          code: 'FETCH_ERROR',
          details: error.message
        }
      };
    }
  },

  /**
   * Transform backend product data to frontend format
   * @param {object} backendProduct - Product from backend
   * @returns {object} Transformed product for frontend display
   */
  transformProduct: (backendProduct) => {
    return {
      product_id: backendProduct.product_id,
      product_code: backendProduct.product_id, // Use product_id as code if not available
      product_name: backendProduct.product_name,
      product_price: backendProduct.product_price,
      category: backendProduct.product_type || 'uncategorized',
      product_image_url: backendProduct.product_image_url,
      in_stock: backendProduct.inventory_quantity > 0,
      last_sync_date: backendProduct.modified_date ? new Date(backendProduct.modified_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      // Additional fields from backend
      product_description: backendProduct.product_description,
      product_sku: backendProduct.product_sku,
      brand_name: backendProduct.brand_name,
      tags: backendProduct.tags,
      inventory_quantity: backendProduct.inventory_quantity,
      is_active: backendProduct.is_active,
      created_date: backendProduct.created_date,
      modified_date: backendProduct.modified_date,
      client_store_id: backendProduct.client_store_id
    };
  }
};

export default productService;

