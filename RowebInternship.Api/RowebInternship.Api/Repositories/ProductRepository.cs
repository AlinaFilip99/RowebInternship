using RowebInternship.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RowebInternship.Api.Repositories
{
    public class ProductRepository : IProductRepository
    {
        protected readonly ApplicationContext dbContext;
        public ProductRepository(ApplicationContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public Product AddProduct(Product product)
        {
            var result = dbContext.Add(product);
            dbContext.SaveChanges();
            return result.Entity;
        }

        public void DeleteProduct(int productId)
        {
            var result = dbContext.Products
                .FirstOrDefault(e => e.ProductId == productId);
            if (result != null)
            {
                dbContext.Remove(result);
                dbContext.SaveChanges();
            }
        }

        public int GetMaxId()
        {
            return dbContext.Products.Select(s => s.ProductId).Max();
        }

        public Product GetProduct(int productId)
        {
            return dbContext.Products
                .FirstOrDefault(e => e.ProductId == productId);
        }

        public IEnumerable<Product> GetProducts()
        {
            return dbContext.Products.ToList();
        }

        public IEnumerable<Product> GetProductsByCategory(int? categoryId)
        {
            return dbContext.Products.Where(s => s.CategoryId == categoryId).ToList();
        }

        public Product UpdateProduct(Product product)
        {
            var result = dbContext.Products.FirstOrDefault(e => e.ProductId == product.ProductId);

            if (result != null)
            {
                result.ProductId=product.ProductId;
                result.Name = product.Name;
                result.Description = product.Description;
                result.Price = product.Price;
                result.BasePrice = product.BasePrice;
                result.Image = product.Image;
                result.CategoryId = product.CategoryId;

                dbContext.SaveChanges();

                return result;
            }

            return null;
        }
        public Product GetProductById(int productId)
        {
            var result = dbContext.Products.FirstOrDefault(e => e.ProductId == productId);
            return result;
        }
    }
}
