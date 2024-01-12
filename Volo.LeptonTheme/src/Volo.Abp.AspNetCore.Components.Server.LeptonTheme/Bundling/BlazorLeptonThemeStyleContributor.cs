using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Volo.Abp.AspNetCore.Components.Web.LeptonTheme;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Packages.FlagIconCss;
using Volo.Abp.LeptonTheme.Management;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.Settings;

namespace Volo.Abp.AspNetCore.Components.Server.LeptonTheme.Bundling;

[DependsOn(typeof(FlagIconCssStyleContributor))]
public class BlazorLeptonThemeStyleContributor : BundleContributor
{
    public override async Task ConfigureBundleAsync(BundleConfigurationContext context)
    {
        var options = context.ServiceProvider.GetRequiredService<IOptions<LeptonThemeOptions>>().Value;

        if (!options.StylePath.IsNullOrEmpty())
        {
            context.Files.Add(options.StylePath);
            return;
        }

        var cssFile = await GetStyleCssFileNameAsync(context);
        context.Files.AddIfNotContains($"/_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/{cssFile}");
        context.Files.AddIfNotContains("/_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/custom/tree-view-fix.css");

        context.Files.RemoveAll(x => x == (CultureHelper.IsRtl
            ? "/libs/bootstrap/css/bootstrap.rtl.css"
            : "/libs/bootstrap/css/bootstrap.css"));
    }

    private static async Task<string> GetStyleCssFileNameAsync(BundleConfigurationContext context)
    {
        var style = await context.ServiceProvider
            .GetRequiredService<ISettingProvider>()
            .GetOrNullAsync(LeptonThemeSettingNames.Style);

        var rtlStringExtension = CultureHelper.IsRtl ? ".rtl" : string.Empty;

        if (string.Equals(style, LeptonStyle.Style1.ToString(), StringComparison.OrdinalIgnoreCase))
        {
            return $"lepton1{rtlStringExtension}.css";
        }
        else if (string.Equals(style, LeptonStyle.Style2.ToString(), StringComparison.OrdinalIgnoreCase))
        {
            return $"lepton2{rtlStringExtension}.css";
        }
        else if (string.Equals(style, LeptonStyle.Style3.ToString(), StringComparison.OrdinalIgnoreCase))
        {
            return $"lepton3{rtlStringExtension}.css";
        }
        else if (string.Equals(style, LeptonStyle.Style4.ToString(), StringComparison.OrdinalIgnoreCase))
        {
            return $"lepton4{rtlStringExtension}.css";
        }
        else if (string.Equals(style, LeptonStyle.Style5.ToString(), StringComparison.OrdinalIgnoreCase))
        {
            return $"lepton5{rtlStringExtension}.css";
        }
        else if (string.Equals(style, LeptonStyle.Style6.ToString(), StringComparison.OrdinalIgnoreCase))
        {
            return $"lepton6{rtlStringExtension}.css";
        }

        return $"lepton1{rtlStringExtension}.css";
    }
}
