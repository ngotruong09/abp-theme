using Hwl.NewTheme.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace Hwl.NewTheme.Pages;

public abstract class NewThemePageModel : AbpPageModel
{
    protected NewThemePageModel()
    {
        LocalizationResourceType = typeof(NewThemeResource);
    }
}
