using Volo.Abp.Features;
using Volo.Abp.LeptonTheme.Management.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Validation.StringValues;

namespace Volo.Abp.LeptonTheme.Management;

public class LeptonThemeManagementFeatureDefinitionProvider : FeatureDefinitionProvider
{
    public override void Define(IFeatureDefinitionContext context)
    {
        var group = context.AddGroup(LeptonThemeManagementFeatures.GroupName,
            L("Feature:LeptonThemeManagementGroup"));

        group.AddFeature(LeptonThemeManagementFeatures.Enable,
            "true",
            L("Feature:LeptonThemeManagementEnable"),
            L("Feature:LeptonThemeManagementEnableDescription"),
            new ToggleStringValueType());
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<LeptonThemeManagementResource>(name);
    }

}
