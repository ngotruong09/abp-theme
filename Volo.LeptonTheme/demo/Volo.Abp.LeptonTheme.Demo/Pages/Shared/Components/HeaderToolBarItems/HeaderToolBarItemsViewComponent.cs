using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc;

namespace Volo.Abp.LeptonTheme.Demo.Pages.Shared.Components.HeaderToolBarItems;

public class HeaderToolBarItemsViewComponent : AbpViewComponent
{
    public virtual IViewComponentResult Invoke()
    {
        return View("~/Pages/Shared/Components/HeaderToolBarItems/Default.cshtml");
    }
}
