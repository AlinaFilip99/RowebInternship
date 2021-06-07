using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RowebInternship.Api.Models
{
    public class ProductRepresentation
    {
        public ProductRepresentation(Product product)
        {
            ProductId = product.ProductId;
            Name = product.Name;
            Description = product.Description;
            Price = product.Price;
            BasePrice = product.BasePrice;
            Image = product.Image;
            CategoryId = product.CategoryId;
        }
        public ProductRepresentation()
        {

        }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal BasePrice { get; set; }
        public string Image { get; set; }
        public int CategoryId { get; set; }

        internal Product GetEntity(int id)
        {
            this.ProductId = id;
            return new Product
            {
                ProductId = id,
                Name = Name,
                Description = Description,
                Price=Price,
                BasePrice=BasePrice,
                Image=Image,
                CategoryId=CategoryId
            };
        }
        internal Product GetEntityWithoutId(int id)
        {
            this.ProductId = id;
            return new Product
            {
                Name = Name,
                Description = Description,
                Price = Price,
                BasePrice = BasePrice,
                Image = Image,
                CategoryId = CategoryId
            };
        }
    }
}
