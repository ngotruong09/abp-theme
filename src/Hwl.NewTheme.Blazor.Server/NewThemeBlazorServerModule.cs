using Volo.Abp.AspNetCore.Components.Server.Theming;
using Volo.Abp.Modularity;

namespace Hwl.NewTheme.Blazor.Server;

[DependsOn(
    typeof(NewThemeBlazorModule),
    typeof(AbpAspNetCoreComponentsServerThemingModule)
    )]
public class NewThemeBlazorServerModule : AbpModule
{

}
