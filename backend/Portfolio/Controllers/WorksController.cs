using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.DTOS;
using Portfolio.Entities;
using Portfolio.Interfaces;
using Portfolio.Services;

namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorksController : ControllerBase
    {
        private readonly WorkService _service;
        private readonly IFileService _fileService;
        public WorksController(WorkService service, IFileService fileService)
        {
            _service = service;
            _fileService = fileService;
        }

        [HttpGet("get-all-works")]
        public async Task<IActionResult> GetAll()
        {
            var works = await _service.GetAllWorksAsync();
            return Ok(works);
        }

        [HttpGet("get-work/{slug}")]
        public async Task<IActionResult> GetById(string slug)
        {
            var fullWork = await _service.GetWorkBySlugAsync(slug);

            // Return 404 if no work is found
            if (fullWork == null)
                return NotFound();

            // Return the work and its gallery
            return Ok(fullWork);
        }

        [HttpPost("add-work")]
        public async Task<IActionResult> Create([FromBody] Work work)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _service.AddWorkAsync(work);

            var works = await _service.GetAllWorksAsync();
            return Ok(works);
        }

        [HttpPost("add-gallery")]
        public async Task<IActionResult> CreateGallery([FromForm] GalleryDto picture)
        {
             
            if(picture.WorkId == 0)
            {
                return BadRequest("Work ID is required");
            }
            string? photoPath = null;
            if (picture.Picture != null)
            {
                photoPath = await _fileService.SaveFileAsync(picture.Picture);
            }
            var gallery =  new Gallery
            {
                WorkId = picture.WorkId,
                Picture = photoPath
            };
            await _service.AddGalleryAsync(gallery);

            return Ok(photoPath);
        }


        [HttpPut("update-work/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Work work)
        {
            if (id != work.Id) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _service.UpdateWorkAsync(work);
            return NoContent();
        }

        [HttpDelete("delete-work/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteWorkAsync(id);

            var works = await _service.GetAllWorksAsync();
            return Ok(works);
        }

        [HttpDelete("delete-work-photo/{workid}/{pictureid}")]
        public async Task<IActionResult> Delete(int workid, int pictureid)
        {
            await _service.DeleteWorkPhoto(workid, pictureid);
            
            var works = await _service.GetAllWorksAsync();
            return Ok(works);
        }

    }
}
