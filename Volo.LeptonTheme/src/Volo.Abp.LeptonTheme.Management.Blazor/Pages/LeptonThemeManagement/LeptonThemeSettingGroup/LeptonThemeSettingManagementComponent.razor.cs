using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;
using Volo.Abp.AspNetCore.Components.Messages;
using Volo.Abp.AspNetCore.Components.Web.Configuration;
using Volo.Abp.LeptonTheme.Management.Localization;

namespace Volo.Abp.LeptonTheme.Management.Blazor.Pages.LeptonThemeManagement.LeptonThemeSettingGroup;

public partial class LeptonThemeSettingManagementComponent
{
    [Inject]
    protected ILeptonThemeSettingsAppService LeptonThemeSettingsAppService { get; set; }

    [Inject]
    private ICurrentApplicationConfigurationCacheResetService CurrentApplicationConfigurationCacheResetService { get; set; }

    [Inject]
    protected IUiMessageService UiMessageService { get; set; }

    [Inject]
    protected IStringLocalizer<LeptonThemeManagementResource> L { get; set; }

    protected UpdateLeptonThemeSettingsDto LeptonSettings;

    protected override async Task OnInitializedAsync()
    {
        var settings = await LeptonThemeSettingsAppService.GetAsync();

        LeptonSettings = new UpdateLeptonThemeSettingsDto
        {
            BoxedLayout = settings.BoxedLayout,
            MenuPlacement = settings.MenuPlacement,
            MenuStatus = settings.MenuStatus,
            Style = settings.Style,
            PublicLayoutStyle = settings.PublicLayoutStyle
        };
    }

    protected virtual async Task UpdateSettingsAsync()
    {
        try
        {
            await LeptonThemeSettingsAppService.UpdateAsync(LeptonSettings);

            await CurrentApplicationConfigurationCacheResetService.ResetAsync();

            await UiMessageService.Success(L["SuccessfullySaved"]);
        }
        catch (Exception ex)
        {
            await HandleErrorAsync(ex);
        }
    }
}
