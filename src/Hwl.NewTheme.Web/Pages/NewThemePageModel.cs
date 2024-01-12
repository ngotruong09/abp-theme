using Hwl.NewTheme.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace Hwl.NewTheme.Web.Pages;

/* Inherit your PageModel classes from this class.
 */
public abstract class NewThemePageModel : AbpPageModel
{
    protected NewThemePageModel()
    {
        LocalizationResourceType = typeof(NewThemeResource);
        ObjectMapperContext = typeof(NewThemeWebModule);
    }
}
