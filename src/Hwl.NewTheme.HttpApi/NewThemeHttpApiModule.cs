using Localization.Resources.AbpUi;
using Hwl.NewTheme.Localization;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Microsoft.Extensions.DependencyInjection;

namespace Hwl.NewTheme;

[DependsOn(
    typeof(NewThemeApplicationContractsModule),
    typeof(AbpAspNetCoreMvcModule))]
public class NewThemeHttpApiModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        PreConfigure<IMvcBuilder>(mvcBuilder =>
        {
            mvcBuilder.AddApplicationPartIfNotExists(typeof(NewThemeHttpApiModule).Assembly);
        });
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<NewThemeResource>()
                .AddBaseTypes(typeof(AbpUiResource));
        });
    }
}
