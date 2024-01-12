using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.LeptonTheme.Management.Areas.LeptonThemeManagement.Models;

namespace Volo.Abp.LeptonTheme.Management.Pages.LeptonThemeManagement.Components.LeptonThemeSettingGroup;

public class LeptonThemeSettingGroupViewComponent : AbpViewComponent
{
    protected ILeptonThemeSettingsAppService LeptonThemeSettingsAppService;

    public LeptonThemeSettingGroupViewComponent(ILeptonThemeSettingsAppService leptonThemeSettingsAppService)
    {
        ObjectMapperContext = typeof(LeptonThemeManagementWebModule);

        LeptonThemeSettingsAppService = leptonThemeSettingsAppService;
    }

    public virtual async Task<IViewComponentResult> InvokeAsync()
    {
        var model = ObjectMapper.Map<LeptonThemeSettingsDto, LeptonThemeSettingsViewModel>(await LeptonThemeSettingsAppService.GetAsync());

        return View("~/Pages/LeptonThemeManagement/Components/LeptonThemeSettingGroup/Default.cshtml", model);
    }
}
