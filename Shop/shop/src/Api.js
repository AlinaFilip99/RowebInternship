import Category from './models/Category'
import Product from './models/Product'

const API_HOST='https://localhost:44363'

const ApiClient={
    get: (url, params={}, header={})=>{
        return ApiClient.makeRequest(`${API_HOST}/${url}`,"GET", params,header, false);
    },
    post: (url, params={}, header={}, isMultipart=false)=>{
        return ApiClient.makeRequest(`${API_HOST}/${url}`,"POST", params,header, isMultipart);
    },
    put:(url, params={}, header={})=>{
        return ApiClient.makeRequest(`${API_HOST}/${url}`,"PUT", params,header, false);
    },
    delete:(url, params={}, header={})=>{
        return ApiClient.makeRequest(`${API_HOST}/${url}`,"DELETE", params,header, false);
    },
    makeRequest: async (
        url,
        type,
        params = {},
        headers = {},
        isMultipart = false
      ) => {
        try {
          type = type.toUpperCase();
          const request = {
            method: type,
            headers: headers,
          };
          if (type === "POST" || type === "PUT") {
            request.body = isMultipart ? params : JSON.stringify(params);
          }
    
          const result = await fetch(url, request);
          if (isMultipart) return await result.text();
          return await result.json();
        } catch (error) {
          throw error.message;
        }
      }
}

const CategoryRepository={
    all: async ()=>{
        const  categories  = await ApiClient.get('category');

        return categories.map((x)=> new Category(x.categoryID, x.categoryName, x.description))
    },
    getById: async (id)=>{
      const category=await ApiClient.get(`category/${id}`);

      return new Category(category.categoryID, category.categoryName, category.description);
    },
    delete: async (id)=>{
      return ApiClient.delete(`category?id=${id}`);
    },
    insert: async(category)=>{
      return ApiClient.post(`category`, category, {
        "Content-Type": "application/json",
      });
    },
    update: async(category)=>{
      return ApiClient.put(`category`, category, {
        "Content-Type": "application/json",
      });
    }
}

const ProductRepository={
  all: async (id)=>{
      const products = await ApiClient.get(`product/${id}`);

      return products.map((x)=> new Product(x.productId, x.name, x.description, x.price, x.basePrice, x.image, x.categoryId))
  },
  allProducts: async ()=>{
    const products = await ApiClient.get(`product`);

    return products.map((x)=> new Product(x.productId, x.name, x.description, x.price, x.basePrice, x.image, x.categoryId))
  },
  getById: async (id)=>{
    const product= await ApiClient.get(`product/get/${id}`);

    return new Product(product.productId, product.name, product.description, product.price, product.basePrice, product.image, product.categoryId)
  },
  delete: async (id)=>{
    return ApiClient.delete(`product?id=${id}`);
  },
  insert: async(product)=>{
    const prod= await ApiClient.post(`product`, product, {
      "Content-Type": "application/json",
    });
    return new Product(prod.productId, prod.name, prod.description, prod.price, prod.basePrice, prod.image, prod.categoryId)
  },
  update: async(product)=>{
    return ApiClient.put(`product`, product, {
      "Content-Type": "application/json",
    });
  },
  uploadImage: async(id, file)=>{
    return await ApiClient.post(`product/photo?id=${id}`, file, {}, true);
  }
}


const Api={
    ApiClient: ApiClient,
    CategoryRepository: CategoryRepository,
    ProductRepository: ProductRepository
}

export default Api;