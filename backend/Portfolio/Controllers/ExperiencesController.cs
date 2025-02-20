using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Entities;
using Portfolio.Services;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperiencesController : ControllerBase
    {
        private readonly ExperienceService _service;

        public ExperiencesController(ExperienceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var experiences = await _service.GetAllExperiencesAsync();
            return Ok(experiences);
        }

        [HttpGet("get-experience/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var experience = await _service.GetExperienceByIdAsync(id);
            if (experience == null) return NotFound();
            return Ok(experience);
        }

        [HttpPost("add-experience")]
        public async Task<IActionResult> Create([FromBody] Experience experience)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _service.AddExperienceAsync(experience);
            return CreatedAtAction(nameof(GetById), new { id = experience.Id }, experience);
        }

        [HttpPut("update-experience/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Experience experience)
        {
            if (experience == null)
            {
                return BadRequest("Experience data is missing.");
            }

            if (id != experience.Id)
            {
                return BadRequest($"Mismatched ID. URL ID: {id}, Body ID: {experience.Id}");
            }

            if (!ModelState.IsValid)
            {
                // Log model state errors
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { message = "Validation Failed", errors });
            }

            Console.WriteLine($"Updating Experience ID: {experience.Id}, Role: {experience.Role}, Place: {experience.Place}");

            await _service.UpdateExperienceAsync(experience);
            return NoContent();
        }


        [HttpDelete("experience/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteExperienceAsync(id);
            return NoContent();
        }
    }
}
