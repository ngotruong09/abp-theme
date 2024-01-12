using Volo.Abp.Modularity;

namespace Hwl.NewTheme;

[DependsOn(
    typeof(NewThemeApplicationModule),
    typeof(NewThemeDomainTestModule)
    )]
public class NewThemeApplicationTestModule : AbpModule
{

}
