using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Hwl.NewTheme.EntityFrameworkCore;

public class NewThemeHttpApiHostMigrationsDbContextFactory : IDesignTimeDbContextFactory<NewThemeHttpApiHostMigrationsDbContext>
{
    public NewThemeHttpApiHostMigrationsDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<NewThemeHttpApiHostMigrationsDbContext>()
            .UseSqlServer(configuration.GetConnectionString("NewTheme"));

        return new NewThemeHttpApiHostMigrationsDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
