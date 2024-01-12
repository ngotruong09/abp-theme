using Volo.Abp.Reflection;

namespace Hwl.NewTheme.Permissions;

public class NewThemePermissions
{
    public const string GroupName = "NewTheme";

    public static string[] GetAll()
    {
        return ReflectionHelper.GetPublicConstantsRecursively(typeof(NewThemePermissions));
    }
}
