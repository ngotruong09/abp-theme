﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.UI.Navigation;

namespace Volo.Abp.AspNetCore.Mvc.UI.Theme.Lepton.Themes.Lepton.Components.Toolbar.UserMenu;

public class UserMenuViewComponent : LeptonViewComponentBase
{
    protected IMenuManager MenuManager;

    public UserMenuViewComponent(IMenuManager menuManager)
    {
        MenuManager = menuManager;
    }

    public virtual async Task<IViewComponentResult> InvokeAsync()
    {
        var menu = await MenuManager.GetAsync(StandardMenus.User);
        return View("~/Themes/Lepton/Components/Toolbar/UserMenu/Default.cshtml", menu);
    }
}
