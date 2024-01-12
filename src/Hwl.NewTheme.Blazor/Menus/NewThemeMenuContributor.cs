using System.Threading.Tasks;
using Hwl.NewTheme.Localization;
using Volo.Abp.UI.Navigation;

namespace Hwl.NewTheme.Blazor.Menus;

public class NewThemeMenuContributor : IMenuContributor
{
    public async Task ConfigureMenuAsync(MenuConfigurationContext context)
    {
        if (context.Menu.Name == StandardMenus.Main)
        {
            await ConfigureMainMenuAsync(context);
        }
    }

    private static async Task ConfigureMainMenuAsync(MenuConfigurationContext context)
    {
        //Add main menu items.
        var l = context.GetLocalizer<NewThemeResource>();

        context.Menu.AddItem(new ApplicationMenuItem(NewThemeMenus.Prefix, displayName: "Sample Page", "/NewTheme", icon: "fa fa-globe"));

        await Task.CompletedTask;
    }
}
