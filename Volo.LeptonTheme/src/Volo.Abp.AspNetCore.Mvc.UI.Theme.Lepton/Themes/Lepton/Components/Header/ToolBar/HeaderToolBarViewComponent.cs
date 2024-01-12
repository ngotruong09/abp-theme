using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared.Toolbars;

namespace Volo.Abp.AspNetCore.Mvc.UI.Theme.Lepton.Themes.Lepton.Components.Header.ToolBar;

public class HeaderToolBarViewComponent : LeptonViewComponentBase
{
    protected IToolbarManager ToolbarManager;

    public HeaderToolBarViewComponent(IToolbarManager toolbarManager)
    {
        ToolbarManager = toolbarManager;
    }

    public virtual async Task<IViewComponentResult> InvokeAsync()
    {
        var toolbar = await ToolbarManager.GetAsync(StandardToolbars.Main);
        return View("~/Themes/Lepton/Components/Header/ToolBar/Default.cshtml", toolbar);
    }
}
