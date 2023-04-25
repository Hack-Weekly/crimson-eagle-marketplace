using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly ServerContext _context;

    public ProductController(ServerContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct(Product data)
    {
        if (ModelState.IsValid)
        {
            await _context.Products.AddAsync(data);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { data.Id }, data);
        }

        return new JsonResult("Something went wrong") { StatusCode = 500 };
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, Product data)
    {
        if (id != data.Id)
            return BadRequest();

        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return NotFound();

        product.Title = data.Title;
        product.Description = data.Description;
        product.Price = data.Price;
        product.DiscountPercentage = data.DiscountPercentage;
        product.Stock = data.Stock;
        product.Brand = data.Brand;
        product.CategoryId = data.CategoryId;
        product.Thumbnail = data.Thumbnail;
        product.Images = data.Images;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok(product);
    }
}
