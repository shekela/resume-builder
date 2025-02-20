using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.Entities;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly DataContext _context;
        public ContactController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAbout()
        {
            var about = await _context.Contact.OrderByDescending(a => a.Id).FirstOrDefaultAsync();
            if (about == null) return NotFound();
            return Ok(about);
        }

        [HttpPost]
        public async Task<IActionResult> SaveOrUpdateContact([FromForm] Contact newContact)
        {
            if (newContact == null)
                return BadRequest(new { message = "Invalid contact data." });

            var existingContact = await _context.Contact.FirstOrDefaultAsync();

            if (existingContact != null)
            {
                // ✅ Update only provided fields, leave others unchanged
                if (!string.IsNullOrWhiteSpace(newContact.ContactText))
                    existingContact.ContactText = newContact.ContactText;

                if (!string.IsNullOrWhiteSpace(newContact.Telegram))
                    existingContact.Telegram = newContact.Telegram;

                if (!string.IsNullOrWhiteSpace(newContact.Facebook))
                    existingContact.Facebook = newContact.Facebook;

                if (!string.IsNullOrWhiteSpace(newContact.Whatsapp))
                    existingContact.Whatsapp = newContact.Whatsapp;

                if (!string.IsNullOrWhiteSpace(newContact.Instagram))
                    existingContact.Instagram = newContact.Instagram;

                _context.Contact.Update(existingContact);
            }
            else
            {
                // ✅ If no Contact exists, create a new one
                _context.Contact.Add(newContact);
            }

            await _context.SaveChangesAsync();
            return Ok(new { contact = existingContact });
        }
    }
}
