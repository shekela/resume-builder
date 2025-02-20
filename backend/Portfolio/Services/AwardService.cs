using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.Entities;

namespace Portfolio.Services
{
    public class AwardService
    {
        public readonly DataContext _context;
        public AwardService(DataContext context) {
            _context = context; 
        }

        public async Task<List<Awards>> GetAllAwardsAsync()
        {
            return await _context.Awards.ToListAsync();
        }

        public async Task<Awards?> GetAwardByIdAsync(int id)
        {
            return await _context.Awards.FindAsync(id);
        }

        public async Task AddAwardAsync(Awards award)
        {
            _context.Awards.Add(award);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAwardsAsync(int id, Awards award)
        {
            var existingAward = await _context.Awards.FindAsync(id);

            if (existingAward == null)
            {
                return false; // Award not found
            }

            // Update the existing award's properties
            existingAward.Year = award.Year;
            existingAward.Role = award.Role;
            existingAward.Place = award.Place;

            _context.Awards.Update(existingAward);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task DeleteAwardsAsync(int id)
        {
            var awards = await _context.Awards.FindAsync(id);
            if (awards != null)
            {
                _context.Awards.Remove(awards);
                await _context.SaveChangesAsync();
            }
        }


    }
}
