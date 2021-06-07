using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RowebInternship.Api.Models;

namespace RowebInternship.Api.Repositories
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> GetCategories();
        Category GetCategory(int categoryId);
        Category AddCategory(Category category);
        Category UpdateCategory(Category category);
        void DeleteCategory(int categoryId);
        int GetMaxId();
        Category GetCategoryById(int categoryId);
    }
}
