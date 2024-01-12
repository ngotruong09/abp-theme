using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Localization;

namespace Volo.Abp.AspNetCore.Components.Server.LeptonTheme.Components.ApplicationLayout.MainHeader;

public partial class MainHeaderToolbarLanguageSwitch
{
    private IReadOnlyList<LanguageInfo> OtherLanguages { get; set; }
    private LanguageInfo CurrentLanguage { get; set; }

    protected override async Task OnInitializedAsync()
    {
        var languages = await LanguageProvider.GetLanguagesAsync();
        var currentLanguage = languages.FindByCulture(
            CultureInfo.CurrentCulture.Name,
            CultureInfo.CurrentUICulture.Name
        );

        if (currentLanguage == null)
        {
            var localizationOptions = await RequestLocalizationOptionsProvider.GetLocalizationOptionsAsync();
            if (localizationOptions.DefaultRequestCulture != null)
            {
                currentLanguage = new LanguageInfo(
                    localizationOptions.DefaultRequestCulture.Culture.Name,
                    localizationOptions.DefaultRequestCulture.UICulture.Name,
                    localizationOptions.DefaultRequestCulture.UICulture.DisplayName);
            }
            else
            {
                currentLanguage = new LanguageInfo(
                    CultureInfo.CurrentCulture.Name,
                    CultureInfo.CurrentUICulture.Name,
                    CultureInfo.CurrentUICulture.DisplayName);
            }
        }

        CurrentLanguage = currentLanguage;
        OtherLanguages = languages.Where(l => l != currentLanguage).ToImmutableList();
    }

    private void ChangeLanguage(LanguageInfo language)
    {
        var relativeUrl = NavigationManager.Uri.RemovePreFix(NavigationManager.BaseUri).EnsureStartsWith('/');

        NavigationManager.NavigateTo(
            $"/Abp/Languages/Switch?culture={language.CultureName}&uiCulture={language.UiCultureName}&returnUrl={relativeUrl}",
            forceLoad: true
        );
    }
}
