namespace Volo.Abp.AspNetCore.Mvc.UI.Theme.Lepton;

public class LeptonThemeOptions
{
    /// <summary>
    /// Enables Lepton Theme demo features. When set to false, it doesn't add any extra html or javascript to your web application.
    /// </summary>
    public bool EnableDemoFeatures { get; set; }

    public bool IsPublicWebsite { get; set; }

    /// <summary>
    /// Set this to use a custom style file. It should be a full path.
    /// </summary>
    public string StylePath { get; set; }
}
