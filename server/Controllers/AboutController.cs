using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AboutController : ControllerBase
    {
        private readonly ServerContext _context;

        public AboutController(ServerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            var facts = await _context.AboutFacts.ToListAsync();
            return Ok(facts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFact(string id)
        {
            var fact = await _context.AboutFacts.FindAsync(id);
            if(fact == null)
            {
                return NotFound();
            }
            return Ok(fact);
        }
    }
}