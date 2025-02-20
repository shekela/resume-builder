namespace Portfolio.Entities
{
    public class TimePeriod
    {
        public int StartYear { get; set; }
        public string EndYear { get; set; } // "Present" or year

        // Validation to ensure StartYear <= EndYear (if EndYear is numeric)
        public bool IsValid()
        {
            return int.TryParse(EndYear, out var endYearValue) ? StartYear <= endYearValue : EndYear == "Present";
        }
    }
}
