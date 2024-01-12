using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Hwl.NewTheme.EntityFrameworkCore;

[ConnectionStringName(NewThemeDbProperties.ConnectionStringName)]
public class NewThemeDbContext : AbpDbContext<NewThemeDbContext>, INewThemeDbContext
{
    /* Add DbSet for each Aggregate Root here. Example:
     * public DbSet<Question> Questions { get; set; }
     */

    public NewThemeDbContext(DbContextOptions<NewThemeDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ConfigureNewTheme();
    }
}
