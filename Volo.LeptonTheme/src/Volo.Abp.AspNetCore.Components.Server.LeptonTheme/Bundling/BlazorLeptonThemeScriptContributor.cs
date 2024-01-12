using System.Collections.Generic;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;

namespace Volo.Abp.AspNetCore.Components.Server.LeptonTheme.Bundling;

public class BlazorLeptonThemeScriptContributor : BundleContributor
{
    public override void ConfigureBundle(BundleConfigurationContext context)
    {
        context.Files.AddIfNotContains("/_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/scripts/global.js");
    }
}
