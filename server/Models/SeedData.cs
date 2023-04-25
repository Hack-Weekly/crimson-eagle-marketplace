using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public static class SeedData
    {
        public static void EnsurePopulated(IApplicationBuilder app)
        {
            ServerContext context = app.ApplicationServices
                .CreateScope().ServiceProvider.GetRequiredService<ServerContext>();
            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }

            bool addedData = EnsurePopulateAbout(context);
            if(addedData)
            {
                context.SaveChanges();
            }
        }

        private static bool EnsurePopulateAbout(ServerContext context)
        {
            if (!context.AboutFacts.Any())
            {
                context.AboutFacts.AddRange(
                    new Fact
                    {
                        Id = "about_us",
                        Title = "About Us",
                        Description = "This is about us",
                    },
                    new Fact
                    {
                        Id = "more_about_us",
                        Title = "Who are we?",
                        Description = "We are bla bla bla",
                    }
                );
                return true;
            }

            return false;
        }
    }
}