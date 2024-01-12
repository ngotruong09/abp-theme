using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Hwl.NewTheme.Blazor.Server.Host;

[Dependency(ReplaceServices = true)]
public class NewThemeBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "NewTheme";
}
