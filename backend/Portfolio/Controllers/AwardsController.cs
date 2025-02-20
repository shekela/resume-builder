using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.Entities;
using Portfolio.Services;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AwardsController : ControllerBase
    {
        private readonly AwardService _awardService;
        
        public AwardsController(AwardService awardService)
        {
            _awardService = awardService;
        }

        // GET: api/Awards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Awards>>> GetAwards()
        {
            return await _awardService.GetAllAwardsAsync();
        }


        // GET: api/Awards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Awards>> GetAwards(int id)
        {
            var awards = await _awardService.GetAwardByIdAsync(id);

            if (awards == null)
            {
                return NotFound();
            }

            return awards;
        }


        // PUT: api/Awards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // PUT: api/Awards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAwards(int id, Awards awards)
        {
            if (id != awards.Id)
            {
                return BadRequest("ID in URL does not match ID in body.");
            }

            var updated = await _awardService.UpdateAwardsAsync(id, awards);

            if (!updated)
            {
                return NotFound("Award with the given ID does not exist.");
            }

            return NoContent();

        }


        // POST: api/Awards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Awards>> PostAwards(Awards awards)
        {
            await _awardService.AddAwardAsync(awards);
            return CreatedAtAction("GetAwards", new { id = awards.Id }, awards);
        }


        // DELETE: api/Awards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAwards(int id)
        {
            await _awardService.DeleteAwardsAsync(id);
            return NoContent();
        }

        
    }
}
