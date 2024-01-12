using Volo.Abp.AspNetCore.Components.WebAssembly.Theming;
using Volo.Abp.Modularity;

namespace Hwl.NewTheme.Blazor.WebAssembly;

[DependsOn(
    typeof(NewThemeBlazorModule),
    typeof(NewThemeHttpApiClientModule),
    typeof(AbpAspNetCoreComponentsWebAssemblyThemingModule)
)]
public class NewThemeBlazorWebAssemblyModule : AbpModule
{

}
