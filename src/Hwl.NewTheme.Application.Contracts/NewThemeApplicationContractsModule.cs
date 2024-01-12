using Volo.Abp.Application;
using Volo.Abp.Authorization;
using Volo.Abp.Modularity;

namespace Hwl.NewTheme;

[DependsOn(
    typeof(NewThemeDomainSharedModule),
    typeof(AbpDddApplicationContractsModule),
    typeof(AbpAuthorizationAbstractionsModule)
    )]
public class NewThemeApplicationContractsModule : AbpModule
{

}
