using Volo.Abp.Application;
using Volo.Abp.Authorization;
using Volo.Abp.Modularity;

namespace Volo.Abp.LeptonTheme.Management;

[DependsOn(
    typeof(LeptonThemeManagementDomainSharedModule),
    typeof(AbpDddApplicationContractsModule),
    typeof(AbpAuthorizationAbstractionsModule)
    )]
public class LeptonThemeManagementApplicationContractsModule : AbpModule
{
    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
    }
}
