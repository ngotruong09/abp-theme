using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.UI.Layout;

namespace Volo.Abp.AspNetCore.Mvc.UI.Theme.Lepton.Themes.Lepton.Components.Content.Title;

public class ContentTitleViewComponent : LeptonViewComponentBase
{
    protected IPageLayout PageLayout;

    public ContentTitleViewComponent(IPageLayout pageLayout)
    {
        PageLayout = pageLayout;
    }

    public virtual IViewComponentResult Invoke()
    {
        return View("~/Themes/Lepton/Components/Content/Title/Default.cshtml", PageLayout.Content.Title);
    }
}
