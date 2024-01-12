using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using Volo.Abp.SettingManagement;
using Volo.Abp.Application;

namespace Volo.Abp.LeptonTheme.Management;

[DependsOn(
    typeof(LeptonThemeManagementDomainModule),
    typeof(LeptonThemeManagementApplicationContractsModule),
    typeof(AbpAutoMapperModule),
    typeof(AbpSettingManagementDomainModule),
    typeof(AbpDddApplicationModule)
    )]
public class LeptonThemeManagementApplicationModule : AbpModule
{
    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        
    }
}
