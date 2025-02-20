using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Context;
using Portfolio.DTOS;
using Portfolio.Entities;
using Portfolio.Interfaces;
using Portfolio.Services;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileService _service;
        private readonly IFileService _fileService;

        public ProfileController(ProfileService service, IFileService fileService)
        {
            _service = service;
            _fileService = fileService;
        }

        [HttpGet("get-profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var profile = await _service.GetProfileAsync();
            if (profile == null)
                return NotFound();

            return Ok(new
            {
                profile.Name,
                profile.GreetingText,
                profile.Photo,
                profile.CVFileName // Do not send CV byte array in this endpoint
            });
        }

        [HttpPost("create-profile")]
        public async Task<IActionResult> CreateProfile([FromForm] IntroductionDto profileDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingProfile = await _service.GetProfileAsync();

            string? photoPath = existingProfile?.Photo;

            // ✅ Delete previous photo if new one is uploaded
            if (profileDto.Photo != null)
            {
                if (!string.IsNullOrEmpty(photoPath))
                {
                    await _fileService.DeleteFileAsync(photoPath);
                }
                photoPath = await _fileService.SaveFileAsync(profileDto.Photo);
            }

            if (profileDto.CV != null)
            {
                if (!string.IsNullOrEmpty(existingProfile?.CVFileName))
                {
                    await _fileService.DeleteFileAsync(existingProfile.CVFileName);
                }
            }

            var updatedProfile = new Introduction
            {
                Id = existingProfile?.Id ?? 0,
                Name = !string.IsNullOrEmpty(profileDto.Name) ? profileDto.Name : existingProfile?.Name,
                GreetingText = !string.IsNullOrEmpty(profileDto.GreetingText) ? profileDto.GreetingText : existingProfile?.GreetingText,
                Photo = photoPath,
                CV = profileDto.CV != null ? await ConvertToByteArray(profileDto.CV) : existingProfile?.CV,
                CVFileName = profileDto.CV?.FileName ?? existingProfile?.CVFileName
            };

            bool isSuccess;
            if (existingProfile != null)
            {
                isSuccess = await _service.UpdateProfileAsync(updatedProfile);
            }
            else
            {
                isSuccess = await _service.CreateProfileAsync(updatedProfile);
            }

            if (!isSuccess)
                return StatusCode(500, new { message = "Failed to update profile." });

            Console.WriteLine("✅ Sending updated profile:", updatedProfile);
            return Ok(updatedProfile);
        }





        // Helper method to convert IFormFile to byte array
        private async Task<byte[]> ConvertToByteArray(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] Introduction updatedProfile)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _service.UpdateProfileAsync(updatedProfile);
            if (!result)
                return NotFound("No profile exists to update.");

            return NoContent();
        }

        [HttpDelete("delete-profile")]
        public async Task<IActionResult> DeleteProfile()
        {
            var result = await _service.DeleteProfileAsync();
            if (!result)
                return NotFound("No profile exists to delete.");

            return NoContent();
        }

        [HttpGet("download-cv")]
        public async Task<IActionResult> DownloadCV()
        {
            var (cv, fileName) = await _service.GetCVAsync();

            if (cv == null || fileName == null)
            {
                Console.WriteLine("🚨 CV not found in database!");
                return NotFound("CV not found.");
            }

            Console.WriteLine($"✅ CV found! File Name: {fileName}, Size: {cv.Length} bytes");

            // Set Content-Disposition to "inline" to display in the browser
            Response.Headers["Content-Disposition"] = $"inline; filename=\"{fileName}\"";
            return File(cv, "application/pdf");
        }






    }
}
