using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace Hwl.NewTheme.MongoDB;

[ConnectionStringName(NewThemeDbProperties.ConnectionStringName)]
public class NewThemeMongoDbContext : AbpMongoDbContext, INewThemeMongoDbContext
{
    /* Add mongo collections here. Example:
     * public IMongoCollection<Question> Questions => Collection<Question>();
     */

    protected override void CreateModel(IMongoModelBuilder modelBuilder)
    {
        base.CreateModel(modelBuilder);

        modelBuilder.ConfigureNewTheme();
    }
}
