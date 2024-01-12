using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace Hwl.NewTheme.EntityFrameworkCore;

[ConnectionStringName(NewThemeDbProperties.ConnectionStringName)]
public interface INewThemeDbContext : IEfCoreDbContext
{
    /* Add DbSet for each Aggregate Root here. Example:
     * DbSet<Question> Questions { get; }
     */
}
