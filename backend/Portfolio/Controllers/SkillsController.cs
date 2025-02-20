using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Entities;
using Portfolio.Services;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly SkillService _skillService;
        public SkillsController(SkillService skillService)
        {
            _skillService = skillService;
        }

        [HttpGet("get-skills")]
        public async Task<IActionResult> GetAllSkills()
        {
            var skills = await _skillService.GetAllSkills();
            return Ok(skills);
        }

        [HttpPost("add-skill")]
        public async Task<IActionResult> AddSkill(Skills skill)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _skillService.AddSkill(skill);
            return Ok(skill);
        }

        [HttpDelete("delete-skill/{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            await _skillService.DeleteSkill(id);
            return NoContent();
        }
    }
}
