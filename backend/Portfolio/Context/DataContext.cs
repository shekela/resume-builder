using Microsoft.EntityFrameworkCore;
using Portfolio.Entities;

namespace Portfolio.Context
{
    public class DataContext: DbContext
    {
        public DbSet<Introduction> Introduction { get; set; }
        public DbSet<Work> Works { get; set; }
        public DbSet<Gallery> Gallery { get; set; }
        public DbSet<Awards> Awards { get; set; }
        public DbSet<Skills> Skills { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<About> AboutSections { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<Admin> Admins { get; set; }


        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Experience>().OwnsOne(e => e.Period); // Configuring complex type
        }


    }
}
