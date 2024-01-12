using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AspNetCore.Components.Web.Theming.Toolbars;
using Volo.Abp.AspNetCore.Components.WebAssembly.LeptonTheme.Components.ApplicationLayout.MainHeader;
using Volo.Abp.Localization;

namespace Volo.Abp.AspNetCore.Components.WebAssembly.LeptonTheme;

public class LeptonThemeToolbarContributor : IToolbarContributor
{
    public async Task ConfigureToolbarAsync(IToolbarConfigurationContext context)
    {
        if (context.Toolbar.Name == StandardToolbars.Main)
        {
            var languageProvider = context.ServiceProvider.GetRequiredService<ILanguageProvider>();

            //TODO: This duplicates GetLanguagesAsync() usage. Can we eleminate this?
            var languages = await languageProvider.GetLanguagesAsync();
            if (languages.Count > 1)
            {
                context.Toolbar.Items.Add(new ToolbarItem(typeof(MainHeaderToolbarLanguageSwitch)));
            }

            context.Toolbar.Items.Add(new ToolbarItem(typeof(MainHeaderToolbarUserMenu)));
        }
    }
}
