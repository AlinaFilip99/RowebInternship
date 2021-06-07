using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RowebInternship.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RowebInternship.Api.Repositories;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace RowebInternship.Api.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    public class ProductController: ControllerBase
    {
        protected readonly IProductRepository productRepository;
        protected readonly IWebHostEnvironment webHostEnvironment;

        public ProductController(IProductRepository productRepository, IWebHostEnvironment webHostEnvironment)
        {
            this.productRepository = productRepository;
            this.webHostEnvironment = webHostEnvironment;
        }
        /*
        [HttpGet]
        [Route("product")]
        public IEnumerable<ProductRepresentation> Get()
        {
            return productRepository.GetProducts().Select(s => new ProductRepresentation(s));
        }*/
        
        [HttpGet]
        [Route("product/{categoryId?}")]
        public IEnumerable<ProductRepresentation> Get(int categoryId)
        {
            return productRepository.GetProductsByCategory(categoryId).Select(s => new ProductRepresentation(s));
        }
        [HttpGet]
        [Route("product/get/{productId?}")]
        public ProductRepresentation GetById(int productId)
        {
            var product = new ProductRepresentation(productRepository.GetProductById(productId));
            return product;
        }
        [HttpGet]
        [Route("product")]
        public IEnumerable<ProductRepresentation> GetAll()
        {
            return productRepository.GetProducts().Select(s => new ProductRepresentation(s));
        }

        [HttpPost]
        [Route("product")]
        public ProductRepresentation Post(ProductRepresentation product)
        {
            var max = 1;
            try
            {
                max = productRepository.GetMaxId();
            }
            catch
            {
                max = 0;
            }
            var newProduct = product.GetEntityWithoutId(max + 1);
            var added= productRepository.AddProduct(newProduct);
            return new ProductRepresentation(added);
        }
        [HttpPost]
        [Route("product/photo")]
        public async Task<ProductRepresentation> UploadPhoto(int id, IFormFile file)
        {
            var product = productRepository.GetProductById(id);

            string fileName = Path.GetFileNameWithoutExtension(file.FileName);
            string extension = Path.GetExtension(file.FileName);
            fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;

            product.Image= fileName;
            
            fileName = Path.Combine(webHostEnvironment.WebRootPath, "Images", fileName);

            using (Stream fileStream = new FileStream(fileName, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            productRepository.UpdateProduct(product);

            return new ProductRepresentation(product);
        }

        [HttpPut]
        [Route("product")]
        public ProductRepresentation Put(ProductRepresentation product)
        {
            Product newProduct;
            if (product.ProductId <= productRepository.GetMaxId())
            {
                newProduct = product.GetEntity(product.ProductId);
                productRepository.UpdateProduct(newProduct);
            }
            else
            {
                var max = 1;
                try
                {
                    max = productRepository.GetMaxId();
                }
                catch
                {
                    max = 0;
                }
                newProduct = product.GetEntityWithoutId(max + 1);
                productRepository.AddProduct(newProduct);
            }
            return product;
        }
        [HttpDelete]
        [Route("product")]
        public int Delete(int id)
        {
            productRepository.DeleteProduct(id);
            return id;
        }
    }
}
