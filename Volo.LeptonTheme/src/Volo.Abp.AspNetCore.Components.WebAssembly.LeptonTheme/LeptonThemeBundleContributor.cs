using System;
using System.Collections.Generic;
using Volo.Abp.Bundling;

namespace Volo.Abp.AspNetCore.Components.WebAssembly.LeptonTheme;

public class LeptonThemeBundleContributor : IBundleContributor
{
    const string leptonThemeStylePathParameterName = "LeptonTheme.StylePath";
    const string leptonThemeStyleParameterName = "LeptonTheme.Style";
    const string leptonThemeStyleChangeDynamicallyParameterName = "LeptonTheme.ChangeStyleDynamically";

    public void AddScripts(BundleContext context)
    {
        context.Add("_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/scripts/global.js");
    }

    public void AddStyles(BundleContext context)
    {
        var stylePath = context.Parameters.GetOrDefault(leptonThemeStylePathParameterName);
        if (!stylePath.IsNullOrEmpty())
        {
            context.Add(stylePath);
            return;
        }

        var styleName = context.Parameters.GetOrDefault(leptonThemeStyleParameterName) ?? "Style1";
        var changeOnRuntime = context.Parameters.GetOrDefault(leptonThemeStyleChangeDynamicallyParameterName) ?? "false";

        var cssFilePath = "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton" + styleName.Replace("Style", string.Empty, StringComparison.OrdinalIgnoreCase) + ".css";

        context.Add(
            cssFilePath,
            bool.Parse(changeOnRuntime),
            new Dictionary<string, string>
            {
                    {"id", "LeptonStyle"}
            }
        );

        context.Add("_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/custom/tree-view-fix.css");
    }
}
