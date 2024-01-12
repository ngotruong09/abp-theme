using System.Threading.Tasks;
using Volo.Abp.AspNetCore.Components.Web;
using Volo.Abp.AspNetCore.Components.Web.LeptonTheme;
using Volo.Abp.DependencyInjection;
using Volo.Abp.LeptonTheme.Management;

namespace Volo.Abp.AspNetCore.Components.WebAssembly.LeptonTheme;

[ExposeServices(
    typeof(LeptonThemeInitializer),
    typeof(IAsyncInitialize)
    )]
public class LeptonThemeInitializer : IAsyncInitialize, ITransientDependency
{
    protected IAbpUtilsService UtilsService { get; }
    protected ILeptonSettingsProvider LeptonSettings { get; }

    public LeptonThemeInitializer(IAbpUtilsService utilsService, ILeptonSettingsProvider leptonSettings)
    {
        UtilsService = utilsService;
        LeptonSettings = leptonSettings;
    }

    public virtual async Task InitializeAsync()
    {
        if (await LeptonSettings.IsBoxedAsync())
        {
            await UtilsService.AddClassToTagAsync("body", "lp-boxed");
        }

        var path = await GetStylePathAsync();
        await UtilsService.ReplaceLinkHrefByIdAsync("LeptonStyle", path);
    }

    protected virtual async Task<string> GetStylePathAsync()
    {
        //TODO: Can we add .min version on production?

        var style = await LeptonSettings.GetStyleAsync();

        switch (style)
        {
            case LeptonStyle.Style1:
                return "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton1.css";
            case LeptonStyle.Style2:
                return "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton2.css";
            case LeptonStyle.Style3:
                return "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton3.css";
            case LeptonStyle.Style4:
                return "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton4.css";
            case LeptonStyle.Style5:
                return "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton5.css";
            case LeptonStyle.Style6:
                return "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton6.css";
            default:
                //TODO: Warning?
                return "_content/Volo.Abp.AspNetCore.Components.Web.LeptonTheme/styles/lepton1.css";
        }
    }
}
