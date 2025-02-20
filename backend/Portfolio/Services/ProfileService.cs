using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.Entities;

namespace Portfolio.Services
{
    public class ProfileService
    {
        private readonly DataContext _context;

        public ProfileService(DataContext context)
        {
            _context = context;
        }

        public async Task<Introduction?> GetProfileAsync()
        {
            return await _context.Introduction.FirstOrDefaultAsync();
        }

        public async Task<bool> CreateProfileAsync(Introduction profile)
        {
            // Prevent creating a new profile if one already exists
            if (await _context.Introduction.AnyAsync())
                return false;

            _context.Introduction.Add(profile);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateProfileAsync(Introduction updatedProfile)
        {
            var existingProfile = await _context.Introduction.FirstOrDefaultAsync();
            if (existingProfile == null)
                return false;

            // Update fields
            existingProfile.Name = updatedProfile.Name;
            existingProfile.GreetingText = updatedProfile.GreetingText;
            existingProfile.Photo = updatedProfile.Photo;
            existingProfile.CV = updatedProfile.CV;
            existingProfile.CVFileName = updatedProfile.CVFileName;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProfileAsync()
        {
            var existingProfile = await _context.Introduction.FirstOrDefaultAsync();
            if (existingProfile == null)
                return false;

            _context.Introduction.Remove(existingProfile);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(byte[]? CV, string? FileName)> GetCVAsync()
        {
            var profile = await _context.Introduction.FirstOrDefaultAsync();
            if (profile == null || profile.CV == null)
                return (null, null);

            return (profile.CV, profile.CVFileName);
        }

        public async Task<string?> GetCVUrlAsync(HttpRequest request)
        {
            var profile = await _context.Introduction.FirstOrDefaultAsync();
            if (profile == null || string.IsNullOrEmpty(profile.CVFileName))
                return null;

            // Construct the file URL dynamically based on the current request
            return $"{request.Scheme}://{request.Host}/download-cv";
        }

    }
}
