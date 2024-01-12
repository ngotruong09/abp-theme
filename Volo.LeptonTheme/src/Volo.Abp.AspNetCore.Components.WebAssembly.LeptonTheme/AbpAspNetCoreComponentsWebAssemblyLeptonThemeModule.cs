using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AspNetCore.Components.Web.LeptonTheme;
using Volo.Abp.AspNetCore.Components.Web.Theming.Routing;
using Volo.Abp.AspNetCore.Components.Web.Theming.Toolbars;
using Volo.Abp.AspNetCore.Components.WebAssembly.Theming;
using Volo.Abp.AutoMapper;
using Volo.Abp.Http.Client.IdentityModel.WebAssembly;
using Volo.Abp.Modularity;

namespace Volo.Abp.AspNetCore.Components.WebAssembly.LeptonTheme;

[DependsOn(
    typeof(AbpAspNetCoreComponentsWebAssemblyThemingModule),
    typeof(AbpAspNetCoreComponentsWebLeptonThemeModule),
    typeof(AbpHttpClientIdentityModelWebAssemblyModule)
    )]
public class AbpAspNetCoreComponentsWebAssemblyLeptonThemeModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpRouterOptions>(options =>
        {
            options.AdditionalAssemblies.Add(typeof(AbpAspNetCoreComponentsWebAssemblyLeptonThemeModule).Assembly);
        });

        Configure<AbpToolbarOptions>(options =>
        {
            options.Contributors.Add(new LeptonThemeToolbarContributor());
        });

        context.Services.AddAutoMapperObjectMapper<AbpAspNetCoreComponentsWebAssemblyLeptonThemeModule>();

        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<AbpAspNetCoreComponentsWebAssemblyLeptonThemeModule>();
        });
    }
}
