namespace Portfolio.DTOS
{
    public class GalleryDto
    {
        public int Id { get; set; }
        public int WorkId { get; set; }
        public IFormFile Picture { get; set; }
    }
}
