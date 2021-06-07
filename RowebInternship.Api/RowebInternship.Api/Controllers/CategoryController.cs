using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RowebInternship.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RowebInternship.Api.Repositories;

namespace RowebInternship.Api.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        protected readonly ICategoryRepository categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpGet]
        [Route("category")]
        public IEnumerable<CategoryRepresentation> Get()
        {
            return categoryRepository.GetCategories().Select(s=>new CategoryRepresentation(s));
        }
        [HttpGet]
        [Route("category/{categoryId?}")]
        public CategoryRepresentation GetById(int categoryId)
        {
            var product = new CategoryRepresentation(categoryRepository.GetCategoryById(categoryId));
            return product;
        }

        [HttpPost]
        [Route("category")]
        public CategoryRepresentation Post(CategoryRepresentation category)
        {
            var max=1;
            try
            {
                max = categoryRepository.GetMaxId();
            }
            catch
            {
                max = 0;
            }
            
            var newCategory = category.GetEntityWithoutId(max+1);
            categoryRepository.AddCategory(newCategory);
            return category;
        }

        [HttpPut]
        [Route("category")]
        public CategoryRepresentation Put(CategoryRepresentation category)
        {
            Category newCategory;
            if (category.CategoryID <= categoryRepository.GetMaxId())
            {
                newCategory = category.GetEntity(category.CategoryID);
                categoryRepository.UpdateCategory(newCategory);
            }
            else
            {
                var max = 1;
                try
                {
                    max = categoryRepository.GetMaxId();
                }
                catch
                {
                    max = 0;
                }

                newCategory = category.GetEntityWithoutId(max+1);
                categoryRepository.AddCategory(newCategory);
            }
            return category;
        }
        [HttpDelete]
        [Route("category")]
        public int Delete (int id)
        {
            categoryRepository.DeleteCategory(id);
            return id;
        } 
    }
}
