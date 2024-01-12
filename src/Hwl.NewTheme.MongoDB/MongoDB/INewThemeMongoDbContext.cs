using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace Hwl.NewTheme.MongoDB;

[ConnectionStringName(NewThemeDbProperties.ConnectionStringName)]
public interface INewThemeMongoDbContext : IAbpMongoDbContext
{
    /* Define mongo collections here. Example:
     * IMongoCollection<Question> Questions { get; }
     */
}
