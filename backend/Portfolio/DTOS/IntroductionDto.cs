namespace Portfolio.DTOS
{
    public class IntroductionDto
    {
        public string Name { get; set; } = string.Empty;
        public string GreetingText { get; set; } = string.Empty;
        public IFormFile? Photo { get; set; } // For photo upload
        public IFormFile? CV { get; set; }    // For CV upload
    }
}
