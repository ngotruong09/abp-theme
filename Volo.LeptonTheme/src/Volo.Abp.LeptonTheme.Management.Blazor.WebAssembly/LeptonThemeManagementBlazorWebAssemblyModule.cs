using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.Blazor.WebAssembly;
using Volo.Abp.SettingManagement.Blazor.WebAssembly;

namespace Volo.Abp.LeptonTheme.Management.Blazor.WebAssembly;

[DependsOn(typeof(LeptonThemeManagementBlazorModule),
    typeof(AbpPermissionManagementBlazorWebAssemblyModule),
    typeof(AbpSettingManagementBlazorWebAssemblyModule),
    typeof(LeptonThemeManagementHttpApiClientModule)
)]
public class LeptonThemeManagementBlazorWebAssemblyModule : AbpModule
{
}
