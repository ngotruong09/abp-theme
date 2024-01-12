using Hwl.NewTheme.Localization;
using Volo.Abp.AspNetCore.Components;

namespace Hwl.NewTheme.Blazor;

public abstract class NewThemeComponentBase : AbpComponentBase
{
    protected NewThemeComponentBase()
    {
        LocalizationResource = typeof(NewThemeResource);
    }
}
