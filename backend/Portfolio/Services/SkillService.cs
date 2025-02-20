using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.Entities;

namespace Portfolio.Services
{
    public class SkillService
    {
        public readonly DataContext _context;

        public SkillService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Skills>> GetAllSkills()
        {
            var skills = await _context.Skills.ToListAsync();
            return skills;
        }

        public async Task AddSkill(Skills skill)
        {
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSkill(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill != null)
            {
                _context.Skills.Remove(skill);
                await _context.SaveChangesAsync();
            }
        }
    }
}
