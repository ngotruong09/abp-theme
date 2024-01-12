using Hwl.NewTheme.Localization;
using Volo.Abp.Application.Services;

namespace Hwl.NewTheme;

public abstract class NewThemeAppService : ApplicationService
{
    protected NewThemeAppService()
    {
        LocalizationResource = typeof(NewThemeResource);
        ObjectMapperContext = typeof(NewThemeApplicationModule);
    }
}
