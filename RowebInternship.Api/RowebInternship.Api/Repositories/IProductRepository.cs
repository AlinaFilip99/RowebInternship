using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RowebInternship.Api.Models;

namespace RowebInternship.Api.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetProducts();
        IEnumerable<Product> GetProductsByCategory(int? categoryId);
        Product GetProduct(int productId);
        Product AddProduct(Product product);
        Product UpdateProduct(Product product);
        void DeleteProduct(int productId);
        int GetMaxId();
        Product GetProductById(int productId);
    }
}
