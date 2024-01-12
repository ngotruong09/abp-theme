using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.Blazor.Server;
using Volo.Abp.SettingManagement.Blazor.Server;

namespace Volo.Abp.LeptonTheme.Management.Blazor.Server;

[DependsOn(typeof(LeptonThemeManagementBlazorModule),
    typeof(AbpPermissionManagementBlazorServerModule),
    typeof(AbpSettingManagementBlazorServerModule))
]
public class LeptonThemeManagementBlazorServerModule : AbpModule
{
}
