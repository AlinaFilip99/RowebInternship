using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RowebInternship.Api.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; } 
        public decimal BasePrice { get; set; } 
        public string Image { get; set; } 
        public int CategoryId { get; set; }
    }
}
