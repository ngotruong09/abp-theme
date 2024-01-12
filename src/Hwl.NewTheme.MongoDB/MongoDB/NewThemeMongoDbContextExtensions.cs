using Volo.Abp;
using Volo.Abp.MongoDB;

namespace Hwl.NewTheme.MongoDB;

public static class NewThemeMongoDbContextExtensions
{
    public static void ConfigureNewTheme(
        this IMongoModelBuilder builder)
    {
        Check.NotNull(builder, nameof(builder));
    }
}
