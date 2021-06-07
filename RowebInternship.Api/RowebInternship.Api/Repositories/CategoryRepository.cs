using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RowebInternship.Api.Models;

namespace RowebInternship.Api.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        protected readonly ApplicationContext dbContext;
        public CategoryRepository(ApplicationContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public IEnumerable<Category> GetCategories()
        {
            return dbContext.Categories.ToList();
        }

        public Category GetCategory(int categoryId)
        {
            return dbContext.Categories
                .FirstOrDefault(e => e.CategoryID == categoryId);
        }

        public Category AddCategory(Category category)
        {
            var result = dbContext.Add(category);
            dbContext.SaveChanges();
            return result.Entity;
        }

        public Category UpdateCategory(Category category)
        {
            var result = dbContext.Categories.FirstOrDefault(e => e.CategoryID == category.CategoryID);

            if (result != null)
            {
                result.CategoryID = category.CategoryID;
                result.CategoryName = category.CategoryName;
                result.Description = category.Description;

                dbContext.SaveChanges();

                return result;
            }

            return null;
        }

        public void DeleteCategory(int categoryId)
        {
            var result = dbContext.Categories
                .FirstOrDefault(e => e.CategoryID== categoryId);
            if (result != null)
            {
                dbContext.Remove(result);
                dbContext.SaveChanges();
            }
        }

        public int GetMaxId()
        {
            return dbContext.Categories.Select(s=>s.CategoryID).Max();
        }
        public Category GetCategoryById(int categoryId)
        {
            var result = dbContext.Categories.FirstOrDefault(e => e.CategoryID == categoryId);
            return result;
        }
    }
}
