using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.JSInterop;

namespace Volo.Abp.AspNetCore.Components.Web.LeptonTheme.Components.ApplicationLayout.Navigation;

public partial class MainSiderbarMenuItem
{
    [Inject]
    protected NavigationManager NavigationManager { get; set; }

    [Inject]
    protected IJSRuntime JsRuntime { get; set; }

    [Parameter]
    public MenuViewModel Menu { get; set; }

    [Parameter]
    public MenuItemViewModel MenuItem { get; set; }

    protected override void OnInitialized()
    {
        ActivateCurrentPage();
    }

    protected virtual void OnMenuItemClick(MenuItemViewModel currentMenuItem)
    {
        ActivateCurrentPage(currentMenuItem);
    }

    protected virtual void ActivateCurrentPage(MenuItemViewModel currentMenuItem = null)
    {
        var menuItem = currentMenuItem ?? MenuItem;

        if (menuItem.MenuItem.Url.IsNullOrEmpty())
        {
            return;
        }

        var menuItemPath = menuItem.MenuItem.Url.Replace("~/", string.Empty).Trim('/');
        var currentPagePath = new Uri(NavigationManager.Uri.TrimEnd('/')).AbsolutePath.Trim('/');

        if (menuItemPath.TrimEnd('/').Equals(currentPagePath, StringComparison.InvariantCultureIgnoreCase) || currentMenuItem != null)
        {
            Menu.Activate(menuItem);
        }
    }

    protected virtual void ToggleMenu()
    {
        Menu.ToggleOpen(MenuItem);
    }
}
