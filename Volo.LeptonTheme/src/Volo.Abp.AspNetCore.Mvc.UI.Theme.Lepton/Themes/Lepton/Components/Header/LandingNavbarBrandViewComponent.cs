using Microsoft.AspNetCore.Mvc;

namespace Volo.Abp.AspNetCore.Mvc.UI.Theme.Lepton.Themes.Lepton.Components.Header;

public class LandingHeaderViewComponent : LeptonViewComponentBase
{
    public virtual IViewComponentResult Invoke()
    {
        return View("~/Themes/Lepton/Components/Header/LandingHeader.cshtml");
    }
}
