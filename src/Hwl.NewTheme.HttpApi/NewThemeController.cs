using Hwl.NewTheme.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Hwl.NewTheme;

public abstract class NewThemeController : AbpControllerBase
{
    protected NewThemeController()
    {
        LocalizationResource = typeof(NewThemeResource);
    }
}
