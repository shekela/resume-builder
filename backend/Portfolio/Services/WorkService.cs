using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.Entities;
using Portfolio.Interfaces;

namespace Portfolio.Services
{
    public class WorkService
    {
        private readonly DataContext _context;
        private readonly IFileService _fileService;

        public WorkService(DataContext context, IFileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        public async Task<List<Work>> GetAllWorksAsync()
        {
            return await _context.Works.ToListAsync();
        }

        public async Task<Object> GetWorkBySlugAsync(string slug)
        {
            var work = await _context.Works.FirstOrDefaultAsync(w => w.Slug == slug);
            if (work == null) return ("Work not found");

            var workGallery = await _context.Gallery.Where(g => g.WorkId == work.Id).ToListAsync();
            var fullWork = new
            {
                work = work,
                workGallery = workGallery,
            };
            return fullWork;
        }

        public async Task<List<Gallery>> GetWorkGallery(int id)
        {
            var work = await _context.Works.FindAsync(id);
            return await _context.Gallery.Where(g => g.WorkId == work.Id).ToListAsync();
        }


        public async Task AddGalleryAsync(Gallery picture)
        {
            _context.Gallery.Add(picture);
            await _context.SaveChangesAsync();
        }


        public async Task AddWorkAsync(Work work)
        {
            // Generate a slug based on the work's name
            work.Slug = GenerateSlug(work.Name);

            // Ensure the slug is unique in the database
            int suffix = 1;
            string baseSlug = work.Slug;
            while (await _context.Works.AnyAsync(w => w.Slug == work.Slug))
            {
                work.Slug = $"{baseSlug}-{suffix++}";
            }

            _context.Works.Add(work);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateWorkAsync(Work work)
        {
            // If the work's name changes, regenerate the slug
            var existingWork = await _context.Works.AsNoTracking().FirstOrDefaultAsync(w => w.Id == work.Id);
            if (existingWork != null && existingWork.Name != work.Name)
            {
                work.Slug = GenerateSlug(work.Name);

                // Ensure the new slug is unique in the database
                int suffix = 1;
                string baseSlug = work.Slug;
                while (await _context.Works.AnyAsync(w => w.Slug == work.Slug && w.Id != work.Id))
                {
                    work.Slug = $"{baseSlug}-{suffix++}";
                }
         }

            _context.Works.Update(work);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWorkAsync(int id)
        {
            var work = await _context.Works.FindAsync(id);
            if (work != null)
            {
                _context.Works.Remove(work);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteWorkPhoto(int workid, int pictureid)
        {
            var picture = await _context.Gallery.FirstOrDefaultAsync(g => g.WorkId == workid && g.Id == pictureid);

            if (picture == null)
            {
                throw new ArgumentException("The picture with the specified ID does not exist.");
            }

            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            string filePath = Path.Combine(uploadsFolder, picture.Picture);

            if (File.Exists(filePath))
            {
                await _fileService.DeleteFileAsync(picture.Picture);
            }

            _context.Gallery.Remove(picture);
            await _context.SaveChangesAsync();
        }


        private string GenerateSlug(string name)
        {
            return name.ToLower()
                       .Trim()
                       .Replace(" ", "-")
                       .Replace(",", "")
                       .Replace(".", "")
                       .Replace("'", "")
                       .Replace("\"", "")
                       .Replace("!", "")
                       .Replace("?", "");
        }
    }
}

