using Hwl.NewTheme.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Hwl.NewTheme;

/* Domain tests are configured to use the EF Core provider.
 * You can switch to MongoDB, however your domain tests should be
 * database independent anyway.
 */
[DependsOn(
    typeof(NewThemeEntityFrameworkCoreTestModule)
    )]
public class NewThemeDomainTestModule : AbpModule
{

}
