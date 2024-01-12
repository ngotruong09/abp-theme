using Volo.Abp.AspNetCore.Components.Server.LeptonTheme.Bundling;
using Volo.Abp.AspNetCore.Components.Server.Theming;
using Volo.Abp.AspNetCore.Components.Server.Theming.Bundling;
using Volo.Abp.AspNetCore.Components.Web.LeptonTheme;
using Volo.Abp.AspNetCore.Components.Web.Theming.Toolbars;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.Modularity;

namespace Volo.Abp.AspNetCore.Components.Server.LeptonTheme;

[DependsOn(
    typeof(AbpAspNetCoreComponentsWebLeptonThemeModule),
    typeof(AbpAspNetCoreComponentsServerThemingModule)
    )]
public class AbpAspNetCoreComponentsServerLeptonThemeModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpToolbarOptions>(options =>
        {
            options.Contributors.Add(new LeptonThemeToolbarContributor());
        });

        Configure<AbpBundlingOptions>(options =>
        {
            options
                .StyleBundles
                .Add(BlazorLeptonThemeBundles.Styles.Global, bundle =>
                {
                    bundle
                        .AddBaseBundles(BlazorStandardBundles.Styles.Global)
                        .AddContributors(typeof(BlazorLeptonThemeStyleContributor));
                });

            options
                .ScriptBundles
                .Add(BlazorLeptonThemeBundles.Scripts.Global, bundle =>
                {
                    bundle
                        .AddBaseBundles(BlazorStandardBundles.Scripts.Global)
                        .AddContributors(typeof(BlazorLeptonThemeScriptContributor));
                });
        });
    }
}
