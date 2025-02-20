namespace Portfolio.Entities
{
    public class Introduction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GreetingText { get; set; }
        public string Photo { get; set; }
        public byte[] CV { get; set; } // Stored as a byte array in the database
        public string CVFileName { get; set; }
    }
}
