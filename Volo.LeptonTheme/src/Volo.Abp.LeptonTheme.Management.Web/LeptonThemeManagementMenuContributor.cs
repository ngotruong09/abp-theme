using System.Threading.Tasks;
using Volo.Abp.UI.Navigation;

namespace Volo.Abp.LeptonTheme.Management;

public class LeptonThemeManagementMenuContributor : IMenuContributor
{
    public async Task ConfigureMenuAsync(MenuConfigurationContext context)
    {
        if (context.Menu.Name == StandardMenus.Main)
        {
            await ConfigureMainMenuAsync(context);
        }
    }

    private Task ConfigureMainMenuAsync(MenuConfigurationContext context)
    {
        //Add main menu items.

        return Task.CompletedTask;
    }
}
