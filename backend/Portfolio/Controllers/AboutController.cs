using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.Entities;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly DataContext _context;
        public AboutController(DataContext context) 
        { 
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            var about = await _context.AboutSections.OrderByDescending(a => a.Id).FirstOrDefaultAsync();
            if (about == null) return NotFound();
            return Ok(about);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAbout([FromForm] About about)
        {
            if (about == null || string.IsNullOrWhiteSpace(about.Content))
                return BadRequest(new { message = "Invalid content." });

            var existingAbout = await _context.AboutSections.FirstOrDefaultAsync();

            if (existingAbout != null)
            {
                // ✅ If "About" already exists, update it instead of creating a new one
                existingAbout.Content = about.Content;
                _context.AboutSections.Update(existingAbout);
            }
            else
            {
                // ✅ If no "About" exists, create a new one
                _context.AboutSections.Add(about);
            }

            await _context.SaveChangesAsync();
            return Ok(new { Content = about.Content });
        }
    }
}
