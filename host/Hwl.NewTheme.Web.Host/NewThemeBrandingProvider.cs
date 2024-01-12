using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace Hwl.NewTheme;

[Dependency(ReplaceServices = true)]
public class NewThemeBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "NewTheme";
}
