namespace Portfolio.Entities
{
    public class Experience
    {
        public int Id { get; set; } // Primary Key
        public string Role { get; set; } = string.Empty;
        public string Place { get; set; } = string.Empty;
        public TimePeriod Period { get; set; } = new TimePeriod();
    }
}
