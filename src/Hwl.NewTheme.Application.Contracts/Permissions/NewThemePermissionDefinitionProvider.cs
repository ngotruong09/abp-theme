using Hwl.NewTheme.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Hwl.NewTheme.Permissions;

public class NewThemePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(NewThemePermissions.GroupName, L("Permission:NewTheme"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<NewThemeResource>(name);
    }
}
