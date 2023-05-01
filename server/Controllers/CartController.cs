using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    public class CartController : Controller
    {
        private readonly ServerContext _context;
        private readonly UserManager<User> _userManager;

        public CartController(ServerContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult> GetUserCart(string email)
        {
            var cart = await GetOrCreateUserCart(email);  
            return Ok(cart);
        }

        [HttpPut("{email}")]
        public async Task<ActionResult> UpdateUserCart(string email, int productId, int quantity)
        {
            var cartItem = await GetOrUpdateCartItem(email, productId, quantity);
            return Ok(cartItem);
        }

        [HttpDelete("{email}, {productId}")]
        public async Task<ActionResult> DeleteCartItem(string email, int productId)
        {
            var cart = await GetOrCreateUserCart(email);
            var itemIndex = cart.Items.FindIndex(p => p.Product.Id == productId);
            if(itemIndex != -1) 
            {
                cart.Items.RemoveAll(p => p.Product.Id == productId);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        private async Task<Cart> GetOrCreateUserCart(string email)
        {
            var user = await _userManager.FindByEmailAsync(email) ?? throw new KeyNotFoundException("user wasn't found");
            var userCart = _context.Carts
            .Include(c => c.Items)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefault(c => c.UserId == user.Id);
            if(userCart == null)
            {
                userCart = new Cart(){ UserId = user.Id };
                _context.Carts.Add(userCart);
                await _context.SaveChangesAsync();
            }
            return userCart;
        }

        private async Task<CartItem> GetOrUpdateCartItem(string userId, int productId, int quantity) 
        {
            var cart = await GetOrCreateUserCart(userId);
            var product = await _context.Products.FindAsync(productId) ?? throw new KeyNotFoundException("product isn't found");

            var itemIndex = cart.Items.FindIndex(p => p.Product.Id == productId);
            if(itemIndex == -1) 
            {
                return await CreateCartItem(cart, product, quantity);
            }
            
            cart.Items[itemIndex].Quantity = quantity;
            _context.Carts.Update(cart);
            await _context.SaveChangesAsync();
            return cart.Items[itemIndex];
        }

        private async Task<CartItem> CreateCartItem(Cart cart, Product product, int quantity) 
        { 
            var item = new CartItem() { Product = product, Quantity = quantity };
            cart.Items.Add(item);
            _context.Carts.Update(cart);
            await _context.SaveChangesAsync();
            return item;
        }
    }
}