using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RowebInternship.Api.Models
{
    public class CategoryRepresentation
    {
        public CategoryRepresentation(Category category)
        {
            CategoryID = category.CategoryID;
            CategoryName = category.CategoryName;
            Description = category.Description;
        }
        public CategoryRepresentation()
        {
                
        }  

        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }

        internal Category GetEntity(int id)
        {
            this.CategoryID = id;
            return new Category
            {
                CategoryID = id,
                CategoryName = CategoryName,
                Description = Description
            };
        }
        internal Category GetEntityWithoutId(int id)
        {
            this.CategoryID = id;
            return new Category
            {
                CategoryName = CategoryName,
                Description = Description
            };
        }
    }
}
